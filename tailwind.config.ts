import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0e1a',
        surface: '#131826',
        'surface-2': '#1a2033',
        border: '#252b3d',
        text: '#e2e8f0',
        'text-dim': '#94a3b8',
        'text-faint': '#64748b',
        accent: '#8b5cf6',
        'accent-2': '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'gradient-warn': 'linear-gradient(135deg, #f59e0b, #ef4444)'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.4s ease'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
export default config;
