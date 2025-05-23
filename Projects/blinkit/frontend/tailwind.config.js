/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#FFBF00",
        "primary-100": "#FFC929",
        "secondary-200": "#00B050",
        "secondary-100": "#0B1A78",
      },
    },
  },
  plugins: [],
};
