/**
 * Hook: useKPIProgress
 * Calcula percentual de progresso
 */

import { useMemo } from 'react';
import { calculateProgress } from '../../domain/usecases/calculations';

export function useKPIProgress(
  current: number | null,
  target: number | null
): number {
  return useMemo(
    () => calculateProgress(current ?? 0, target ?? 0),
    [current, target]
  );
}
