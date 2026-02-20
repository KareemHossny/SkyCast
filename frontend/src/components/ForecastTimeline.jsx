import { motion } from 'framer-motion';

function formatTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ForecastTimeline({ forecast, theme }) {
  if (!forecast) return null;

  return (
    <div
      className="w-full rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur dark:bg-slate-900/70"
      style={{ boxShadow: `0 25px 60px -40px ${theme.accent}` }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Forecast</h2>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.items.slice(0, 16).map((item, index) => (
          <motion.div
            key={item.dt}
            className="min-w-[120px] rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {formatTime(item.dt)}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              className="mx-auto h-10 w-10"
            />
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {Math.round(item.temp)}°
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.condition}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
