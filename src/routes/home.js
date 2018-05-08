// @flow
import { fetchAllMovies } from '../services/socrataService';

export default [
  {
    method: 'GET',
    path: '/',
    handler: async () => {
      let result = [];
      try {
        result = await fetchAllMovies();
      } catch (error) {
        console.log(error);
        result = ['error'];
      }
      return result;
    },
  },
];
