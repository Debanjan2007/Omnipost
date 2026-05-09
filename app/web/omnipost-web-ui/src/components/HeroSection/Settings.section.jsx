import { useState } from "react";

export default function SettingsPage() {

    const [formData, setFormData] = useState({
        fullName: "Debanjan",
        email: "debanjan@email.com",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        profileImage: "",
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section className="space-y-6">

            {/* 🔷 Header */}
            <div>
                <h1 className="text-2xl font-semibold text-text-heading">
                    Settings
                </h1>

                <p className="text-sm text-text-secondary mt-1">
                    Manage your account preferences and security settings.
                </p>
            </div>

            {/* ⚙️ Main Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

                {/* 👤 Profile Card */}
                {/* 👤 Profile Card */}
                <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                    <div className="flex flex-col items-center text-center">

                        {/* 👤 Hidden File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            id="profile-upload"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                const imageUrl = URL.createObjectURL(file);

                                setFormData((prev) => ({
                                    ...prev,
                                    profileImage: imageUrl,
                                }));
                            }}
                        />

                        {/* 👤 Avatar */}
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">

                            <img
                                src={
                                    formData.profileImage ||
                                    "https://i.pravatar.cc/200"
                                }
                                alt="User"
                                className="w-full h-full object-cover"
                            />

                        </div>

                        {/* 👤 Name */}
                        <h2 className="text-lg font-semibold text-text-heading">
                            {formData.fullName}
                        </h2>

                        {/* 📧 Email */}
                        <p className="text-sm text-text-secondary mt-1">
                            {formData.email}
                        </p>

                        {/* 📤 Upload Button */}
                        <label
                            htmlFor="profile-upload"
                            className="mt-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer inline-flex items-center justify-center"
                        >
                            Change Profile Photo
                        </label>

                    </div>

                </div>
                {/* 🔐 Settings Panel */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Account Info */}
                    <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                        <h2 className="text-lg font-semibold text-text-heading mb-6">
                            Account Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Full Name */}
                            <div>
                                <label className="text-sm text-text-secondary mb-2 block">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-text-secondary mb-2 block">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                        </div>

                    </div>

                    {/* 🔒 Change Password */}
                    <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            {/* Left */}
                            <div>
                                <h2 className="text-lg font-semibold text-text-heading">
                                    Password & Security
                                </h2>

                                <p className="text-sm text-text-secondary mt-1">
                                    Update your password and secure your account.
                                </p>
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-3 rounded-xl transition whitespace-nowrap"
                            >
                                Change Password
                            </button>

                        </div>

                    </div>
                    {/* 🚪 Actions */}
                    <div className="bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            {/* Left */}
                            <div>
                                <h2 className="text-lg font-semibold text-text-heading">
                                    Account Actions
                                </h2>

                                <p className="text-sm text-text-secondary mt-1">
                                    Manage session and security related actions.
                                </p>
                            </div>

                            {/* Right Buttons */}
                            <div className="flex items-center gap-4 md:gap-6">

                                {/* Save */}
                                <button className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-3 rounded-xl transition whitespace-nowrap">
                                    Save Changes
                                </button>

                                {/* Logout */}
                                <button className="border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium px-5 py-3 rounded-xl transition whitespace-nowrap">
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {showPasswordModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                    <div className="w-full max-w-lg bg-background-soft border border-neutral-300 rounded-2xl p-6 shadow-card relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowPasswordModal(false)}
                            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition"
                        >
                            ✕
                        </button>

                        {/* Heading */}
                        <h2 className="text-xl font-semibold text-text-heading mb-6">
                            Change Password
                        </h2>

                        {/* Form */}
                        <div className="space-y-5">

                            {/* Current Password */}
                            <div>
                                <label className="text-sm text-text-secondary mb-2 block">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="text-sm text-text-secondary mb-2 block">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm text-text-secondary mb-2 block">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2">

                                <button
                                    onClick={() => setShowPasswordModal(false)}
                                    className="border border-neutral-300 px-4 py-2 rounded-xl text-sm hover:bg-white transition"
                                >
                                    Cancel
                                </button>

                                <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                                    Update Password
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}
        </section>
    );
}