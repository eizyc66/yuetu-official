/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1'],
      sm: ['0.875rem', '1'],
      base: ['1rem', '1'],
      lg: ['1.125rem', '1'],
      xl: ['1.25rem', '1'],
      '2xl': ['1.5rem', '1'],
      '3xl': ['1.875rem', '1'],
      '4xl': ['2.25rem', '1'],
      '5xl': ['3rem', '1'],
    },
    extend: {
      colors: {
        'primary': '#FC0407'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
