const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js', // TODO: code split
    },
    externals: [{ window: 'window' }],
    devtool: 'source-map',
    module: {
        rules: [
            // TODO: transpile to ES5 for legacy browsers
            // {
            //     loader: 'babel-loader',
            //     test: /\.jsx?$/,
            //     exclude: path.join(__dirname, '/node_modules'),
            //     options: { presets: ['env'] },
            // },
            {
                loader: 'eslint-loader',
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: path.join(__dirname, '/node_modules'),
            },
        ],
    },
};
