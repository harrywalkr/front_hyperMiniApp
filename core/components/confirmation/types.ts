import { PropsWithChildren, Ref, RefObject } from "react";

export type ConfirmationProps = PropsWithChildren<{
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  ref?: RefObject<HTMLDivElement | undefined>;
}>;
