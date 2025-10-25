import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { CheckIsUserEligibleResponse } from "./types";

export const useCheckIsUserEligible = createQuery({
  queryKey: ["isUserEligible"],
  fetcher: async () => {
    const url = "/eligibility";

    const response = await clientRequest.get<CheckIsUserEligibleResponse>(url);

    return response.data;
  },
});
