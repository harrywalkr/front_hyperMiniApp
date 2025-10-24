import z from "zod";

export const addAddressSchema = z.object({
  label: z.string().min(1, "choose a label for your address"),
  address: z.string().min(1, "enter your address"),
});
