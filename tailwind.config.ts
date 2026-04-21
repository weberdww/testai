import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PP Neue Montreal', 'system-ui', '-apple-system', 'sans-serif'],
        mondwest: ['PP Mondwest', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
