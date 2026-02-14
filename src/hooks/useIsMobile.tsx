import { useWindowSize } from "./useWindowSize";

export function useIsMobile(breakpoint: number = 768) {
  const { width } = useWindowSize();
  return width < breakpoint;
}