module.exports = {
  darkMode: 'class',
  purge: [
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
    fontFamily: {
      'page-title': ['Righteous'],
      'sans': ['Roboto', 'system-ui'],
      'serif': ['Merriweather', 'Georgia'],
      'mono': ['Roboto Mono', 'SFMono-Regular'],
    },
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        tertiary: "var(--color-primary)"
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--color-primary)"
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
