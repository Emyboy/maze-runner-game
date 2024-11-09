/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#ffffff",
        "card-foreground": "#333333",
        muted: "#f0f0f0",
        "muted-foreground": "#777777",
        primary: "#1D4ED8",
        "primary-foreground": "#ffffff",
        secondary: "#6B7280",
        "secondary-foreground": "#ffffff",
      },
    },
  },
  plugins: [],
};
