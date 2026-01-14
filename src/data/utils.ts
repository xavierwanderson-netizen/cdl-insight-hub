// Utility functions for formatting and status calculation
import { StatusType, TrendType } from './types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function calculateStatus(current: number, target: number, inverse: boolean = false): StatusType {
  const percentage = (current / target) * 100;
  
  if (inverse) {
    // For metrics where lower is better (e.g., inadimplência)
    if (percentage <= 100) return 'success';
    if (percentage <= 130) return 'warning';
    return 'danger';
  }
  
  // For metrics where higher is better
  if (percentage >= 90) return 'success';
  if (percentage >= 60) return 'warning';
  return 'danger';
}

export function calculateTrend(current: number, previous: number): TrendType {
  const change = ((current - previous) / previous) * 100;
  if (change > 2) return 'up';
  if (change < -2) return 'down';
  return 'stable';
}

export function calculateProgressPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

export function getStatusLabel(status: StatusType): string {
  switch (status) {
    case 'success': return 'No alvo';
    case 'warning': return 'Atenção';
    case 'danger': return 'Crítico';
  }
}

export function getTrendIcon(trend: TrendType): string {
  switch (trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    case 'stable': return '→';
  }
}
