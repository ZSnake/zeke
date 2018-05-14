import * as socrataService from '../../services/socrataService';
import * as geocodingServices from '../../services/geocodingService';
import movie from '../movie';

describe('Movies', () => {
  const movies = [
    {
      actor_1: 'Dennis Quaid',
      actor_2: 'Martin Short',
      actor_3: 'Meg Ryan',
      director: 'Some Director',
      distributor: 'Warner Bros. Pictures',
      fun_facts: '',
      locations: 'Telegraph Hill',
      production_company: 'Amblin Entertainment',
      release_year: '1987',
      title: 'Some Other',
      writer: 'Chip Proser',
      location: { Latitude: 0, Longitude: 0 },
    },
    {
      actor_1: 'Dennis Quaid',
      actor_2: 'Martin Short',
      actor_3: 'Meg Ryan',
      director: 'Joe Dante',
      distributor: 'Warner Bros. Pictures',
      fun_facts: '',
      locations: 'Telegraph Hill 2',
      production_company: 'Amblin Entertainment',
      release_year: '1987',
      title: 'Some Other 2',
      writer: 'Chip Proser',
      location: { Latitude: 0, Longitude: 0 },
    },
  ];
  describe('When getting all movies without filters', async () => {
    let fetchAllMoviesSpy;
    let geocodingSpy;
    afterEach(() => {
      jest.resetAllMocks();
    });
    beforeEach(() => {
      fetchAllMoviesSpy = jest.spyOn(socrataService, 'fetchAllMovies');
      fetchAllMoviesSpy.mockResolvedValue(movies);
      geocodingSpy = jest.spyOn(geocodingServices, 'getLocation');
      geocodingSpy.mockResolvedValue({
        Response: {
          View: [{
            Result: [{ Latitude: 0, Longitude: 0 }],
          }],
        },
      });
    });
    it('Should call fetchAllMovies', async () => {
      await movie.getMovies('', '', 5, 1);
      expect(fetchAllMoviesSpy).toHaveBeenCalled();
    });
    it('Should return an unfiltered list of movies', async () => {
      const result = await movie.getMovies('', '', 5, 1);
      expect(result).toEqual(movies);
    });
  });
  describe('When getting a filtered list of movies', async () => {
    let fetchFilteredMoviesSpy;
    let geocodingSpy;
    let filter = '';
    let filterValue = '';
    let filteredMovies = [];
    afterEach(() => {
      jest.resetAllMocks();
    });
    beforeEach(() => {
      fetchFilteredMoviesSpy = jest.spyOn(socrataService, 'fetchFilteredMovies');
      filter = 'director';
      filterValue = 'Joe Dante';
      filteredMovies = movies.filter(specificMovie => specificMovie[filter] === filterValue);
      fetchFilteredMoviesSpy.mockResolvedValue(filteredMovies);
      geocodingSpy = jest.spyOn(geocodingServices, 'getLocation');
      geocodingSpy.mockResolvedValue({
        Response: {
          View: [{
            Result: [{ Latitude: 0, Longitude: 0 }],
          }],
        },
      });
    });
    it('Should call fetchFilteredMovies', async () => {
      await movie.getMovies(filter, filterValue, 5, 1);
      expect(fetchFilteredMoviesSpy).toHaveBeenCalled();
    });
    it('Should call fetchFilteredMovies', async () => {
      const result = await movie.getMovies(filter, filterValue, 5, 1);
      expect(result).toEqual(filteredMovies);
    });
  });
});
