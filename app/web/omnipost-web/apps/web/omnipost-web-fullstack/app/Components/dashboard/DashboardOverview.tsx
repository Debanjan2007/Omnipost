/**
 * DashboardOverview — thin orchestrator component.
 *
 * This file's only job is to compose the seven dashboard sections in order
 * and apply the shared page-level padding/max-width constraint.
 *
 * Each section is self-contained:
 *   - Imports its own data from ../data/
 *   - Owns its own state (tab, prompt, etc.)
 *   - Uses shared UI atoms from ../ui/
 *
 * To add a new section: create it in sections/, export it from sections/index.ts,
 * and add a single line here.
 */

import { HeroSection }        from "./sections/HeroSection"
import { AnalyticsSection }   from "./sections/AnalyticsSection"
import { PerformanceSection } from "./sections/PerformanceSection"
import { ContentSection }     from "./sections/ContentSection"
import { ActivitySection }    from "./sections/ActivitySection"
import { PlatformsSection }   from "./sections/PlatformsSection"
import { AIAssistantSection } from "./sections/AIAssistantSection"

interface DashboardOverviewProps {
    /** User's first name passed from the server-side page component. */
    firstName: string
}

export function DashboardOverview({ firstName }: DashboardOverviewProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 max-w-[1400px] mx-auto">
            <HeroSection        firstName={firstName} />
            <AnalyticsSection />
            <PerformanceSection />
            <ContentSection />
            <ActivitySection />
            <PlatformsSection />
            <AIAssistantSection />
        </div>
    )
}
