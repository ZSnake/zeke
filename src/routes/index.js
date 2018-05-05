const fs = require('fs');

const joinedRoutes = [];
const files = fs.readdirSync(__dirname);

files
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    const routes = require(`./${file.split('.')[0]}`).default; // eslint-disable-line
    joinedRoutes.push(...routes);
  });

export default joinedRoutes;
