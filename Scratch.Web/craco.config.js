const WindiCSS = require('windicss-webpack-plugin').default

module.exports = {
  // ...
  webpack: {
    plugins: {
      add: [
        new WindiCSS({
          virtualModulePath: 'src',
        }),
      ],
    },
  },
}
