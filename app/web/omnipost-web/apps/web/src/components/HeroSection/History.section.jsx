import { LogosSvg as logos} from '../../assets/logos-svg.jsx'

const historyData = [
    {
        id: 1,
        platform: "Twitter",
        content: "Check out our new feature to promote...",
        time: "Oct 26, 2023, 10:30 AM",
        status: "posted",
    },
    {
        id: 2,
        platform: "LinkedIn",
        content: "Just shared insights on snared moments...",
        time: "Oct 24, 2023, 3:15 PM",
        status: "posted",
    },
    {
        id: 3,
        platform: "LinkedIn",
        content: "Join our upcoming webinar...",
        time: "Oct 24, 2023, 3:15 PM",
        status: "failed",
    },
    {
        id: 4,
        platform: "Instagram",
        content: "Join our upcoming webinar...",
        time: "Oct 24, 2023, 3:15 PM",
        status: "failed",
    },
];

const StatusBadge = ({ status }) => {
    const isPosted = status === "posted";

    return (
        <div className="flex items-center gap-2">
      <span
          className={`w-2 h-2 rounded-full ${
              isPosted ? "bg-success" : "bg-error"
          }`}
      />
            <span
                className={`text-sm font-medium ${
                    isPosted
                        ? "text-success"
                        : "text-error"
                }`}
            >
        {isPosted ? "Posted" : "Failed"}
      </span>
        </div>
    );
};

const PlatformIcon = ({ platform }) => {
    return (
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-(--color-neutral-200)">
            {/* 👉 Add SVG icon based on platform here */}
            {/* Example:
          if (platform === "Twitter") return <TwitterIcon />
      */}
            {
                logos[platform]
            }
            <span className="text-xs text-(--color-text-secondary)">
      </span>
        </div>
    );
};

const HistoryItem = ({ item }) => {
    return (
        <div className="grid grid-cols-12 items-center px-4 py-3 border-b border-(--color-neutral-300) hover:bg-(--color-background-soft) transition">

            {/* Platform */}
            <div className="col-span-3 flex items-center gap-3">
                <PlatformIcon platform={item.platform} />
                <span className="text-sm text-text-primary">
          {item.platform}
        </span>
            </div>

            {/* Content */}
            <div className="col-span-5 text-sm text-(--color-text-secondary) truncate">
                {item.content}
            </div>

            {/* Timestamp */}
            <div className="col-span-2 text-sm text-(--color-text-secondary)">
                {item.time}
            </div>

            {/* Status */}
            <div className="col-span-2">
                <StatusBadge status={item.status} />
            </div>
        </div>
    );
};

const HistoryList = () => {
    return (
        <div className="bg-(--color-neutral-100) rounded-2xl shadow-(--shadow-card) overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-12 px-4 py-3 bg-(--color-background-muted) text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                <div className="col-span-3">Platform</div>
                <div className="col-span-5">Content Snippet</div>
                <div className="col-span-2">Timestamp</div>
                <div className="col-span-2">Status</div>
            </div>

            {/* List */}
            <div className="divide-y divide-(--color-neutral-200)">
                {historyData.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default HistoryList;