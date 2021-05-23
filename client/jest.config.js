module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./setupTests.js'],
  moduleNameMapper: {
    // next two lines are from:
    // https://jestjs.io/docs/en/webpack#mocking-css-modules
    '\\.(png|svg|jpg|gif)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': 'identity-obj-proxy',
    '^#(.*)$': '<rootDir>/$1',
  },
  // make snapshots work with enzyme
  // https://github.com/adriantoine/enzyme-to-json#usage
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
