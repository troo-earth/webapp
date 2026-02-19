import { useWindowSize } from "./useWindowSize";

export function useIsMobileOrNestHub(breakpoint: number = 768) {
  const { width, height } = useWindowSize();

  const isMobile = width < breakpoint;

  const isNestHub =
    (width === 1024 && height === 600) ||
    (width === 1280 && height === 800);

  return { isMobile, isNestHub };
}