const createConfig = require('./webpack/createConfig');

const mode = 'development';
const devtool = 'source-map';

module.exports = [
  createConfig({
    entry: {
      index: './src/client/index.js',
    },
    output: {
      path: `${__dirname}/dist/client`,
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
