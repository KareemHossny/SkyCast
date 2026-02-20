import { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'skycast-favorites';

function loadFavorites() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useMemo(() => {
    const set = new Set(favorites.map((c) => c.toLowerCase()));
    return (city) => set.has(city.toLowerCase());
  }, [favorites]);

  const addFavorite = (city) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setFavorites((prev) => {
      const exists = prev.some((c) => c.toLowerCase() === trimmed.toLowerCase());
      return exists ? prev : [...prev, trimmed];
    });
  };

  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((c) => c.toLowerCase() !== city.toLowerCase()));
  };

  const toggleFavorite = (city) => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
}
