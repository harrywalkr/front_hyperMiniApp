import { z } from "zod";

export const connectFormSchema = z.object({
  exchange: z.string().min(1, "Exchange is required"),
  apiKey: z.string().min(1, "API Key is required"),
  apiSecret: z.string().min(1, "API Secret is required"),
});
