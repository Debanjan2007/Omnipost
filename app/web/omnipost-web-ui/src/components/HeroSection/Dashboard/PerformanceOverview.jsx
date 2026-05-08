export default function PerformanceOverview() {
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl p-5 shadow-card">

            <h2 className="text-lg font-semibold text-text-heading mb-8">
                Performance Overview
            </h2>

            <div className="grid grid-cols-3 gap-6">

                <div>
                    <p className="text-sm text-text-secondary mb-2">
                        Total Posts
                    </p>

                    <h3 className="text-4xl font-bold text-primary">
                        254
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-text-secondary mb-2">
                        Total Reach
                    </p>

                    <h3 className="text-4xl font-bold text-primary">
                        1.2M
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-text-secondary mb-2">
                        Avg. Engagement
                    </p>

                    <h3 className="text-4xl font-bold text-primary">
                        4.8%
                    </h3>
                </div>

            </div>

        </div>
    )
}