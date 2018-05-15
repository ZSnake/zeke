# Moviewer Backend
## To run
- Clone repo
- npm install -g jest
- npm install
- npm run dev

## Description
The Moviewer is a REST API meant to pull a list of all the movies filmed in San Francisco
using a Database provided by the San Francisco .gov site:
https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am
and more specifically an API provided by socrata.com https://dev.socrata.com/foundry/data.sfgov.org/wwmu-gmzc,
these are accessed through services used by the `movies` domain model; the model is the accessed by the handler who
directly returns the information to the client.

## Technologies used
- HapiJS 17
- Axios
- Flow
- Jest

## Trade-offs
Mainly due to time constrains some things I wanted to implement were left out.
- More thorough testing (only happy path testing for now)
- Custom search and filtering (using Socratas filter right now)
- More detailed information for movies (integration to https://www.themoviedb.org/documentation/api)
## Urls
- Frontend: https://shagohod.herokuapp.com/
- Backend: https://zekeapi.herokuapp.com/
