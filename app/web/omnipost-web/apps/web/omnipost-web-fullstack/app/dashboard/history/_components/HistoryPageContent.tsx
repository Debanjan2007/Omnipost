"use client"

import { useState, useMemo } from "react"
import { Download, RefreshCw, Layers, List, Clock, Filter } from "lucide-react"

import { MOCK_HISTORY_EVENTS, type HistoryEvent } from "./data/historyData"
import { SummaryCards } from "./sections/SummaryCards"
import { FiltersSection } from "./sections/FiltersSection"
import { ActivityListView } from "./sections/ActivityListView"
import { ActivityTimelineView } from "./sections/ActivityTimelineView"
import { EventDetailsPanel } from "./sections/EventDetailsPanel"
import { EmptyState } from "./sections/EmptyState"
import { cn } from "@/lib/utils"

export function HistoryPageContent() {
    const [events, setEvents] = useState<HistoryEvent[]>(MOCK_HISTORY_EVENTS)
    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(MOCK_HISTORY_EVENTS[0])
    const [viewMode, setViewMode] = useState<"list" | "timeline">("list")
    const [refreshing, setRefreshing] = useState(false)

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [platformFilter, setPlatformFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [sortOption, setSortOption] = useState("recent")

    // Actions
    const handleRetryEvent = (eventId: string) => {
        setEvents(prev => prev.map(ev => {
            if (ev.id === eventId) {
                return {
                    ...ev,
                    status: "Published",
                    timestamp: "Just now",
                    publishedTime: "Just now",
                    publishingDuration: "2.5 seconds",
                    webhookStatus: "active",
                    apiResponse: '{"status": 200, "message": "Manual retry success", "retry_id": "90831"}',
                    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 }
                }
            }
            return ev
        }))
        // Refresh details side panel if opened
        setTimeout(() => {
            setSelectedEvent(prev => {
                if (prev?.id === eventId) {
                    const match = events.find(e => e.id === eventId)
                    return match ? {
                        ...match,
                        status: "Published",
                        timestamp: "Just now",
                        publishedTime: "Just now",
                        webhookStatus: "active",
                        publishingDuration: "2.5 seconds"
                    } : null
                }
                return prev
            })
        }, 100)
    }

    const handleDuplicateEvent = (event: HistoryEvent) => {
        const duplicated: HistoryEvent = {
            ...event,
            id: `ev-${Date.now()}`,
            status: "Draft",
            timestamp: "Draft saved today",
            createdTime: "Just now",
            publishedTime: undefined,
            scheduledTime: undefined,
            webhookStatus: "inactive",
            apiResponse: undefined,
            engagement: undefined
        }
        setEvents(prev => [duplicated, ...prev])
        setSelectedEvent(duplicated)
    }

    const handleDeleteEvent = (eventId: string) => {
        if (confirm("Are you sure you want to delete this activity log?")) {
            setEvents(prev => prev.filter(ev => ev.id !== eventId))
            if (selectedEvent?.id === eventId) {
                setSelectedEvent(null)
            }
        }
    }

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 800)
    }

    const handleExport = () => {
        alert("Exporting CSV report for your publishing events history logs...")
    }

    // Filter computation
    const filteredEvents = useMemo(() => {
        return events
            .filter(ev => {
                const queryMatch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   ev.caption.toLowerCase().includes(searchQuery.toLowerCase())
                const platformMatch = platformFilter === "all" || ev.platform === platformFilter
                const statusMatch = statusFilter === "all" || ev.status === statusFilter
                const typeMatch = typeFilter === "all" || ev.contentType === typeFilter
                return queryMatch && platformMatch && statusMatch && typeMatch
            })
            .sort((a, b) => {
                if (sortOption === "recent") return b.id.localeCompare(a.id)
                if (sortOption === "oldest") return a.id.localeCompare(b.id)
                if (sortOption === "platform") return a.platform.localeCompare(b.platform)
                if (sortOption === "status") return a.status.localeCompare(b.status)
                return 0
            })
    }, [events, searchQuery, platformFilter, statusFilter, typeFilter, sortOption])

    // Metric Counts
    const publishedCount = events.filter(e => e.status === "Published").length
    const scheduledCount = events.filter(e => e.status === "Scheduled").length
    const failedCount = events.filter(e => e.status === "Failed").length
    const draftCount = events.filter(e => e.status === "Draft").length

    return (
        <div className="h-full flex flex-col overflow-hidden">
            
            {/* Header section */}
            <header className="shrink-0 border-b border-border bg-card/85 backdrop-blur-sm px-5 py-4 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-base font-bold text-foreground tracking-tight">Publishing History</h1>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">Track and review every publishing activity across all connected social channels.</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {/* View Switch toggle */}
                    <div className="flex bg-muted rounded-xl p-0.5 border border-border/40 mr-1.5">
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all",
                                viewMode === "list" && "bg-card text-foreground shadow-sm"
                            )}
                            title="List Log View"
                        >
                            <List size={13} />
                        </button>
                        <button
                            onClick={() => setViewMode("timeline")}
                            className={cn(
                                "p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all",
                                viewMode === "timeline" && "bg-card text-foreground shadow-sm"
                            )}
                            title="Chronological Timeline"
                        >
                            <Clock size={13} />
                        </button>
                    </div>

                    <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-semibold transition-all"
                    >
                        <Download size={12} />
                        <span className="hidden sm:inline">Export History</span>
                    </button>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="w-8 h-8 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
                        title="Refresh Logs"
                    >
                        <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
                    </button>
                </div>
            </header>

            {/* Content area */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                
                {/* Left Area (timeline content + filter stats) */}
                <div className="flex-1 overflow-y-auto min-w-0">
                    <div className="p-5 sm:p-6 space-y-6 max-w-5xl mx-auto lg:max-w-none">
                        
                        <SummaryCards
                            publishedCount={publishedCount}
                            scheduledCount={scheduledCount}
                            failedCount={failedCount}
                            draftCount={draftCount}
                        />

                        <FiltersSection
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            platformFilter={platformFilter}
                            setPlatformFilter={setPlatformFilter}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />

                        {filteredEvents.length === 0 ? (
                            <EmptyState onCreatePostClick={() => {}} />
                        ) : viewMode === "timeline" ? (
                            <ActivityTimelineView
                                events={filteredEvents}
                                onSelectEvent={(e) => setSelectedEvent(e)}
                            />
                        ) : (
                            <ActivityListView
                                events={filteredEvents}
                                onSelectEvent={(e) => setSelectedEvent(e)}
                                onRetryEvent={handleRetryEvent}
                                onDuplicateEvent={handleDuplicateEvent}
                                onDeleteEvent={handleDeleteEvent}
                            />
                        )}

                        <div className="h-10" />
                    </div>
                </div>

                {/* Right Details Slide Panel */}
                {selectedEvent && (
                    <EventDetailsPanel
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                        onRetry={handleRetryEvent}
                        onDuplicate={handleDuplicateEvent}
                    />
                )}

            </div>

        </div>
    )
}
