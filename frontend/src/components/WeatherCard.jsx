import { motion } from 'framer-motion';
import { FiDroplet, FiWind } from 'react-icons/fi';

function StarButton({ isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow backdrop-blur transition hover:bg-white dark:bg-slate-900/70 dark:text-slate-200"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${isActive ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.5c.22-.66 1.16-.66 1.38 0l1.63 4.98a.75.75 0 0 0 .7.52h5.25c.7 0 .98.9.42 1.3l-4.25 3.1a.75.75 0 0 0-.27.84l1.63 4.98c.22.66-.53 1.2-1.1.79l-4.25-3.1a.75.75 0 0 0-.88 0l-4.25 3.1c-.56.41-1.31-.13-1.1-.79l1.63-4.98a.75.75 0 0 0-.27-.84l-4.25-3.1c-.56-.4-.28-1.3.42-1.3h5.25a.75.75 0 0 0 .7-.52z"
        />
      </svg>
      {isActive ? 'Saved' : 'Save'}
    </button>
  );
}

export default function WeatherCard({ data, isFavorite, onToggleFavorite, theme }) {
  if (!data) return null;

  const { location, current } = data;

  return (
    <motion.div
      className="w-full rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur dark:bg-slate-900/70"
      style={{ boxShadow: `0 25px 60px -40px ${theme.accent}` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {location.city}, {location.country}
          </p>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
            {Math.round(current.temp)}°C
          </h1>
          <p className="text-base font-medium text-slate-600 dark:text-slate-300">
            {current.condition} · {current.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <img
            src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
            alt={current.description}
            className="h-20 w-20"
          />
          <StarButton isActive={isFavorite} onClick={onToggleFavorite} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <FiDroplet /> Humidity
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {current.humidity}%
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <FiWind /> Wind
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {current.windSpeed} m/s
          </p>
        </div>
      </div>
    </motion.div>
  );
}
