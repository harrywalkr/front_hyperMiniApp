"use client";
import { useState, useEffect, useMemo } from "react";

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

const TelegramUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [chatInfo, setChatInfo] = useState<TgChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep a stable reference to tg
  const tg = useMemo(
    () =>
      typeof window !== "undefined"
        ? (window as any)?.Telegram?.WebApp
        : undefined,
    []
  );

  useEffect(() => {
    if (!tg) {
      setError("Not running inside Telegram WebApp.");
      setLoading(false);
      return;
    }

    try {
      tg.ready();
      tg.expand();

      const initData: string = tg.initData || ""; // signed string (send to backend)
      const initDataUnsafe = tg.initDataUnsafe || {}; // decoded (do not trust alone)
      const user: TgUser | undefined = initDataUnsafe.user;
      const chat: TgChat | undefined =
        initDataUnsafe.chat || initDataUnsafe.receiver || undefined;

      // Prefer user.id (1:1 chats). If running inside a group-launched webapp,
      // Telegram also provides chat.id. We expose both for debugging.
      if (!initData) {
        setError("Missing Telegram initData. Please open via the bot.");
      }

      if (!user && !chat) {
        setError("Telegram did not provide user/chat in initData.");
      }

      setUserInfo({
        id: user?.id ?? null,
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
        username: user?.username ?? "",
        languageCode: user?.language_code ?? "en",
        isPremium: Boolean(user?.is_premium),
        photoUrl: user?.photo_url ?? null,
        initData, // <- send to backend as X-TG-Init-Data
        initDataUnsafe, // visible for debugging only
      });
      setChatInfo(chat ?? null);
      setLoading(false);
    } catch (e: any) {
      setError(`init error: ${e?.message || String(e)}`);
      setLoading(false);
    }
  }, [tg]);

  // Build headers for your API
  const authHeaders = useMemo(() => {
    // Always prefer real Telegram header
    if (userInfo?.initData) {
      return { "X-TG-Init-Data": userInfo.initData };
    }
    // Dev fallback (only if your server has DEV_BYPASS=1)
    const devChatId =
      userInfo?.id ??
      chatInfo?.id ??
      (typeof window !== "undefined"
        ? Number(new URLSearchParams(window.location.search).get("chat_id"))
        : undefined);
    if (devChatId) return { "X-Dev-Chat-Id": String(devChatId) };
    return {};
  }, [userInfo, chatInfo]);

  // Optional: theme updates
  useEffect(() => {
    if (!tg) return;
    const handler = () => {
      document.body.style.background = tg.themeParams?.bg_color || "#0f0f0f";
    };
    tg.onEvent("themeChanged", handler);
    handler();
    return () => tg.offEvent("themeChanged", handler);
  }, [tg]);

  // Render
  if (loading) return <div>Loading Telegram…</div>;
  if (error) return <div style={{ color: "tomato" }}>{error}</div>;

  return (
    <div>
      <h3>Telegram session</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        User ID: {userInfo?.id ?? "—"}
        {"\n"}
        Chat ID: {chatInfo?.id ?? "—"}
        {"\n"}
        Using header:{" "}
        {authHeaders["X-TG-Init-Data"]
          ? "X-TG-Init-Data"
          : authHeaders["X-Dev-Chat-Id"]
            ? "X-Dev-Chat-Id"
            : "none"}
      </pre>
    </div>
  );
};

export default TelegramUserInfo;
