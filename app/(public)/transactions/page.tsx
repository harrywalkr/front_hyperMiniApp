import { Transactions } from "@/components/transactions";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${site.name} - Transactions History`,
  description: "Transactions",
};

export default function TransactionsPage() {
  return <Transactions />;
}
