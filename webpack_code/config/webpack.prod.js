const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const path = require('path'); // nodejs核心模块，专门用来处理路径问题
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // 入口
    entry: "./src/main.js",  // 相对路径
    // 输出
    output: {
        // 所有文件到输出路径
        // __dirname: 当前文件所在目录（nodejs的变量）
        path: path.resolve(__dirname, '../dist'),//绝对路径
        // 文件名
        filename: 'static/js/main.js',
        // 自动清空上次打包的内容
        // 原理： 在打包前，将path整个目录删除，再重新打包
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/, // 只检测css文件
                use: [
                    // 执行顺序：从右到左（从下到上）
                    MiniCssExtractPlugin.loader, // 将js中css通过创建标签添加html文件中生效
                    "css-loader",  // 将css资源编译成commonjs模块到js中
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules文件夹
                loader: "babel-loader",
            }
        ],
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintWebpackPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        }),
    ],
    // 开发服务器
    // devServer: {
    //     host: "localhost", // 启动服务器域名
    //     port: "3000", // 启动服务器端口号
    //     open: true, // 是否自动打开浏览器
    // },
    // 模式
    mode: "development",
}