/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bisharod: {
          orange:       '#F5A623',
          navy:         '#0A1628',
          'navy-light': '#122040',
          teal:         '#00B89C',
          'teal-light': '#00D4B4',
          'teal-pale':  '#E8FAF7',
          mist:         '#F7F9FC',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
