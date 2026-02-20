import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import ForecastTimeline from './components/ForecastTimeline.jsx';
import Loading from './components/Loading.jsx';
import FavoritesBar from './components/FavoritesBar.jsx';
import TemperatureChart from './components/TemperatureChart.jsx';
import LastUpdated from './components/LastUpdated.jsx';
import Navbar from './components/Navbar.jsx';
import { fetchForecastByCity, fetchWeatherByCity, fetchWeatherByCoords } from './lib/api.js';
import { useTheme } from './hooks/useTheme.js';
import { useFavorites } from './hooks/useFavorites.js';
import { getWeatherTheme } from './hooks/useWeatherTheme.js';
import { useGeolocation } from './hooks/useGeolocation.js';

const popularCities = [
  'New York',
  'London',
  'Paris',
  'Tokyo',
  'Dubai',
  'Toronto',
  'Sydney',
  'Seoul',
  'Singapore',
  'Istanbul'
];

export default function App() {
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [showFavorites, setShowFavorites] = useState(true);
  const favorites = useFavorites();
  const geo = useGeolocation();

  const weatherQuery = useQuery({
    queryKey: ['weather', { city, coords: geo.coords }],
    queryFn: () => {
      if (geo.coords) return fetchWeatherByCoords(geo.coords.lat, geo.coords.lon);
      return fetchWeatherByCity(city);
    },
    enabled: Boolean(geo.coords) || Boolean(city)
  });

  const forecastCity = weatherQuery.data?.location?.city || city;

  const forecastQuery = useQuery({
    queryKey: ['forecast', forecastCity],
    queryFn: () => fetchForecastByCity(forecastCity),
    enabled: Boolean(forecastCity)
  });

  const themePalette = useMemo(() => {
    const condition = weatherQuery.data?.current?.condition || 'Clear';
    return getWeatherTheme(condition);
  }, [weatherQuery.data]);

  const lastUpdatedAt = Math.max(
    weatherQuery.dataUpdatedAt || 0,
    forecastQuery.dataUpdatedAt || 0
  );

  const suggestions = useMemo(() => {
    const merged = [...favorites.favorites, ...popularCities];
    return Array.from(new Set(merged));
  }, [favorites.favorites]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;
    setCity(trimmed);
    geo.setCoords(null);
    setSearch('');
  };

  const handleSelectCity = (selected) => {
    setCity(selected);
    geo.setCoords(null);
    setSearch('');
  };

  const handleUseLocation = () => {
    setCity('');
    geo.requestLocation();
  };

  const showLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  const showError = weatherQuery.isError || forecastQuery.isError;

  return (
    <motion.div
      className="min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(135deg, var(--bg-from), var(--bg-to))'
      }}
      animate={{
        '--bg-from': themePalette.bgFrom,
        '--bg-to': themePalette.bgTo
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="min-h-screen bg-white/10 px-4 py-10 transition-colors duration-500 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Navbar
            theme={theme}
            onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            onUseLocation={handleUseLocation}
            locationLoading={geo.status === 'loading'}
            onToggleFavorites={() => setShowFavorites((prev) => !prev)}
            favoritesCount={favorites.favorites.length}
          />

          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 shadow-sm backdrop-blur">
                SkyCast
              </div>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Know the weather before you go.
                <span className="block text-white/80">Anytime. Anywhere.</span>
              </h1>
              <p className="mt-2 text-sm font-medium text-white/75">
                Smart forecasts, elegant design, and instant clarity in one place.
              </p>
              <div className="mt-2">
                <LastUpdated timestamp={lastUpdatedAt} />
              </div>
            </div>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSubmit}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectCity}
          />

          {showFavorites && (
            <FavoritesBar
              favorites={favorites.favorites}
              onSelect={handleSelectCity}
              onToggle={favorites.toggleFavorite}
              isFavorite={favorites.isFavorite}
            />
          )}

          {geo.status === 'error' && !city && (
            <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-600 shadow dark:bg-slate-900/70 dark:text-slate-300">
              {geo.error}
            </div>
          )}

          {geo.permission === 'denied' && !city && (
            <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-600 shadow dark:bg-slate-900/70 dark:text-slate-300">
              Location access is blocked in your browser settings. Allow it and try again.
            </div>
          )}

          {showLoading && <Loading />}

          {showError && (
            <div className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700 shadow dark:bg-rose-900/40 dark:text-rose-200">
              {weatherQuery.error?.message || forecastQuery.error?.message}
            </div>
          )}

          {!showLoading && !showError && weatherQuery.data && (
            <>
              <WeatherCard
                data={weatherQuery.data}
                theme={themePalette}
                isFavorite={favorites.isFavorite(weatherQuery.data.location.city)}
                onToggleFavorite={() => favorites.toggleFavorite(weatherQuery.data.location.city)}
              />
              {forecastQuery.data && (
                <>
                  <TemperatureChart forecast={forecastQuery.data} theme={themePalette} />
                  <ForecastTimeline forecast={forecastQuery.data} theme={themePalette} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
