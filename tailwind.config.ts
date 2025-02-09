import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brand-primary': "var(--brand-primary)",
        'brand-secondary': "var(--brand-secondary)",
        'brand-tertiary': "var(--brand-tertiary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
