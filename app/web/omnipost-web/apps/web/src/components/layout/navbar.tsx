import { useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Features", "Solutions", "Pricing", "Resources"];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="size-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        aria-hidden="true"
      >
        <Zap className="size-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-bold text-base text-white tracking-tight">OmniPost</span>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 10), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_1px_32px_rgba(0,0,0,0.5)]"
          : "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/[0.06]",
      )}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" aria-label="OmniPost home" className="flex-shrink-0">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium",
                "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
                "transition-all duration-150",
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="md" className="text-zinc-400 hover:text-white">
            Log in
          </Button>
          <Button
            variant="gradient"
            size="md"
            className={cn(
              "gap-1.5 font-bold",
              "shadow-[0_0_20px_rgba(99,102,241,0.28)]",
              "hover:shadow-[0_0_32px_rgba(99,102,241,0.45)]",
              "transition-shadow duration-300",
            )}
          >
            Start Free
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((p) => !p)}
          className={cn(
            "md:hidden size-9 rounded-lg flex items-center justify-center",
            "text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors",
          )}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-[#111113] border-b border-zinc-800 p-4">
          <nav className="flex flex-col gap-1 mb-4">
            {NAV_ITEMS.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
            <Button variant="outline" className="w-full h-10 justify-center">Log in</Button>
            <Button variant="gradient" className="w-full h-10 justify-center">Start Free</Button>
          </div>
        </div>
      )}
    </header>
  );
}
