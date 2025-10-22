"use client";

import { Back } from "@/common";
import { ControlledNumberInput, Form } from "@/core/components/form";
import { Button } from "@heroui/react";
import { Plus, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { CopyTradeFormType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { copyTradeFormSchema } from "./schema";
import { NavigationBar } from "@/common/navigation-bar";

export const CopyTradeSettings: React.FC = () => {
  const form = useForm<CopyTradeFormType>({
    resolver: zodResolver(copyTradeFormSchema),
    defaultValues: {
      fixedSize: undefined,
      maxDailyOpens: undefined,
      maxDrawdown: undefined,
      stopLoss: undefined,
      takeProfit: undefined,
    },
  });

  return (
    <div>
      <Back
        title="Copy Trade Settings"
        endContent={
          <Button variant="light" isIconOnly radius="full">
            <Settings size={22} strokeWidth={1.6} />
          </Button>
        }
      />

      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-end">
          <Button
            color="primary"
            radius="full"
            variant="ghost"
            startContent={<Plus />}
          >
            Add Address
          </Button>
        </div>

        <div className="w-full">
          <Form {...form}>
            <div className="w-full flex flex-col gap-y-5">
              <ControlledNumberInput
                name="fixedSize"
                label="Fixed Size"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={undefined}
              />

              <ControlledNumberInput
                name="maxDailyOpens"
                label="Max Daily Opens"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={undefined}
              />

              <ControlledNumberInput
                name="takeProfit"
                label="Take Profit"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={
                  <div className="bg-primary-50 py-0.5 px-3 rounded-md">X%</div>
                }
              />

              <ControlledNumberInput
                name="stopLoss"
                label="Stop Loss"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={
                  <div className="bg-primary-50 py-0.5 px-3 rounded-md">X%</div>
                }
              />

              <ControlledNumberInput
                name="maxDrawdown"
                label="Max Drawdown"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={
                  <div className="bg-primary-50 py-0.5 px-3 rounded-md">X%</div>
                }
              />

              <Button radius="full" fullWidth color="primary" size="lg">
                Confirm & Start Copy
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};
