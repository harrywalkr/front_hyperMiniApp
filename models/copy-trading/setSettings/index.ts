import { clientRequest } from "@/core/config";
import { createMutation } from "react-query-kit";
import { SetCopyTradingSettingsBody } from "./types";

export const useSetCopyTradingSettings = createMutation({
  mutationFn: async (body: SetCopyTradingSettingsBody) => {
    const url = "/copy/settings";

    const response = await clientRequest.post(url, body);

    return response?.data;
  },
});
