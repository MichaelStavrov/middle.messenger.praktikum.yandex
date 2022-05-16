/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  // preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
