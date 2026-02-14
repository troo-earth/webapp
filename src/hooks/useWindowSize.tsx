import { useSyncExternalStore } from 'react';

export function useWindowSize() {
  const width = useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth,
    () => 1024 // Server-side default (Desktop first)
  );

  const height = useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerHeight,
    () => 800
  );

  return { width, height };
}