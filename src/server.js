import hapi from 'hapi';
import 'babel-core/register';
import 'babel-polyfill';

import routes from './routes/index';

console.log(process.env.PORT);
const server = hapi.server({
  host: 'localhost',
  port: process.env.PORT || 8000,
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

routes.forEach(route => server.route(route));

const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
