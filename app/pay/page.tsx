import { Payment } from "@/components/payment";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Payment | ${site.name}`,
  description: "Pay for your subscription",
};

export default function PayPage() {
  return <Payment />;
}
