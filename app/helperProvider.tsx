"use client";
import { userModels } from "@/models/user";
import { AboutMeResponse } from "@/models/user/aboutMe/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type StepStatusType = "onboarding" | "new" | "premium";
interface HelperContextType {
  isEligible: boolean;
  isCheckingEligibility: boolean;
  isAboutMeLoading: boolean;
  aboutMe: AboutMeResponse | undefined;
  stepStatus: StepStatusType | undefined;
  setOnboardingState: Dispatch<SetStateAction<"done" | "show" | undefined>>;
}

const HelperContext = createContext<HelperContextType>({
  isEligible: false,
  isCheckingEligibility: false,
  isAboutMeLoading: false,
  aboutMe: undefined,
  stepStatus: undefined,
  setOnboardingState: () => {},
});

export const HelperProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const aboutMe = userModels.aboutMe.useQuery({
    staleTime: 1000 * 60 * 5,
  });

  const [stepStatus, setStepStatus] = useState<StepStatusType | undefined>(
    undefined
  );

  const [onboardingState, setOnboardingState] = useLocalStorage<
    "show" | "done" | undefined
  >("onboarding", undefined);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const data = aboutMe?.data;
    if (!data) return;

    const member = !!data.eligibility?.member;
    const subscribed = !!data.eligibility?.subscribed;
    const copyEnabled = !!data.eligibility?.copy?.enabled;
    const openPositions = data.eligibility?.copy?.open_positions ?? 0;

    if (!(member || subscribed)) {
      setStepStatus("new");
      setIsLoading(false);
      return;
    }

    if (!copyEnabled) {
      setStepStatus("onboarding");
      setIsLoading(false);
      return;
    }

    if (openPositions === 0) {
      setStepStatus("onboarding");
      setIsLoading(false);
      return;
    }

    if (openPositions > 0) {
      setStepStatus("premium");
      setIsLoading(false);
      return;
    }

    // fallback
    console.log("fallback");
    setStepStatus("new");
    setIsLoading(false);
  }, [aboutMe?.data, onboardingState]);
  console.log({ stepStatus });

  return (
    <HelperContext.Provider
      value={{
        isEligible: Boolean(
          aboutMe?.data?.eligibility?.member ||
            aboutMe?.data?.eligibility?.subscribed
        ),
        isCheckingEligibility: aboutMe.isFetching || isLoading,
        isAboutMeLoading: aboutMe.isFetching,
        aboutMe: aboutMe.data,
        stepStatus,
        setOnboardingState,
      }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export const useHelperProvider = () => {
  return useContext(HelperContext);
};
