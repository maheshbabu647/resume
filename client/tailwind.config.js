/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',  // Your blue color
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      heroHeight: {
        'screen-minus-nav': 'calc(100vh - 1px)', // or whatever height your nav is
      },

  },
  },
  plugins: [],
}
