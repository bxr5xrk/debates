// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "115": "115px",
        "70": "70px",
        "45": "45px",
        "40": "40px",
        "25": "25px",
        "15": "15px",
      },
      backgroundColor: {
        white: "#f8fafc",
        whiteLight: "#e2e8f0",
        whiteDark: "#cbd5e1",
        gray: "##64748b",
        grayDark: "##334155",
        blackLight: "#0f172a",
        blackDark: "##020617",
        green: "#65A30D",
        red: "#EF4444",
        blue: "#3B82F6",
      },
      color: {
        white: "#f8fafc",
        whiteLight: "#e2e8f0",
        whiteDark: "#cbd5e1",
        gray: "##64748b",
        grayDark: "##334155",
        blackLight: "#0f172a",
        blackDark: "##020617",
        green: "#65A30D",
        red: "#EF4444",
        blue: "#3B82F6",
      },
    },
  },
  plugins: [],
};

export default config;
