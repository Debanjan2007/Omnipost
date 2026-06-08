import { LogosSvg as Logos } from "../../../assets/logos-svg.jsx";
import { useNavigate } from "react-router-dom";

const posts = [
    {
        platform: "Twitter",
        content: "Compare to OmniP...",
        date: "Oct 26, 11:30 AM",
        status: "Published",
    },
    {
        platform: "LinkedIn",
        content: "LinkedIn to contra...",
        date: "Oct 26, 11:30 AM",
        status: "Scheduled",
    },
    {
        platform: "Instagram",
        content: "Instagram of new ...",
        date: "Oct 26, 11:30 AM",
        status: "Scheduled",
    }
];

export default function RecentActivityTable() {
    const navigate = useNavigate();
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl overflow-hidden shadow-card">

            {/* 🔷 Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-300">

                <h2 className="text-lg font-semibold text-text-heading">
                    Recent Activity
                </h2>

                <button
                    onClick={() => navigate('/history')}
                    className="border border-neutral-300 px-4 py-2 rounded-xl text-sm hover:bg-white transition">
                    View All Posts
                </button>

            </div>

            {/* 📊 Table */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-175 text-sm">

                    {/* Table Head */}
                    <thead className="bg-primary-light/10 text-text-secondary">
                    <tr>

                        <th className="text-left px-5 py-3 font-medium">
                            Platform
                        </th>

                        <th className="text-left px-5 py-3 font-medium">
                            Content Snippet
                        </th>

                        <th className="text-left px-5 py-3 font-medium">
                            Timestamp
                        </th>

                        <th className="text-left px-5 py-3 font-medium">
                            Status
                        </th>

                    </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>

                    {posts.map((post, i) => {

                        const Icon = Logos?.[post.platform];

                        return (
                            <tr
                                key={i}
                                className="border-t border-neutral-200 hover:bg-white/60 transition"
                            >

                                {/* 🔹 Platform */}
                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-3">

                                        {/* SVG Wrapper */}
                                        <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0">

                                            <div className="w-6 h-6 flex items-center justify-center">
                                                {Icon}
                                            </div>

                                        </div>

                                        <span className="text-text-primary font-medium">
                                            {post.platform}
                                        </span>

                                    </div>

                                </td>

                                {/* 📝 Content */}
                                <td className="px-5 py-4 text-text-primary max-w-[260px] truncate">
                                    {post.content}
                                </td>

                                {/* 📅 Timestamp */}
                                <td className="px-5 py-4 text-text-secondary whitespace-nowrap">
                                    {post.date}
                                </td>

                                {/* 🚦 Status */}
                                <td className="px-5 py-4">

                                    <span
                                        className={`text-sm font-medium ${
                                            post.status === "Published"
                                                ? "text-primary"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {post.status}
                                    </span>

                                </td>

                            </tr>
                        );
                    })}

                    </tbody>

                </table>

            </div>

        </div>
    );
}