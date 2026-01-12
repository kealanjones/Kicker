"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SlotStatus = "available" | "held" | "booked" | "selected";

interface SlotButtonProps {
  time: string;
  price: number;
  status: SlotStatus;
  isPeak?: boolean;
  holdTimeRemaining?: number;
  onSelect: () => void;
  onWaitlist?: () => void;
  disabled?: boolean;
}

export function SlotButton({
  time,
  price,
  status,
  isPeak = false,
  holdTimeRemaining,
  onSelect,
  onWaitlist,
  disabled = false,
}: SlotButtonProps) {
  const isDisabled = disabled || status === "booked";
  const isHeld = status === "held";
  const isSelected = status === "selected";

  return (
    <button
      onClick={isHeld && onWaitlist ? onWaitlist : onSelect}
      disabled={isDisabled}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border p-3 min-w-[80px] transition-all duration-200",
        // Available state
        status === "available" &&
          "border-green-500 hover:bg-green-50 hover:border-green-600 hover:shadow-md active:scale-[0.98]",
        // Selected state
        isSelected && "bg-primary text-primary-foreground border-primary shadow-md",
        // Held state
        isHeld && "border-amber-500 bg-amber-50",
        // Booked state
        status === "booked" && "bg-gray-100 text-gray-400 cursor-not-allowed",
        // Disabled
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Peak badge */}
      {isPeak && status === "available" && (
        <Badge
          variant="peak"
          className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0"
        >
          PEAK
        </Badge>
      )}

      {/* Held badge with timer */}
      {isHeld && holdTimeRemaining && (
        <Badge
          variant="warning"
          className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0"
        >
          HELD
        </Badge>
      )}

      {/* Time */}
      <span
        className={cn(
          "text-sm font-semibold",
          isSelected && "text-primary-foreground",
          status === "booked" && "text-gray-400"
        )}
      >
        {time}
      </span>

      {/* Price */}
      <span
        className={cn(
          "text-xs",
          isSelected && "text-primary-foreground/90",
          status === "booked" && "text-gray-400",
          status === "available" && "text-muted-foreground"
        )}
      >
        {formatCurrency(price)}
      </span>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-primary ring-offset-2" />
      )}

      {/* Held - join waitlist text */}
      {isHeld && (
        <span className="text-[10px] text-amber-700 mt-1">Join waitlist</span>
      )}
    </button>
  );
}
