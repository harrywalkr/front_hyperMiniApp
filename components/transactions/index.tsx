"use client";
import { Back } from "@/common";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { TransactionCard } from "./transaction-card";

export const Transactions: React.FC = () => {
  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      <Back title="Transactions History" />

      <div className="flex flex-col gap-6">
        <Input
          size="lg"
          placeholder="Search ..."
          startContent={
            <Search strokeWidth={1.5} size={20} className="text-default-800" />
          }
          radius="full"
          classNames={{
            inputWrapper:
              "border border-primary bg-primary-50 focus-within:border-primary focus-within:bg-primary-50",
            input:
              "font-normal text-sm placeholder:font-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent",
          }}
        />
      </div>

      <div className="flex flex-col gap-3.5 mt-5">
        <TransactionCard
          type="deposit"
          status="approved"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="withdraw"
          status="pending"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="deposit"
          status="canceled"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="withdraw"
          status="approved"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="deposit"
          status="pending"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="withdraw"
          status="canceled"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="deposit"
          status="approved"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="withdraw"
          status="pending"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="deposit"
          status="canceled"
          amount={20}
          date="10/07/2025 - 10:39"
        />
        <TransactionCard
          type="withdraw"
          status="approved"
          amount={20}
          date="10/07/2025 - 10:39"
        />
      </div>
    </div>
  );
};
