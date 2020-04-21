module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#f57b61',
        secondary: '#4b4399'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '2rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    scale: ['responsive', 'hover', 'focus', 'active'],
    opacity: ['responsive', 'hover', 'focus', 'disabled']
  },
  plugins: []
}
