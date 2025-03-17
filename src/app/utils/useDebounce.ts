import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: Parameters<T>) 
=> void>(func: T, delay: number): (...args: Parameters<T>) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction: (...args: Parameters<T>) => void = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debouncedFunction;
}
