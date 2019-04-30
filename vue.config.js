module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/olsc/html/'
      : '/',
  pwa: {
    name: '在线服务控制台'
  },

  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    port: '8082', // 代理端口
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/olsc': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
        // pathRewrite: {
        //   '^/admin': ''
        // }
      },
      '/ols': {
        target: 'https://www-di1.dev.cmrh.com/',
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/admin': ''
        // }
      }
    }
  }
}
