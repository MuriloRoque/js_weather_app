import './main.scss';
import Weather from './app/weather'

const apiKey = '787b617f19647c87dbce494822b4c8d1';

const weather = new Weather('London', 'metric');
weather.fetchApi(apiKey);
