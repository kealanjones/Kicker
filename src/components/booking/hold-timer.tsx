"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { cn, formatCountdown } from "@/lib/utils";

interface HoldTimerProps {
  expiresAt: Date;
  onExpire: () => void;
  variant?: "bar" | "compact" | "full";
}

export function HoldTimer({
  expiresAt,
  onExpire,
  variant = "full",
}: HoldTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const diff = expiresAt.getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  const totalSeconds = 600; // 10 minutes
  const progress = (secondsRemaining / totalSeconds) * 100;
  const isWarning = secondsRemaining < 120; // Less than 2 minutes
  const isCritical = secondsRemaining < 60; // Less than 1 minute

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiresAt.getTime() - Date.now();
      const remaining = Math.max(0, Math.floor(diff / 1000));
      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium",
          isCritical && "text-destructive animate-pulse",
          isWarning && !isCritical && "text-amber-600"
        )}
      >
        <Timer className="h-4 w-4" />
        <span>{formatCountdown(secondsRemaining)}</span>
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className="w-full space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Time remaining</span>
          <span
            className={cn(
              "font-medium",
              isCritical && "text-destructive",
              isWarning && !isCritical && "text-amber-600"
            )}
          >
            {formatCountdown(secondsRemaining)}
          </span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-linear rounded-full",
              isCritical && "bg-destructive",
              isWarning && !isCritical && "bg-amber-500",
              !isWarning && "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div
      className={cn(
        "rounded-lg border p-4 space-y-3",
        isCritical && "border-destructive bg-destructive/5",
        isWarning && !isCritical && "border-amber-500 bg-amber-50",
        !isWarning && "border-primary bg-primary/5"
      )}
    >
      <div className="flex items-center gap-2">
        <Timer
          className={cn(
            "h-5 w-5",
            isCritical && "text-destructive animate-pulse",
            isWarning && !isCritical && "text-amber-600",
            !isWarning && "text-primary"
          )}
        />
        <span className="font-medium">Slot held for</span>
        <span
          className={cn(
            "font-bold text-lg tabular-nums",
            isCritical && "text-destructive",
            isWarning && !isCritical && "text-amber-600",
            !isWarning && "text-primary"
          )}
        >
          {formatCountdown(secondsRemaining)}
        </span>
      </div>

      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear rounded-full",
            isCritical && "bg-destructive",
            isWarning && !isCritical && "bg-amber-500",
            !isWarning && "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Complete your booking to secure this slot
      </p>
    </div>
  );
}
