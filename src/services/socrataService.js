// @flow
import axios from 'axios';
import type { Movie } from '../types/movies';
import socrataApi from '../config/socrata';

type SocrataResponse = {
  data: Movie[],
}
export const fetchAllMovies = async (): Promise<Movie[]> => {
  let result: Movie[] = [];
  try {
    const response: SocrataResponse =
      await axios.get(socrataApi.host);
    result = response.data;
  } catch (error) {
    throw new Error(`Movies could not be retrieved: ${error}`);
  }
  return result;
};

export const fetchFilteredMovies =
  async (filter: string, filterValue: string): Promise<Movie[]> => {
    let result: Movie[] = [];
    try {
      const response: SocrataResponse =
        await axios.get(`${socrataApi.host}&${filter}=${filterValue}`);
      result = response.data;
    } catch (error) {
      throw new Error(`Movies could not be retrieved: ${error}`);
    }
    return result;
  };
