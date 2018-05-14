// @flow
import { fetchAllMovies, fetchFilteredMovies } from '../services/socrataService';
import { getLocation } from '../services/geocodingService';
import type { Movie } from '../types/movies';

const encodeAddress = (address) => {
  const formattedAddress = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return encodeURI(formattedAddress);
};

const getMovies =
  async (
    filter?: string,
    filterValue?: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<Movie[]> => {
    let movies: Movie[] = [];
    movies = filter && filterValue ?
      await fetchFilteredMovies(filter, filterValue) :
      await fetchAllMovies();
    movies = await Promise.all(movies
      .filter((movie, index, array) =>
        movie.locations &&
        array.map(mappedMovie => mappedMovie.title).indexOf(movie.title) === index)
      .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
      .map(async (movie) => {
        const locationResponse = await getLocation(encodeAddress(movie.locations));
        return {
          ...movie,
          location: locationResponse.Response.View.length &&
            locationResponse.Response.View[0].Result[0],
        };
      }));
    return movies;
  };

export default {
  getMovies,
};
