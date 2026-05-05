import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Layout/Sidebar.jsx";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx"

export default function AppLayout() {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">

                <Header />

                <main className="flex-1 bg-background p-4 md:p-6">
                    <Outlet />
                </main>

                <Footer />

            </div>
        </div>
    );
}