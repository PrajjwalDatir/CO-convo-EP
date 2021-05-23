module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    // to make async/await work
    // https://stackoverflow.com/a/53736090
    '@babel/plugin-transform-runtime',
    // to split react components
    // https://reacttraining.com/react-router/web/guides/code-splitting
    '@babel/plugin-syntax-dynamic-import',
    // react hot loader
    // https://github.com/gaearon/react-hot-loader#getting-started
    'react-hot-loader/babel',
  ],
};
