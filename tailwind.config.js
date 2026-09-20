/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './script.js', './blog.js', './nav.js'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
