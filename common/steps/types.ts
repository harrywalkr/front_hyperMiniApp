import { PropsWithChildren, ReactNode } from "react";

export type StepsProps = {
  children: ReactNode; // allow any ReactNode, we'll guard at runtime
  className?: string;
};
export type StepProps = {
  /** injected by <Steps /> */
  number?: number;
  /** optional heading */
  title?: ReactNode;
  children: ReactNode;
};
