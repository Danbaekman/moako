/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'sans-serif'], // Baloo 폰트 추가
      },

      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        "bounce-slow": "bounceSlow 2s infinite",
      },
      
    },
  },
  plugins: [],
};
