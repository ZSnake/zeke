import axios from 'axios';
import { fetchAllMovies, fetchFilteredMovies } from '../socrataService';
import socrataApi from '../../config/socrata';

describe('Socrata Service', () => {
  describe('When getting all movies from Socrata Service', async () => {
    afterEach(() => {
      axios.get.mockRestore();
    });
    beforeEach(() => {
      axios.get = jest.fn();
    });
    it('Should return a list of all movies', async () => {
      const testMovies = { data: [{ id: 1 }, { id: 2 }, { id: 3 }] };
      axios.get.mockResolvedValue(testMovies);
      let result = [];
      try {
        result = await fetchAllMovies();
        expect(result).toEqual(testMovies.data);
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  describe('When filtering movies from Socrata Service', async () => {
    let testMovies = [];
    let testFilter = '';
    let testFilterValue = '';
    let filteredMovies = [];
    let result = [];
    afterEach(() => {
      axios.get.mockRestore();
    });
    beforeEach(() => {
      axios.get = jest.fn();
      testMovies = {
        data: [
          {
            actor_1: 'Glenn Close',
            actor_2: 'Jeff Bridges',
            actor_3: 'Peter Coyote',
            director: 'Richard Marquand',
            distributor: 'Columbia Pictures',
            locations: 'Golden Gate Bridge',
            production_company: 'Columbia Pictures Corp.',
            release_year: '1985',
            title: 'Jagged Edge',
            writer: 'Joe Eszterhas',
          },
          {
            actor_1: 'Dennis Quaid',
            actor_2: 'Martin Short',
            actor_3: 'Meg Ryan',
            director: 'Joe Dante',
            distributor: 'Warner Bros. Pictures',
            fun_facts: 'Largely untouched by the 1906 earthquake, Telegraph Hill has the most pre-1870 buildings in the city.',
            locations: 'Telegraph Hill',
            production_company: 'Amblin Entertainment',
            release_year: '1987',
            title: 'Innerspace',
            writer: 'Chip Proser',
          },
          {
            actor_1: 'Dennis Quaid',
            actor_2: 'Martin Short',
            actor_3: 'Meg Ryan',
            director: 'Joe Dante',
            distributor: 'Warner Bros. Pictures',
            fun_facts: '',
            locations: 'Telegraph Hill',
            production_company: 'Amblin Entertainment',
            release_year: '1987',
            title: 'Some Other',
            writer: 'Chip Proser',
          },
        ],
      };
      testFilter = 'director';
      testFilterValue = 'Richard Marquand';
      filteredMovies = testMovies.data.filter(movie => movie[testFilter] === testFilterValue);
    });
    it('Should append filter to request URL', async () => {
      try {
        axios.get.mockResolvedValue(filteredMovies);
        await fetchFilteredMovies(testFilter, testFilterValue);
        expect(axios.get).toHaveBeenCalledWith(`${socrataApi.host}?${testFilter}=${testFilterValue}`);
      } catch (error) {
        throw new Error(error);
      }
    });
    it('Should return a list of the filtered movies', async () => {
      try {
        axios.get.mockResolvedValue({ data: filteredMovies });
        result = await fetchFilteredMovies(testFilter, testFilterValue);
        expect(result).toEqual(filteredMovies);
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
