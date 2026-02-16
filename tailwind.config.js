/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dc2626",    // Red 600
        accent: "#ef4444",     // Red 500
        dark: "#050505",       // Near black
        surface: "#0a0a0a",    // Dark surface
        "surface-light": "#141414", // Lighter surface
        "border-color": "#1f1f1f", // Border
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'text-gradient': 'gradient-xy 4s linear infinite',
        'border-flow': 'borderFlow 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(220, 38, 38, 0.4)' },
        },
        'gradient-xy': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderFlow: {
          '0%, 100%': { borderColor: 'rgba(220, 38, 38, 0.3)' },
          '50%': { borderColor: 'rgba(220, 38, 38, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
