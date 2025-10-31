"use client";
import { useHelperProvider } from "@/app/helperProvider";
import { OnboardingLayoutProps } from "./types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../loading";

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  const { stepStatus, isCheckingEligibility } = useHelperProvider();

  useEffect(() => {
    if (stepStatus && !isCheckingEligibility) {
      if (stepStatus === "onboarding" || stepStatus === "premium") {
        return;
      }

      router.push("/login");
    }
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
