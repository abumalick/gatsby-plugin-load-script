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
        src: 'https://browser.sentry-cdn.com/5.15.4/bundle.min.js',
        crossorigin: 'anonymous',
        integrity:
          'sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB',
        onLoad: `() => {
          console.log("Callback called");
          Sentry.init({dsn:"${process.env.SENTRY_DSN}"})
        }`,
      },
    },

    'gatsby-plugin-netlify',
  ],
}
