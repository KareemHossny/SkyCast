import { motion } from 'framer-motion';

function StarIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.5c.22-.66 1.16-.66 1.38 0l1.63 4.98a.75.75 0 0 0 .7.52h5.25c.7 0 .98.9.42 1.3l-4.25 3.1a.75.75 0 0 0-.27.84l1.63 4.98c.22.66-.53 1.2-1.1.79l-4.25-3.1a.75.75 0 0 0-.88 0l-4.25 3.1c-.56.41-1.31-.13-1.1-.79l1.63-4.98a.75.75 0 0 0-.27-.84l-4.25-3.1c-.56-.4-.28-1.3.42-1.3h5.25a.75.75 0 0 0 .7-.52z"
      />
    </svg>
  );
}

export default function FavoritesBar({ favorites, onSelect, onToggle, isFavorite }) {
  if (!favorites.length) return null;

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {favorites.map((city, index) => (
        <motion.button
          key={city}
          type="button"
          onClick={() => onSelect(city)}
          className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow backdrop-blur transition hover:bg-white dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <span>{city}</span>
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(city);
            }}
          >
            <StarIcon filled={isFavorite(city)} />
          </span>
        </motion.button>
      ))}
    </div>
  );
}
