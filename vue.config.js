let url = 'http://localhost:8087';  //  服务


const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    // disableHostCheck: true,
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },

  productionSourceMap: false,
});
