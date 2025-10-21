"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Check, Minus, X } from "lucide-react";
import { TransactionCardProps } from "./types";

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  status,
  amount,
  date,
}) => {
  return (
    <Card shadow="none" className="bg-default-50" radius="md">
      <CardHeader className="justify-between">
        <p className="font-semibold capitalize">{type}</p>

        <Chip
          color={
            status === "approved"
              ? "success"
              : status === "pending"
                ? "warning"
                : "danger"
          }
          variant="light"
          endContent={
            status === "approved" ? (
              <Check size={16} strokeWidth={3} />
            ) : status === "pending" ? (
              <Minus size={16} strokeWidth={3} />
            ) : (
              <X size={16} strokeWidth={3} />
            )
          }
        >
          <span className="font-semibold capitalize">{status}</span>
        </Chip>
      </CardHeader>

      <CardBody className="gap-3">
        <div className="flex items-center justify-between">
          <p>Date:</p>

          <p>{date}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Amount:</p>

          <p>${amount}</p>
        </div>
      </CardBody>
    </Card>
  );
};
