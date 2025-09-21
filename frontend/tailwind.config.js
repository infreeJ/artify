// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ts, tsx 포함시켜야 TypeScript 프로젝트에서 적용됨
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}