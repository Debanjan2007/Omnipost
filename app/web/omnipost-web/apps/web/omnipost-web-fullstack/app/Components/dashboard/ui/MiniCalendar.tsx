"use client"

// new Date() would cause a hydration mismatch if rendered on the server
// with a different locale/timezone than the client.
import { SCHEDULED_DAYS } from "../data/content"
import { cn } from "@/lib/utils"

/**
 * MiniCalendar
 *
 * Renders the current month as a compact 7-column grid.
 * Days that appear in SCHEDULED_DAYS get a purple indicator dot.
 * Today is highlighted with a filled primary background.
 */
export function MiniCalendar() {
    const now          = new Date()
    const year         = now.getFullYear()
    const month        = now.getMonth()
    const today        = now.getDate()
    const firstWeekday = new Date(year, month, 1).getDay()
    const daysInMonth  = new Date(year, month + 1, 0).getDate()
    const totalCells   = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
    const monthName    = now.toLocaleString("default", { month: "long" })

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {monthName} {year}
            </p>

            <div className="grid grid-cols-7 gap-0.5">
                {/* Day-of-week headers */}
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-[10px] text-center text-muted-foreground/50 font-medium py-1">
                        {d}
                    </div>
                ))}

                {/* Day cells */}
                {Array.from({ length: totalCells }, (_, i) => {
                    const day     = i - firstWeekday + 1
                    const valid   = day > 0 && day <= daysInMonth
                    const isToday = valid && day === today
                    const hasDot  = valid && !isToday && SCHEDULED_DAYS.has(day)

                    return (
                        <div key={i} className="flex flex-col items-center py-0.5">
                            <span className={cn(
                                "w-6 h-6 flex items-center justify-center rounded-full text-[11px] transition-colors",
                                !valid  && "invisible",
                                isToday && "bg-primary text-primary-foreground font-bold",
                                valid && !isToday && "text-foreground hover:bg-muted cursor-pointer",
                            )}>
                                {valid ? day : ""}
                            </span>
                            {hasDot && (
                                <div className="w-1 h-1 rounded-full bg-primary opacity-70 -mt-0.5" />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
