"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ControlledAutocompleteProps } from "./types";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState } from "react";
import { useFilter } from "@react-aria/i18n";

export const ControlledAutocomplete: React.FC<ControlledAutocompleteProps> = ({
  name,
  items,
  ...props
}) => {
  const { control } = useFormContext();

  const [autocompleteState, setAutocompleteState] = useState({
    selectedKey: "",
    inputValue: "",
    items: items as { label: string; key: string }[],
  });

  const { startsWith } = useFilter({ sensitivity: "base" });

  const onSelectionChange = (key: string) => {
    setAutocompleteState((prevState) => {
      let selectedItem = prevState.items?.find((option) => option.key === key);

      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: (items as any)?.filter((item: any) =>
          startsWith(item.label, selectedItem?.label || "")
        ),
      };
    });
  };

  const onInputChange = (value: string) => {
    setAutocompleteState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? "" : prevState.selectedKey,
      items: (items as any)?.filter((item: any) =>
        startsWith(item.label, value)
      ),
    }));
  };

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            inputProps={{
              classNames: {
                input:
                  "placeholder:text-sm text-sm placeholder:text-default-800",
              },
            }}
            onInputChange={onInputChange}
            items={autocompleteState?.items || []}
            selectedKey={field.value ?? ""}
            onSelectionChange={field.onChange}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState?.error?.message}
            classNames={{
              popoverContent: "rounded-lg shadow-none border border-divider",
            }}
            {...props}
          >
            {(item) => (
              <AutocompleteItem className="py-2.5" key={item.key}>
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        );
      }}
    />
  );
};
