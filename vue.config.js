const path = require('path')

// let url = 'http://192.168.29.12:8083'  //  服务
// let url = 'http://192.168.29.150:8083'  //  服务
let url = 'http://192.168.29.12:8083'  //  服务




const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/form-generator/ '
  //   : '/',
  // pages: {
  //   index: {
  //     entry: './src/main.js',
  //     template: './public/index.html',
  //     filename: 'index.html',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index'],
  //     minify
  //   },
  // },
  devServer: {
    // host: ip || "localhost",
    disableHostCheck: true,
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin:true,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },

  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.symlinks(true);
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
