let path = require('path')
// 生成一个HTML5文件
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 将内容束展示为方便交互的直观树状图
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
module.exports = {
  /*每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。
    如果传入一个字符串或字符串数组，chunk 会被命名为 main。
    如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。 
  */
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
    another: path.resolve(__dirname, 'src', 'another-module.js')
  },
  output: {
    /*filename:此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 output.chunkFilename 选项来控制输出。
      [hash]	模块标识符(module identifier)的 hash
      [chunkhash]	chunk 内容的 hash
      [name]	模块名称
      [id]	模块标识符(module identifier)
    */
    filename: '[name].[hash].js',
    /* 在编写一个导出值的 JavaScript library 时，可以使用下面的 library 和 libraryTarget，
       导出值可以作为其他代码的依赖。 
    */
    library: "MyLibrary",
    /* 配置如何暴露 library
       "var" - （默认值）当 library 加载完成，入口起点的返回值将分配给一个变量
       "this" - 当 library 加载完成，入口起点的返回值将分配给 this
       "window" - 当 library 加载完成，入口起点的返回值将分配给 window 对象。
       "global" - 当 library 加载完成，入口起点的返回值将分配给 global 对象。
       "commonjs" - 当 library 加载完成，入口起点的返回值将分配给 exports 对象。
       "commonjs2" - 当 library 加载完成，入口起点的返回值将分配给 exports 对象
       "amd" - webpack 将你的 library 转为 AMD 模块
       libraryTarget: "umd" - 这是一种可以将你的 library 能够在所有的模块定义下都可运行的方式（并且导出的完全不是模块）。
     */
    libraryTarget: "var",
    /* 目录对应一个绝对路径
     */
    path: path.resolve(__dirname, 'dist'),
    /* 散列摘要的前缀长度，默认为 20
     */
    hashDigestLength: 24,
    /* 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 false
     */
    pathinfo: true,
    /* 按需加载chunk的输出文件
     */
    chunkFilename:'js/[name].js',
    /* 按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）
     */
    // publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
    // publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
    // publicPath: "/assets/", // 相对于服务(server-relative)
    // publicPath: "assets/", // 相对于 HTML 页面
    // publicPath: "../assets/", // 相对于 HTML 页面
    publicPath: "", // 相对于 HTML 页面（目录相同）
  },
  externals: {
    'lodash': {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
    }
  },
  devtool: 'inline-source-map', // inline-source-map - SourceMap 转换为 DataUrl 后添加到 bundle 中。
  // 如果你通过 Node.js API 来使用 dev-server， devServer 中的选项将被忽略。将选项作为第二个参数传入： new WebpackDevServer(compiler, {...})
  devServer: {
    contentBase: path.join(__dirname, "dist"), // 在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
    hot: true, // 启用 webpack 的模块热替换特性
    compress: true, // 一切服务都启用gzip 压缩
    // color: true, // 启用/禁用控制台上的颜色
    // host: '0.0.0.0', // 默认是 localhost
    port: 9000 // 指定要监听请求的端口号
    // openPage: '/different/page' //指定打开浏览器时要导航的页面
    // overlay: true //当有编译器错误或警告时，在浏览器中显示全屏覆盖。默认禁用。如果您只想显示编译器错误：
  },
  resolve: {
    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
        jquery: "jquery/src/jquery",
        Utilities: path.resolve(__dirname, 'src/utilities/'),
        Templates: path.resolve(__dirname, 'src/templates/'),
        xyz$: path.resolve(__dirname, 'path/to/file.js'), // 在给定对象的键后的末尾添加 $，以表示精准匹配
    },
    // 自动解析确定的扩展。默认值为：extensions: [".js", ".json"]
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: ['file-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: ['file-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(csv|tsv)$/,
        loader: ['csv-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.xml$/,
        loader: ['xml-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    // 清理 /dist 文件夹
    new CleanWebpackPlugin(['dist']),
    // 设定 HtmlWebpackPlugin,然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
      // title: 'Caching'
    }),
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin(),
    // JS文件压缩
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: 'inline-source-map',
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    // Node 环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      filename: 'vendor-[hash].min.js',
    }),
    // ProvidePlugin 可以将模块作为一个变量，被 webpack 在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 能以可视化的方式展示打包结果，为你提供分析需求
    new BundleAnalyzerPlugin()
  ]
};
