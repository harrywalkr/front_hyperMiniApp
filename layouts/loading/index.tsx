"use client";

import { Loader } from "lucide-react";

export const Loading: React.FC<{ debugText?: string }> = ({ debugText }) => {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      <Loader
        size={35}
        strokeWidth={2.3}
        className="animate-spin text-primary"
      />
      <p className="text-base font-medium text-primary">
        {debugText ? `Loading ${debugText} ...` : "Loading..."}
      </p>
    </div>
  );
};
