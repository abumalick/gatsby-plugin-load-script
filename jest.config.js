module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  testPathIgnorePatterns: ['node_modules', 'demo/.cache', 'demo/node_modules'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/loadershim.js'],
}
