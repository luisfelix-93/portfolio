/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        win: ['Tahoma', '"MS Sans Serif"', '"Segoe UI"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        terminal: ['"Courier Prime"', '"Lucida Console"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        'win-caption': ['10px', { lineHeight: '12px' }],
        'win-body': ['11px', { lineHeight: '14px' }],
        'win-title': ['12px', { lineHeight: '14px', letterSpacing: '0.2px' }],
        'win-headline': ['14px', { lineHeight: '18px' }],
        'win-headline-lg': ['16px', { lineHeight: '20px' }],
        'terminal-sm': ['11px', { lineHeight: '14px' }],
        'terminal-base': ['13px', { lineHeight: '16px' }],
      },
      colors: {
        win: {
          desktop: '#3A6EA5',
          teal: '#008080',
          face: '#D4D0C8',
          light: '#FFFFFF',
          soft: '#DFDFDF',
          shadow: '#808080',
          dark: '#404040',
          link: '#0000EE',
          selection: '#0A246A',
          title: {
            activeStart: '#0A246A',
            activeEnd: '#A6CAF0',
            inactiveStart: '#808080',
            inactiveEnd: '#C0C0C0',
          },
        },
        terminal: {
          bg: '#000000',
          green: '#00FF66',
          gray: '#CCCCCC',
        },
      },
    },
  },
  plugins: [],
}
