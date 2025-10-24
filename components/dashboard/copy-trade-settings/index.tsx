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
import { copyTradingModels } from "@/models/copy-trading";
import { useCallback } from "react";
import { SuccessModal } from "@/core/components";
import { useToggle } from "usehooks-ts";

export const CopyTradeSettings: React.FC = () => {
  const [success, toggleSuccess] = useToggle(false);

  const form = useForm<CopyTradeFormType>({
    resolver: zodResolver(copyTradeFormSchema),
    defaultValues: {
      fixedSize: 0,
      maxDailyOpens: 0,
      maxDrawdown: 0,
      stopLoss: 0,
      takeProfit: 0,
    },
  });

  const { mutate: setSettings, isPending } =
    copyTradingModels.setSettings.useMutation({
      onSuccess: () => {
        toggleSuccess();
      },
    });

  const handleSubmit = useCallback(
    (values: CopyTradeFormType) => {
      const { fixedSize, maxDailyOpens, maxDrawdown, stopLoss, takeProfit } =
        values;

      setSettings({
        draw: maxDrawdown ?? 0,
        fixed: fixedSize ?? 0,
        maxpos: maxDailyOpens ?? 0,
        sl: stopLoss ?? 0,
        tp: takeProfit ?? 0,
      });
    },
    [setSettings]
  );

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
          <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="w-full flex flex-col gap-y-5">
              <ControlledNumberInput
                name="fixedSize"
                label="Fixed Size"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={undefined}
                description="Margin used for 20X leverage ≈ $0.40 (=$8 ÷ 20)"
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
                endContent={undefined}
              />

              <ControlledNumberInput
                name="stopLoss"
                label="Stop Loss"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={undefined}
              />

              <ControlledNumberInput
                name="maxDrawdown"
                label="Max Drawdown"
                radius="full"
                size="lg"
                startContent={undefined}
                labelPlacement="outside-top"
                endContent={undefined}
              />

              <Button
                radius="full"
                fullWidth
                type="submit"
                color="primary"
                size="lg"
                isLoading={isPending}
              >
                Confirm & Start Copy
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <NavigationBar />

      <SuccessModal
        isOpen={success}
        onCloseAction={toggleSuccess}
        title="Settings Saved"
        text="Your Copy trading settings saved successfuly!"
        buttonTitle="lets follow wallets"
        onCloseRedirectUrl="/dashboard/addresses"
      />
    </div>
  );
};
