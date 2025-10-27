"use client";
import { useHelperProvider } from "@/app/helperProvider";
import { OnboardingLayoutProps } from "./types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  const { stepStatus, isCheckingEligibility } = useHelperProvider();

  useEffect(() => {
    if (stepStatus === "new") {
      router.push("/login");
    }
  }, [isCheckingEligibility, stepStatus]);

  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      {children}
    </div>
  );
};
