const path = require('path')

const IS_DEV =  process.env.mode === "development" ? true: false
module.exports = {
    mode: process.env.mode,
    entry: IS_DEV ? path.resolve("./demo/index.tsx") : path.resolve('src'),
    output: {
        filename: IS_DEV ? "canvas-enlarge.js" : "index.min.js",
        path: IS_DEV ? path.resolve('./demo') : path.resolve("./dist"),
        ...Object.assign({}, IS_DEV ? {} : {
            libraryTarget: "umd",
            libraryExport: "default"
        })
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
        rules:[
            {
                test: /\.tsx?$/,
                loader:"ts-loader",
                include: [path.resolve('src'), path.resolve('demo')],
                options:{
                    "transpileOnly": false,
                },
                exclude:  /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader:"babel-loader",
                options: {
                    cacheDirectory: true,
                },
                include: [path.resolve('src'), path.resolve('demo')],
                exclude:  /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                include: [path.resolve('src'), path.resolve('demo')],
                exclude:  /node_modules/
            },
            {
                test: /\.png|jpe?g$/,
                loader: "url-loader",
                options: {
                    limit: "10000"
                }
            }
        ]
    },
    externals: Object.assign({}, !IS_DEV ? {
        "react": {
            commonjs: "react",
            amd: "react",
            root: "React",
            commonjs2: "react",
        },
        "react-dom": {
            root: "ReactDom",
            amd: "react-dom",
            commonjs: "react-dom",
            commonjs2: "react-dom",
        }
    }: {})
}