"use client"

import { useState, useId } from "react"
import Link from "next/link"
import {
    TrendingUp, TrendingDown, CalendarDays, Upload, Sparkles,
    Plug, Edit2, Clock, CheckCircle2, FileText, Plus,
    ChevronRight, Globe, Zap, Bot, MoreHorizontal, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const REACH  = [12,18,14,22,19,28,24,31,27,35,29,42,38,45,41,52,48,55,50,62,58,65,61,72,68,75,71,82,78,85]
const LIKES  = [8,11,9,14,12,17,15,20,18,24,21,27,25,30,28,35,32,38,36,42,40,45,43,50,48,52,50,58,55,61]
const CLICKS = [3,5,4,7,6,9,8,11,10,13,12,15,14,18,17,21,20,24,23,27,26,30,29,33,32,36,35,39,38,42]

const ANALYTICS = [
    { title: "Scheduled Posts",    value: "24",   trend: "+12% this week",   up: true,  icon: <CalendarDays size={15}/>, spark: [4,6,5,8,7,9,8,10,11,13], color: "var(--primary)" },
    { title: "Published Today",    value: "6",    trend: "+3 from yesterday", up: true,  icon: <CheckCircle2 size={15}/>, spark: [2,3,2,4,3,5,4,6,5,7],   color: "var(--color-success)" },
    { title: "Connected Accounts", value: "7",    trend: "2 platforms pending",up:false, icon: <Plug size={15}/>,         spark: [3,3,4,4,5,5,6,6,7,7],   color: "var(--color-info)" },
    { title: "Total Reach",        value: "142K", trend: "+8.3% this month",  up: true,  icon: <Globe size={15}/>,        spark: [60,72,68,80,75,92,88,100,110,120], color: "var(--color-data-violet)" },
]

const UPCOMING = [
    { platform:"Instagram", bg:"var(--color-brand-instagram)", title:"Summer Collection Launch",  date:"Today, 3:00 PM",    status:"Scheduled" },
    { platform:"LinkedIn",  bg:"var(--color-brand-linkedin)",  title:"Q3 Report Highlights",      date:"Tomorrow, 9:00 AM", status:"Scheduled" },
    { platform:"Twitter/X", bg:"var(--color-brand-twitter)",   title:"Product Update Thread",     date:"Jul 15, 2:30 PM",   status:"Draft"      },
    { platform:"Facebook",  bg:"var(--color-brand-facebook)",  title:"Community Event Recap",     date:"Jul 16, 11:00 AM",  status:"Scheduled" },
    { platform:"Threads",   bg:"var(--color-brand-threads)",   title:"Behind the Scenes Series",  date:"Jul 17, 6:00 PM",   status:"Scheduled" },
]

const DRAFTS = [
    { title:"Product Launch Teaser",    platforms:["Instagram","Facebook"],  updated:"2 hours ago",  words:142 },
    { title:"Weekly Newsletter Recap",  platforms:["LinkedIn"],              updated:"5 hours ago",  words:387 },
    { title:"Behind the Scenes",        platforms:["Instagram","Threads"],   updated:"Yesterday",    words:89  },
]

const ACTIVITIES = [
    { platform:"Instagram", bg:"var(--color-brand-instagram)", text:"Instagram Post Published", sub:"Summer Sale Campaign • 234 likes, 42 comments", time:"5 min ago", type:"success"   },
    { platform:"LinkedIn",  bg:"var(--color-brand-linkedin)",  text:"LinkedIn Post Scheduled",  sub:"Company Update — set for Jul 15 at 9:00 AM",   time:"1 hr ago",  type:"scheduled" },
    { platform:"Twitter/X", bg:"var(--color-brand-twitter)",   text:"Twitter Draft Saved",      sub:"Product Update thread • 5 tweets drafted",      time:"3 hrs ago", type:"draft"     },
    { platform:"YouTube",   bg:"var(--color-brand-youtube)",   text:"YouTube Upload Finished",  sub:"Q2 Marketing Review • Processing complete",     time:"Yesterday", type:"success"   },
    { platform:"Facebook",  bg:"var(--color-brand-facebook)",  text:"Facebook Post Published",  sub:"Community Spotlight • 89 likes, 17 shares",     time:"Yesterday", type:"success"   },
]

const PLATFORMS = [
    { name:"Instagram", bg:"var(--color-brand-instagram)", connected:true,  followers:"12.4K", sync:"2 min ago"  },
    { name:"Facebook",  bg:"var(--color-brand-facebook)",  connected:true,  followers:"8.2K",  sync:"5 min ago"  },
    { name:"LinkedIn",  bg:"var(--color-brand-linkedin)",  connected:true,  followers:"3.1K",  sync:"10 min ago" },
    { name:"Twitter/X", bg:"var(--color-brand-twitter)",   connected:true,  followers:"6.8K",  sync:"15 min ago" },
    { name:"Threads",   bg:"var(--color-brand-threads)",   connected:false, followers:"—",     sync:"Never"      },
    { name:"Bluesky",   bg:"var(--color-brand-bluesky)",   connected:false, followers:"—",     sync:"Never"      },
    { name:"YouTube",   bg:"var(--color-brand-youtube)",   connected:true,  followers:"2.4K",  sync:"1 hr ago"   },
]

const AI_SUGGESTIONS = [
    "Best time to post on Instagram today: 6–8 PM on weekdays",
    "Your LinkedIn posts on Tuesdays get 3× more reach",
    "Carousel posts drive 3× more saves than single images",
]

const X_LABELS = ["Jun 11","Jun 18","Jun 25","Jul 2","Jul 9"]

// ─── Primitive Components ─────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
    const W = 72, H = 28
    const max = Math.max(...data), min = Math.min(...data)
    const r = max - min || 1
    const pts = data.map((v, i) =>
        `${(i / (data.length - 1)) * W},${H - 2 - ((v - min) / r) * (H - 4)}`
    ).join(" ")
    return (
        <svg width={W} height={H} className="overflow-visible">
            <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function LineChart({ data, color }: { data: number[]; color: string }) {
    const id = useId()
    const W = 600, H = 140, PX = 4, PY = 10
    const max = Math.max(...data), min = Math.min(...data)
    const r = max - min || 1
    const cx = (i: number) => PX + (i / (data.length - 1)) * (W - PX * 2)
    const cy = (v: number) => PY + (1 - (v - min) / r) * (H - PY * 2)

    const line = data.reduce((acc, v, i) => {
        if (i === 0) return `M ${cx(i)} ${cy(v)}`
        const dx = cx(i) - cx(i - 1)
        return `${acc} C ${cx(i-1)+dx/2} ${cy(data[i-1])} ${cx(i)-dx/2} ${cy(v)} ${cx(i)} ${cy(v)}`
    }, "")
    const area = `${line} L ${cx(data.length-1)} ${H} L ${cx(0)} ${H} Z`

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }} preserveAspectRatio="none">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.01" />
                </linearGradient>
            </defs>
            {[0,.25,.5,.75,1].map((p, i) => {
                const gy = PY + p * (H - PY * 2)
                return <line key={i} x1={PX} y1={gy} x2={W-PX} y2={gy}
                    stroke="currentColor" strokeOpacity="0.25"
                    strokeWidth="0.6" strokeDasharray="4,6" className="text-border" />
            })}
            <path d={area} fill={`url(#${id})`} />
            <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={cx(data.length-1)} cy={cy(data[data.length-1])} r="4" fill={color} />
            <circle cx={cx(data.length-1)} cy={cy(data[data.length-1])} r="8" fill={color} fillOpacity="0.15" />
        </svg>
    )
}

