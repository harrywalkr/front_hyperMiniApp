import { clientRequest } from "@/core/config";
import { createMutation } from "react-query-kit";
import { EnableCopyTradingBody } from "./types";

export const useEnableCopyTrading = createMutation({
  mutationFn: async (body: EnableCopyTradingBody) => {
    const url = "/copy/enable";

    const response = await clientRequest.post(url, body);

    return response?.data;
  },
});
