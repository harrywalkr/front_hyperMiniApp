"use client";

import { Back } from "@/common";
import { NavigationBar } from "@/common/navigation-bar";
import { Button } from "@heroui/react";
import { Bell, ChevronRight, Globe, Key, LogOut } from "lucide-react";
import Link from "next/link";

export const DashboardSettings: React.FC = () => {
  return (
    <div>
      <Back title="Settings" />

      <div className="w-full flex flex-col gap-y-3">
        <Link href="/connect" className="contents">
          <Button
            color="primary"
            size="lg"
            radius="full"
            startContent={<Key size={19} strokeWidth={1.5} />}
            className="bg-primary/20 text-foreground justify-start"
          >
            <div>
              <p>Change API Key</p>
              <p className="text-left text-foreground/85 text-xs">Reconnect</p>
            </div>
          </Button>
        </Link>

        <Link href="/dashboard/notifications" className="contents">
          <Button
            color="primary"
            size="lg"
            radius="full"
            endContent={
              <div className="grow flex justify-end">
                <ChevronRight size={19} strokeWidth={1.5} />
              </div>
            }
            startContent={<Bell size={19} strokeWidth={1.5} />}
            className="bg-primary/20 text-foreground justify-start text-left w-full"
          >
            Notifications
          </Button>
        </Link>

        <Button
          color="primary"
          size="lg"
          radius="full"
          startContent={<LogOut size={19} strokeWidth={1.5} />}
          className="bg-primary/20 text-foreground justify-start text-left w-full"
        >
          Logout
        </Button>
      </div>

      <NavigationBar />
    </div>
  );
};
