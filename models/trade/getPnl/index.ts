import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetPnlResponse } from "./types";

export const useGetPnl = createQuery({
  queryKey: ["pnl"],
  fetcher: async () => {
    const url = "/trade/pnl";

    const response = await clientRequest.get<GetPnlResponse>(url);

    return response.data;
  },
});
