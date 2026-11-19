/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        theme: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter Tight", "sans-serif"],
        serif: ["var(--font-serif)", "Argon", "sans-serif"],
      },
      spacing: {
        13: "3.25rem",
        35: "8.75rem",
      },
      maxWidth: {
        "7/10": "70%",
        "8/10": "80%",
      },
      width: {
        "4/10": "40%",
        "45/100": "45%",
        "6/10": "60%",
      },
      zIndex: {
        1000: "1000",
        1001: "1001",
      },
    },
  },
  plugins: [],
};
