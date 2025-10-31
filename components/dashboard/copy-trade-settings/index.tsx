"use client";

import { Back } from "@/common";
import { ControlledNumberInput, Form } from "@/core/components/form";
import { Button, Skeleton } from "@heroui/react";
import { Plus, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { CopyTradeFormType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { copyTradeFormSchema } from "./schema";
import { copyTradingModels } from "@/models/copy-trading";
import { useCallback, useEffect, useEffectEvent } from "react";
import { SuccessModal } from "@/core/components";
import { useToggle } from "usehooks-ts";
import { useHelperProvider } from "@/app/helperProvider";
import { useInvalidateQuery } from "@/core/hooks";
import { userModels } from "@/models/user";
import Link from "next/link";

export const CopyTradeSettings: React.FC = () => {
  const [success, toggleSuccess] = useToggle(false);

  const { aboutMe, isAboutMeLoading } = useHelperProvider();

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

  const initFormDefaultValues = useEffectEvent(() => {
    if (aboutMe?.copy?.settings) {
      const {
        fixed_amount,
        max_daily_positions,
        max_drawdown_pct,

        stop_loss_pct,
        take_profit_pct,
      } = aboutMe?.copy?.settings;

      form.reset({
        fixedSize: Number(fixed_amount),
        maxDailyOpens: Number(max_daily_positions),
        maxDrawdown: Number(max_drawdown_pct),
        stopLoss: Number(stop_loss_pct),
        takeProfit: Number(take_profit_pct),
      });
    }
  });

  useEffect(() => {
    initFormDefaultValues();
  }, [aboutMe]);

  const { invalidateQuery: refreshAboutMe } = useInvalidateQuery(
    userModels.aboutMe.getKey()
  );

  const { setOnboardingState } = useHelperProvider();

  const { mutate: setSettings, isPending } =
    copyTradingModels.setSettings.useMutation({
      onSuccess: async () => {
        try {
          await refreshAboutMe();
        } catch (error) {
        } finally {
          setOnboardingState("done");
          toggleSuccess();
        }
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
          <Link href="/copy-trade-settings">
            <Button variant="light" isIconOnly radius="full">
              <Settings size={22} strokeWidth={1.6} />
            </Button>
          </Link>
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
            {isAboutMeLoading ? (
              <div className="w-full flex flex-col gap-y-5">
                <div>
                  <Skeleton
                    className="w-48 h-4 rounded-md mb-2 ml-1.5"
                    isLoaded={false}
                  />
                  <Skeleton
                    className="w-full h-11 rounded-full"
                    isLoaded={false}
                  />
                </div>

                <div>
                  <Skeleton
                    className="w-48 h-4 rounded-md mb-2 ml-1.5"
                    isLoaded={false}
                  />
                  <Skeleton
                    className="w-full h-11 rounded-full"
                    isLoaded={false}
                  />
                </div>

                <div>
                  <Skeleton
                    className="w-48 h-4 rounded-md mb-2 ml-1.5"
                    isLoaded={false}
                  />
                  <Skeleton
                    className="w-full h-11 rounded-full"
                    isLoaded={false}
                  />
                </div>

                <div>
                  <Skeleton
                    className="w-48 h-4 rounded-md mb-2 ml-1.5"
                    isLoaded={false}
                  />
                  <Skeleton
                    className="w-full h-11 rounded-full"
                    isLoaded={false}
                  />
                </div>

                <div>
                  <Skeleton
                    className="w-48 h-4 rounded-md mb-2 ml-1.5"
                    isLoaded={false}
                  />
                  <Skeleton
                    className="w-full h-11 rounded-full"
                    isLoaded={false}
                  />
                </div>
                <Skeleton
                  className="w-full h-11 rounded-full"
                  isLoaded={false}
                />
              </div>
            ) : (
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
                  Confirm & Continue
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>

      <SuccessModal
        isOpen={success}
        onCloseAction={toggleSuccess}
        title="Settings Saved"
        text="Your Copy trading settings saved successfuly!"
        buttonTitle="go to dashboard"
        onCloseRedirectUrl="/dashboard"
      />
    </div>
  );
};
