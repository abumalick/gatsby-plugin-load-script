# gatsby-plugin-load-script

Add external libraries to your generated html pages

```js
module.exports = {
  // ...
  plugins: [
    // add SENTRY SDK
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: !process.env.SENTRY_DSN,
        src: 'https://browser.sentry-cdn.com/5.4.0/bundle.min.js',
        onLoad: `() => Sentry.init({dsn:"${process.env.SENTRY_DSN}"})`,
      },
    },
  ],
};
```

Inspired by: (load-script)[https://www.npmjs.com/package/load-script]
