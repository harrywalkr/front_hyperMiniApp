"use client";
import {
  ControlledAutocomplete,
  ControlledInput,
  Form,
} from "@/core/components/form";
import { useForm } from "react-hook-form";
import { ConnectFormType } from "./types";
import { connectFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Key, Lock } from "lucide-react";
import { Alert, Button } from "@heroui/react";
import { site } from "@/core/config";
import Link from "next/link";
import { useToggle } from "usehooks-ts";
import { SuccessModal } from "@/core/components";
import { copyTradingModels } from "@/models/copy-trading";
import { useCallback } from "react";

export const ConnectForm: React.FC = () => {
  const [success, toggleSuccess] = useToggle(false);

  const form = useForm<ConnectFormType>({
    resolver: zodResolver(connectFormSchema),
    defaultValues: {
      exchange: "",
      apiKey: "",
      apiSecret: "",
    },
  });

  const { mutate: enableCopyTrading } =
    copyTradingModels.enableCopyTrading.useMutation({
      onSuccess: () => {
        toggleSuccess();
      },
    });

  const handleSubmit = useCallback(
    (values: ConnectFormType) => {
      enableCopyTrading(values);
    },
    [enableCopyTrading]
  );

  return (
    <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <CircleCheckBig size={19} />
            <p>Choose Exchange</p>
          </div>

          <ControlledAutocomplete
            placeholder="Choose an exchange"
            name="exchange"
            size="lg"
            items={[
              { label: "Binance", key: "binance" },
              { label: "Bitunix", key: "bitunix" },
              { label: "Bybit", key: "bybit" },
            ]}
          />
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <Key size={19} />
            <p>API Key</p>
          </div>

          <ControlledInput
            name="apiKey"
            placeholder="Enter Your API Key"
            size="lg"
            classNames={{
              input: "placeholder:text-sm text-sm placeholder:text-default-800",
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <Lock size={19} />
            <p>API Secret</p>
          </div>

          <ControlledInput
            name="apiSecret"
            placeholder="Enter Your API Key"
            size="lg"
            classNames={{
              input: "placeholder:text-sm text-sm placeholder:text-default-800",
            }}
          />
        </div>

        <Alert
          color="warning"
          title="Security Note:"
          hideIcon
          classNames={{
            title: "mb-2.5 font-semibold text-[#973C00]",
            description: "font-normal",
            base: "border border-warning-400 bg-warning-50/80",
          }}
        >
          <span className="text-[#973C00] leading-relaxed">
            Your API credentials are stored locally and never shared. Make sure
            to enable read-only permissions for safety.
          </span>
        </Alert>

        <div className="flex flex-col gap-y-2 w-full mt-6">
          <Button
            fullWidth
            color="primary"
            radius="full"
            size="lg"
            type="submit"
          >
            Connect to {site.name}
          </Button>

          <Link href="/api-guide" className="text-center">
            How to get API credentials?
          </Link>
        </div>
      </div>

      <SuccessModal
        isOpen={success}
        onCloseAction={toggleSuccess}
        title="Copy Trading was enabled!"
        text="your copy trading account is now ready to use"
        onCloseRedirectUrl="/copy-trade-settings"
        buttonTitle="Got it, let's go!"
      />
    </Form>
  );
};
