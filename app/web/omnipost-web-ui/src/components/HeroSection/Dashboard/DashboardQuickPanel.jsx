export default function DashboardQuickPanel() {
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl p-5 shadow-card min-h-[240px] relative overflow-hidden">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-semibold text-text-heading">
                    Dashboard
                </h2>

                <button className="text-sm text-text-secondary hover:text-text-primary transition">
                    View All Posts
                </button>

            </div>

            <div className="space-y-5">

                <button className="flex items-center gap-3 text-text-primary hover:text-primary transition">

                    {/* TODO: Draft SVG */}
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-current"
                        fill="none"
                        strokeWidth="1.8"
                    >
                        <path d="M6 3h9l5 5v13H6z"/>
                    </svg>

                    <span>Drafts (14)</span>

                </button>

                <button className="flex items-center gap-3 text-text-primary hover:text-primary transition">

                    {/* TODO: Analytics SVG */}
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-current"
                        fill="none"
                        strokeWidth="1.8"
                    >
                        <path d="M5 18V9"/>
                        <path d="M12 18V5"/>
                        <path d="M19 18v-3"/>
                    </svg>

                    <span>Analytics</span>

                </button>

            </div>

        </div>
    )
}