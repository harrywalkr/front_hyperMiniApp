"use client";

import { Button } from "@heroui/react";
import { LayoutGrid, Menu, User } from "lucide-react";

export const NavigationBar: React.FC = () => {
  return (
    <div className="h-24 w-full">
      <div className="fixed z-50 flex items-center gap-0.5 justify-center left-1/2 -translate-x-1/2 bg-primary rounded-full py-1 bottom-5 px-7">
        <Button isIconOnly size="lg" variant="light" radius="full">
          <User size={25} strokeWidth={1.6} className="text-white" />
        </Button>

        <Button isIconOnly size="lg" variant="light" radius="full">
          <LayoutGrid size={25} strokeWidth={1.6} className="text-white" />
        </Button>

        <Button isIconOnly size="lg" variant="light" radius="full">
          <Menu size={25} strokeWidth={1.6} className="text-white" />
        </Button>
      </div>
    </div>
  );
};
