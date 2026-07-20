"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Check, ChevronDown } from "lucide-react"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface FiltersSectionProps {
    searchQuery: string
    setSearchQuery: (q: string) => void
    platformFilter: string
    setPlatformFilter: (p: string) => void
    statusFilter: string
    setStatusFilter: (s: string) => void
    sortOption: string
    setSortOption: (o: string) => void
}

// ─── Custom CustomCombobox Component ───────────────────────────────────────────

interface Option {
    value: string
    label: string
    icon?: string
}

function CustomCombobox({
    label,
    value,
    onChange,
    options,
    placeholder = "Search...",
    showIcon = false,
}: {
    label: string
    value: string
    onChange: (val: string) => void
    options: Option[]
    placeholder?: string
    showIcon?: boolean
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedOption = options.find(o => o.value === value)

    const filteredOptions = options.filter(o =>
        o.label.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm",
                    value !== "all" && value !== "recent"
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
            >
                {showIcon && selectedOption?.value !== "all" && (
                    <PlatformIcon name={selectedOption?.value || ""} size={14} className="rounded-sm" />
                )}
                <span>{selectedOption ? selectedOption.label : label}</span>
                <ChevronDown size={12} className={cn("transition-transform duration-200 opacity-60", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute top-9 left-0 z-50 w-56 rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* Search bar inside popover */}
                    <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border/40 mb-1">
                        <Search size={11} className="text-muted-foreground shrink-0" />
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                        />
                    </div>

                    {/* Options list */}
                    <div className="max-h-48 overflow-y-auto space-y-0.5">
                        {filteredOptions.length === 0 ? (
                            <p className="text-[10px] text-muted-foreground text-center py-3">No results found</p>
                        ) : (
                            filteredOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value)
                                        setOpen(false)
                                        setSearch("")
                                    }}
                                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        {showIcon && opt.value !== "all" && (
                                            <PlatformIcon name={opt.value} size={14} className="rounded-sm" />
                                        )}
                                        <span className="truncate">{opt.label}</span>
                                    </div>
                                    {value === opt.value && (
                                        <Check size={12} className="text-primary shrink-0 ml-2" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── FiltersSection ────────────────────────────────────────────────────────────

export function FiltersSection({
    searchQuery,
    setSearchQuery,
    platformFilter,
    setPlatformFilter,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption
}: FiltersSectionProps) {
    const [searchFocused, setSearchFocused] = useState(false)

    const platformOptions = [
        { value: "all", label: "All Platforms" },
        { value: "Instagram", label: "Instagram" },
        { value: "Facebook", label: "Facebook" },
        { value: "LinkedIn", label: "LinkedIn" },
        { value: "Twitter/X", label: "Twitter/X" },
        { value: "YouTube", label: "YouTube" },
        { value: "Threads", label: "Threads" },
        { value: "Bluesky", label: "Bluesky" },
        { value: "TikTok", label: "TikTok" },
        { value: "Pinterest", label: "Pinterest" },
        { value: "Mastodon", label: "Mastodon" },
    ]

    const statusOptions = [
        { value: "all", label: "All Statuses" },
        { value: "connected", label: "Connected" },
        { value: "disconnected", label: "Disconnected" },
    ]

    const sortOptions = [
        { value: "recent", label: "Recently Connected" },
        { value: "alphabetical", label: "Alphabetical (A-Z)" },
        { value: "followers", label: "Followers Count" },
        { value: "sync", label: "Last Synced Time" },
    ]

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-2">
            {/* Search Input - expands on focus */}
            <div
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/60 transition-all duration-200",
                    searchFocused ? "flex-1 border-primary/50 ring-2 ring-primary/10 bg-card" : "w-full sm:w-64"
                )}
            >
                <Search size={13} className="text-muted-foreground shrink-0" />
                <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
            </div>

            {/* Combobox Filters list */}
            <div className="flex flex-wrap items-center gap-2">
                <CustomCombobox
                    label="Platform"
                    value={platformFilter}
                    onChange={setPlatformFilter}
                    options={platformOptions}
                    placeholder="Search platforms..."
                    showIcon
                />

                <CustomCombobox
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    placeholder="Search status..."
                />

                <CustomCombobox
                    label="Sort"
                    value={sortOption}
                    onChange={setSortOption}
                    options={sortOptions}
                    placeholder="Sort by..."
                />
            </div>
        </div>
    )
}
