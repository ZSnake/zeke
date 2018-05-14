import hapi from 'hapi';
import 'babel-core/register';
import 'babel-polyfill';

import routes from './routes/index';

const server = hapi.server({
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
    console.log('Error', err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
