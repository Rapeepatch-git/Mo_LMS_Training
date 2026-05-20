import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1f2e',
        'ink-2': '#2a3142',
        'ink-3': '#5a6275',
        'ink-4': '#8a92a6',
        paper: '#fbf9f3',
        cream: '#f6f2e8',
        'cream-2': '#efeadb',
        line: '#e6e2d8',
        coral: '#d4623f',
        'coral-dark': '#b8512f',
        'coral-soft': '#f4d8c8',
        gold: '#c9a14a',
        'amber-soft': '#f0e3c4',
        sage: '#6a8f6a',
        'sage-soft': '#dde6d8',
        plum: '#6b3d52',
      },
      fontFamily: {
        sans: ["'IBM Plex Sans Thai'", "'IBM Plex Sans'", 'sans-serif'],
        serif: ["'IBM Plex Serif'", 'Georgia', 'serif'],
        mono: ["'IBM Plex Mono'", 'monospace'],
      },
      borderRadius: {
        control: '8px',
        card: '12px',
        panel: '14px',
        hero: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
