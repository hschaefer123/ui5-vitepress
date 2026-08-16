export default {
  plugins: {
    // Tailwind CSS v4 ships its own PostCSS plugin and handles vendor
    // prefixing internally (Lightning CSS), so autoprefixer is obsolete.
    // Minification is done by Vite (build.cssMinify), so cssnano is obsolete too.
    '@tailwindcss/postcss': {}
  }
}
