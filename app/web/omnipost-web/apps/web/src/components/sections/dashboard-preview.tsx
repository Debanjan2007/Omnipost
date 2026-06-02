import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, BarChart2, Users, Sparkles,
  MessageSquare, Settings, Plus, Bell, Search, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, RefreshCw, Send,
  ChevronDown, Activity, Globe, Zap, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SIDEBAR_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar,        label: "Calendar" },
  { icon: FileText,        label: "Content" },
  { icon: BarChart2,       label: "Analytics" },
  { icon: Sparkles,        label: "AI Studio" },
  { icon: MessageSquare,   label: "Inbox", badge: 3 },
  { icon: Settings,        label: "Settings" },
];

const STATS = [
  { label: "Total Reach",     value: "2.4M",  change: "+12.4%", sparkline: "0,18 14,14 28,16 42,10 56,12 70,7 84,8 96,3",  color: "#818CF8" },
  { label: "Engagement Rate", value: "8.3%",  change: "+0.4%",  sparkline: "0,17 14,18 28,13 42,14 56,9 70,11 84,6 96,2",  color: "#34D399" },
  { label: "Impressions",     value: "14.2M", change: "+18.2%", sparkline: "0,20 14,16 28,14 42,12 56,10 70,8 84,5 96,1",  color: "#60A5FA" },
  { label: "New Followers",   value: "2,847", change: "+5.1%",  sparkline: "0,18 14,15 28,16 42,12 56,13 70,9 84,7 96,3",  color: "#F472B6" },
];

const PLATFORM_ACCOUNTS = [
  { handle: "@omnipost",    color: "#E1306C", followers: "45.2K", initial: "IG" },
  { handle: "@omnipost_io", color: "#1DA1F2", followers: "23.1K", initial: "X"  },
  { handle: "OmniPost",     color: "#0A66C2", followers: "12.8K", initial: "Li" },
];

const POSTS = [
  {
    id: 1,
    platforms: [
      { color: "#E1306C", initial: "IG", name: "Instagram" },
      { color: "#69C9D0", initial: "TK", name: "TikTok" },
    ],
    content: "Your social strategy just got smarter ✨ Meet OmniPost's AI assistant — writes, schedules, and optimizes for peak engagement automatically.",
    time: "Today · 2:30 PM",
    status: "Scheduled" as const,
    reach: "~45.2K",
  },
  {
    id: 2,
    platforms: [{ color: "#1DA1F2", initial: "X", name: "Twitter" }],
    content: "Big news: OmniPost connects 10+ platforms from one dashboard. Less chaos, more growth. Thread →",
    time: "Today · 4:00 PM",
    status: "Scheduled" as const,
    reach: "~23.1K",
  },
  {
    id: 3,
    platforms: [{ color: "#0A66C2", initial: "Li", name: "LinkedIn" }],
    content: "We analyzed 50,000 LinkedIn posts to find the optimal posting formula. Here's what the data says...",
    time: "Tomorrow · 9:00 AM",
    status: "Draft" as const,
    reach: "~12.8K",
  },
];

const WEEK = [
  { d: "M", date: 26, n: 2 }, { d: "T", date: 27, n: 1 },
  { d: "W", date: 28, n: 3 }, { d: "T", date: 29, n: 0 },
  { d: "F", date: 30, n: 2 }, { d: "S", date: 31, n: 1 },
  { d: "S", date: 1,  n: 0, today: true },
];

// ─── Micro-components ─────────────────────────────────────────────────────────

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg width="60" height="18" viewBox="0 0 96 20" aria-hidden="true" className="opacity-70">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ status }: { status: "Scheduled" | "Draft" }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
      status === "Scheduled"
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        : "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    )}>
      {status === "Scheduled" ? <CheckCircle2 className="size-2.5" /> : <Clock className="size-2.5" />}
      {status}
    </span>
  );
}

// ─── Logo (no external image dependency) ─────────────────────────────────────

function InlineLogo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-7 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
      >
        <Zap className="size-3.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-bold text-[13px] text-white tracking-tight">OmniPost</span>
    </div>
  );
}

// ─── Dashboard sub-sections ───────────────────────────────────────────────────

