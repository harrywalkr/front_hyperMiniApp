"use client";
import { Button } from "@heroui/react";
import { CircleX } from "lucide-react";

export default function TgErrorPage() {
  return (
    <div className="flex items-center justify-center gap-4 flex-col overscroll-none overflow-x-hidden overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      <CircleX size={100} className="text-danger-600" />
      <p className="text-lg font-medium text-danger-600 text-center">
        Telegram chat ID not found. Open this app in Telegram.
      </p>

      <a href="https://t.me/testdexbotobot">
        <Button className="font-medium" variant="ghost" color="primary">
          Open in Telegram
        </Button>
      </a>
    </div>
  );
}
