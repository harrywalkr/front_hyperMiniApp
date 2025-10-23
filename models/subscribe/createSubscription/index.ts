import { clientRequest } from "@/core/config";
import { createMutation } from "react-query-kit";
import {
  CreateSubscriptionResponse,
  CreateSubscriptionVariables,
} from "./types";

export const useCreateSubscription = createMutation({
  mutationFn: async (variables: CreateSubscriptionVariables) => {
    const url = "/api/subscribe/create";

    const response = await clientRequest.post<CreateSubscriptionResponse>(
      url,
      variables
    );

    return response.data;
  },
});
