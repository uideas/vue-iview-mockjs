module.exports = {
  assetsDir: "",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "^/api": {
        target: "http://cloud.hostname.com", //add your production api location as 'http://cloud.hostname.com'
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "^/test": {
        target: "http://cloud.dev.hostname.com", //add your test api location as 'http://cloud.dev.hostname.com'
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/test": ""
        }
      },
      "^/dev": {
        target: "http://localhost:5000", //add you local serve api localtion
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/dev": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("iview-loader")
      .loader("iview-loader")
      .options({
        prefix: true
      })
      .end();
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }

  //configation your pulgs with exernal which used by out of project
  // configureWebpack: config => {
  //   config.externals = {
  //     TencentCaptcha: "TencentCaptcha",
  //     AMap: "AMap"
  //   };
  // }
};
