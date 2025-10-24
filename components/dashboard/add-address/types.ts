import z from "zod";
import { addAddressSchema } from "./schema";

export type AddAddressFormType = z.infer<typeof addAddressSchema>;
