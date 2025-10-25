"use client";

import clsx from "clsx";
import Image from "next/image";
import { LogoProps } from "./types";

export const Logo: React.FC<LogoProps> = ({
  direction = "horizontal",
  showDescription,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-3",
        direction === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={direction === "horizontal" ? 80 : 100}
        height={direction === "horizontal" ? 80 : 100}
      />

      <div
        className={clsx(
          "flex flex-col gap-2",
          direction === "vertical" && "items-center justify-center"
        )}
      >
        <p className="text-base font-bold">HyperLiquid- Copy Trade</p>
        {showDescription && (
          <p
            className={clsx(
              "text-foreground/85",
              direction === "vertical" && "text-center"
            )}
          >
            You are subscribed user and eligible to use
            <strong className="pl-1">HyperLiquid</strong> app!
          </p>
        )}
      </div>
    </div>
  );
};
