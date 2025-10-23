"use client";
import { useState, useEffect } from "react";

const TelegramUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    initializeTelegram();
  }, []);

  const initializeTelegram = () => {
    try {
      const tg = (window as any)?.Telegram?.WebApp;

      if (!tg) {
        setError("Not in Telegram WebApp - opening in regular browser");
        setLoading(false);
        return;
      }

      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();

      // Get user data from Telegram
      const initDataUnsafe = tg.initDataUnsafe || {};
      const user = initDataUnsafe.user;

      if (user) {
        setUserInfo({
          id: user?.id || "",
          firstName: user?.first_name || "",
          lastName: user?.last_name || "",
          username: user?.username || "Not set",
          languageCode: user?.language_code || "en",
          isPremium: user?.is_premium || false,
          photoUrl: user?.photo_url || null,
          initData: tg?.initData || "",
          initDataUnsafe: initDataUnsafe,
        });
      } else {
        setError("No user data available in Telegram WebApp");
      }

      setLoading(false);
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <div className="animate-pulse">Loading Telegram user info...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-yellow-400 rounded-lg bg-yellow-50">
        <div className="font-bold text-yellow-800">⚠️ {error}</div>
        <div className="mt-2 text-sm text-yellow-700">
          Open this page in Telegram to see user information.
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="p-4 border border-red-400 rounded-lg bg-red-50">
        <div className="font-bold text-red-800">No user data available</div>
      </div>
    );
  }

  return (
    <div className="p-6 border border-green-400 rounded-lg bg-green-50">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        ✅ Telegram User Info
      </h2>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chat ID:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm font-mono">
              {userInfo?.id}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm">
              @{userInfo?.username}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm">
              {userInfo?.firstName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm">
              {userInfo?.lastName || "Empty"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm">
              {userInfo?.languageCode}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Premium:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm">
              {userInfo?.isPremium ? "⭐ Yes" : "No"}
            </div>
          </div>
        </div>

        {userInfo?.photoUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL:
            </label>
            <div className="mt-1 p-2 bg-white border rounded text-sm break-all">
              {userInfo?.photoUrl}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Init Data Length:
          </label>
          <div className="mt-1 p-2 bg-white border rounded text-sm font-mono">
            {userInfo?.initData?.length} characters
          </div>
        </div>

        {/* Raw data for debugging */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            Raw initDataUnsafe
          </summary>
          <pre className="mt-2 p-3 bg-gray-100 border rounded text-xs overflow-auto">
            {JSON.stringify(userInfo?.initDataUnsafe, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default TelegramUserInfo;
