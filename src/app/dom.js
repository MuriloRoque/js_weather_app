import array from "countries-list";
import { Weather, fetchApi } from './weather'

const countriesSelect = document.getElementById('countries');

export const fillCountries = () => {
  const countryCodes = Object.keys(array.countries).sort();
  for(let i = 0; i < countryCodes.length; i += 1){
    const option = document.createElement('option');
    countriesSelect.appendChild(option);
    option.textContent = countryCodes[i];
  }
}

export const submitForm = () => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    const zip = document.getElementById('zip');
    const unit = document.getElementById('unit');
    let weather = new Weather(countriesSelect.value, zip.value, unit.value);
    const result = document.getElementById('result');
    fetchApi(weather).then((data) => {
      weather = data;
      result.textContent = weather.temp;
    });
  });
}