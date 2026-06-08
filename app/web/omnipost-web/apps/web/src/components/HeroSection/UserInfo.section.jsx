import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
    const navigate = useNavigate();
    const user = {
        fullName: "Debanjan",
        username: "@debanjan",
        email: "debanjan@email.com",
        bio: "Building OmniPost 🚀 | Full-stack & DevOps enthusiast.",
        joined: "January 2025",
        profileImage: "https://i.pravatar.cc/300",
        location: "India",
        website: "https://omnipost.deba.in",
        connectedPlatforms: 5,
        totalPosts: 254,
        totalReach: "1.2M",
    };

    return (
        <section className="space-y-6">

            {/* 🔷 Hero Card */}
            <div className="bg-background-soft border border-neutral-300 rounded-3xl shadow-card overflow-hidden">

                {/* Banner */}
                <div className="h-40 bg-gradient-to-r from-primary-dark via-primary to-primary-light"></div>

                {/* Content */}
                <div className="px-6 pb-6">

                    {/* Avatar + Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 -mt-14">

                        {/* Left */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white shrink-0">

                                <img
                                    src={user.profileImage}
                                    alt={user.fullName}
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            {/* Info */}
                            <div className="pb-1">

                                <h1 className="text-2xl font-semibold text-text-heading">
                                    {user.fullName}
                                </h1>

                                <p className="text-sm text-text-secondary mt-1">
                                    {user.username}
                                </p>

                            </div>

                        </div>

                        {/* Action */}
                        <button
                            onClick={() => navigate('settings')}
                            className="bg-primary cursor-pointer hover:bg-primary-dark text-white text-sm font-medium px-5 py-3 rounded-xl transition whitespace-nowrap">
                            Edit Profile
                        </button>

                    </div>

                    {/* Bio */}
                    <div className="mt-6">

                        <p className="text-text-primary leading-relaxed max-w-3xl">
                            {user.bio}
                        </p>

                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-text-secondary">

                        {/* Location */}
                        <div className="flex items-center gap-2">

                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4 stroke-current"
                                fill="none"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"/>
                                <circle cx="12" cy="10" r="2"/>
                            </svg>

                            <span>{user.location}</span>

                        </div>

                        {/* Joined */}
                        <div className="flex items-center gap-2">

                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4 stroke-current"
                                fill="none"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M8 2v4"/>
                                <path d="M16 2v4"/>
                                <rect x="3" y="6" width="18" height="15" rx="2"/>
                            </svg>

                            <span>Joined {user.joined}</span>

                        </div>

                        {/* Website */}
                        <a
                            href={user.website}
                            target="_blank"
                            className="flex items-center gap-2 hover:text-primary transition"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4 stroke-current"
                                fill="none"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 12"/>
                                <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 12"/>
                            </svg>

                            <span>
                                omnipost.deba.in
                            </span>

                        </a>

                    </div>

                </div>

            </div>

            {/* 📊 Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Posts */}
                <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                    <p className="text-sm text-text-secondary mb-2">
                        Total Posts
                    </p>

                    <h2 className="text-4xl font-bold text-primary">
                        {user.totalPosts}
                    </h2>

                </div>

                {/* Reach */}
                <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                    <p className="text-sm text-text-secondary mb-2">
                        Total Reach
                    </p>

                    <h2 className="text-4xl font-bold text-primary">
                        {user.totalReach}
                    </h2>

                </div>

                {/* Platforms */}
                <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                    <p className="text-sm text-text-secondary mb-2">
                        Connected Platforms
                    </p>

                    <h2 className="text-4xl font-bold text-primary">
                        {user.connectedPlatforms}
                    </h2>

                </div>

            </div>

        </section>
    );
}