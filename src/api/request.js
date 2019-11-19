const get = (path) => fetch(`${path}`, {
  mode: 'cors',
}).then((a) => a.json());


export default {
  get,
};
