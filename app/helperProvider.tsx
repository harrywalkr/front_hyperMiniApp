"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { clientRequest } from "@/core/config";

type HelperContextType = {
  stepStatus: string | null;
  isCheckingEligibility: boolean;
  isEligible: boolean;
  aboutMe: any;
  isAboutMeLoading: boolean;
  setOnboardingState: (state: string | null) => void;
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
  const [stepStatus, setStepStatus] = useState<string | null>(null);
  const [isCheckingEligibility, setIsChecking] = useState(true);
  const [isEligible, setEligible] = useState(false);

  const [aboutMe, setAboutMe] = useState<any>(null);
  const [isAboutMeLoading, setIsAboutMeLoading] = useState(true);

  // ✅ Helper function to apply eligibility logic
  const applyEligibility = (e: any) => {
    setEligible(Boolean(e?.eligible));

    if (e?.member) {
      // Member → allowed to access dashboard
      setStepStatus("premium");
    } else if (!e?.eligible) {
      setStepStatus("new");
    } else if (e?.because === "member" || e?.because === "channel") {
      setStepStatus("onboarding");
    } else {
      setStepStatus("premium");
    }
  };

  // ✅ Load eligibility (with caching)
  useEffect(() => {
    let cancelled = false;

    async function loadEligibility() {
      try {
        // Try reading from sessionStorage cache first
        const cached = sessionStorage.getItem("eligibility");
        if (cached) {
          const e = JSON.parse(cached);
          applyEligibility(e);
          setIsChecking(false);
          return;
        }

        // Otherwise fetch fresh
        const res = await clientRequest.get("/eligibility");
        const e = res?.data;
        sessionStorage.setItem("eligibility", JSON.stringify(e));
        if (cancelled) return;
        applyEligibility(e);
      } catch (err) {
        if (cancelled) return;
        console.warn("[HelperProvider] eligibility failed", err);
        setStepStatus("new");
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    loadEligibility();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Load /me (aboutMe)
  useEffect(() => {
    let cancelled = false;

    async function loadAboutMe() {
      try {
        const res = await clientRequest.get("/me");
        if (cancelled) return;
        setAboutMe(res?.data?.user ?? res?.data ?? null);
      } catch (err) {
        if (cancelled) return;
        console.warn("[HelperProvider] /me failed", err);
      } finally {
        if (!cancelled) setIsAboutMeLoading(false);
      }
    }

    loadAboutMe();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Allow manual override (used during onboarding)
  const setOnboardingState = (state: string | null) => {
    setStepStatus(state);
    // Keep consistency in cache
    const cached = sessionStorage.getItem("eligibility");
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