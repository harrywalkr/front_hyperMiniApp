"use client";
import { PrivateLayoutProps } from "./types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/common";
import { useHelperProvider } from "@/app/helperProvider";
import { Loading } from "../loading";

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { isEligible, isCheckingEligibility, stepStatus } = useHelperProvider();

  useEffect(() => {
    if (!isCheckingEligibility && stepStatus) {
      if (stepStatus === "premium") {
        return;
      }

      router.push(stepStatus === "new" ? "/login" : "/copy-trade-settings");
    }
  }, [stepStatus, isCheckingEligibility]);

  if (isCheckingEligibility || !stepStatus) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      {isEligible ? (
        <div className="mt-12">
          <Logo showDescription direction="horizontal" />
        </div>
      ) : null}

      {children}
    </div>
  );
};
