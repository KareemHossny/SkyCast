import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow backdrop-blur transition dark:bg-slate-900/70 dark:text-slate-200"
      whileTap={{ scale: 0.96 }}
    >
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
    </motion.button>
  );
}
