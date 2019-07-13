# gatsby-plugin-load-script

![npm](https://img.shields.io/npm/v/gatsby-plugin-load-script.svg?style=popout&link=https://www.npmjs.com/package/gatsby-plugin-load-script)
![npm](https://img.shields.io/npm/dw/gatsby-plugin-load-script.svg?style=popout&link=https://www.npmjs.com/package/gatsby-plugin-load-script)
![CircleCI](https://img.shields.io/circleci/build/github/abumalick/gatsby-plugin-load-script.svg?label=jest&style=popout&link=https://circleci.com/gh/abumalick/gatsby-plugin-load-script)
![Codecov](https://img.shields.io/codecov/c/github/abumalick/gatsby-plugin-load-script.svg?style=popout&link=https://codecov.io/gh/abumalick/gatsby-plugin-load-script)

Add external libraries to your Gatsby website

## Installation

```bash
npm install gatsby-plugin-load-script
```

or

```
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
        src: 'https://browser.sentry-cdn.com/5.5.0/bundle.min.js',
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

```
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

> /!\ You Probably don't want to use sentry during development, so be sure to remove SENTRY_DSN from your development environment variables once you are sure it works correctly.

In **production**, add the env variable to your netlify site / docker container.

#### More information on Sentry SDK

https://docs.sentry.io/error-reporting/quickstart/?platform=browser

---

Inspired by: [load-script](https://www.npmjs.com/package/load-script)
