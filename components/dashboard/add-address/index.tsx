"use client";
import { Back, Logo } from "@/common";
import { ControlledInput, Form } from "@/core/components/form";
import { useForm } from "react-hook-form";
import { AddAddressFormType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddressSchema } from "./schema";
import { addToast, Button } from "@heroui/react";
import { addressModels } from "@/models/address";

export const AddAddress: React.FC = () => {
  const form = useForm<AddAddressFormType>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      address: "",
      label: "",
    },
  });

  const { mutate: addAddress, isPending } = addressModels.add.useMutation({
    onSuccess: () => {
      addToast({ title: "Address Saved", color: "success" });
      form.reset();
    },
    onError: (error: any) => {
      addToast({
        title: error?.response?.data?.error ?? "failed to save address",
        color: "danger",
      });
    },
  });

  return (
    <div>
      <Back title="Add Address" />

      <Logo showDescription />

      <div className="mt-8">
        <Form
          {...form}
          onSubmit={form.handleSubmit((values) => {
            addAddress(values);
          })}
        >
          <div className="space-y-4">
            <ControlledInput name="label" label="Label" radius="full" />
            <ControlledInput name="address" label="Address" radius="full" />

            <Button
              fullWidth
              color="primary"
              radius="full"
              size="lg"
              type="submit"
              isLoading={isPending}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
