"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMounted } from "usehooks-ts";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Button
      variant="light"
      isIconOnly
      radius="full"
      onPress={() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      }}
    >
      {theme === "light" ? (
        <Moon strokeWidth={1.5} size={25} className="text-foreground" />
      ) : (
        <Sun strokeWidth={1.5} size={25} className="text-foreground" />
      )}
    </Button>
  );
};
