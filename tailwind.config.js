/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Grayscale wireframe palette
        'wire-white': '#FFFFFF',
        'wire-black': '#000000',
        'wire-gray-light': '#E5E5E5',
        'wire-gray': '#999999',
        'wire-gray-dark': '#666666',
      },
    },
  },
  plugins: [],
}
