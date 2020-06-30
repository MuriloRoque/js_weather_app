export class Weather {
  constructor(country, zip) {
    this.country = country;
    this.zip = zip;
    this.unit = '';
    this.tempCelcius = '';
    this.tempFare = '';
    this.icon = '';
    this.description = '';
  }
}

export const fetchApi = async (weather) => {
  const URL = 'https://api.openweathermap.org/data/2.5/weather?';
  const ZIP = 'zip=';
  const UNITS = '&units=';
  const CELCIUS = 'metric';
  const FARE = 'imperial';
  const API = '&appid=';
  const apiKey = '787b617f19647c87dbce494822b4c8d1';

  const UrlCelcius = `${URL + ZIP + weather.zip},${weather.country.toLowerCase()}${UNITS}${CELCIUS}${API}${apiKey}`;
  const responseCelcius = await fetch(UrlCelcius, { mode: 'cors' });
  const dataCelcius = await responseCelcius.json();
  if (responseCelcius.status !== 200) {
    return dataCelcius;
  }
  else{
    weather.tempCelcius = dataCelcius.main.temp;
    const UrlFare = `${URL + ZIP + weather.zip},${weather.country.toLowerCase()}${UNITS}${FARE}${API}${apiKey}`;
    const responseFare = await fetch(UrlFare, { mode: 'cors' });
    const dataFare = await responseFare.json();
    if (responseFare.status !== 200) {
      return dataFare;
    }
    weather.tempFare = dataFare.main.temp;
    weather.icon = dataFare.weather[0].icon;
    weather.description = dataFare.weather[0].description;
    return weather;
  }
};
