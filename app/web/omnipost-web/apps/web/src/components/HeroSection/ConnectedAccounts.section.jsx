import { useState } from "react";
import { LogosSvg as Logos} from '../../assets/logos-svg.jsx'

const initialPlatforms = [
    { name: "Twitter", connected: false },
    { name: "LinkedIn", connected: true },
    { name: "Instagram", connected: false },
    { name: "Facebook", connected: false },
];

export default function ConnectedAccounts() {
    const [platforms, setPlatforms] = useState(initialPlatforms);

    const toggleConnection = (name) => {
        setPlatforms((prev) =>
            prev.map((p) =>
                p.name === name ? { ...p, connected: !p.connected } : p
            )
        );
    };

    return (
        <section className="space-y-6">

            {/* 🔷 Header */}
            <div>
                <h1 className="text-xl md:text-2xl font-semibold text-text-heading">
                    Connected Accounts
                </h1>
                <p className="text-sm text-text-secondary mt-1">
                    Manage and connect your social media platforms.
                </p>
            </div>

            {/* 📦 Platforms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {platforms.map((platform) => (
                    <div
                        key={platform.name}
                        className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-card flex flex-col justify-between"
                    >
                        {/* Top */}
                        <div className="flex items-center justify-between mb-4">

                            {/* Icon placeholder */}
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                                {/* TODO: Add SVG icon here */}
                                {
                                    Logos[platform.name]
                                }
                                <span className="text-xs text-text-secondary">
                </span>
                            </div>

                            {/* Status */}
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded-lg ${
                                    platform.connected
                                        ? "bg-green-100 text-green-600"
                                        : "bg-neutral-100 text-text-secondary"
                                }`}
                            >
                {platform.connected ? "Connected" : "Not Connected"}
              </span>
                        </div>

                        {/* Name */}
                        <h2 className="text-sm font-medium text-text-primary mb-3">
                            {platform.name}
                        </h2>

                        {/* Action */}
                        <button
                            onClick={() => toggleConnection(platform.name)}
                            className={`text-sm font-medium px-3 py-2 rounded-xl transition ${
                                platform.connected
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-primary text-white hover:bg-primary-dark"
                            }`}
                        >
                            {platform.connected ? "Disconnect" : "Connect"}
                        </button>
                    </div>
                ))}

            </div>

        </section>
    );
}