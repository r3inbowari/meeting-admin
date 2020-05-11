module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://192.168.5.67:9999/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
