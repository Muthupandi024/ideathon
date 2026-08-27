/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          dark: "#0B0F19",
          surface: "#111827",
          border: "rgba(56, 189, 248, 0.2)",
          cyan: "#00F0FF",
          blue: "#3B82F6",
          purple: "#9333EA",
          magenta: "#EC4899",
          gold: "#F59E0B",
          glow: "rgba(0, 240, 255, 0.15)",
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(147, 51, 234, 0.4)',
        'neon-magenta': '0 0 20px rgba(236, 72, 153, 0.4)',
        'neon-gold': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(circle, rgba(0, 240, 255, 0.07) 1px, transparent 1px)",
        'hero-gradient': "radial-gradient(circle at 50% 30%, rgba(147, 51, 234, 0.15) 0%, rgba(0, 240, 255, 0.08) 40%, rgba(3, 7, 18, 0.95) 100%)",
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.6))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
