'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const NAME = '' // 标题

const PORT = process.env.port || 1024 // 端口

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  showEslintErrorsInOverlay: false,
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: '',
        changeOrigin: true
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: ''
        // }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    name: NAME,
    resolve: {
      alias: {
        '@': resolve('src'),
        common: resolve('src/common'),
        api: resolve('src/api'),
        public: resolve('public')
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/common/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/common/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-module-eval-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .devtool('cheap-module-source-map')

          // 内联runtimeChunk生成的映射文件
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          // sentry监控
            // .plugin('SentryCliPlugin')
            // .use('@sentry/webpack-plugin', [{
            //   include: './dist', // 作用的文件夹
            //   release: process.env.VUE_APP_RELEASE_VERSION, // 一致的版本号
            //   configFile: 'sentry.properties', // 不用改
            //   ignore: ['node_modules', 'vue.config.js'],
            //   urlPrefix: '~/static/'
            // // }])
            // .use('webpack-sentry-plugin', [{
            //     organization: 'sentry',
            //     project: 'course-design-front',
            //     apiKey: 'd5f5ed70d2a1407ea01a1418cd678a7788bfeab83c6d465183f523f9987bc1f6',
            //     release: process.env.VUE_APP_RELEASE_VERSION
            //   }])
            // .end()
        }
      )
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('node-sass'),
        data: `
          @import "common/css/variable.scss";
          @import "common/css/mixin.scss";
        `
      }
    }
    // sourceMap: true
  }
}