function MiniCalendar() {
    const now = new Date()
    const year = now.getFullYear(), month = now.getMonth(), today = now.getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const scheduled = new Set([3,7,10,12,15,18,20,21,24,28])
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const monthName = now.toLocaleString("default", { month: "long" })

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {monthName} {year}
            </p>
            <div className="grid grid-cols-7 gap-0.5">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} className="text-[10px] text-center text-muted-foreground/50 font-medium py-1">{d}</div>
                ))}
                {Array.from({ length: totalCells }, (_, i) => {
                    const d = i - firstDay + 1
                    const valid = d > 0 && d <= daysInMonth
                    const isToday = valid && d === today
                    const hasDot = valid && scheduled.has(d) && !isToday
                    return (
                        <div key={i} className="flex flex-col items-center py-0.5">
                            <span className={cn(
                                "w-6 h-6 flex items-center justify-center rounded-full text-[11px] transition-colors",
                                !valid && "invisible",
                                isToday && "bg-primary text-primary-foreground font-bold",
                                valid && !isToday && "text-foreground hover:bg-muted cursor-pointer",
                            )}>
                                {valid ? d : ""}
                            </span>
                            {hasDot && <div className="w-1 h-1 rounded-full bg-primary opacity-70 -mt-0.5" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const cls = {
        Scheduled: "bg-primary/10 text-primary",
        Draft:     "bg-muted text-muted-foreground",
        Published: "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]",
    }[status] ?? "bg-muted text-muted-foreground"
    return (
        <span className={cn("shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap", cls)}>
            {status}
        </span>
    )
}

// PlatformAvatar removed — use <PlatformIcon name={...} size={28} /> instead

// ─── Section Cards ────────────────────────────────────────────────────────────

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("bg-card border border-border rounded-2xl", className)}>
            {children}
        </div>
    )
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{children}</h2>
            {action}
        </div>
    )
}

