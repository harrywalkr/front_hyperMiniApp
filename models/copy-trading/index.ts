import { router } from "react-query-kit";
import { useEnableCopyTrading } from "./enableCopyTrading";
import { useSetCopyTradingSettings } from "./setSettings";

export const copyTradingModels = router("copyTrading", {
  enableCopyTrading: router.mutation(useEnableCopyTrading),
  setSettings: router.mutation(useSetCopyTradingSettings),
});
