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
    const description = document.getElementById('description');
    fetchApi(weather).then((data) => {
      weather = data;
      result.textContent = weather.temp;
      description.textContent = `Description: ${weather.description}`
      showImg(weather);
    });
  });
}

const showImg = (weather) => {
  const img = document.getElementById('icon');
  img.classList.remove('d-none');
  img.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
}