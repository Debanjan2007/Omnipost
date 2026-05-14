import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full h-12 md:h-16 bg-background border-b border-neutral-300 flex items-center justify-end px-4 md:px-6">

            {/* 👤 User Section */}
            <div
                className="relative flex items-center gap-2 md:gap-3 cursor-pointer"
                onClick={() => setOpen(!open)}
                ref={dropdownRef}
            >
                {/* Avatar */}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                    D
                </div>

                {/* Username (hidden on mobile) */}
                <span
                    onClick={() => navigate('userinfo')}
                    className="hidden cursor-pointer md:block text-sm font-medium text-text-primary">
          Debanjan
        </span>

                {/* Dropdown Icon (optional on mobile, visible on desktop) */}
                <svg
                    viewBox="0 0 24 24"
                    className={`hidden md:block w-4 h-4 stroke-current text-text-secondary transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>

                {/* 🔽 Dropdown Panel */}
                {open && (
                    <div className="absolute right-0 top-12 md:top-14 w-56 bg-white shadow-soft rounded-xl p-4 border border-neutral-200">

                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                                D
                            </div>

                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Debanjan
                                </p>
                                <p className="text-xs text-text-secondary">
                                    debanjan@email.com
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-neutral-200 my-2"></div>

                        {/* Actions */}
                        <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary py-1">
                            Profile
                        </button>
                        <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary py-1">
                            Logout
                        </button>

                    </div>
                )}
            </div>

        </header>
    );
}