"use client";

import { useEffect, useState } from "react";
import { DEBUG } from "@/core/config/site";
import { getTgChatId } from "@/core/utils";
import { clientRequest } from "@/core/config";
import Link from "next/link";

export default function DebugPanel() {
  const [tg, setTg] = useState<any>(null);
  const [elig, setElig] = useState<any>(null);
  const [me, setMe] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getTgChatId().then(setTg);
  }, []);

  const run = async () => {
    setErr(null);
    setBusy(true);
    try {
      const a = await clientRequest.get("/eligibility");
      setElig(a.data);
    } catch (e: any) {
      setErr(`eligibility failed: ${e?.response?.status ?? "network"}`);
    }
    try {
      const b = await clientRequest.get("/me");
      setMe(b.data);
    } catch (e: any) {
      setErr((s) => (s ? s + " | " : "") + `me failed: ${e?.response?.status ?? "network"}`);
    }
    setBusy(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Debug</h2>
        {/* 🟢 quick back link to your app */}
        <Link
          href="/dashboard"
          className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm"
        >
          Open App
        </Link>
      </div>

      <p>
        DEBUG flag: <strong>{String(DEBUG)}</strong>
      </p>

      <div className="space-y-2">
        <h4 className="font-medium">Telegram init</h4>
        <pre className="text-xs bg-content2 p-2 rounded overflow-auto">
{JSON.stringify(tg, null, 2)}
        </pre>
      </div>

      <button
        className="px-3 py-2 rounded bg-primary text-primary-foreground disabled:opacity-60"
        onClick={run}
        disabled={busy}
      >
        {busy ? "Probing..." : "Probe /eligibility & /me"}
      </button>

      {err ? <p className="text-danger-500 text-sm">{err}</p> : null}

      <div className="grid grid-cols-1 gap-3">
        <div>
          <h4 className="font-medium">/eligibility</h4>
          <pre className="text-xs bg-content2 p-2 rounded overflow-auto">
{JSON.stringify(elig, null, 2)}
          </pre>
        </div>
        <div>
          <h4 className="font-medium">/me</h4>
          <pre className="text-xs bg-content2 p-2 rounded overflow-auto">
{JSON.stringify(me, null, 2)}
          </pre>
        </div>
      </div>

      <p className="text-xs opacity-70">
        Tip: open this page with <code>?debug=1</code> to see console logs.
      </p>
    </div>
  );
}