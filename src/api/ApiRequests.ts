export const convertCurrency = () => fetch('https://swapi.dev/api/people')
  .then(res => res.json());