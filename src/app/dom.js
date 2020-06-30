import array from "countries-list";
import { Weather, fetchApi } from './weather'
import { uniqueSort } from "jquery";

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
    const error = document.getElementById('error');
    fetchApi(weather).then((data) => {
      if(data.temp == undefined){
        showError(result, description);
      }
      else{
        weather = data;
        result.classList.remove('d-none');
        description.classList.remove('d-none');
        error.classList.add('d-none');
        if(unit.value == 'metric'){
          result.textContent = `Temperature: ${weather.temp} °C`;
        }
        else{
          result.textContent = `Temperature: ${weather.temp} °F`;
        }
        description.textContent = `${weather.description}`
        showImg(weather);
      }
    });
  });
}

const showImg = (weather) => {
  const img = document.getElementById('icon');
  img.classList.remove('d-none');
  img.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
}

const showError = (result, description) => {
  const error = document.getElementById('error');
  const img = document.getElementById('icon');
  error.classList.remove('d-none');
  result.classList.add('d-none');
  description.classList.add('d-none');
  img.classList.add('d-none');
}