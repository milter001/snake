module.exports = {
  assetsDir:"static",
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8084",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  }

};
