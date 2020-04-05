# gatsby-plugin-load-script

<a href="https://www.npmjs.com/package/gatsby-plugin-load-script">
<img src="https://img.shields.io/npm/v/gatsby-plugin-load-script.svg?style=popout" alt="Current npm package version" />
</a>
<a href="https://www.npmjs.com/package/gatsby-plugin-load-script">
<img src="https://img.shields.io/npm/dw/gatsby-plugin-load-script.svg?style=popout" alt="Downloads per month on npm." title="Downloads per month on npm." />
</a>
<a href="https://circleci.com/gh/abumalick/gatsby-plugin-load-script">
<img src="https://img.shields.io/circleci/build/github/abumalick/gatsby-plugin-load-script.svg?label=tests&style=popout" alt="Current CircleCI build status." />
</a>
<a href="https://codecov.io/gh/abumalick/gatsby-plugin-load-script">
<img src="https://img.shields.io/codecov/c/github/abumalick/gatsby-plugin-load-script.svg?style=popout" alt="Current tests coverage" />
</a>

Add external libraries to your Gatsby website

## Installation

```bash
npm install gatsby-plugin-load-script
```

or

```bash
yarn add gatsby-plugin-load-script
```

## Usage

### SENTRY

##### Add the following plugin to your `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  plugins: [
    // ...
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: !process.env.SENTRY_DSN, // When do you want to disable it ?
        src: 'https://browser.sentry-cdn.com/5.15.4/bundle.min.js',
        integrity:
          'sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB',
        crossorigin: 'anonymous',
        onLoad: `() => Sentry.init({dsn:"${process.env.SENTRY_DSN}"})`,
      },
    },
  ],
}
```

[More configuration options on sentry.io](https://docs.sentry.io/error-reporting/configuration/?platform=browser)

#### Obtain a SENTRY DSN

[Click here to create a new organisation on sentry.io and obtain a DSN](https://sentry.io/organizations/new/)

#### Add SENTRY_DSN to your environment variables

[Learn how to use environment variables with Gatsby ?](https://www.gatsbyjs.org/docs/environment-variables/)

In **development**, create a `.env.development` file and add your **own** key obtained on sentry.io

```bash
SENTRY_DSN=https://<your-sentry-dsn-key>@sentry.io/<project>
```

Add dotenv to your `gatsby-config.js`

```js
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

> /!\ You Probably don't want to use sentry during development, so be sure to remove SENTRY_DSN from your development environment variables once you are sure it works correctly.

In **production**, add the env variable to your netlify site / docker container.

#### More information on Sentry SDK

https://docs.sentry.io/error-reporting/quickstart/?platform=browser

### Local script from static folder

1. Create a folder named `static` at the root of your gatsby app
2. Place your script in it
3. Add the following configuration in `gatsby-config.js`

```js
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/test-script.js', // Change to the script filename
      },
    },
```

---

Inspired by: [load-script](https://www.npmjs.com/package/load-script)
