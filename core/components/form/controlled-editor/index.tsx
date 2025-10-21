"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@/common";
import { ControlledEditorCmProps } from "./types";

export const ControlledEditor: React.FC<ControlledEditorCmProps> = ({
  name,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <Editor value={field.value} onChange={field.onChange} />;
      }}
    />
  );
};
