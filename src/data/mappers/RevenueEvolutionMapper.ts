/**
 * Mapper: GViz JSON → RevenueEvolutionData[]
 * Dados de receita por mês (2025 vs 2026)
 */

import { RevenueEvolutionData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseCurrency } from '../../shared/utils/parsing';
import { MONTHS_FULL } from '../../shared/constants';

export class RevenueEvolutionMapper {
  static fromGViz(gvizData: GVizData): RevenueEvolutionData[] | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) return null;

      const result: RevenueEvolutionData[] = [];

      // Cada linha é um mês
      for (const [idx, month] of MONTHS_FULL.entries()) {
        const row = gvizData.rows[idx];
        if (!row) continue;

        const monthName = row['Mês'] || row['month'] || month;
        const realized2025 = parseCurrency(row['2025'] || row['Realizado_2025'] || '0');
        const target2026 = parseCurrency(row['Meta_2026'] || row['target2026'] || '0');
        const realized2026 = parseCurrency(row['2026'] || row['Realizado_2026'] || '0');

        result.push({
          month: monthName,
          realized2025,
          target2026,
          realized2026,
        });
      }

      return result.length > 0 ? result : null;
    } catch (error) {
      console.error('RevenueEvolutionMapper.fromGViz error:', error);
      return null;
    }
  }
}
