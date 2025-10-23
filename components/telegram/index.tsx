"use client";

/**
 * Telegram Mini App bootstrap that:
 * - robustly waits for window.Telegram.WebApp
 * - falls back to reading init data from location hash
 * - derives user/chat
 * - ALWAYS sends both headers on requests:
 *     X-TG-Init-Data : <initData string> (when available)
 *     X-Dev-Chat-Id  : <chatId/userId>  (always when we can derive it)
 *   Plus a mirror:
 *     X-Chat-Id      : <chatId/userId>
 * - headers are a strict Record<string,string> (no undefined)
 */

import { useEffect, useMemo, useState } from "react";

type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};

type TgChat = { id: number; type?: string; title?: string };

type UnsafeInit = {
  user?: TgUser;
  chat?: TgChat;
  receiver?: TgChat;
  start_param?: string;
  [k: string]: any;
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Parse tgWebAppData from the URL hash */
function getInitDataFromHash(): string | null {
  try {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash.length < 2) return null;
    const params = new URLSearchParams(hash.slice(1));
    const tgData = params.get("tgWebAppData");
    if (tgData) return decodeURIComponent(tgData);
    return params.get("tgData");
  } catch {
    return null;
  }
}

/** Turn initData (querystring format) into a JS object for convenience */
function parseInitDataUnsafe(initDataQS: string | null): UnsafeInit | null {
  if (!initDataQS) return null;
  try {
    const qs = new URLSearchParams(initDataQS);
    const userStr = qs.get("user");
    const chatStr = qs.get("chat") || qs.get("receiver");

    const res: UnsafeInit = {};
    if (userStr) res.user = JSON.parse(userStr);
    if (chatStr) res.chat = JSON.parse(chatStr);
    return res;
  } catch {
    return null;
  }
}

/** try to obtain Telegram.WebApp, with retries (up to ~5s) */
async function waitForTelegramWebApp(maxMs = 5000, stepMs = 50) {
  const steps = Math.ceil(maxMs / stepMs);
  for (let i = 0; i < steps; i++) {
    const tg = (window as any)?.Telegram?.WebApp;
    if (tg) return tg;
    await delay(stepMs);
  }
  return undefined;
}

const TelegramUserInfo = () => {
  const [userInfo, setUserInfo] = useState<{
    id: number | null;
    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;
    isPremium: boolean;
    photoUrl: string | null;
    initData: string | null;
    initDataUnsafe: UnsafeInit | null;
    source: "api" | "hash" | "dev";
  } | null>(null);

  const [chatInfo, setChatInfo] = useState<TgChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const tg = await waitForTelegramWebApp(5000, 50);

      const hashInitData = getInitDataFromHash();
      const hashUnsafe = parseInitDataUnsafe(hashInitData);

      if (!tg && !hashInitData) {
        if (!cancelled) {
          setError(
            "Not running inside Telegram WebApp (no API and no tgWebAppData hash)."
          );
          setLoading(false);
        }
        return;
      }

      try {
        if (tg) {
          tg.ready?.();
          tg.expand?.();

          const initData: string = tg.initData || null;
          const unsafe: UnsafeInit = tg.initDataUnsafe || {};
          const user: TgUser | undefined = unsafe.user;
          const chat: TgChat | undefined = unsafe.chat || unsafe.receiver;

          if (!cancelled) {
            setUserInfo({
              id: user?.id ?? null,
              firstName: user?.first_name ?? "",
              lastName: user?.last_name ?? "",
              username: user?.username ?? "",
              languageCode: user?.language_code ?? "en",
              isPremium: !!user?.is_premium,
              photoUrl: user?.photo_url ?? null,
              initData,
              initDataUnsafe: unsafe,
              source: "api",
            });
            setChatInfo(chat ?? null);
          }

          const onTheme = () => {
            document.body.style.background =
              tg.themeParams?.bg_color || "transparent";
          };
          tg.onEvent?.("themeChanged", onTheme);
          onTheme();

          return () => {
            tg.offEvent?.("themeChanged", onTheme);
          };
        }

        // Fallback path (hash only)
        if (!cancelled && hashInitData) {
          const user = hashUnsafe?.user;
          const chat = hashUnsafe?.chat;

          setUserInfo({
            id: user?.id ?? chat?.id ?? null,
            firstName: user?.first_name ?? "",
            lastName: user?.last_name ?? "",
            username: user?.username ?? "",
            languageCode: user?.language_code ?? "en",
            isPremium: !!user?.is_premium,
            photoUrl: user?.photo_url ?? null,
            initData: hashInitData,
            initDataUnsafe: hashUnsafe,
            source: "hash",
          });
          setChatInfo(chat ?? null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(`init error: ${e?.message || String(e)}`);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Build headers for your API (no undefined values)
  const authHeaders: Record<string, string> = useMemo(() => {
    const h: Record<string, string> = { "Content-Type": "application/json" };

    // derive a stable chatId (prefer chat, then user)
    const derivedChatId =
      chatInfo?.id ??
      userInfo?.id ??
      (typeof window !== "undefined"
        ? Number(
            new URLSearchParams(window.location.search).get("chat_id") || ""
          ) || null
        : null);

    // Always include numeric id headers when we have it
    if (derivedChatId != null) {
      const idStr = String(derivedChatId);
      h["X-Dev-Chat-Id"] = idStr;
      h["X-Chat-Id"] = idStr; // mirror for convenience
    }

    // Include real init data string when available
    if (userInfo?.initData) {
      h["X-TG-Init-Data"] = userInfo.initData;
    }

    return h;
  }, [userInfo, chatInfo]);

  // Example: call /api/me after auth headers are ready
  useEffect(() => {
    if (loading || error) return;
    (async () => {
      try {
        const res = await fetch("/api/me", { headers: authHeaders });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("ME →", data);
      } catch (e: any) {
        console.error("fetch /api/me failed:", e?.message || e);
      }
    })();
  }, [loading, error, authHeaders]);

  // Render
  if (loading) return <div>Loading Telegram…</div>;
  if (error)
    return (
      <div style={{ color: "tomato", whiteSpace: "pre-wrap" }}>{error}</div>
    );

  const derivedChatId = chatInfo?.id ?? userInfo?.id ?? null;
  const hasInit = !!userInfo?.initData;

  return (
    <div>
      <h3>Telegram session</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        Source: {userInfo?.source ?? "—"}
        {"\n"}
        User ID: {userInfo?.id ?? "—"}
        {"\n"}
        Chat ID: {chatInfo?.id ?? "—"}
        {"\n"}
        Headers:
        {"\n"}  X-Dev-Chat-Id:{" "}
        {derivedChatId != null ? String(derivedChatId) : "—"}
        {"\n"}  X-Chat-Id: {derivedChatId != null ? String(derivedChatId) : "—"}
        {"\n"}  X-TG-Init-Data: {hasInit ? "[present]" : "—"}
      </pre>
    </div>
  );
};

export default TelegramUserInfo;
