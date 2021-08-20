const WindiCSS = require('windicss-webpack-plugin').default

module.exports = {
  // ...
  webpackFinal: (config) => {
    config.plugins.push(new WindiCSS())
    return config
  },
}
