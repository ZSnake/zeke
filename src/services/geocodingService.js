import axios from 'axios';
import { applicationId, applicationCode, city, state } from '../config/geocode';

export const getLocation = async (address) => {
  let result = {};
  try {
    const response =
      await axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=${applicationId}&app_code=${applicationCode}&searchtext=${address}, ${city}, ${state}`);
    result = response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Locations could not be retrieved: ${error}`);
  }
  return result;
};
