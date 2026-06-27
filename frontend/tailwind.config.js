/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purpleBg: "#2d2b55",
        purpleAccent: "#a599e9",
        purpleText: "#f8f8f2",
        purpleDark: "#1e1e3f"
      }
    }
  },
  plugins: []
};
