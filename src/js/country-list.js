import countryItemTmpl from '../templates/country-item.hbs';
import countryCardTmpl from '../templates/country-card.hbs';
import fetchCountries from './fetchCountries';
import { error } from '@pnotify/core';
import * as Confirm from '@pnotify/confirm';
// import menuItems from './menu.json';
const _ = require('lodash');
const refs = {
  countryInput: document.querySelector('#country'),
  countryList: document.querySelector('.country-box'),
};

refs.countryInput.addEventListener('input', _.debounce(onInput, 500));
function onInput(e) {
  console.log('input');
  e.preventDefault();
  const form = e.target;
  console.log(e.target);
  const searchQuery = form.value;
  fetchCountries(searchQuery).then(renderCountry).catch(onError);
}
function renderCountry(countries) {
  let markup;
  console.log(countries);
  if (countries.length === 1) {
    // console.log(countries[0]);
    markup = countryCardTmpl(countries[0]);
  } else if (countries.length <= 10) {
    markup = countryItemTmpl(countries);
  } else {
    return onError('Too many matches found. Please enter a more specific query!');
  }

  refs.countryList.innerHTML = markup;
}
function onError(errorText) {
  refs.countryList.innerHTML = '';
  error({
    text: errorText,
    delay: 1500,
  });
}
