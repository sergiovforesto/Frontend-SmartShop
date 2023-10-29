/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1574FF',
        'secundary': '#7218F7',
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
        'txt-5E': '#5E5E5E'
        
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

