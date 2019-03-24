module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'fluidComments',
      externals: {
        react: 'React'
      }
    }
  },
  devServer: {
    disableHostCheck: true,
  }
}
