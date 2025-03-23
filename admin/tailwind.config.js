/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans all React files
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#5f6fff"
      },
      gridTemplateColumns: {
        'auto' : "repeat(auto-fill, minmax(200px, 1fr))"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: For better form styling
  ],
};