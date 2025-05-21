import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";
import { keyframes, animation } from "./src/styles/animations";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors,
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))',
        'gradient-hover': 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
      },
      keyframes,
      animation,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;