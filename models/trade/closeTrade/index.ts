import { clientRequest } from "@/core/config";
import { createMutation } from "react-query-kit";

export const useCloseTrade = createMutation({
  mutationFn: async (body: { symbol: string }) => {
    const url = `/trade/positions/${body.symbol}/close`;

    const response = await clientRequest.post(url);
    return response.data;
  },
});
