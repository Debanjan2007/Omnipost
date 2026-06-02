import * as React from "react";

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks this link as the currently active page. */
  isActive?: boolean;
  children: React.ReactNode;
}

/**
 * OmniPost NavLink — reusable navigation anchor with pill hover state.
 * Handles active state, hover transitions, and ARIA attributes.
 * Shared in @repo/ui for use across web and future apps.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { isActive = false, className = "", children, href = "#", ...props },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={[
          // Base
          "relative font-medium text-sm leading-5",
          // Pill padding — creates hover background
          "px-4 py-2 rounded-md",
          // Transition
          "transition-all duration-150 ease-out",
          // Focus ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
          // State
          isActive
            ? "text-white bg-white/[0.08]"
            : "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </a>
    );
  },
);

NavLink.displayName = "NavLink";
