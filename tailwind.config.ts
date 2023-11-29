import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--primary)", //#327CC8
        alert: {
          blue: "var(--primary)", //#327CC8
          red: "var(--red)", //#DD3B3A
          purple: "var(--purple)", //#7C5DD3
          yellow: "var(--yellow)", //#FFC655
          green: "var(--green)", //#06BF71
          gray: "var(--gray)", //#E2E2EC
        },
        "light-gray": "var(--light-gray)", //#E9EEF4
        "black-primary": "var(--black-1)", //#141518
        "black-secondary": "var(--black-2)", //#1e1f25
        blue: {
          primary: "var(--primary)", //#327CC8,
          6: "var(--blue-6)", //rgba(50, 124, 200, 0.2)
          opacity: "var(--blue-opacity)", //rgba(50, 124, 200, 0.2)
        },
        red: {
          primary: "var(--red)", //#DD3B3A
          "light-4": "var(--red-lighter-4)", //rgba(221, 59, 58, 0.1)
          "light-5": "var(--red-lighter-5)", //rgba(221, 59, 58, 0.8)
          "light-6": "var(--red-lighter-6)", //rgba(221, 59, 58, 0.5)
          "light-7": "var(--red-lighter-7)", //rgba(255, 84, 84, 0.3)
        },
        gray: {
          1: "var(--gray-1)", //#8A8C92
          2: "var(--gray-2)", //#727688
          3: "var(--gray-3)", //#F4F8FB
          4: "var(--gray-4)", //#B7B8BF
          5: "var(--gray-5)", //#E2E2EC
          6: "var(--gray-6)", //#424242
          7: "var(--gray-7)", //#D3D3DF
          17: "var(--gray-17)", //#dadae4
          18: "var(--gray-18)", //rgba(114, 118, 136, 0.2)
        },
        green: {
          primary: "var(--green)", //#06bf71
          1: "var(--green-1)", //#26a17b
          "light-1": "var(--light-green)", //rgba(6, 191, 113, 0.1)
        },
        white: {
          1: "var(--white-1)", //rgba(255, 255, 255, 0.6)
        },
      },
      fontSize: {
        "h4-bold": [
          "28px",
          {
            lineHeight: "32px",
            fontWeight: "700",
          },
        ],
        "body-2-bold": [
          "16px",
          {
            lineHeight: "22px",
            fontWeight: "700",
          },
        ],
        "body-2-semibold": [
          "16px",
          {
            lineHeight: "22px",
            fontWeight: "600",
          },
        ],
        "body-2": [
          "16px",
          {
            lineHeight: "22px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
