"use client";

import { Button } from "@heroui/react";
import { LayoutGrid, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="h-24 w-full">
      <div className="fixed z-50 flex items-center gap-0.5 justify-center left-1/2 -translate-x-1/2 bg-primary rounded-full py-1 bottom-5 px-7">
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

        <Link href="/dashboard/addresses">
          <Button isIconOnly size="lg" variant="light" radius="full">
            <Menu
              size={25}
              strokeWidth={1.6}
              className={
                pathname === "/dashboard/addresses"
                  ? "text-white"
                  : "text-white/70"
              }
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
