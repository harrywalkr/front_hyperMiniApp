import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { TradeBalanceResponse } from "./types";

export const useTradeBalance = createQuery({
  queryKey: ["tradeBalance"],
  fetcher: async () => {
    const url = "/trade/balance";

    const response = await clientRequest.get<TradeBalanceResponse>(url);

    return response.data;
  },
});
