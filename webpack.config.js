module.exports = {
    entry: "./js/app.js",
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: "#inline-source-map",
    output: {
        path: __dirname + "/dist",
        filename: "app.bundle.js",
        publicPath: '/dist/',
        sourceMapFilename: "bundle.js.map"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query:
                {
                    presets: ["es2015",'react']
                }
            }
        ],
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};