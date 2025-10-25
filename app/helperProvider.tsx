"use client";
import { userModels } from "@/models/user";
import { AboutMeResponse } from "@/models/user/aboutMe/types";
import { createContext, useContext } from "react";

interface HelperContextType {
  isEligible: boolean;
  isCheckingEligibility: boolean;
  isAboutMeLoading: boolean;
  aboutMe: AboutMeResponse | undefined;
}

const HelperContext = createContext<HelperContextType>({
  isEligible: false,
  isCheckingEligibility: false,
  isAboutMeLoading: false,
  aboutMe: undefined,
});

export const HelperProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const aboutMe = userModels.aboutMe.useQuery({
    staleTime: 1000 * 60 * 5,
  });

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
      }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export const useHelperProvider = () => {
  return useContext(HelperContext);
};
