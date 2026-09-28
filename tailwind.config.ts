import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#292D77",        // Bleu Principal Officiel
          blueLight: "#3E449E",   // Bleu plus clair
          blueDark: "#1B1E54",    // Bleu nuit profond
          blueMuted: "#EEF0FA",   // Bleu doux
          red: "#D72229",         // Rouge Principal Officiel
          redLight: "#E83A41",    // Rouge vif
          redDark: "#AB161C",     // Rouge profond
          redMuted: "#FDF1F1",    // Rouge doux
          white: "#FFFEFC",       // Blanc cassé chaud Officiel
          cream: "#FFFEFC",       // Alias blanc cassé
          dark: "#14172B",        // Noir doux ardoise
          slate: "#3E4357",       // Gris texte secondaire
          light: "#FFFEFC",       // Fond par défaut
          card: "#FFFFFF",        // Carte
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Petrosans", "PetroSans", "Petro Sans", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Neulis Alt", "NeulisAlt", "Outfit", "system-ui", "sans-serif"],
        title: ["var(--font-heading)", "Neulis Alt", "NeulisAlt", "Outfit", "system-ui", "sans-serif"],
        subtitle: ["var(--font-subtitle)", "Petrosans", "PetroSans", "Petro Sans", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        '30': '30px',
        'btn': '30px',
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
        glow: "0 0 25px -5px rgba(37, 99, 235, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
