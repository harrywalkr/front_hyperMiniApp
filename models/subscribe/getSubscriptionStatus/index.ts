import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetSubscriptionStatusResponse } from "./types";

export const useGetSubscriptionStatus = createQuery({
  queryKey: ["subscription-status"],
  fetcher: async () => {
    const url = "/subscribe/status";

    const response =
      await clientRequest.get<GetSubscriptionStatusResponse>(url);

    return response.data;
  },
});
