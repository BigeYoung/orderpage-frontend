module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    proxy: 'http://localhost:8000'
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
