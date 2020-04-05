import {onRenderBody} from '../gatsby-ssr'

const setPostBodyComponents = jest.fn()

const simpleORB = (pluginOptions) =>
  onRenderBody({setPostBodyComponents}, {plugins: [], ...pluginOptions})

afterEach(() => {
  setPostBodyComponents.mockClear()
})

test('pluginsOptions need a "src" property', () => {
  expect(() => simpleORB({})).toThrowErrorMatchingSnapshot()
})

test('Disabled plugin should not add body components', () => {
  simpleORB({
    disable: true,
    src: '/test-script.js',
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

describe('Test async and defer logic', () => {
  test('Not Providing async should add the async attribute', () => {
    simpleORB({
      src: '/test-script.js',
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).toEqual(expect.stringContaining(`script.setAttribute("async", "");`))
  })

  test('Providing async is false should not add the async attribute', () => {
    simpleORB({
      src: '/test-script.js',
      async: false,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).not.toEqual(expect.stringContaining(`script.setAttribute("async", "");`))
  })

  test('Providing defer should add  attribute', () => {
    simpleORB({
      src: '/test-script.js',
      defer: true,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).toEqual(expect.stringContaining(`script.setAttribute("defer", "");`))
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).not.toEqual(expect.stringContaining(`script.setAttribute("async", "");`))
  })

  test('Providing defer and async should add the defer and async attribute', () => {
    simpleORB({
      src: '/test-script.js',
      defer: true,
      async: true,
    })
    expect(setPostBodyComponents.mock.calls.length).toBe(1)
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).toEqual(expect.stringContaining(`script.setAttribute("defer", "");`))
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).toEqual(expect.stringContaining(`script.setAttribute("async", "");`))
  })
})

describe('test differences in production environment', () => {
  test('Normal environment should not add new line characters to the snapshot for better debugging', () => {
    simpleORB({
      src: '/test-script.js',
      defer: true,
      async: true,
    })
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).toEqual(expect.stringContaining(`\n`))
  })

  test('Using NODE_ENV production should not add new line characters to the snapshot', () => {
    const old_node_env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    simpleORB({
      src: '/test-script.js',
      defer: true,
      async: true,
    })
    expect(
      setPostBodyComponents.mock.calls[0][0][0]['props'][
        'dangerouslySetInnerHTML'
      ]['__html'],
    ).not.toEqual(expect.stringContaining(`\n`))

    process.env.NODE_ENV = old_node_env
  })
})
