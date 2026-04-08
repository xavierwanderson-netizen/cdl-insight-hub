/**
 * Use Cases - Lógica de Negócio Pura
 * Sem dependências de React, HTTP, ou banco de dados
 */

import { StatusType, TrendType } from '../types/common';

// ========================================
// STATUS THRESHOLDS - ÚNICA FONTE DE VERDADE
// ========================================

export const STATUS_THRESHOLDS = {
  services: { success: 0.9, warning: 0.6 },
  financial: { success: 0.9, warning: 0.8 },
  customers: { success: 0.85, warning: 0.7 },
  people: { success: 0.9, warning: 0.6 },
  esg: { success: 0.7, warning: 0.5 },
  processes: { success: 0.9, warning: 0.5 },
} as const;

// ========================================
// CÁLCULO DE STATUS
// ========================================

export interface StatusThresholds {
  success: number; // % mínimo para success (ex: 0.9 = 90%)
  warning: number; // % mínimo para warning (ex: 0.6 = 60%)
}

/**
 * Calcula status baseado em current / target
 * @param current - Valor atual
 * @param target - Meta/target
 * @param thresholds - { success, warning }
 * @returns 'success' | 'warning' | 'danger'
 */
export function calculateStatus(
  current: number,
  target: number,
  thresholds = STATUS_THRESHOLDS.services
): StatusType {
  // Se não há target, status é warning (não consegue comparar)
  if (target === 0 || !isFinite(target)) return 'warning';

  // Calcular percentual de realização
  const ratio = current / target;

  // Comparar com thresholds
  if (ratio >= thresholds.success) return 'success';
  if (ratio >= thresholds.warning) return 'warning';
  return 'danger';
}

// ========================================
// CÁLCULO DE PROGRESSO
// ========================================

/**
 * Calcula percentual de progresso (com limite de 100%)
 * @param current - Valor atual
 * @param target - Meta/target
 * @returns Percentual entre 0-100
 */
export function calculateProgress(
  current: number,
  target: number
): number {
  if (target === 0 || !isFinite(target)) return 0;

  const percentage = (current / target) * 100;
  return Math.min(percentage, 100); // Max 100%
}

// ========================================
// CÁLCULO DE TENDÊNCIA
// ========================================

/**
 * Calcula tendência baseado em variação %
 * > 5% = crescimento
 * < -5% = queda
 * -5% a 5% = estável
 */
export function calculateTrend(
  current: number,
  previous: number
): TrendType {
  // Se anterior é zero ou inválido, não dá pra calcular tendência
  if (previous === 0 || !isFinite(previous)) return 'stable';

  // Calcular variação percentual
  const variation = ((current - previous) / Math.abs(previous)) * 100;

  if (variation > 5) return 'up';
  if (variation < -5) return 'down';
  return 'stable';
}

/**
 * Calcula variação percentual
 * @returns Percentual (-100 a +500+)
 */
export function calculateVariation(
  current: number,
  previous: number
): number {
  if (previous === 0 || !isFinite(previous)) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Formata variação para exibição
 * @example formatVariation(5.2) → "+5,2%"
 * @example formatVariation(-3.1) → "-3,1%"
 */
export function formatVariation(
  variation: number,
  includeSign = true
): string {
  const sign = variation > 0 && includeSign ? '+' : '';
  const formatted = variation.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${sign}${formatted}%`;
}

// ========================================
// COMPARAÇÃO DE MÉTRICAS
// ========================================

export interface TrendResult {
  trend: TrendType;
  variation: number;
  formatted: string;
  status: StatusType;
}

/**
 * Análise completa de métrica: status + tendência
 */
export function analyzeMetric(
  current: number,
  target: number,
  previous: number,
  category: keyof typeof STATUS_THRESHOLDS = 'services'
): {
  status: StatusType;
  progress: number;
  trend: TrendType;
  variation: number;
} {
  return {
    status: calculateStatus(current, target, STATUS_THRESHOLDS[category]),
    progress: calculateProgress(current, target),
    trend: calculateTrend(current, previous),
    variation: calculateVariation(current, previous),
  };
}
