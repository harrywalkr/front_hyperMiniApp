import { Controller, useFormContext } from "react-hook-form";
import type { ControlledPasswordCmProps } from "./types";
import { Input } from "@heroui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export const ControlledPassword: React.FC<ControlledPasswordCmProps> = ({
  name,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          variant="bordered"
          size="sm"
          autoComplete="off"
          type={isPasswordVisible ? "text" : "password"}
          endContent={
            isPasswordVisible ? (
              <Eye
                onClick={() => setIsPasswordVisible(false)}
                size={20}
                className="text-gray-600 cursor-pointer hover:text-foreground"
              />
            ) : (
              <EyeClosed
                onClick={() => setIsPasswordVisible(true)}
                size={20}
                className="text-gray-600 cursor-pointer hover:text-foreground"
              />
            )
          }
          {...field}
          {...props}
        />
      )}
    />
  );
};
