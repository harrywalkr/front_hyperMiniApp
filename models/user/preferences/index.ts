import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetPreferencesResponse } from "./types";

export const useGetPreferences = createQuery({
  queryKey: ["preferences"],
  fetcher: async () => {
    const url = "/prefs";

    const response = await clientRequest.get<GetPreferencesResponse>(url);

    return response.data;
  },
});
