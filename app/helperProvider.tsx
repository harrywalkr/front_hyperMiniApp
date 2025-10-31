"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clientRequest } from "@/core/config";

type StepStatusType = "onboarding" | "new" | "premium";
type HelperContextType = {
  stepStatus: StepStatusType | null;
  isCheckingEligibility: boolean;
  isEligible: boolean;
  aboutMe: any;
  isAboutMeLoading: boolean;
  setOnboardingState: (state: StepStatusType | null) => void;
};

const HelperContext = createContext<HelperContextType>({
  stepStatus: null,
  isCheckingEligibility: true,
  isEligible: false,
  aboutMe: null,
  isAboutMeLoading: true,
  setOnboardingState: () => {},
});

export const HelperProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepStatus, setStepStatus] = useState<StepStatusType | null>(null);
  const [isCheckingEligibility, setIsChecking] = useState(true);
  const [isEligible, setEligible] = useState(false);

  const [aboutMe, setAboutMe] = useState<any>(null);
  const [isAboutMeLoading, setIsAboutMeLoading] = useState(true);

  // Apply eligibility → stepStatus mapping
  const applyEligibility = (e: any) => {
    const eligible = Boolean(e?.eligible);
    setEligible(eligible);

    if (e?.member) {
      setStepStatus("premium");
    } else if (!eligible) {
      setStepStatus("new");
    } else if (e?.because === "member" || e?.because === "channel") {
      setStepStatus("onboarding");
    } else {
      setStepStatus("premium");
    }
  };

  // Load eligibility (with sessionStorage cache)
  useEffect(() => {
    let cancelled = false;

    async function loadEligibility() {
      try {
        const cached = typeof window !== "undefined" ? sessionStorage.getItem("eligibility") : null;
        if (cached) {
          const e = JSON.parse(cached);
          applyEligibility(e);
          setIsChecking(false);
          return;
        }

        const res = await clientRequest.get("/eligibility");
        const e = res?.data;
        if (!cancelled) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("eligibility", JSON.stringify(e));
          }
          applyEligibility(e);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("[HelperProvider] eligibility failed", err);
          setStepStatus("new");
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    loadEligibility();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load /me (aboutMe)
  useEffect(() => {
    let cancelled = false;

    async function loadAboutMe() {
      try {
        const res = await clientRequest.get("/me");
        if (!cancelled) setAboutMe(res?.data?.user ?? res?.data ?? null);
      } catch (err) {
        if (!cancelled) console.warn("[HelperProvider] /me failed", err);
      } finally {
        if (!cancelled) setIsAboutMeLoading(false);
      }
    }

    loadAboutMe();
    return () => {
      cancelled = true;
    };
  }, []);

  // Allow manual override (used during onboarding)
  const setOnboardingState = (state: StepStatusType | null) => {
    setStepStatus(state);
    const cached = typeof window !== "undefined" ? sessionStorage.getItem("eligibility") : null;
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed._manualStep = state;
      sessionStorage.setItem("eligibility", JSON.stringify(parsed));
    }
  };

  return (
    <HelperContext.Provider
      value={{
        stepStatus,
        isCheckingEligibility,
        isEligible,
        aboutMe,
        isAboutMeLoading,
        setOnboardingState,
      }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export const useHelperProvider = () => useContext(HelperContext);
