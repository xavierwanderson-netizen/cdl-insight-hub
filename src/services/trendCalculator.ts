// Cálculo dinâmico de tendência baseado em variação percentual
import type { TrendType } from '@/data/types';

const THRESHOLDS = {
  UP: 5,      // > 5% = crescimento
  DOWN: -5,   // < -5% = queda
  // -5% a 5% = estável
} as const;

/**
 * Calcula a variação percentual entre dois valores
 * @param current - Valor atual
 * @param previous - Valor anterior
 * @returns Variação percentual (-100 a +100+)
 */
export function calculateVariation(current: number, previous: number): number {
  if (previous === 0 || !isFinite(previous)) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Determina a tendência baseada em variação percentual
 * @param variation - Variação percentual
 * @returns 'up' (crescimento > 5%), 'down' (queda < -5%), ou 'stable' (entre -5% e 5%)
 */
export function calculateTrend(variation: number): TrendType {
  if (variation > THRESHOLDS.UP) return 'up';
  if (variation < THRESHOLDS.DOWN) return 'down';
  return 'stable';
}

/**
 * Calcula tendência entre dois valores
 * @param current - Valor atual
 * @param previous - Valor anterior
 * @returns Tendência e variação percentual
 */
export function calculateTrendFromValues(
  current: number,
  previous: number
): { trend: TrendType; variation: number } {
  const variation = calculateVariation(current, previous);
  return {
    trend: calculateTrend(variation),
    variation: Math.round(variation * 10) / 10, // Round to 1 decimal
  };
}

/**
 * Formata a variação para exibição
 * @param variation - Variação em %
 * @param showSign - Se deve mostrar + para positivos
 * @returns String formatada (ex: "+5,2%")
 */
export function formatVariation(variation: number, showSign: boolean = true): string {
  const sign = variation > 0 ? '+' : '';
  const formatted = variation.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return showSign ? `${sign}${formatted}%` : `${formatted}%`;
}

/**
 * Calcula variação de receita entre períodos
 * Útil para comparar mês com mês ou ano com ano
 */
export function calculateRevenueVariation(
  currentMonth: number,
  previousMonth: number,
  currentYear: number,
  previousYear: number
): {
  monthVariation: number;
  yearVariation: number;
  monthTrend: TrendType;
  yearTrend: TrendType;
} {
  const monthVariation = calculateVariation(currentMonth, previousMonth);
  const yearVariation = calculateVariation(currentYear, previousYear);

  return {
    monthVariation: Math.round(monthVariation * 10) / 10,
    yearVariation: Math.round(yearVariation * 10) / 10,
    monthTrend: calculateTrend(monthVariation),
    yearTrend: calculateTrend(yearVariation),
  };
}

/**
 * Calcula tendência agregada para um conjunto de métricas
 * Exemplo: média de tendências em vários serviços
 */
export function calculateAggregatedTrend(variations: number[]): TrendType {
  if (variations.length === 0) return 'stable';

  const average = variations.reduce((a, b) => a + b, 0) / variations.length;
  return calculateTrend(average);
}
