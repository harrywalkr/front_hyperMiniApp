"use client";

import { Button } from "@heroui/react";
import { BackProps } from "./types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Back: React.FC<BackProps> = ({ title, href, endContent }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }, [href, router]);
  return (
    <div className="w-full h-16">
      <div className="flex items-center justify-between mb-5 absolute top-2 left-1.5 right-1.5">
        <Button
          variant="light"
          startContent={<ChevronLeft size={18} />}
          onPress={handleBack}
          radius="sm"
        >
          {title}
        </Button>

        {endContent ? endContent : null}
      </div>
    </div>
  );
};
