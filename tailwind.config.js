/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'steam': 'steam 2s ease-in-out infinite',
            },
            keyframes: {
                steam: {
                    '0%': { transform: 'translateY(0)', opacity: '0.7' },
                    '50%': { opacity: '0.3' },
                    '100%': { transform: 'translateY(-8px)', opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
