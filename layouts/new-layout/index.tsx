"use client";
import { useHelperProvider } from "@/app/helperProvider";
import { NewLayoutProps } from "./types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../loading";

export const NewLayout: React.FC<NewLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { stepStatus, isCheckingEligibility } = useHelperProvider();

  useEffect(() => {
    if (stepStatus === "new") {
      return;
    }
    console.log("redirect from new layout");
    router.push(
      stepStatus === "onboarding" ? "/copy-trade-settings" : "/dashboard"
    );
  }, [isCheckingEligibility, stepStatus]);

  if (isCheckingEligibility || !stepStatus) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      {children}
    </div>
  );
};
