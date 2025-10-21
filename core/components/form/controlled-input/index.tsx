import { Controller, useFormContext } from "react-hook-form";
import type { ControlledInputCmProps } from "./types";
import { Input } from "@heroui/react";

export const ControlledInput: React.FC<ControlledInputCmProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          autoComplete="off"
          {...field}
          value={field.value ?? ""}
          {...props}
        />
      )}
    />
  );
};
