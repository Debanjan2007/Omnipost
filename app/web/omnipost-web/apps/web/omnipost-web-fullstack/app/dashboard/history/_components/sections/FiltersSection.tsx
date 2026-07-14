"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, ArrowUpDown, Check, ChevronDown } from "lucide-react"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface FiltersSectionProps {
    searchQuery: string
    setSearchQuery: (q: string) => void
    platformFilter: string
    setPlatformFilter: (p: string) => void
    statusFilter: string
    setStatusFilter: (s: string) => void
    typeFilter: string
    setTypeFilter: (t: string) => void
    sortOption: string
    setSortOption: (o: string) => void
}

interface Option {
    value: string
    label: string
}

function CustomPopover({
    label,
    value,
    onChange,
    options,
    showPlatformIcon = false
}: {
    label: string
    value: string
    onChange: (v: string) => void
    options: Option[]
    showPlatformIcon?: boolean
}) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const activeOpt = options.find(o => o.value === value)

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-sm",
                    value !== "all" && value !== "recent"
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
            >
                {showPlatformIcon && value !== "all" && (
                    <PlatformIcon name={value} size={14} className="rounded-sm" />
                )}
                <span>{activeOpt ? activeOpt.label : label}</span>
                <ChevronDown size={12} className={cn("transition-transform duration-200 opacity-60", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute top-9 left-0 z-40 w-48 rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="max-h-48 overflow-y-auto space-y-0.5">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value)
                                    setOpen(false)
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    {showPlatformIcon && opt.value !== "all" && (
                                        <PlatformIcon name={opt.value} size={14} className="rounded-sm" />
                                    )}
                                    <span className="truncate">{opt.label}</span>
                                </div>
                                {value === opt.value && <Check size={12} className="text-primary shrink-0 ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export function FiltersSection({
    searchQuery,
    setSearchQuery,
    platformFilter,
    setPlatformFilter,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortOption,
    setSortOption
}: FiltersSectionProps) {
    const [searchFocused, setSearchFocused] = useState(false)

    const platforms = [
        { value: "all", label: "All Platforms" },
        { value: "Instagram", label: "Instagram" },
        { value: "Facebook", label: "Facebook" },
        { value: "LinkedIn", label: "LinkedIn" },
        { value: "Twitter/X", label: "Twitter/X" },
        { value: "YouTube", label: "YouTube" },
        { value: "Threads", label: "Threads" },
        { value: "Pinterest", label: "Pinterest" }
    ]

    const statuses = [
        { value: "all", label: "All Statuses" },
        { value: "Published", label: "Published" },
        { value: "Scheduled", label: "Scheduled" },
        { value: "Failed", label: "Failed" },
        { value: "Draft", label: "Draft" },
        { value: "Processing", label: "Processing" },
        { value: "Deleted", label: "Deleted" }
    ]

    const types = [
        { value: "all", label: "All Types" },
        { value: "text", label: "Text Only" },
        { value: "image", label: "Single Image" },
        { value: "carousel", label: "Carousel Post" },
        { value: "video", label: "Video Upload" }
    ]

    const sorts = [
        { value: "recent", label: "Most Recent" },
        { value: "oldest", label: "Oldest Activity" },
        { value: "platform", label: "Sort Platform" },
        { value: "status", label: "Sort Status" }
    ]

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-1">
            
            {/* Search expands on focus */}
            <div
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/60 transition-all duration-200",
                    searchFocused ? "flex-1 border-primary/50 ring-2 ring-primary/10 bg-card" : "w-full sm:w-64"
                )}
            >
                <Search size={13} className="text-muted-foreground shrink-0" />
                <input
                    type="text"
                    placeholder="Search past posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
            </div>

            {/* Custom Popover Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
                <CustomPopover
                    label="Platform"
                    value={platformFilter}
                    onChange={setPlatformFilter}
                    options={platforms}
                    showPlatformIcon
                />
                
                <CustomPopover
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statuses}
                />

                <CustomPopover
                    label="Content Type"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={types}
                />

                <CustomPopover
                    label="Sort"
                    value={sortOption}
                    onChange={setSortOption}
                    options={sorts}
                />
            </div>

        </div>
    )
}
