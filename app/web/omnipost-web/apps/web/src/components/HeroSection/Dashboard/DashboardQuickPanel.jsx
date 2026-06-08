import { useNavigate } from "react-router-dom";

export default function DashboardQuickPanel() {
    const navigate = useNavigate();
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl p-5 shadow-card h-full">

            {/* 🔷 Header */}
            <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-semibold text-text-heading">
                    Dashboard
                </h2>

                <button
                    onClick={() => navigate('/history')}
                    className="text-sm text-text-secondary hover:text-text-primary transition whitespace-nowrap">
                    View All Posts
                </button>

            </div>

            {/* 📊 Quick Actions */}
            <div className="space-y-5">

                {/* Drafts */}
                <button className="flex items-center gap-3 text-text-primary hover:text-primary transition">

                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-current shrink-0"
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 3h9l5 5v13H6z"/>
                    </svg>

                    <span className="text-sm md:text-base">
                        Drafts (14)
                    </span>

                </button>

                {/* Analytics */}
                <button className="flex items-center gap-3 text-text-primary hover:text-primary transition">

                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-current shrink-0"
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 18V9"/>
                        <path d="M12 18V5"/>
                        <path d="M19 18v-3"/>
                    </svg>

                    <span className="text-sm md:text-base">
                        Analytics
                    </span>

                </button>

            </div>

        </div>
    );
}