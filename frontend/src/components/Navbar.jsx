import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiSun, FiMoon } from 'react-icons/fi';
import logoLight from '../logo/v920-kul-45.jpg';
import logoDark from '../logo/v920-kul-10.jpg';

export default function Navbar({
  theme,
  onToggleTheme,
  onUseLocation,
  locationLoading,
  onToggleFavorites,
  favoritesCount
}) {
  const logoSrc = theme === 'dark' ? logoDark : logoLight;

  return (
    <motion.header
      className="sticky top-4 z-30 mx-auto w-full max-w-5xl rounded-3xl bg-white/70 px-4 py-3 shadow-xl backdrop-blur dark:bg-slate-900/70"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-white/70 shadow dark:bg-slate-800">
            <img src={logoSrc} alt="SkyCast logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              SkyCast
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Premium Weather
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onUseLocation}
            className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow transition hover:bg-white dark:bg-slate-800/70 dark:text-slate-100"
          >
            <FiMapPin className="h-4 w-4" />
            {locationLoading ? 'Locating...' : 'Use my location'}
          </button>

          <button
            type="button"
            onClick={onToggleFavorites}
            className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow transition hover:bg-white dark:bg-slate-800/70 dark:text-slate-100"
          >
            <FiStar className="h-4 w-4" />
            Favorites {favoritesCount > 0 ? `(${favoritesCount})` : ''}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow transition hover:bg-white dark:bg-slate-800/70 dark:text-slate-100"
          >
            {theme === 'dark' ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
