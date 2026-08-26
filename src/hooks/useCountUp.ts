import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 to target over duration (ms) using easeOutCubic,
 * with an optional start delay.
 */
export function useCountUp(target: number = 20, duration: number = 2000, delay: number = 1200): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutCubic: 1 - Math.pow(1 - progress, 3)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easedProgress * target);
        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, delay]);

  return count;
}
