const path = require('path'); // eslint-disable-line
const photoDisplay = require('./lib/photoDisplay');


module.exports = {
  webpackDev: require('./webpack.dev.js'),
  api: {
    '/file/(.*)': {
      file: (ctx) => path.resolve(__dirname, 'files', decodeURIComponent(ctx.matchs[1])),
    },
    '/photo/view': {
      body: () => {
        const base = path.resolve(__dirname, 'files');
        return photoDisplay(base, '/file');
      },
    },
  },
};