function ViewAll({ href }: { href: string }) {
    return (
        <Link href={href} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
            View all <ChevronRight size={11} />
        </Link>
    )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function DashboardOverview({ firstName }: { firstName: string }) {
    const [tab, setTab] = useState<"reach" | "likes" | "clicks">("reach")
    const [aiPrompt, setAiPrompt] = useState("")

    const TABS = [
        { key:"reach" as const,  label:"Reach",  data:REACH,  color:"var(--primary)",            stat:"42.8K", change:"+8.3%"  },
        { key:"likes" as const,  label:"Likes",  data:LIKES,  color:"var(--color-success)",       stat:"18.6K", change:"+5.1%"  },
        { key:"clicks" as const, label:"Clicks", data:CLICKS, color:"var(--color-info)",           stat:"4.2K",  change:"+12.7%" },
    ]
    const activeTab = TABS.find(t => t.key === tab)!

    const QUICK_ACTIONS = [
        { icon:<Plus size={16}/>,     label:"Create Post",      href:"/dashboard/create"          },
        { icon:<Upload size={16}/>,   label:"Upload Media",     href:"/dashboard/create?tab=media" },
        { icon:<Sparkles size={16}/>, label:"AI Caption",       href:"/dashboard/create?tab=ai"   },
        { icon:<Plug size={16}/>,     label:"Connect Platform", href:"/dashboard/accounts"        },
    ]

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 max-w-[1400px] mx-auto">

            {/* ── S1: Hero ──────────────────────────────────────────────────── */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-bold text-foreground tracking-tight leading-snug">
                        Welcome back, {firstName} 👋
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your content across every platform from one place.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                    <Link href="/dashboard/create"
                        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                        <Plus size={14}/> Create Post
                    </Link>
                    <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors">
                        <CalendarDays size={14}/> Schedule
                    </button>
                </div>
            </section>

            {/* ── S2: Analytics Cards ───────────────────────────────────────── */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {ANALYTICS.map(card => (
                    <Card key={card.title} className="p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                        background: `color-mix(in srgb, ${card.color} 12%, transparent)`,
                                        color: card.color,
                                    }}>
                                    {card.icon}
                                </div>
                                <span className="text-xs font-medium text-muted-foreground leading-snug">{card.title}</span>
                            </div>
                            <Sparkline data={card.spark} color={card.color} />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-foreground tracking-tight">{card.value}</div>
                            <div className="flex items-center gap-1 mt-1">
                                {card.up
                                    ? <TrendingUp size={11} style={{ color:"var(--color-success)" }} />
                                    : <TrendingDown size={11} className="text-muted-foreground" />}
                                <span className={cn("text-[11px]", card.up ? "text-[var(--color-success)]" : "text-muted-foreground")}>
                                    {card.trend}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </section>

            {/* ── S3: Chart + Upcoming Posts ────────────────────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Performance Chart */}
                <Card className="lg:col-span-2 p-5 flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <SectionTitle>Recent Performance</SectionTitle>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Last 30 days</p>
                        </div>
                        {/* Tabs */}
                        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
                            {TABS.map(t => (
                                <button key={t.key} onClick={() => setTab(t.key)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                                        tab === t.key
                                            ? "bg-card text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stat */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">{activeTab.stat}</span>
                        <span className="text-xs font-medium flex items-center gap-0.5" style={{ color:"var(--color-success)" }}>
                            <TrendingUp size={11}/> {activeTab.change}
                        </span>
                    </div>

                    {/* Chart */}
                    <div className="w-full">
                        <LineChart data={activeTab.data} color={activeTab.color} />
                    </div>

                    {/* X-axis labels */}
                    <div className="flex justify-between text-[10px] text-muted-foreground/50 -mt-1">
                        {X_LABELS.map(l => <span key={l}>{l}</span>)}
                    </div>
                </Card>

                {/* Upcoming Posts */}
                <Card className="p-5 flex flex-col gap-4">
                    <SectionTitle action={<ViewAll href="/dashboard/history" />}>
                        Upcoming Posts
                    </SectionTitle>
                    <div className="flex flex-col gap-1.5">
                        {UPCOMING.map((p, i) => (
                            <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors group cursor-default">
                                <PlatformIcon name={p.platform} size={28} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-foreground truncate">{p.title}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                        <Clock size={9}/> {p.date}
                                    </p>
                                </div>
                                <StatusBadge status={p.status} />
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            {/* ── S4: Drafts + Quick Actions + Calendar ────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Recent Drafts */}
                <Card className="p-5 flex flex-col gap-4">
                    <SectionTitle action={<ViewAll href="/dashboard/create" />}>
                        Recent Drafts
                    </SectionTitle>
                    <div className="flex flex-col gap-2">
                        {DRAFTS.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                    <FileText size={13} className="text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-foreground truncate">{d.title}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                        {d.words} words · {d.updated}
                                    </p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0">
                                    <Edit2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-5 flex flex-col gap-4">
                    <SectionTitle>Quick Actions</SectionTitle>
                    <div className="grid grid-cols-2 gap-2.5 flex-1">
                        {QUICK_ACTIONS.map((a, i) => (
                            <Link key={i} href={a.href}
                                className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all text-center group">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                                    {a.icon}
                                </div>
                                <span className="text-xs font-medium text-foreground leading-tight">{a.label}</span>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* Content Calendar */}
                <Card className="p-5 flex flex-col gap-4">
                    <SectionTitle action={<ViewAll href="/dashboard/history" />}>
                        Content Calendar
                    </SectionTitle>
                    <MiniCalendar />
                    <div className="flex items-center gap-4 pt-2 border-t border-border text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary" /> Scheduled
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary inline-block" style={{ filter:"brightness(1.4)" }} /> Today
                        </span>
                    </div>
                </Card>
            </section>

            {/* ── S5: Activity Timeline ─────────────────────────────────────── */}
            <Card className="p-5">
                <div className="flex items-center justify-between mb-5">
                    <SectionTitle>Recent Activity</SectionTitle>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
                        See all <ChevronRight size={11} />
                    </button>
                </div>
                <div className="relative flex flex-col gap-0">
                    {/* Vertical connector line */}
                    <div className="absolute left-[6px] top-3 bottom-3 w-px bg-border" aria-hidden />

                    {ACTIVITIES.map((a, i) => {
                        const dotCls = {
                            success:   "bg-[var(--color-success)]",
                            scheduled: "bg-primary",
                            draft:     "bg-muted-foreground",
                        }[a.type] ?? "bg-muted-foreground"

                        return (
                            <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                                <div className={cn("relative z-10 mt-1 w-3 h-3 rounded-full shrink-0", dotCls)} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <PlatformIcon name={a.platform} size={20} className="rounded-md" />
                                            <p className="text-xs font-medium text-foreground">{a.text}</p>
                                        </div>
                                        <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 ml-7 truncate">{a.sub}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* ── S6: Connected Platforms ───────────────────────────────────── */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-foreground">Connected Platforms</h2>
                    <Link href="/dashboard/accounts"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
                        Manage all <ChevronRight size={11} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
                    {PLATFORMS.map(p => (
                        <Card key={p.name} className={cn(
                            "p-4 flex flex-col gap-3 transition-all duration-200",
                            p.connected ? "hover:shadow-sm" : "border-dashed opacity-70 hover:opacity-90"
                        )}>
                            <div className="flex items-start justify-between">
                                <PlatformIcon name={p.name} size={36} />
                                <span className={cn(
                                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                                    p.connected
                                        ? "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]"
                                        : "bg-muted text-muted-foreground"
                                )}>
                                    {p.connected ? "Live" : "Off"}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground">{p.name}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                    {p.connected ? `${p.followers} followers` : "Not connected"}
                                </p>
                            </div>
                            <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                                <RefreshCw size={9} /> {p.sync}
                            </div>
                            <button className={cn(
                                "w-full h-7 rounded-lg text-[11px] font-medium transition-all",
                                p.connected
                                    ? "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}>
                                {p.connected ? "Manage" : "Connect"}
                            </button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ── S7: AI Assistant ──────────────────────────────────────────── */}
            <section>
                <Card className="overflow-hidden">
                    {/* Subtle gradient accent — top-right */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(ellipse at top right, var(--primary) 0%, transparent 55%)",
                        opacity: 0.04,
                    }} />
                    <div className="relative p-5 sm:p-6 flex flex-col lg:flex-row gap-6 lg:gap-10">

                        {/* Prompt area */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Bot size={17} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
                                    <p className="text-[11px] text-muted-foreground">Need help creating content?</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={aiPrompt}
                                    onChange={e => setAiPrompt(e.target.value)}
                                    placeholder="Describe your post idea... e.g. 'Announce our summer sale on Instagram'"
                                    className="flex-1 h-10 px-3.5 rounded-xl bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                                />
                                <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors shrink-0 shadow-sm">
                                    <Sparkles size={13}/> Generate
                                </button>
                            </div>
                        </div>

                        {/* AI Insights */}
                        <div className="lg:w-80 space-y-3">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                AI Insights
                            </p>
                            <div className="flex flex-col gap-2">
                                {AI_SUGGESTIONS.map((s, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                                        <Zap size={12} className="text-primary mt-0.5 shrink-0" />
                                        <p className="text-xs text-foreground leading-relaxed">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

        </div>
    )
}
