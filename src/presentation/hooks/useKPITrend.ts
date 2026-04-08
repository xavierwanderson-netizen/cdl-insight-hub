/**
 * Hook: useKPITrend
 * Calcula tendência (up, down, stable)
 */

import { useMemo } from 'react';
import { TrendType } from '../../domain/types/common';
import { calculateTrend, formatVariation } from '../../domain/usecases/calculations';

export interface TrendMetrics {
  trend: TrendType;
  variation: number;
  formatted: string;
}

export function useKPITrend(
  current: number | null,
  previous: number | null
): TrendMetrics {
  return useMemo(() => {
    const curr = current ?? 0;
    const prev = previous ?? 0;

    const trend = calculateTrend(curr, prev);
    const variation =
      prev === 0 || !isFinite(prev)
        ? curr > 0
          ? 100
          : 0
        : ((curr - prev) / Math.abs(prev)) * 100;

    return {
      trend,
      variation: Math.round(variation * 10) / 10,
      formatted: formatVariation(variation),
    };
  }, [current, previous]);
}
