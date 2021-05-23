const path = require('path')

console.log("procee", process.env.mode)

module.exports = {
    mode: process.env.mode || "development",
    entry: path.resolve("./demo/index.tsx"),
    output: {
        filename: "canvas.js",
        path: path.resolve('./demo'),
        libraryTarget: "umd",
        libraryExport: "default"
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
    // externals: {
    //     "react": {
    //         commonjs: "react",
    //         amd: "react",
    //         root: "React"
    //         commonjs2: "react",
    //     },
    //     "react-dom": {
    //         root: "ReactDom",
    //         amd: "react-dom",
    //         commonjs: "react-dom",
    //         commonjs2: "react-dom",
    //     }
    // }
}