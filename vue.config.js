module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/vue-typescript-admin-template/'
      : '/',

  pwa: {
    name: '在线服务控制台'
  },

  lintOnSave: process.env.NODE_ENV !== 'production'
}
