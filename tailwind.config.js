/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "500px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "2706px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "library-primary": "#002A1F",
        "library-secondary": "#E6F0ED",
        "library-tertiary": "#A7BDB0",
        "library-sky-light": "#C2DBD5",
        "library-sky": "#DEECFF",
        "library-gray-300": "#D9D9D9",
        "library-light-tertiary": "#F3FDEC",
        "library-black": "#001811",
        "library-light-black": "#1E1E1E",
        "library-gray": "#696969",
        "library-light-gray": "#C4C4C4",
        "library-white": "#FFFFFF",
        "library-light-white": "#F6F6F6",
        "library-red": "#F4E6E5",
        "library-light-red": "#F6F6F6",
        "library-light-green": "#B6D3C1",
        "library-light-secondary-green": "#C2DBD5",
        "color-card-broder": "#D9D9D9",
        "text-color": "#939393",
        "library-order-sidebar-background": "#E6F0ED",
        "library-order-pending": "#795000",
        "library-royal-blue": "#024F9C",
        "library-royal-red": "#FD0C0F",
        "library-button-hover": "#2E856E",
        "library-gray-700": "#141414",
        "library-offWhite": "#F4F4F4",
        "library-gray-600": "#434343",
        "library-container": "#E6EEF6",
        "apply-color": "#E8F3FF",

        "bg-accepted": "#E0FFED",
        "bg-pending": "#FFEBDB",
        "bg-rejected": "#FFE3E3",
        "rejected-text": "#B2312D",
        "bg-memorandum": "#F3FBFF",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      playfairDisplay: ["Playfair Display"],
    },
  },
  plugins: [],
};
