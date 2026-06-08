import { Link } from "react-router-dom";

export default function SignupPage() {
    return (
        <section className="min-h-screen bg-[#F7F5F2] flex items-center justify-center px-5 relative overflow-hidden">

            {/* 🔮 Background Glow */}
            <div className="absolute w-72 h-72 bg-primary/15 blur-3xl rounded-full top-10 left-10"></div>

            <div className="absolute w-72 h-72 bg-primary-light/20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* 🔷 Signup Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 px-6 sm:px-8 py-8 sm:py-10">

                {/* Logo */}
                <div className="flex justify-center mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-primary-light/10 flex items-center justify-center shadow-sm">

                        <img
                            src="/logo.png"
                            alt="OmniPost Logo"
                            className="w-9 h-9 object-contain"
                        />

                    </div>

                </div>

                {/* Heading */}
                <div className="text-center">

                    <h1 className="text-3xl font-bold text-text-heading">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-text-secondary text-sm sm:text-base">
                        Start managing all your social platforms in one place.
                    </p>

                </div>

                {/* Auth Buttons */}
                <div className="mt-8 flex flex-col gap-4">

                    {/* Google Signup */}
                    <button className="w-full h-14 bg-primary-light hover:bg-primary text-white rounded-2xl transition shadow-md flex items-center justify-center gap-4 font-medium text-sm sm:text-base">

                        {/* Icon Box */}
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">

                            <svg
                                viewBox="0 0 48 48"
                                className="w-5 h-5"
                            >
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.5 16.3 44 24 44z"/>
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6 7.1l6.2 5.2C39.2 36.9 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
                            </svg>

                        </div>

                        <span>
                            Sign up with Google
                        </span>

                    </button>

                    {/* GitHub Signup */}
                    <button className="w-full h-14 border border-neutral-300 hover:border-primary bg-white rounded-2xl transition shadow-sm flex items-center justify-center gap-4 font-medium text-text-primary text-sm sm:text-base">

                        {/* Icon Box */}
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">

                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-black"
                            >
                                <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.6 2.6 2.6 1.8.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.7C23.2 5.4 18.3.5 12 .5z"/>
                            </svg>

                        </div>

                        <span>
                            Sign up with GitHub
                        </span>

                    </button>

                </div>

                {/* Terms */}
                <p className="mt-6 text-xs sm:text-sm text-center text-text-secondary leading-relaxed">

                    By creating an account, you agree to our{" "}

                    <button className="text-primary hover:text-primary-dark font-medium transition">
                        Terms
                    </button>

                    {" "}and{" "}

                    <button className="text-primary hover:text-primary-dark font-medium transition">
                        Privacy Policy
                    </button>

                </p>

                {/* Bottom Text */}
                <div className="mt-8 text-center text-sm text-text-secondary">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-primary hover:text-primary-dark font-medium transition"
                    >
                        Sign in
                    </Link>

                </div>

            </div>

        </section>
    );
}