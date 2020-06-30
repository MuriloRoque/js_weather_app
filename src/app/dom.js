import array from 'countries-list'; // eslint-disable-line import/no-extraneous-dependencies
import { Weather, fetchApi } from './weather';

const domManipulation = (() => {
  const countriesSelect = document.getElementById('countries');
  const zip = document.getElementById('zip');
  const unit = document.getElementById('unit');
  const result = document.getElementById('result');
  const description = document.getElementById('description');
  const error = document.getElementById('error');

  const showImg = (weather) => {
    const img = document.getElementById('icon');
    img.classList.remove('d-none');
    img.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  };

  const showError = (data) => {
    const error = document.getElementById('error');
    const img = document.getElementById('icon');
    error.textContent = data.message;
    error.classList.remove('d-none');
    result.classList.add('d-none');
    description.classList.add('d-none');
    img.classList.add('d-none');
  };

  const showResult = (weather) => {
    result.classList.remove('d-none');
    description.classList.remove('d-none');
    error.classList.add('d-none');
    if (unit.value === 'metric') {
      result.textContent = `Temperature: ${weather.temp} °C`;
    } else {
      result.textContent = `Temperature: ${weather.temp} °F`;
    }
    description.textContent = `${weather.description}`;
    showImg(weather);
  };

  const submitForm = () => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', (event) => {
      event.preventDefault();
      let weather = new Weather(countriesSelect.value, zip.value, unit.value);
      fetchApi(weather).then((data) => {
        if (data.cod !== undefined) {
          showError(data);
        } else {
          weather = data;
          showResult(weather);
        }
      });
    });
  };

  const fillCountries = () => {
    const countryCodes = Object.keys(array.countries).sort();
    for (let i = 0; i < countryCodes.length; i += 1) {
      const option = document.createElement('option');
      countriesSelect.appendChild(option);
      option.textContent = countryCodes[i];
    }
    submitForm();
  };

  return { fillCountries };
})();
export default domManipulation;
