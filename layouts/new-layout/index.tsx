"use client";
import { useHelperProvider } from "@/app/helperProvider";
import { NewLayoutProps } from "./types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NewLayout: React.FC<NewLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { stepStatus, isCheckingEligibility } = useHelperProvider();

  useEffect(() => {
    if (stepStatus === "new") {
      return;
    }

    router.push(
      stepStatus === "onboarding" ? "/copy-trade-settings" : "/dashboard"
    );
  }, [isCheckingEligibility, stepStatus]);

  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      {children}
    </div>
  );
};
