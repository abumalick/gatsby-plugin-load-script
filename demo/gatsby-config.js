require('dotenv').config({
  path: `.env`,
})

const pathPrefix = process.env.DEMO_USE_PATH_PREFIX ? '/demo' : null

module.exports = {
  pathPrefix,
  plugins: [
    {
      // resolve: require.resolve(`../`), // You don't need this line
      // https://docs.sentry.io/error-reporting/quickstart/?platform=browser
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: !process.env.SENTRY_DSN,
        src: 'https://browser.sentry-cdn.com/5.15.4/bundle.min.js',
        crossorigin: 'anonymous',
        integrity:
          'sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB',
        onLoad: `() => {
          console.log(" Sentry callback called");
          Sentry.init({dsn:"${process.env.SENTRY_DSN}"})
        }`,
      },
    },

    {
      // resolve: require.resolve(`../`), // You don't need this line
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/test-script.js',
      },
    },

    'gatsby-plugin-netlify',
  ],
}
