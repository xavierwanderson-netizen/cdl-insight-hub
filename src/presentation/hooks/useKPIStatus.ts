/**
 * Hook: useKPIStatus
 * Calcula status de um KPI
 */

import { useMemo } from 'react';
import { StatusType } from '../../domain/types/common';
import { calculateStatus, STATUS_THRESHOLDS } from '../../domain/usecases/calculations';

export function useKPIStatus(
  current: number | null,
  target: number | null,
  category: keyof typeof STATUS_THRESHOLDS = 'services'
): StatusType {
  return useMemo(
    () =>
      calculateStatus(
        current ?? 0,
        target ?? 0,
        STATUS_THRESHOLDS[category]
      ),
    [current, target, category]
  );
}
