import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetPositionsListResponse } from "./types";

export const useGetPositionsList = createQuery({
  queryKey: ["positionsList"],
  fetcher: async () => {
    const url = "/trade/positions";

    const response = await clientRequest.get<GetPositionsListResponse>(url);

    return response.data;
  },
});
