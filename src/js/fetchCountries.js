const BASE_URL = 'https://restcountries.eu/rest/v2/name';
const FILTER = '?fields=name;capital;flag;languages;population';
function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/${searchQuery}${FILTER}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw `Not found country ${searchQuery}`;
    }
    return response.json();
  });
}
export default fetchCountries;
