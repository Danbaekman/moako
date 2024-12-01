/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'sans-serif'], // Baloo 폰트 추가
      },
    },
  },
  plugins: [],
};
