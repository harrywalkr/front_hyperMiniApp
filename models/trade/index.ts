import { router } from "react-query-kit";
import { useTradeBalance } from "./tradeBalance";
import { useGetPnl } from "./getPnl";
import { useGetBalanceHistory } from "./balanceHistory";
import { useCloseTrade } from "./closeTrade";
import { useGetDailyPnl } from "./dailyPnl";

export const tradeModels = router("trade", {
  tradeBalance: router.query(useTradeBalance),
  getPnl: router.query(useGetPnl),
  balanceHistory: router.query(useGetBalanceHistory),
  closeTrade: router.mutation(useCloseTrade),
  dailyPnl: router.query(useGetDailyPnl),
});
