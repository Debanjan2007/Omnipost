import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full border-t border-neutral-300 bg-background px-4 md:px-6 py-3">

            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm text-text-secondary">

                {/* Left */}
                <p>
                    © {new Date().getFullYear()} OmniPost. All rights reserved.
                </p>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <Link to="/about" className="hover:text-text-primary transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-text-primary transition-colors">
                        Contact
                    </Link>
                    <button className="hover:text-text-primary transition-colors">
                        Privacy
                    </button>
                    <button className="hover:text-text-primary transition-colors">
                        Terms
                    </button>
                    <button className="hover:text-text-primary transition-colors">
                        Support
                    </button>
                </div>

            </div>

        </footer>
    );
}