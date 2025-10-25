import { router } from "react-query-kit";
import { useTradeBalance } from "./tradeBalance";

export const tradeModels = router("trade", {
  tradeBalance: router.query(useTradeBalance),
});
