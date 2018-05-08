import { fetchAllMovies, fetchFilteredMovies } from '../services/socrataService';
import type { Movie } from '../types/movies';

const getMovies = async (filter?: string, filterValue?: string): Promise<Movie[]> => {
  let movies: Movie[] = [];
  try {
    movies = await filter && filterValue ?
      fetchFilteredMovies(filter, filterValue) :
      fetchAllMovies();
    return movies;
  } catch (error) {
    throw new Error(`Movies could not be retrieved: ${error}`);
  }
};


export default {
  getMovies,
};
