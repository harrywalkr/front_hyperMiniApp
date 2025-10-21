import { Controller, useFormContext } from "react-hook-form";
import type { ControlledColorProps } from "./types";
import { Input } from "@heroui/input";

export const ControlledColor: React.FC<ControlledColorProps> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-14">
              <Input
                type="color"
                fullWidth
                {...field}
                className="size-full rounded-sm cursor-pointer"
                classNames={{
                  inputWrapper:
                    "p-0 m-0 rounded-lg ring-none outline-hidden border-none size-full",
                  input:
                    "rounded-lg! ring-none outline-hidden border-none size-full",
                }}
              />
            </div>

            <Input
              variant="bordered"
              radius="sm"
              type="text"
              {...field}
              className="flex-1"
              label="کد رنگ"
              classNames={{
                input: "ltr",
              }}
            />
          </div>
        );
      }}
    />
  );
};
