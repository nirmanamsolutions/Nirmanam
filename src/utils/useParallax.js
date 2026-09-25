import { useTransform } from 'framer-motion';

export function useParallax(value, distance = 100) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
