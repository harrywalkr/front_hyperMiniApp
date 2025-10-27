import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetDailyPnlResponse } from "./types";

export const useGetDailyPnl = createQuery({
  queryKey: ["dailyPnl"],
  fetcher: async () => {
    const url = "/trade/pnl-daily";

    const response = await clientRequest.get<GetDailyPnlResponse>(url);

    return response.data;
  },
});
