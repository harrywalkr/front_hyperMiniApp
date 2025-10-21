"use client";
import { PublicLayoutProps } from "./types";

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
};
