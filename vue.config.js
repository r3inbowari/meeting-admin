const CompressionWebpackPlugin = require("compression-webpack-plugin")
const mainProxyURL = "http://192.168.2.102:9999/"

module.exports = {
  configureWebpack: config => {
    console.log(process.env.NODE_ENV);

    //if (process.env.NODE_ENV === 'prodution') {
    const productionGzipExtensions = ['html', 'js', 'css']
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + productionGzipExtensions.join('|') + ')$'
        ),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.9, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    )
    //}
  },
  publicPath: "/",
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      "/api": {
        // target: "http://192.168.5.67:9999/",
        // target: "http://192.168.3.91:9999/",
        // target: "http://172.20.10.2:9999/",
        target: mainProxyURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/home/picbed/user/avatar": {
        // target: "http://192.168.5.67:9999/",
        // target: "http://192.168.3.91:9999/",
        // target: "http://172.20.10.2:9999/",
        target: mainProxyURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/home/picbed/user/avatar": "/user/avatar",
        },
      }
    },
  },
};
