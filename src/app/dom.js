import array from "countries-list";

export const fillCountries = () => {
  const countriesSelect = document.getElementById('countries');
  const countryCodes = Object.keys(array.countries).sort();
  for(let i = 0; i < countryCodes.length; i += 1){
    const option = document.createElement('option');
    countriesSelect.appendChild(option);
    option.textContent = countryCodes[i];
  }
}