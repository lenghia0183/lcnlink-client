"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { Progress } from "./ui/progress";

interface AppProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  leftLabel?: React.ReactNode;
  rightLabel?: React.ReactNode;
}

function AppProgress({
  className,
  indicatorClassName,
  value,
  leftLabel,
  rightLabel,
  ...props
}: AppProgressProps) {
  return (
    <div className="mb-3 w-full">
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}

      <Progress
        className={className}
        indicatorClassName={indicatorClassName}
        value={value}
        {...props}
      />
    </div>
  );
}

export { AppProgress };
