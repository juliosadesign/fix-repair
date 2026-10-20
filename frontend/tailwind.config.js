/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FAFAFA',      // Branco gelo (Light Mode)
          card: '#FFFFFF',    // Card puro
          text: '#1D1D1F',    // Grafite escuro Apple
          muted: '#86868B',   // Cinza secundário Apple
          border: '#E5E5EA',  // Borda sutil clara
        },
        dark: {
          bg: '#0A0A0A',      // Preto profundo (Dark Mode principal)
          card: '#121212',    // Cinza quase preto para os Bento Cards
          text: '#F5F5F7',    // Branco suave
          muted: '#A1A1AA',   // Cinza secundário escuro
          border: '#27272A',  // Borda translúcida sutil
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}