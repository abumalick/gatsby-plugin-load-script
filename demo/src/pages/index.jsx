import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h1>Gatsby example site using gatsby-plugin-load-script</h1>
      {/* eslint-disable-next-line */}
      <button onClick={() => methodDoesNotExist}>Trigger a sentry error</button>
      or
      <button
        onClick={() =>
          window.Sentry &&
          window.Sentry.captureMessage('Someone clicked on the button')
        }
      >
        Capture a message and send it to sentry
      </button>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage
