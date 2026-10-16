/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#245C45',
          dark: '#194632',
          light: '#2d7357',
        },
        sage: {
          DEFAULT: '#E3EFE7',
          light: '#F0F6F2',
          dark: '#CFE2D6',
        },
        surface: {
          DEFAULT: '#F3F5F4',
          subtle: '#EAEFED',
          white: '#FFFFFF',
        },
        charcoal: {
          DEFAULT: '#26332D',
          muted: '#66736B',
        },
        border: {
          subtle: '#DFE5E0',
          strong: '#BFCBC3',
        },
        status: {
          error: '#C93B2B',
          'error-bg': '#FDF2F1',
          success: '#1F7A4D',
          'success-bg': '#EEF8F2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(38, 51, 45, 0.05)',
        'md': '0 4px 6px -1px rgba(38, 51, 45, 0.08), 0 2px 4px -2px rgba(38, 51, 45, 0.04)',
        'lg': '0 10px 15px -3px rgba(38, 51, 45, 0.08), 0 4px 6px -4px rgba(38, 51, 45, 0.04)',
      },
      borderRadius: {
        'card': '8px',
        'button': '6px',
        'badge': '4px',
      }
    },
  },
  plugins: [],
}
