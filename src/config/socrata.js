export const socrataApiToken = process.env.SOCRATA_KEY || 'fake_api_key';
export default {
  host: `https://data.sfgov.org/resource/wwmu-gmzc.json?$$app_token=${socrataApiToken}`,
};
