"use client";

import { Input } from "@heroui/input";
import { Controller, useFormContext } from "react-hook-form";
import { ControlledNumberInputCmProps } from "./types";
import { Button } from "@heroui/button";
import { Minus, Plus } from "lucide-react";

export const ControlledNumberInput: React.FC<ControlledNumberInputCmProps> = ({
  name,

  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Input
            variant="bordered"
            inputMode="decimal"
            radius="sm"
            classNames={{
              input: "text-center font-medium text-foreground text-base",
              inputWrapper:
                "border border-neutral-200/85 focus-within:border-neutral-200/85! focus:border-neutral-200/85! hover:border-neutral-200/85!",
            }}
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => {
                  const value = field.value || props?.min || 0;
                  const step = props?.step || 1;
                  if (value <= (props.min || -Infinity)) {
                    return;
                  }
                  field.onChange(value - Number(step));
                }}
              >
                <Minus size={21} className="text-foreground" />
              </Button>
            }
            startContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => {
                  const value = field.value || props?.min || 0;
                  const step = props?.step || 1;

                  if (value >= (props.max || Infinity)) {
                    return;
                  }
                  field.onChange(value + Number(step));
                }}
              >
                <Plus size={21} className="text-primary" />
              </Button>
            }
            labelPlacement="outside"
            {...field}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                field.onChange(field.value || 0);
                return;
              }
              field.onChange(Number(e.target.value));
            }}
            {...props}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState?.error?.message}
            autoComplete="off"
          />
        </div>
      )}
    />
  );
};
