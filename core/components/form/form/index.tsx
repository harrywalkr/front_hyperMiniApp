"use client";
import { FormProvider, type FieldValues } from "react-hook-form";
import type { FormCmProps } from "./types";

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  ariaLabel,
  ...props
}: FormCmProps<TFieldValues>) => {
  return (
    <FormProvider {...props}>
      <form
        aria-label={ariaLabel}
        onSubmit={(event) => {
          event?.preventDefault();
          onSubmit?.(event);
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
};
