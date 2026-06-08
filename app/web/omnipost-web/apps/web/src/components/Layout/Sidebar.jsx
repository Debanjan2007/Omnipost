import { NavLink } from "react-router-dom";
import { Icons as icons } from "../../assets/icons-svg.jsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
    const navigate = useNavigate();


    const navItems = [
        { name: "Dashboard", path: "/user/dashboard" },
        { name: "Create_Post", path: "/user/create" },
        { name: "Connected_Accounts", path: "/user/accounts" },
        { name: "History", path: "/user/history" },
        { name: "Settings", path: "/user/settings" },
    ];

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* 🧩 Sidebar */}
            <aside
                className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-primary-dark text-white flex flex-col px-4 py-6 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* 🔷 Logo */}
                <div className="flex items-center cursor-pointer gap-3 mb-8 px-2">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                        <img src="/logo.png" className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-semibold">OmniPost</span>
                </div>

                {/* 📌 Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setOpen(false)} // close on mobile click
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                ${
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
              <span className="w-5 h-5">
                <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  {icons[item.name]}
                </svg>
              </span>

                            <span className="text-sm font-medium">
                {item.name.replace("_", " ")}
              </span>
                        </NavLink>
                    ))}
                </nav>

                {/* 👤 Bottom Profile Section */}
                <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 py-2 hover:bg-white/5 rounded-xl cursor-pointer">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                            D
                        </div>

                        <div
                            onClick={() => navigate('userinfo')}
                            className="cursor-pointer"
                        >
                            <p className="text-sm font-medium">Debanjan</p>
                            <p className="text-xs text-white/60">View Profile</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}