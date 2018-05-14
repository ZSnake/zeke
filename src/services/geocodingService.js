import axios from 'axios';

export const getLocation = async (address) => {
  let result = {};
  try {
    const response =
      await axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=gD0UlJdVtGi1OBvQFicp&app_code=xSlIwVf2RyK5Lr2m9EPyog&searchtext=${address}, San Francisco, CA`);
    result = response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Locations could not be retrieved: ${error}`);
  }
  return result;
};
