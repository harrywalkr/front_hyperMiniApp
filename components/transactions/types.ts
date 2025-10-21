export type TransactionCardProps = {
  type: "deposit" | "withdraw";
  status: "approved" | "pending" | "canceled";
  amount: number;
  date: string;
};
