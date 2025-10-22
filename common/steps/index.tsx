"use client";

import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { StepProps, StepsProps } from "./types";

export function Steps({ children, className }: StepsProps) {
  const items = Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<StepProps>, {
        number: index + 1,
        ...(child as ReactElement<StepProps>).props,
      });
    }
    return child;
  });

  return <div className={`space-y-5 ${className ?? ""}`}>{items}</div>;
}

export function Step({ number, children }: StepProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="text-gray-800 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
