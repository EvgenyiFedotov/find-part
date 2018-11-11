const createConfig = require('./webpack/createConfig');

const mode = 'development'; // development | production
let devtool = 'source-map';

if (mode === 'production') {
  devtool = undefined;
}

module.exports = [
  createConfig({
    entry: {
      auth: './src/client/modules/auth/client.jsx',
      dashboard: './src/client/modules/dashboard/loader.js',
    },
    output: {
      path: `${__dirname}/dist/client`,
      chunkFilename: '[name].js',
      publicPath: '/',
    },
    mode,
    devtool,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  }),

  createConfig({
    entry: {
      index: './src/server/index.js',
    },
    output: {
      path: `${__dirname}/dist/server`,
    },
    mode,
    devtool,
    target: 'node',
    externals: ['uws'],
    stats: {
      warnings: false,
    },
  }),
];
