import z from "zod";
import { connectFormSchema } from "./schema";

export type ConnectFormType = z.infer<typeof connectFormSchema>;
