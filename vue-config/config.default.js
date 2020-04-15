const path = require('path')
const fs = require('fs')

const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_BUILD_DATE = new Date()

module.exports = {
  /* See https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa for more details */
  pwa: {
    themeColor: '#FFFFFF',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.join('public', 'service-worker.js')
    }
  },
  configureWebpack: {
    devServer: { host: '127.0.0.1' }
  },
  pluginOptions: {
    i18n: { enableInSFC: false }
  }
}
