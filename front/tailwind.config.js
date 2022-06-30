module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        128: '32rem',
        200: '50rem',
        220: '55rem',
        256: '64rem',
      },
      keyframes: {
        slider: {
          '0%': {
            height: '10rem',
          },
          '100%': {
            height: '50rem',
          },
        },
      },
      animation: {
        slider: 'slider 1s linear infinite',
      },
    },
  },
  plugins: [],
};
