"use client";

import { Button } from "@heroui/react";
import { BackProps } from "./types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Back: React.FC<BackProps> = ({ title, href }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }, [href, router]);
  return (
    <Button
      variant="light"
      startContent={<ChevronLeft size={18} />}
      onPress={handleBack}
      className="mb-5"
    >
      {title}
    </Button>
  );
};
