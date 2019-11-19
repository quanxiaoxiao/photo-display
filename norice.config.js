const path = require('path'); // eslint-disable-line
const photoView = require('./lib/photoView');


module.exports = {
  webpackDev: require('./webpack.dev.js'),
  api: {
    '/file/(.*)': {
      file: (ctx) => path.resolve(__dirname, 'files', decodeURIComponent(ctx.matchs[1])),
    },
    '/photo/view': {
      body: () => {
        const base = path.resolve(__dirname, 'files');
        return photoView(base, '/file');
      },
    },
  },
};
