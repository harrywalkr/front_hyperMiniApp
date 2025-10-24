import { clientRequest } from "@/core/config";
import { createQuery } from "react-query-kit";
import { GetAddressListResponse } from "./types";

export const useGetAddressList = createQuery({
  queryKey: ["addressList"],
  fetcher: async () => {
    const url = "/addresses";

    const response = await clientRequest.get<GetAddressListResponse>(url);

    return response?.data;
  },
});
