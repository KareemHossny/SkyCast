function mapCurrentWeather(data) {
  return {
    location: {
      city: data.name,
      country: data.sys.country,
      lat: data.coord.lat,
      lon: data.coord.lon
    },
    current: {
      temp: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon
    },
    updatedAt: data.dt
  };
}

function mapForecast(data) {
  return {
    location: {
      city: data.city.name,
      country: data.city.country,
      lat: data.city.coord.lat,
      lon: data.city.coord.lon
    },
    items: data.list.map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      condition: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }))
  };
}

module.exports = {
  mapCurrentWeather,
  mapForecast
};
