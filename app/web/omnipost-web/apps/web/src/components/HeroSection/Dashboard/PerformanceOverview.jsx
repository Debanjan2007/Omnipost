export default function PerformanceOverview() {
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl p-5 shadow-card">

            {/* 🔷 Heading */}
            <h2 className="text-lg font-semibold text-text-heading mb-8">
                Performance Overview
            </h2>

            {/* 📊 Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Total Posts */}
                <div className="min-w-0">

                    <p className="text-sm text-text-secondary mb-2 whitespace-nowrap">
                        Total Posts
                    </p>

                    <h3 className="text-3xl md:text-4xl font-bold text-primary leading-none">
                        254
                    </h3>

                </div>

                {/* Total Reach */}
                <div className="min-w-0">

                    <p className="text-sm text-text-secondary mb-2 whitespace-nowrap">
                        Total Reach
                    </p>

                    <h3 className="text-3xl md:text-4xl font-bold text-primary leading-none">
                        1.2M
                    </h3>

                </div>

                {/* Avg Engagement */}
                <div className="min-w-0">

                    <p className="text-sm text-text-secondary mb-2 whitespace-nowrap">
                        Avg. Engagement
                    </p>

                    <h3 className="text-3xl md:text-4xl font-bold text-primary leading-none">
                        4.8%
                    </h3>

                </div>

            </div>

        </div>
    );
}