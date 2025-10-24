import z from "zod";

export const copyTradeFormSchema = z.object({
  fixedSize: z.number().min(0, "invalid value"),
  maxDailyOpens: z.number().min(0, "invalid value"),
  takeProfit: z.number().min(0, "invalid value"),
  stopLoss: z.number().min(0, "invalid value"),
  maxDrawdown: z.number().min(0, "invalid value"),
});
