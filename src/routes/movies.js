// @flow
import type { Route } from '../types/routes';
import moviesHandler from '../handlers/movies';

const routes: Route[] = [
  {
    method: 'GET',
    path: '/movies',
    handler: moviesHandler.getMovies,
  },
];

export default routes;
