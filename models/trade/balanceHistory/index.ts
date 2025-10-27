import { clientRequest } from "@/core/config";
import { BalanceHistoryResponse, GetBalanceHistoryVariables } from "./types";
import { createQuery } from "react-query-kit";
import { urlWithParams } from "@/core/utils";

export const useGetBalanceHistory = createQuery({
  queryKey: ["balanceHistory"],
  fetcher: async (variables: GetBalanceHistoryVariables) => {
    const url = urlWithParams("/trade/balance-history", variables);
    const response = await clientRequest.get<BalanceHistoryResponse>(url);
    return response.data;
  },
});
