import React from "react";

type LoadingProps = {
    fullscreen?: boolean;
    size?: number;
    color?: string;
};

const Loading: React.FC<LoadingProps> = ({
    fullscreen = false,
    size = 40,
    color = "#3498db",
}) => {
    return (
        <div
            className={`flex items-center justify-center ${fullscreen ? "fixed inset-0 bg-black/40 z-50" : "w-full h-full"
                }`}
            role="status"
            aria-live="polite"
        >
            {/* SVG gradient spinner */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                className="animate-spin-slow"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="50%" stopColor="#ff7ab6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <circle cx="25" cy="25" r="20" stroke="url(#grad)" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="31.4 31.4" />
            </svg>

            {/* Optional label */}
            <span className="sr-only">Loading...</span>

            <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.2s cubic-bezier(.4,.0,.2,1) infinite;
          transform-origin: center;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loading;
