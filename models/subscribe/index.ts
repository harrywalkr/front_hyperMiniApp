import { router } from "react-query-kit";
import { useCreateSubscription } from "./createSubscription";
import { useGetSubscriptionStatus } from "./getSubscriptionStatus";

export const subscribeModels = router("subscribe", {
  create: router.mutation(useCreateSubscription),
  getStatus: router.query(useGetSubscriptionStatus),
});
