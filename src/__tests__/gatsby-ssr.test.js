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
      src: 'https://browser.sentry-cdn.com/5.4.0/bundle.min.js',
      onLoad: `() => Sentry.init({dsn:"${SENTRY_DSN}"})`,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(0)
  })

  test('Providing common Sentry options should add a postBodyComponent', () => {
    const SENTRY_DSN = 'this-is-a-testing-dsn'
    simpleORB({
      disable: !SENTRY_DSN,
      src: 'https://browser.sentry-cdn.com/5.4.0/bundle.min.js',
      onLoad: `() => Sentry.init({dsn:"${SENTRY_DSN}"})`,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(setPostBodyComponents.mock.calls[0]).toMatchSnapshot()
  })
})
