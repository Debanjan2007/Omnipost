import DashboardTabs from "./DashboardTabs";
import ActiveChannelsCard from "./ActiveChannelsCard";
import RecentActivityTable from "./RecentActivityTable";
import DashboardQuickPanel from "./DashboardQuickPanel";
import PerformanceOverview from "./PerformanceOverview";

export default function DashboardPage() {
    return (
        <section className="space-y-6">

            {/* 🔷 Top Navigation */}
            <DashboardTabs />

            {/* 📊 Top Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Active Channels */}
                <div className="xl:col-span-1">
                    <ActiveChannelsCard />
                </div>

                {/* Activity Table */}
                <div className="xl:col-span-2">
                    <RecentActivityTable />
                </div>

            </div>

            {/* 📈 Bottom Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">

                {/* Dashboard Quick Panel */}
                <div className="xl:col-span-2">
                    <DashboardQuickPanel />
                </div>

                {/* Performance */}
                <div className="xl:col-span-1">
                    <PerformanceOverview />
                </div>

            </div>

        </section>
    );
}