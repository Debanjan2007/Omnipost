import { useNavigate } from "react-router-dom";

export default function DashboardTabs() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between mb-6">

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-neutral-300 w-full">

                <button className="pb-3 text-sm font-medium text-primary border-b-2 border-primary">
                    Overview
                </button>

                <button className="pb-3 text-sm font-medium text-text-secondary hover:text-text-primary transition">
                    Calendar
                </button>

            </div>

            {/* Create Post */}
            <button
                onClick={() => navigate('/create')}
                className="ml-6 shrink-0 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                Create Post
            </button>

        </div>
    )
}