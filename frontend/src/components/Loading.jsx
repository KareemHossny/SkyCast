import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center rounded-3xl bg-white/70 p-12 shadow-xl backdrop-blur dark:bg-slate-900/70">
      <motion.div
        className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
}
