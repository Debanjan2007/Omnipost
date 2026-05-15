import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Layout/Sidebar.jsx";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx"
import { useState } from 'react';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex">

            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col min-h-screen min-w-0">

                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto hide-scrollbar bg-background p-4 md:p-6">
                    <Outlet />
                </main>

                <Footer />

            </div>
        </div>
    );
}