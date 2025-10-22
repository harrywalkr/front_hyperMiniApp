import { AutocompleteProps } from "@heroui/react";

export type ControlledAutocompleteProps = Omit<
  AutocompleteProps<{
    label: string;
    key: string;
  }>,
  "children"
>;
