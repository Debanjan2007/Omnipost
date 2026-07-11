import Link from "next/link"
import { Plus, CalendarDays } from "lucide-react"

interface HeroSectionProps {
    firstName: string
}

/**
 * HeroSection — welcome heading, subtitle, and primary action buttons.
 * Stateless; receives firstName from the server-side page component.
 */
export function HeroSection({ firstName }: HeroSectionProps) {
    return (
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
                <Link
                    href="/dashboard/create"
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Plus size={14} /> Create Post
                </Link>
                <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors">
                    <CalendarDays size={14} /> Schedule
                </button>
            </div>
        </section>
    )
}
