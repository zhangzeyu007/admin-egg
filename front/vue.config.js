/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:31
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-26 12:35:36
 * @FilePath: \admin-egg\front\vue.config.js
 */
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrefetchDNS = require("./prefetch-dns");
console.log("------------------------------------------------");
console.log("当前项目使用的 webpack 版本为:", webpack.version);
console.log(process.env.NODE_ENV, "---process.env.NODE_ENV");
console.log("-------------------------------------");

module.exports = {
  // publicPath:
  //   process.env.NODE_ENV === "production" ? "https://example.com" : "",
  assetsDir: "static",
  productionSourceMap: false, // sourceMap 配置
  configureWebpack: {
    output: {
      filename:
        process.env.NODE_ENV === "production"
          ? "js/[name].[contenthash:8].js"
          : "js/[name].js",
      chunkFilename:
        process.env.NODE_ENV === "production"
          ? "js/[name].[contenthash:8].js"
          : "js/[name].js",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // devServer: {
    //   proxy: {
    //     "/api": {
    //       target: "",
    //       ws: true,
    //       changeOrigin: true,
    //     },
    //     "/foo": {
    //       target: "",
    //     },
    //   },
    // },
    externals: {
      // 提取 Vue 相关库
      // "vue-router": "VueRouter",
      // vuex: "Vuex",
      // 提取其他常用库
      // axios: "axios",
      "element-ui": "ELEMENT",
    },
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: "async",
        // chunks: all 具体是什么意思, 他都做了什么
        // chunk 分割的最小文件为 30 kb (比如一个js文件很小只有 4 kb, 那么就不需要提取为公共的 chunk)
        minSize: 20 * 1024, // 最小分割的包体积
        maxSize: 10, // 没有限制
        minChunks: 1, // 要提取的 chunks 最少被引用 1 次
        maxAsyncRequests: 30, // 按需加载时 ( import('路径') ), 并行加载的文件的最大数量为 4
        maxInitialRequests: 30, // 入口 js 文件最大并行请求数量为3个

        cacheGroups: {
          // 分割 chunk 组
          // 第一种分割规则: 打包 node_modules
          // 第二种分割规则: 打包 业务代码 (src)
          // node_modules 中的文件会被打包到 vendors 组的 chunk 中
          // 我们将得到 verndors~xxx.js 这样的文件
          // 但不是所有的模块都会被打包的, 他们还要满足上面定义的那些规则
          // 模块大小, 引用次数等
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 打包优先级
            // 如果某个模块, 在准备打包的时候发现之前已经打包过了, 那么就直接复用之前那个模块
            reuseExistingChunk: true,
          },
          default: {
            // 要提取的chunk至少要被引用 2 次
            minChunks: 2,
            // 优先级低
            priority: -20,
            // 如果某个模块, 在准备打包的时候发现之前已经打包过了, 那么就直接复用之前那个模块
            reuseExistingChunk: true,
          },
        },
      },
      // 配置压缩方案: js / css
      minimizer: [
        new TerserWebpackPlugin({
          // 开启缓存
          cache: true,
          // 开启多进程打包
          parallel: true,
          // 如果需要 sourceMap 这里一定要设置为 true
          sourceMap: false,
        }),
      ],
    },
    module: {
      rules: [
        // {
        //   test: /\.(gif|png|jpe?g|svg)$/i,
        //   use: [
        //     "file-loader",
        //     {
        //       loader: "image-webpack-loader",
        //       options: {
        //         disable: true, // webpack@2.x and newer
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.hash.js$/,
          use: {
            loader: "worker-loader",
            options: { inline: true, name: "workerName.[hash].js" },
          },
        },
        // {
        //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        //   loader: "url-loader",
        //   options: {
        //     limit: 10000, // 小于 10kb 的图片将被转换为 base64 编码
        //     name: "img/[name].[hash:7].[ext]",
        //   },
        // },

        {
          test: /\.less$/,
          use: ["less-loader"],
        },
        {
          // 在 package.json 中 eslientConfig 继承 airbnb-base
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      useBuiltIns: "usage",
                      corejs: {
                        version: 3,
                      },
                      targets: {
                        chrome: "60",
                        firefox: "60",
                      },
                    },
                  ],
                ],
                // 开启 babel 缓存, 第二次构建时会读取之前的缓存
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new PrefetchDNS({
        prefetchKeys: ["dns-prefetch", "preconnect"],
        domains: ["https://example.com", "https://cdn.example.com"],
      }),
      // new HtmlWebpackPlugin(),
    ],
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject("this");
    // 开启协商缓存
    config.plugin("html").tap((args) => {
      args[0].hash = true;
      return args;
    });
  },
};
