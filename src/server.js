import hapi from 'hapi';
import routes from './routes/index';

const server = hapi.server({
  host: 'localhost',
  port: 8000,
});

console.log(routes);
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
