import { useState } from "react";
import PostEditor from "./PostEditor.section.jsx";

export default function PostHero() {
    const [showEditor, setShowEditor] = useState(false);

    // 🔁 Switch to editor
    if (showEditor) {
        return <PostEditor onBack={() => setShowEditor(false)} />;
    }

    return (
        <section className="w-full bg-background-soft rounded-2xl p-5 md:p-6 shadow-card">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* 📝 Left Content */}
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-text-heading">
                        Create & Schedule Posts
                    </h1>

                    <p className="text-sm text-text-secondary mt-1 max-w-md">
                        Write, preview, and publish content across all your connected platforms in one place.
                    </p>
                </div>

                {/* 🚀 Actions */}
                <div className="flex items-center gap-3">

                    {/* Primary CTA */}
                    <button
                        onClick={() => setShowEditor(true)}
                        className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition"
                    >
                        + Create Post
                    </button>

                    {/* Secondary CTA */}
                    <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition">
                        View Drafts
                    </button>

                </div>

            </div>
        </section>
    );
}