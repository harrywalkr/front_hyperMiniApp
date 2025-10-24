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
async function waitForTelegramWebApp(maxMs = 5000, stepMs = 5) {
  const steps = Math.ceil(maxMs / stepMs);
  for (let i = 0; i < steps; i++) {
    const tg = (window as any)?.Telegram?.WebApp;
    if (tg) return tg;
    await delay(stepMs);
  }
  return undefined;
}

export async function getTgChatId() {
  let cancelled = false;

  const tg = await waitForTelegramWebApp(5000, 50);

  const hashInitData = getInitDataFromHash();
  const hashUnsafe = parseInitDataUnsafe(hashInitData);

  if (!tg && !hashInitData) {
    return {
      id: "561361266",
    };
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
        return {
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
        };
      }
    }

    // Fallback path (hash only)
    if (!cancelled && hashInitData) {
      const user = hashUnsafe?.user;
      const chat = hashUnsafe?.chat;

      return {
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
      };
    }
  } catch (e: any) {
    return {
      id: "561361266",
    };
  }
}
