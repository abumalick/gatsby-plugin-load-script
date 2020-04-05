import {onRenderBody} from '../gatsby-ssr'

const setPostBodyComponents = jest.fn()

const simpleORB = (pluginOptions) =>
  onRenderBody({setPostBodyComponents}, {plugins: [], ...pluginOptions})

afterAll(() => {
  setPostBodyComponents.mockClear()
})

test('pluginsOptions need a "src" property', () => {
  expect(() => simpleORB({})).toThrowErrorMatchingSnapshot()
})

describe('onRenderBody should create post body components', () => {
  afterAll(() => {
    setPostBodyComponents.mockClear()
  })

  test('Disabled plugin should not add body components', () => {
    let SENTRY_DSN
    simpleORB({
      disable: !SENTRY_DSN,
      src: 'https://browser.sentry-cdn.com/5.15.4/bundle.min.js',
      integrity:
        'sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB',
      crossorigin: 'anonymous',
      onLoad: `() => Sentry.init({dsn:"${SENTRY_DSN}"})`,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(0)
  })

  test('Providing common Sentry options should add a postBodyComponent', () => {
    const SENTRY_DSN = 'this-is-a-testing-dsn'
    simpleORB({
      disable: !SENTRY_DSN,
      src: 'https://browser.sentry-cdn.com/5.15.4/bundle.min.js',
      integrity:
        'sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB',
      crossorigin: 'anonymous',
      onLoad: `() => Sentry.init({dsn:"${SENTRY_DSN}"})`,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(setPostBodyComponents.mock.calls[0]).toMatchSnapshot()
  })
})
