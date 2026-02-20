const { mapCurrentWeather, mapForecast } = require('../utils/mappers');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function getApiKey() {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error('OPENWEATHER_API_KEY is not set.');
  }
  return key;
}

async function request(url) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const message = data && data.message ? data.message : 'OpenWeather error';
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}

async function fetchCurrentByCity(city) {
  const key = getApiKey();
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
  const data = await request(url);
  return mapCurrentWeather(data);
}

async function fetchCurrentByCoords(lat, lon) {
  const key = getApiKey();
  const url = `${BASE_URL}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${key}&units=metric`;
  const data = await request(url);
  return mapCurrentWeather(data);
}

async function fetchForecastByCity(city) {
  const key = getApiKey();
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
  const data = await request(url);
  return mapForecast(data);
}

module.exports = {
  fetchCurrentByCity,
  fetchCurrentByCoords,
  fetchForecastByCity
};
