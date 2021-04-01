/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  testMatch: ['**/test/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  errorOnDeprecated: true,
  testEnvironment: 'node',
}
