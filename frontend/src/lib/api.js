const BASE = '';

export async function fetchWeatherByCity(city) {
  const res = await fetch(`${BASE}/api/weather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch weather');
  return data;
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE}/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch weather');
  return data;
}

export async function fetchForecastByCity(city) {
  const res = await fetch(`${BASE}/api/weather/forecast?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch forecast');
  return data;
}
