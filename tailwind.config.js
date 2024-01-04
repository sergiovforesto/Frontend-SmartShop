/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bgBlack: {
          '0%': { opacity: '0' },
          '25%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
          '75%': { opacity: '0.7' },
          '100%': { 
            opacity: '1',
          },
        },


        anchoW: {
          '0%': { width: '0' },
          '25%': { width: '25%' },
          '50%': { width: '50%' },
          '75%': { width: '75%' },
          '100%': { width: '100' },
        }
      },
      animation: {
        'opacity-bgBlack': 'bgBlack 150ms',
        'w-effect': 'anchoW 150ms',
      },
    
      colors: {
        'primary': '#1574FF',
        'secundary': '#7218F7',
        'secundary-hover': '#6813E6',
        'fondo': '#FCFCFC',
        'letter': '#444444',
        'letter-2': '#383838',
        'success': '#3DD697',
        'danger': '#FF495C',
        'bg-input': '#F4F6F9',
        'br-input': '#EEEEEE',
        'border-input': '#D0D0D0',
        'bg-footer': '#F4F6F9',
        'gray-footer': '#8E8E8E',
        'fondo-list': '#F1F7FF',
        'black-26': '#262626',
        'txt-5E': '#5E5E5E',
        'bar-admin': '#2D404E'
        
      },

      fontSize: {
        'mini': [
          '12px', '15px'
        ],
        'micro': [
          '10px', '10px'
        ]

      },

      padding: {
        'mini': '2px',
        'micro': '1px'
      },

    }
  },
  plugins: [],
}

