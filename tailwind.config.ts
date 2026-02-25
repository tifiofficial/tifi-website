import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070a11',
        'ink-soft': '#0f1726',
        cream: '#f4f1ea',
        ice: '#b7d6e4',
        teal: '#6abec6',
      },
      fontFamily: {
        sans: ['"Neue Haas Grotesk Text Pro"', '"Avenir Next"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Impact', '"Arial Black"', '"Helvetica Neue"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(183,214,228,0.35), 0 15px 45px rgba(106,190,198,0.18)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
