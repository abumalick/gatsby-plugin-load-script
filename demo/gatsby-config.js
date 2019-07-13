require('dotenv').config({
  path: `.env`,
})

module.exports = {
  plugins: [
    {
      // https://docs.sentry.io/error-reporting/quickstart/?platform=browser
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: !process.env.SENTRY_DSN,
        src: 'https://browser.sentry-cdn.com/5.5.0/bundle.min.js',
        onLoad: `() => Sentry.init({dsn:"${process.env.SENTRY_DSN}"})`,
      },
    },

    'gatsby-plugin-netlify',
  ],
}
