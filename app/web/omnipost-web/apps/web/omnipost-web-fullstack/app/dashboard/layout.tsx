import type { ReactNode } from "react"
import { Sidebar } from "@/app/Components/Sidebar"
import { DashboardNav } from "@/app/Components/DashboardNav"

/**
 * DashboardLayout
 *
 * Shared shell for every route under /dashboard:
 *   /dashboard          → page.tsx (overview)
 *   /dashboard/create   → create/page.tsx
 *   /dashboard/accounts → accounts/page.tsx
 *   /dashboard/history  → history/page.tsx
 *   /dashboard/settings → settings/page.tsx
 *
 * Structure:
 *   ┌──────────┬─────────────────────────────────┐
 *   │          │  DashboardNav (sticky top bar)  │
 *   │ Sidebar  ├─────────────────────────────────┤
 *   │ (lg+)    │  {children}  (scrollable main)  │
 *   └──────────┴─────────────────────────────────┘
 *
 * On mobile the Sidebar is hidden; DashboardNav's hamburger
 * opens it inside a Sheet overlay.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">

            {/* Fixed-width purple sidebar — desktop only */}
            <Sidebar />

            {/* Flexible right column */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

                {/* Slim sticky navbar */}
                <DashboardNav />

                {/* Scrollable page content — each route's page.tsx renders here */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    )
}
