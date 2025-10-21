"use client";

import { Logo } from "@/common";
import { Button } from "@heroui/react";
import { CreditCard, Send } from "lucide-react";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-between h-fulls grow">
      <div></div>

      <div>
        <Logo direction="vertical" />
      </div>

      <div className="w-full flex flex-col gap-4 mb-10">
        <p className="text-center font-medium text-base">
          You need to subscribe:
        </p>

        <Button
          fullWidth
          color="primary"
          startContent={<Send size={20} />}
          size="lg"
          radius="full"
        >
          Join @bitfaprobot for free
        </Button>

        <Button
          fullWidth
          variant="ghost"
          color="primary"
          startContent={<CreditCard size={20} />}
          size="lg"
          radius="full"
        >
          Subscribe for $20/mo
        </Button>
      </div>
    </div>
  );
};
