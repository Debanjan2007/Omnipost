import { LogosSvg as Logos } from '../../../assets/logos-svg.jsx'
import { useNavigate } from "react-router-dom";

const channels = [
    {
        id: 1,
        name: "Twitter",
        connected: true,
    },
    {
        id: 2,
        name: "LinkedIn",
        connected: true,
    },
    {
        id: 3,
        name: "Instagram",
        connected: true,
    },
];

export default function ActiveChannelsCard() {
    const navigate = useNavigate();
    return (
        <div className="bg-background-soft border border-neutral-300 rounded-2xl p-5 shadow-card">

            <h2 className="text-lg font-semibold text-text-heading mb-5">
                Active Channels
            </h2>

            {/* Channels */}
            <div className="flex items-center gap-3 flex-wrap mb-6">

                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center hover:border-primary-light transition"
                    >
                        {
                            Logos[channel.name]
                        }
                    </div>
                ))}

                {/* Add New */}
                <button
                    onClick={() => navigate('/accounts')}
                    className="w-12 h-12 rounded-xl border border-dashed border-neutral-300 flex items-center justify-center text-text-secondary hover:bg-white hover:border-primary transition">
                    +
                </button>

            </div>

            {/* CTA */}
            <button
                onClick={() => navigate('/accounts')}
                className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-medium py-3 rounded-xl transition">
                Connect a new Channel
            </button>

        </div>
    );
}