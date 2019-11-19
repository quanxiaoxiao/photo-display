const path = require('path'); // eslint-disable-line
const fs = require('fs');
const fp = require('lodash/fp');
const fileType = require('file-type');
const sizeOf = require('image-size');

const getFilePaths = (pathname) => {
  const stats = fs.statSync(pathname);
  if (stats.isFile()) {
    return [pathname];
  }
  const list = fs.readdirSync(pathname);
  const len = list.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    const file = list[i];
    result.push(...getFilePaths(path.join(pathname, file)));
  }
  return result;
};

const getPhotos = (filePaths) => {
  const len = filePaths.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    const filePathItem = filePaths[i];
    const buf = fs.readFileSync(filePathItem);
    const type = fileType(buf.slice(0, Math.min(fileType.minimumBytes, buf.length)));
    if (type && /^image\/.+/.test(type.mime)) {
      const dimensions = sizeOf(filePathItem);
      const { name } = path.parse(filePathItem);
      result.push({
        pathname: filePathItem,
        width: dimensions.width,
        height: dimensions.height,
        mime: type.mime,
        name,
      });
    }
  }

  return result;
};

const getPhotoList = (pathname) => fp.compose(
  getPhotos,
  getFilePaths,
)(pathname);

module.exports = (base, prefix) => {
  const scripts = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'main.js'));
  const files = getPhotoList(base)
    .map((item) => ({
      name: item.name,
      width: item.width,
      height: item.height,
      path: `/${item.pathname.slice(base.length + 1)}`,
      src: `${prefix}/${item.pathname.slice(base.length + 1)}`,
    }));
  const data = {
    list: files,
  };
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <script id="js-initialData" type="text/json">${JSON.stringify(data)}</script>
  </head>
  <body><div id="root" style="height:100%"></div><script>${scripts}</script></body>
</html>`;
};
