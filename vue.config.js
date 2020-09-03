module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://breath.host',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}