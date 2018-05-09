// @flow
import boom from 'boom';
import type { Movie } from '../types/movies';
import movie from '../domain/movie';

const getMovies = async (request: Object): Promise<Movie[]> => {
  const { filter, filterValue } = request.query;
  let result = [];
  try {
    result = await movie.getMovies(filter, filterValue);
    return result;
  } catch (error) {
    return boom.badRequest(error);
  }
};

export default {
  getMovies,
};
