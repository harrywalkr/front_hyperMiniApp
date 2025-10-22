import z from "zod";
import { copyTradeFormSchema } from "./schema";

export type CopyTradeFormType = z.infer<typeof copyTradeFormSchema>;
