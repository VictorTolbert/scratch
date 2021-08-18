const { join, posix } = require('path')

module.exports = {
  resolve: function (dir) {
    return join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    const assetsSubDirectory = 'static'
    return posix.join(assetsSubDirectory, _path)
  }
}
