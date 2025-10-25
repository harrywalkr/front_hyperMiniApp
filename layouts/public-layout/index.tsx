"use client";
import { PublicLayoutProps } from "./types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Logo } from "@/common";
import { useHelperProvider } from "@/app/helperProvider";

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { isEligible, isCheckingEligibility } = useHelperProvider();

  useEffect(() => {
    if (!isCheckingEligibility) {
      if (isEligible) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isEligible, isCheckingEligibility]);

  if (isCheckingEligibility || !isEligible) {
    return (
      <div className="flex flex-col gap-y-2 items-center justify-center overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
        <Loader
          size={40}
          strokeWidth={2.5}
          className="animate-spin text-primary"
        />
        <p className="text-lg font-medium text-primary">
          Initializing Application...
        </p>
      </div>
    );
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
