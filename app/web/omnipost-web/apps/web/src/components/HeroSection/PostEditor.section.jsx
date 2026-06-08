import { useState , useRef } from "react";

export default function PostEditor({ onBack }) {
    const handleFiles = (files) => {
        const imageFiles = files.filter((file) =>
            file.type.startsWith("image/")
        );

        const mapped = imageFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...mapped]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    const [content, setContent] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef();

    const togglePlatform = (platform) => {
        setPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const platformList = ["Twitter", "LinkedIn", "Instagram"];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 📝 LEFT: Editor */}
            <div className="lg:col-span-2 space-y-5">
                <button
                    onClick={onBack}
                    className="text-sm text-text-secondary hover:text-text-primary mb-4"
                >
                    ← Back
                </button>
                {/* ✍️ Content Box */}
                <div className="bg-white rounded-2xl p-4 shadow-card border border-neutral-200">
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              className="w-full h-40 resize-none outline-none text-sm text-text-primary placeholder:text-text-secondary"
          />
                </div>

                {/* 🖼 Media Upload */}
                <div className="bg-white rounded-2xl p-4 shadow-card border border-neutral-200">
                    <p className="text-sm font-medium text-text-primary mb-2">
                        Media
                    </p>

                    {/* Upload Box */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const files = Array.from(e.dataTransfer.files);
                            handleFiles(files);
                        }}
                        className="border border-dashed border-neutral-300 rounded-xl p-6 text-center text-sm text-text-secondary cursor-pointer hover:bg-neutral-100 transition"
                    >
                        Upload images or drag & drop
                    </div>

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => handleFiles(Array.from(e.target.files))}
                    />

                    {/* Preview */}
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={img.preview}
                                        alt="preview"
                                        className="w-full h-24 object-cover rounded-lg"
                                    />

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 🕒 Schedule */}
                {/*<div className="bg-white rounded-2xl p-4 shadow-card border border-neutral-200">*/}
                {/*    <p className="text-sm font-medium text-text-primary mb-2">*/}
                {/*        Schedule*/}
                {/*    </p>*/}

                {/*    <input*/}
                {/*        type="datetime-local"*/}
                {/*        value={date}*/}
                {/*        onChange={(e) => setDate(e.target.value)}*/}
                {/*        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm outline-none"*/}
                {/*    />*/}
                {/*</div>*/}

            </div>

            {/* 📊 RIGHT: Settings / Preview */}
            <div className="space-y-5">

                {/* 🔗 Platform Selection */}
                <div className="bg-white rounded-2xl p-4 shadow-card border border-neutral-200">
                    <p className="text-sm font-medium text-text-primary mb-3">
                        Platforms
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {platformList.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => togglePlatform(platform)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition
                  ${
                                    platforms.includes(platform)
                                        ? "bg-primary text-white border-primary"
                                        : "text-text-secondary border-neutral-300 hover:border-primary"
                                }`}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 👁 Preview */}
                <div className="bg-white rounded-2xl p-4 shadow-card border border-neutral-200">
                    <p className="text-sm font-medium text-text-primary mb-2">
                        Preview
                    </p>

                    <div className="text-sm text-text-secondary whitespace-pre-wrap">
                        {content || "Your post preview will appear here..."}
                    </div>
                </div>

                {/* 🚀 Publish */}
                <button className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded-xl transition">
                    Publish Post
                </button>

            </div>

        </section>
    );
}