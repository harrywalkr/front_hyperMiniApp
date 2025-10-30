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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (aboutMe?.data) {
      const isEligible =
        aboutMe?.data?.eligibility?.member ||
        aboutMe?.data?.eligibility?.subscribed;

      if (
        isEligible &&
        aboutMe?.data?.eligibility?.copy?.enabled &&
        aboutMe?.data?.eligibility?.copy?.open_positions > 0
      ) {
        setStepStatus("premium");
      } else if (
        isEligible &&
        aboutMe?.data?.eligibility?.copy?.enabled &&
        aboutMe?.data?.eligibility?.copy?.open_positions < 0
      ) {
        setStepStatus(onboardingState === "show" ? "onboarding" : "premium");
      } else {
        setStepStatus("new");
      }

      setIsLoading(false);
    }
  }, [aboutMe?.data, onboardingState]);

  return (
    <HelperContext.Provider
      value={{
        isEligible: Boolean(
          aboutMe?.data?.eligibility?.member ||
            aboutMe?.data?.eligibility?.subscribed
        ),
        isCheckingEligibility: aboutMe.isFetching,
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
