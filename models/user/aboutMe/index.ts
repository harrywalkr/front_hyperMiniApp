import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { AboutMeResponse } from "./types";

export const useAboutMe = createQuery({
  queryKey: ["aboutMe"],
  fetcher: async () => {
    const url = "/me";

    const response = await clientRequest.get<AboutMeResponse>(url);

    return response.data;
  },
});
