module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        128: '32rem',
        180: '45rem',
        190: '47.5rem',
        200: '50rem',
        220: '55rem',
        256: '64rem',
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
      },
      container: {
        center: true,
      },
      // keyframes: {
      //   slider: {
      //     '0%': {
      //       height: '10rem',
      //     },
      //     '100%': {
      //       height: '50rem',
      //     },
      //   },
      // },
      // animation: {
      //   slider: 'slider 1s linear infinite',
      // },
    },
  },
  plugins: [],
};
