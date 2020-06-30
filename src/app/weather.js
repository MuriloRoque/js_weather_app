export class Weather{
	constructor(country, zip, unit){
		this.country = country,
		this.zip = zip,
    this.unit = unit,
		this.temp = ''
	}
}

export const fetchApi = async (weather) => {
	const URL = "http://api.openweathermap.org/data/2.5/weather?";
	const ZIP = "zip=";
	const UNITS = "&units=";
	const API = '&appid='
	const apiKey = '787b617f19647c87dbce494822b4c8d1';
	const currentUrl = URL + ZIP + weather.zip + ',' + weather.country.toLowerCase() + UNITS + weather.unit + API + apiKey;

	try{
		const response = await fetch(currentUrl, { mode: 'cors' });
		const data = await response.json();
		weather.temp = data.main.temp;
		return weather;

	}catch(err){
		console.log("API ERROR : " + err);
	}
}
