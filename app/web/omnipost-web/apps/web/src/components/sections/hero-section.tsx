import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Zap, Shield } from "lucide-react";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: "10M+",  label: "Posts Scheduled", icon: Zap },
  { value: "250K+", label: "Active Users",    icon: Users },
  { value: "99.9%", label: "Uptime SLA",      icon: Shield },
  { value: "10+",   label: "Platforms",       icon: TrendingUp },
];

const PLATFORMS = [
  { name: "Instagram",  color: "#E1306C" },
  { name: "X / Twitter",color: "#60A5FA" },
  { name: "LinkedIn",   color: "#0A66C2" },
  { name: "Facebook",   color: "#1877F2" },
  { name: "TikTok",     color: "#69C9D0" },
  { name: "YouTube",    color: "#FF0000" },
  { name: "Pinterest",  color: "#E60023" },
  { name: "Threads",    color: "#94A3B8" },
];

// Decorative floaters — only at 2xl (1536px+) so they never overlap content
const FLOATERS = [
  { name: "Instagram", color: "#E1306C", className: "left-[2%] top-[40%]", delay: 0 },
  { name: "Facebook",  color: "#1877F2", className: "left-[4%] top-[60%]", delay: 1.0 },
  { name: "TikTok",    color: "#69C9D0", className: "right-[2%] top-[36%]",delay: 0.5 },
  { name: "LinkedIn",  color: "#0A66C2", className: "right-[4%] top-[56%]",delay: 1.3 },
  { name: "YouTube",   color: "#FF0000", className: "right-[2%] top-[72%]",delay: 0.8 },
];

// Shared easing — explicit array, not `as const`
const EASE = [0.16, 1, 0.3, 1];
const T = { duration: 0.6, ease: EASE };

// ─── Background ───────────────────────────────────────────────────────────────

function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[1000px] h-[680px] -translate-y-1/4 opacity-[0.13] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, #6366F1 0%, #8B5CF6 35%, transparent 68%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.014]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
}

// ─── Floating platform pills ──────────────────────────────────────────────────

function FloatingPill({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.7, 0.7], y: [10, 0, -8, 0] }}
      transition={{
        opacity: { duration: 1.2, delay: delay + 1, ease: "easeOut" },
        y: { duration: 5 + delay, delay: delay + 1, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[12px] font-medium text-zinc-300">{name}</span>
    </motion.div>
  );
}

// ─── Trust metrics ────────────────────────────────────────────────────────────

function TrustMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/20 w-full max-w-[620px]">
      {TRUST_STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 px-4 py-5",
              i < TRUST_STATS.length - 1 && "border-r border-zinc-800",
              i === 1 && "border-b sm:border-b-0 border-zinc-800",
            )}
          >
            <Icon className="size-4 text-[#8B5CF6]" aria-hidden="true" />
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              {stat.value}
            </span>
            <span className="text-[11px] text-zinc-500 text-center leading-tight font-medium">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Platform strip ───────────────────────────────────────────────────────────

function PlatformTrust() {
  return (
    <div className="flex flex-col items-center gap-3.5 w-full">
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.16em]">
        Trusted by creators publishing on
      </p>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5" role="list">
        {PLATFORMS.map((p) => (
          <div key={p.name} role="listitem" className="inline-flex items-center gap-1.5">
            <div className="size-2 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
            <span className="text-[13px] font-medium text-zinc-400">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * HeroSection — full-viewport landing section.
 *
 * Uses explicit per-element Framer Motion animations (no variant propagation)
 * to guarantee visibility in React 19 + Vite environments.
 *
 * Lives in: apps/web/src/components/sections/hero-section.tsx
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen bg-[#0A0A0F] flex flex-col items-center overflow-hidden"
    >
      <BackgroundGlow />

      {/* Floating platform decorations — 2xl only */}
      {FLOATERS.map((f) => (
        <div key={f.name} className={cn("absolute 2xl:block hidden pointer-events-none select-none", f.className)}>
          <FloatingPill name={f.name} color={f.color} delay={f.delay} />
        </div>
      ))}

      {/* Hero content */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center text-center",
          "w-full max-w-5xl mx-auto",
          "px-4 sm:px-6 lg:px-8",
          "pt-44 sm:pt-48 lg:pt-52 pb-24",
          "gap-7 sm:gap-8",
        )}
      >
        {/* Headline — explicit motion, no variants */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.05 }}
        >
          <h1
            id="hero-heading"
            className="font-black tracking-[-0.04em] leading-[1.03] text-[52px] sm:text-[68px] md:text-[82px] lg:text-[96px] xl:text-[108px]"
          >
            <span className="block text-white">Create once.</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #818CF8 0%, #A78BFA 42%, #C084FC 100%)",
              }}
            >
              Publish everywhere.
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.14 }}
          className="max-w-[650px] text-base sm:text-[17px] leading-[1.72] text-zinc-400"
        >
          OmniPost is the all-in-one platform for managing your social media
          presence. Create, schedule, analyze, and grow — from one powerful
          workspace.
        </motion.p>

        {/* CTA Buttons — bigger than before */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Button
            variant="gradient"
            size="lg"
            className={cn(
              "w-full sm:w-auto h-14 px-10 gap-2.5 text-base font-bold",
              "shadow-[0_0_48px_rgba(99,102,241,0.3)]",
              "hover:shadow-[0_0_64px_rgba(99,102,241,0.46)]",
              "transition-shadow duration-300",
            )}
            aria-label="Start OmniPost for free"
          >
            Start Free
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 px-10 text-base"
            aria-label="Book a product demo"
          >
            Book Demo
          </Button>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.28 }}
          className="text-[12px] text-zinc-600 -mt-2"
        >
          No credit card required · 14-day free trial · Cancel anytime
        </motion.p>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.34 }}
          className="w-full flex justify-center"
        >
          <TrustMetrics />
        </motion.div>

        {/* Platform strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T, delay: 0.40 }}
          className="w-full border-t border-zinc-800/50 pt-7"
        >
          <PlatformTrust />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #09090B 20%, transparent)" }}
      />
    </section>
  );
}
