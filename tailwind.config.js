/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom': {
          'white': '#FFFFFF',        // Saf Beyaz - Vurgular, ikonlar
          'lightest': '#F8F5E7',     // Soluk krem/vanilya - Ana arka plan (light mode)
          'lighter': '#E6E6E6',      // Çok açık gri (ten) - Kartlar, border
          'light': '#B8B8B8',        // Açık gri - İkincil elementler
          'medium': '#6B6B6B',       // Orta gri - Hover, ikincil text
          'dark': '#3C3C3C',         // Koyu kahverengi - İkincil arka plan (dark mode)
          'darkest': '#1A1A1A',      // Siyah - Ana arka plan (dark mode), text
          'accent': '#2B2B2B',       // Koyu kahve-siyah - Başlıklar, önemli text
        }
      },
    },
  },
  plugins: [],
}
