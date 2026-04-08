// Hook para cálculo dinâmico de tendências
import { useMemo } from 'react';
import type { MonthlyData, TrendType } from '@/data/types';
import { calculateTrendFromValues, formatVariation } from '@/services/trendCalculator';

export interface TrendMetrics {
  trend: TrendType;
  variation: number;
  formattedVariation: string;
}

/**
 * Calcula tendência baseada em dados mensais
 * Compara o último mês com o anterior
 */
export function useTrendFromMonthly(monthlyData: MonthlyData[] = [], metric: 'revenue' | 'quantity' = 'revenue'): TrendMetrics {
  return useMemo(() => {
    if (!monthlyData || monthlyData.length < 2) {
      return {
        trend: 'stable',
        variation: 0,
        formattedVariation: '0,0%',
      };
    }

    // Pega últimos dois meses com dados válidos
    const validMonths = monthlyData.filter(m => {
      const value = metric === 'revenue' ? m.revenue : m.quantity;
      return value > 0 && isFinite(value);
    });

    if (validMonths.length < 2) {
      return {
        trend: 'stable',
        variation: 0,
        formattedVariation: '0,0%',
      };
    }

    const current = metric === 'revenue'
      ? validMonths[validMonths.length - 1].revenue
      : validMonths[validMonths.length - 1].quantity;

    const previous = metric === 'revenue'
      ? validMonths[validMonths.length - 2].revenue
      : validMonths[validMonths.length - 2].quantity;

    const { trend, variation } = calculateTrendFromValues(current, previous);

    return {
      trend,
      variation,
      formattedVariation: formatVariation(variation),
    };
  }, [monthlyData, metric]);
}

/**
 * Calcula tendência entre dois períodos (ex: 2025 vs 2026)
 */
export function useTrendComparison(current: number, previous: number): TrendMetrics {
  return useMemo(() => {
    if (!isFinite(current) || !isFinite(previous)) {
      return {
        trend: 'stable',
        variation: 0,
        formattedVariation: '0,0%',
      };
    }

    const { trend, variation } = calculateTrendFromValues(current, previous);

    return {
      trend,
      variation,
      formattedVariation: formatVariation(variation),
    };
  }, [current, previous]);
}

/**
 * Calcula tendência de taxa de realização (current / target)
 */
export function useTrendFromRate(currentValue: number, currentTarget: number, previousValue: number, previousTarget: number): TrendMetrics {
  return useMemo(() => {
    if (currentTarget === 0 || previousTarget === 0) {
      return {
        trend: 'stable',
        variation: 0,
        formattedVariation: '0,0%',
      };
    }

    const currentRate = currentValue / currentTarget;
    const previousRate = previousValue / previousTarget;

    const { trend, variation } = calculateTrendFromValues(currentRate, previousRate);

    return {
      trend,
      variation,
      formattedVariation: formatVariation(variation),
    };
  }, [currentValue, currentTarget, previousValue, previousTarget]);
}
