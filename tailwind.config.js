/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Synthaxis brand palette - phthalo green family
      // Logo color is synthaxis-500 (#0a5f63)
      colors: {
        synthaxis: {
          50:  '#e8f8f8',
          100: '#c4eeef',
          200: '#8fdfe1',
          300: '#4ecdd0',  // Bright - good for text on dark backgrounds
          400: '#1fa5a9',  // Medium - hover states
          500: '#0a5f63',  // LOGO COLOR - primary brand color
          600: '#085255',  // Darker - active/pressed states
          700: '#064245',
          800: '#043133',
          900: '#022122',
        },
      },
      // Consistent spacing for the Protocol phases
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Typography for clean professional feel
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Subtle animations for UI polish
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Border radius consistency
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}