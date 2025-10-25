"use client";

import { Button } from "@heroui/react";
import { LayoutGrid, List, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationBarProps } from "./types";
import clsx from "clsx";

export const NavigationBar: React.FC<NavigationBarProps> = ({ isStatic }) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        isStatic ? "h-auto w-auto flex justify-center" : "h-24 w-full"
      )}
    >
      <div
        className={clsx(
          " flex items-center gap-0.5 justify-center  bg-primary rounded-full py-1  px-7",
          isStatic ? "static" : "fixed z-50 left-1/2 -translate-x-1/2 bottom-5"
        )}
      >
        <Link href="/dashboard/copy-trade-settings">
          <Button isIconOnly size="lg" variant="light" radius="full">
            <Settings
              size={25}
              strokeWidth={1.6}
              className={
                pathname === "/dashboard/copy-trade-settings"
                  ? "text-white"
                  : "text-white/70"
              }
            />
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button isIconOnly size="lg" variant="light" radius="full">
            <LayoutGrid
              size={25}
              strokeWidth={1.6}
              className={
                pathname === "/dashboard" ? "text-white" : "text-white/70"
              }
            />
          </Button>
        </Link>

        <Link href="/open-positions">
          <Button isIconOnly size="lg" variant="light" radius="full">
            <List
              size={25}
              strokeWidth={1.6}
              className={
                pathname === "/open-positions" ? "text-white" : "text-white/70"
              }
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
