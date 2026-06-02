"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Internal cn helper — avoids cross-package @/ alias issues
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "default" | "ghost" | "outline" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. Defaults to "default". */
  variant?: ButtonVariant;
  /** Size preset. Defaults to "md". */
  size?: ButtonSize;
  children: React.ReactNode;
}

// ─── Variant & Size Maps ──────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-zinc-800 text-zinc-50 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600",
  ghost:
    "bg-transparent text-zinc-400 hover:text-zinc-50 hover:bg-white/5",
  outline:
    "bg-transparent text-zinc-50 border border-zinc-700 hover:bg-white/5 hover:border-zinc-500",
  gradient:
    "bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white border-0 hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 py-3 text-xs gap-1.5",
  md: "h-10 px-5 py-4 text-sm gap-2",
  lg: "h-12 px-7 py-5 text-[15px] gap-2",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * OmniPost Button — production-grade, shadcn/ui API-compatible.
 * Part of @repo/ui shared package. Used across all OmniPost apps.
 *
 * @example
 * <Button variant="gradient" size="lg">Start Free</Button>
 * <Button variant="ghost" size="md">Log in</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center",
          "font-semibold rounded-lg",
          "transition-all duration-150 ease-out",
          "cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
          // Disabled state
          "disabled:pointer-events-none disabled:opacity-40",
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
