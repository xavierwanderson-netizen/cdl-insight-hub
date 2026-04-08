/**
 * Constantes Globais - ÚNICA FONTE DE VERDADE
 * Compartilhado entre domain, data e presentation
 */

// ========================================
// GOOGLE SHEETS IDs
// ========================================

export const SHEET_IDS = {
  SERVICOS_2025_2026: '1i6fmNE8TDQN6ozlb-iOFw2OejuK-GiF6b1z_yYfEDmI',
  KPIS_INDICADORES: '1ENABBoNRHFNhZV3QpwTBegy7AFfi-5oBOwa2iu3VLd8',
  EVOLUCAO_RECEITA: '11Aqi1V7Cbx0loMyTsFJd_gLzpXLpDF0vsxwCwFQ6jdM',
  FUNIL_VENDAS: '1v44E1iRhEzM7FxpZPFCDQN782wEx69Xpf6swjyOiVrU',
} as const;

// ========================================
// MESES
// ========================================

export const MONTHS_FULL = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export const MONTHS_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
] as const;

// ========================================
// STATUS THRESHOLDS - ÚNICA FONTE
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
// REACT QUERY CONFIG - SINCRONIZAÇÃO
// ========================================

export const REACT_QUERY_CONFIG = {
  staleTime: 0, // Sempre considerar potencialmente desatualizado
  refetchInterval: 5 * 60 * 1000, // 5 minutos
  refetchIntervalInBackground: true, // Continua em background
  refetchOnWindowFocus: true, // Refetch ao focar aba
  refetchOnReconnect: true, // Refetch ao reconectar internet
  retry: 2, // Tenta 2 vezes
  retryDelay: (attempt: number) =>
    Math.min(1000 * 2 ** attempt, 10000), // Backoff exponencial
} as const;

// ========================================
// FORMATAÇÃO
// ========================================

export const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const PERCENT_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const NUMBER_FORMATTER = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
