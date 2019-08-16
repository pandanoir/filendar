const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        filename: 'filendar.js',
        path: path.resolve(__dirname, './dist'),
        library: 'Calendar',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
};
