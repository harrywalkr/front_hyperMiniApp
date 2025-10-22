import z from "zod";

export const copyTradeFormSchema = z.object({
  fixedSize: z.number(),
  maxDailyOpens: z.number(),
  takeProfit: z.number(),
  stopLoss: z.number(),
  maxDrawdown: z.number(),
});
