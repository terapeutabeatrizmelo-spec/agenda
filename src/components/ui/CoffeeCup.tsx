import React from 'react';

export const CoffeeCup: React.FC<{ size?: number }> = ({ size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Steam Animation */}
            <g className="steam">
                <path
                    d="M8 3 Q 8 1, 9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                    className="steam-1"
                />
                <path
                    d="M12 2 Q 12 0, 13 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                    className="steam-2"
                />
                <path
                    d="M16 3 Q 16 1, 17 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                    className="steam-3"
                />
            </g>

            {/* Coffee Cup */}
            <path
                d="M4 8h16M6 8l1 10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Handle */}
            <path
                d="M18 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            <style>{`
                @keyframes steam {
                    0% {
                        transform: translateY(0);
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-8px);
                        opacity: 0;
                    }
                }

                .steam-1 {
                    animation: steam 2s ease-in-out infinite;
                    animation-delay: 0s;
                }

                .steam-2 {
                    animation: steam 2s ease-in-out infinite;
                    animation-delay: 0.3s;
                }

                .steam-3 {
                    animation: steam 2s ease-in-out infinite;
                    animation-delay: 0.6s;
                }
            `}</style>
        </svg>
    );
};
