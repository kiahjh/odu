/** @type {import('tailwindcss').Config} */
export default {
  content: [`./ts/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        roboto: [`Roboto`, `sans-serif`],
      },
    },
  },
  plugins: [],
};
