import { clientRequest } from "@/core/config";
import { createMutation } from "react-query-kit";
import { AddAddressBody } from "./types";

export const useAddAddress = createMutation({
  mutationFn: async (body: AddAddressBody) => {
    const url = "/addresses";

    const response = await clientRequest.post(url, body);

    return response.data;
  },
});
