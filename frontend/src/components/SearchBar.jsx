import { motion } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filtered = useMemo(() => {
    if (!value) return suggestions;
    const query = value.toLowerCase();
    return suggestions.filter((city) => city.toLowerCase().includes(query));
  }, [suggestions, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = isOpen && filtered.length > 0;

  const handleKeyDown = (event) => {
    if (!showDropdown) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      onSelectSuggestion(filtered[activeIndex]);
      setActiveIndex(-1);
      setIsOpen(false);
    }

    if (event.key === 'Escape') {
      setActiveIndex(-1);
      setIsOpen(false);
    }
  };

  return (
    <motion.form
      ref={wrapperRef}
      onSubmit={onSubmit}
      className="relative z-40 flex w-full items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-lg backdrop-blur dark:bg-slate-900/70"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FiSearch className="h-5 w-5 text-slate-400" />
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        className="w-full bg-transparent text-base font-medium outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        Search
      </button>

      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl bg-white/90 p-2 shadow-2xl backdrop-blur dark:bg-slate-900/90">
          {filtered.map((city, index) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                onSelectSuggestion(city);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                index === activeIndex
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4" />
                {city}
              </span>
            </button>
          ))}
        </div>
      )}
    </motion.form>
  );
}
