class Weather{
	constructor(city, unit){
		this.city = city,
    this.unit = unit,
		this.temp = ''
  }

  async fetchApi(apiKey){
		const URL = "https://api.openweathermap.org/data/2.5/weather?";
    const CITY = "q=";
    const UNITS = "&units=";
		const API = '&appid='
    const currentUrl = URL + CITY + this.city + UNITS + this.unit + API + apiKey;

		try{
			const response = await fetch(currentUrl, { mode: 'cors' });
			const data = await response.json();
			this.temp = data.main.temp;
			console.log(`temperature is ${this.temp}`);

		}catch(err){
			console.log("API ERROR : " + err);
		}
	}
}
export default Weather;