function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 px-4 h-10 bg-[#141416] border-b border-[#1E1E22] rounded-t-xl flex-shrink-0">
      <div className="flex gap-1.5">
        <div className="size-3 rounded-full bg-[#FF5F57]" />
        <div className="size-3 rounded-full bg-[#FFBD2E]" />
        <div className="size-3 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 max-w-xs mx-auto">
        <div className="flex items-center gap-2 bg-[#1A1A1E] border border-[#252529] rounded-md px-3 h-6">
          <Globe className="size-3 text-zinc-600 flex-shrink-0" />
          <span className="text-[11px] text-zinc-500 truncate">app.omnipost.io/dashboard</span>
        </div>
      </div>
      <RefreshCw className="size-3 text-zinc-600 ml-auto" />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-[188px] flex-shrink-0 flex flex-col bg-[#0D0D0F] border-r border-[#1A1A1E]">
      <div className="px-4 py-3.5 border-b border-[#1A1A1E]">
        <InlineLogo />
      </div>
      <nav className="flex-1 px-2 py-3">
        <ul className="flex flex-col gap-0.5">
          {SIDEBAR_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <div className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-default transition-colors",
                  item.active
                    ? "bg-[#1A1630] text-white border border-[#6366F1]/20"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]",
                )}>
                  <Icon className={cn("size-3.5 flex-shrink-0", item.active ? "text-[#818CF8]" : "text-zinc-600")} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="size-4 rounded-full bg-[#6366F1] flex items-center justify-center text-[9px] font-bold text-white">{item.badge}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-3 pb-3 border-t border-[#1A1A1E] pt-3">
        <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-2 px-1">Connected</p>
        {PLATFORM_ACCOUNTS.map((a) => (
          <div key={a.handle} className="flex items-center gap-2 px-1 py-1">
            <div className="size-5 rounded flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: a.color }}>{a.initial}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-zinc-400 truncate">{a.handle}</p>
              <p className="text-[9px] text-zinc-600">{a.followers}</p>
            </div>
            <div className="size-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          </div>
        ))}
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-5 h-12 border-b border-[#1A1A1E] bg-[#0D0D0F] flex-shrink-0">
      <div>
        <span className="text-xs font-semibold text-white">Good morning, Alex 👋</span>
        <span className="text-xs text-zinc-600 ml-2">Monday, June 2</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-[#111113] border border-[#1D1D21] rounded-md px-2.5 h-7 w-36">
          <Search className="size-3 text-zinc-600" />
          <span className="text-[11px] text-zinc-600">Search…</span>
        </div>
        <div className="relative size-7 rounded-md flex items-center justify-center bg-[#111113] border border-[#1D1D21]">
          <Bell className="size-3.5 text-zinc-500" />
          <div className="absolute top-1 right-1 size-1.5 rounded-full bg-[#6366F1]" />
        </div>
        <div className="flex items-center gap-1.5 px-3 h-7 rounded-md bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] cursor-pointer">
          <Plus className="size-3 text-white" />
          <span className="text-[11px] font-semibold text-white">Create</span>
        </div>
        <div className="size-7 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-bold text-white">A</div>
      </div>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-3 px-5 py-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#111113] border border-[#1D1D21]">
          <span className="text-[10px] font-medium text-zinc-500 truncate">{s.label}</span>
          <div className="flex items-end justify-between">
            <span className="text-base font-bold text-white leading-none">{s.value}</span>
            <Sparkline points={s.sparkline} color={s.color} />
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="size-2.5 text-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400">{s.change}</span>
            <span className="text-[9px] text-zinc-600">this week</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PostsPanel() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-white">Scheduled Posts</h3>
          <span className="px-1.5 py-0.5 rounded-full bg-[#6366F1]/20 text-[10px] font-semibold text-[#818CF8]">{POSTS.length}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-500 cursor-pointer hover:text-zinc-300">
          View all <ArrowUpRight className="size-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {POSTS.map((post) => (
          <div key={post.id} className="p-3 rounded-xl bg-[#111113] border border-[#1D1D21] hover:border-zinc-700 transition-colors cursor-default">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1">
                {post.platforms.map((p) => (
                  <div key={p.name} className="size-5 rounded flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: p.color }} title={p.name}>{p.initial}</div>
                ))}
                <div className="flex items-center gap-1 ml-1">
                  <Clock className="size-2.5 text-zinc-600" />
                  <span className="text-[10px] text-zinc-500">{post.time}</span>
                </div>
              </div>
              <Badge status={post.status} />
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-2">{post.content}</p>
            <div className="mt-2 flex items-center gap-2">
              <Activity className="size-2.5 text-zinc-600" />
              <span className="text-[10px] text-zinc-600">Est. {post.reach} reach</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPanel() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-[#8B5CF6]" />
          <h3 className="text-xs font-semibold text-white">AI Assistant</h3>
        </div>
        <span className="px-1.5 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[9px] font-semibold text-[#A78BFA]">Gemini</span>
      </div>
      {/* Tone selector */}
      <div className="flex gap-1 mb-3">
        {["Professional", "Casual", "Witty"].map((tone) => (
          <button key={tone} className={cn(
            "px-2 py-1 rounded-md text-[10px] font-medium transition-colors",
            tone === "Professional"
              ? "bg-[#1A1630] text-[#818CF8] border border-[#6366F1]/30"
              : "text-zinc-500 border border-transparent hover:border-zinc-800 hover:text-zinc-300",
          )}>{tone}</button>
        ))}
        <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-md border border-zinc-800 text-[10px] text-zinc-500 cursor-pointer">
          <Globe className="size-3" /><ChevronDown className="size-2.5" />
        </div>
      </div>
      {/* Prompt */}
      <div className="flex items-center gap-2 bg-[#111113] border border-[#1D1D21] rounded-lg px-3 py-2 mb-3">
        <span className="text-[11px] text-zinc-500 flex-1">Write a post about our AI feature launch...</span>
        <Send className="size-3.5 text-[#6366F1] cursor-pointer" />
      </div>
      {/* Generated */}
      <div className="flex-1 bg-[#111113] border border-[#1D1D21] rounded-xl p-3 mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="size-3 text-[#8B5CF6]" />
          <span className="text-[10px] font-semibold text-zinc-400">Generated</span>
        </div>
        <p className="text-[11px] text-zinc-200 leading-relaxed">
          🚀 Big news: OmniPost just launched AI-powered content generation.
          Write, optimize, and schedule posts for 10+ platforms in seconds.{" "}
          <span className="text-[#818CF8]">#ContentCreation #SocialMedia</span>
        </p>
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex gap-1">
            {["IG 2.2K", "X 280", "Li 3K"].map((p) => (
              <span key={p} className="text-[9px] text-zinc-600 bg-zinc-800/60 px-1.5 py-0.5 rounded">{p}</span>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300">
            <RefreshCw className="size-2.5" /> Regenerate
          </button>
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 py-1.5 rounded-lg bg-[#111113] border border-[#1D1D21] text-[11px] font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors">Edit</button>
        <button className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[11px] font-semibold text-white">Use & Schedule</button>
      </div>
    </div>
  );
}

function CalendarRow() {
  return (
    <div className="px-5 pb-4 mt-1">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3 text-zinc-600" />
          <span className="text-[10px] font-semibold text-zinc-500">This week</span>
        </div>
        <span className="text-[10px] text-[#818CF8] cursor-pointer hover:text-[#A78BFA]">Full calendar →</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {WEEK.map((day, i) => (
          <div key={i} className={cn(
            "flex flex-col items-center gap-1 py-2 rounded-lg cursor-default",
            day.today ? "bg-[#1A1630] border border-[#6366F1]/30" : "hover:bg-white/[0.03]",
          )}>
            <span className={cn("text-[9px] font-medium", day.today ? "text-[#818CF8]" : "text-zinc-600")}>{day.d}</span>
            <span className={cn("text-[10px] font-bold", day.today ? "text-white" : "text-zinc-400")}>{day.date}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(day.n, 3) }).map((_, j) => (
                <div key={j} className="size-1 rounded-full bg-[#6366F1]" />
              ))}
              {day.n === 0 && <div className="size-1 rounded-full bg-zinc-800" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * DashboardPreview — realistic SaaS dashboard inside a browser frame.
 * Positioned as a normal flow element (NOT absolute) below the hero section.
 * Width: max-w-[1200px]. Animates in on scroll via whileInView.
 *
 * Lives in: apps/web/src/components/sections/dashboard-preview.tsx
 */
export function DashboardPreview() {
  return (
    <section
      aria-label="OmniPost dashboard preview"
      className="relative bg-[#09090B] px-4 sm:px-6 lg:px-8 pb-24"
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-14 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] font-bold text-[#8B5CF6] uppercase tracking-[0.15em] mb-3">
          Product Preview
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-tight mb-4">
          The dashboard your whole team will love
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed">
          One workspace for every platform. Real-time analytics, AI-assisted content,
          and smart scheduling — all in one place.
        </p>
      </motion.div>

      {/* Frame */}
      <motion.div
        className="max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className={cn(
          "rounded-xl overflow-hidden",
          "border border-[#1E1E22]",
          "shadow-[0_32px_96px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)]",
        )}>
          <BrowserChrome />
          <div className="flex bg-[#09090B]" style={{ height: "580px" }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar />
              <div className="flex-1 overflow-hidden">
                <StatsRow />
                <div className="grid grid-cols-[1fr_290px] gap-4 px-5 pb-3">
                  <PostsPanel />
                  <AIPanel />
                </div>
                <CalendarRow />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-700 mt-4">
          OmniPost dashboard · All metrics shown are illustrative
        </p>
      </motion.div>
    </section>
  );
}
