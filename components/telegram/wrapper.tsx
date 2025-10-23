"use client";

import { useIsMounted } from "usehooks-ts";

export const TelegramWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <div>{children}</div>;
};
