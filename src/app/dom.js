import array from 'countries-list'; // eslint-disable-line import/no-extraneous-dependencies
import { Weather, fetchApi } from './weather';

const domManipulation = (() => {
  const countriesSelect = document.getElementById('countries');
  const zip = document.getElementById('zip');
  const resultCelcius = document.getElementById('result-celcius');
  const resultFare = document.getElementById('result-fare');
  const change = document.getElementById('change');
  const description = document.getElementById('description');
  const error = document.getElementById('error');
  const reset = document.getElementById('reset');
  const submit = document.getElementById('submit');

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
    resultCelcius.classList.add('d-none');
    resultFare.classList.add('d-none');
    description.classList.add('d-none');
    img.classList.add('d-none');
  };

  const changeButton = () => {
    change.addEventListener('click', (event) => {
      event.preventDefault();
      if (change.textContent === 'Change to Fahrenheit') {
        change.textContent = 'Change to Celcius';
        resultCelcius.classList.add('d-none');
        resultFare.classList.remove('d-none');
      } else {
        change.textContent = 'Change to Fahrenheit';
        resultCelcius.classList.remove('d-none');
        resultFare.classList.add('d-none');
      }
    });
  };

  const showResult = (weather) => {
    resultCelcius.classList.remove('d-none');
    description.classList.remove('d-none');
    error.classList.add('d-none');
    change.classList.remove('d-none');
    resultCelcius.textContent = `Temperature: ${weather.tempCelcius} °C`;
    resultFare.textContent = `Temperature: ${weather.tempFare} °F`;
    description.textContent = `${weather.description}`;
    showImg(weather);
    changeButton();
  };

  const resetButton = () => {
    reset.classList.remove('d-none');
    submit.classList.add('d-none');
    reset.addEventListener('click', () => false);
  };

  const submitForm = () => {
    submit.addEventListener('click', (event) => {
      event.preventDefault();
      let weather = new Weather(countriesSelect.value, zip.value);
      fetchApi(weather, 'metric').then((data) => {
        if (data.cod !== undefined) {
          showError(data);
        } else {
          weather = data;
          showResult(weather);
          resetButton();
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
