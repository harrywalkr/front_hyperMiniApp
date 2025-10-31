"use client";

import { useEffect } from "react";
import { getTgChatId } from "@/core/utils";

/**
 * Installs a global fetch() wrapper that always injects:
 *  - X-TG-Init-Data
 *  - X-Dev-Chat-Id
 * Both set to the SAME chat id (your backend requirement).
 */
export default function FetchPatchInstaller() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const origFetch = window.fetch;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        const tg = await getTgChatId();
        const chatId = tg?.id ? String(tg.id) : "";

        const headers = new Headers(init?.headers || {});
        if (chatId) {
          headers.set("X-TG-Init-Data", chatId);
          headers.set("X-Dev-Chat-Id", chatId);
        }

        return origFetch(input, { ...init, headers });
      } catch {
        return origFetch(input, init);
      }
    };

    return () => {
      window.fetch = origFetch;
    };
  }, []);

  return null;
}