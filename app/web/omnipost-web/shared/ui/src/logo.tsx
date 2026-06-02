import * as React from "react";

export interface LogoProps {
  /** Show the wordmark beside the icon. Defaults to true. */
  showWordmark?: boolean;
  /** Additional class names for the root element. */
  className?: string;
  /** Icon size override. Defaults to "md". */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: "size-7",  wordmark: "text-sm"  },
  md: { icon: "size-9",  wordmark: "text-base" },
  lg: { icon: "size-11", wordmark: "text-lg"  },
};

/**
 * OmniPost brand logo — icon + wordmark.
 * Uses the actual brand logo from /logo.png.
 */
export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ showWordmark = true, className = "", size = "sm" }, ref) => {
    const s = sizeMap[size];
    return (
      <div
        ref={ref}
        className={`flex items-center gap-2.5 ${className}`}
        aria-label="OmniPost"
      >
        {/* Brand icon */}
        <img
          src="logo.png"
          alt="omnipost logo"
          aria-hidden="true"
          className={`${s.icon} object-contain shrink-0`}
        />

        {/* Wordmark */}
        {showWordmark && (
          <span className={`font-bold ${s.wordmark} leading-none text-white tracking-tight`}>
            OmniPost
          </span>
        )}
      </div>
    );
  },
);

Logo.displayName = "Logo";
