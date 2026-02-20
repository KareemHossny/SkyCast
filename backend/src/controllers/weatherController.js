const {
  fetchCurrentByCity,
  fetchCurrentByCoords,
  fetchForecastByCity
} = require('../services/openWeatherService');
const { badRequest } = require('../utils/errorHandlers');

async function getCurrentWeather(req, res, next) {
  try {
    const { city, lat, lon } = req.query;

    if (city) {
      const data = await fetchCurrentByCity(city);
      return res.json(data);
    }

    if (lat && lon) {
      const data = await fetchCurrentByCoords(lat, lon);
      return res.json(data);
    }

    return next(badRequest('Provide a city or lat/lon.'));
  } catch (err) {
    return next(err);
  }
}

async function getForecast(req, res, next) {
  try {
    const { city } = req.query;

    if (!city) {
      return next(badRequest('Provide a city for forecast.'));
    }

    const data = await fetchForecastByCity(city);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCurrentWeather,
  getForecast
};
