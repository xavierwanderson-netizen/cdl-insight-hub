/**
 * Mapper: GViz JSON → OKRData[]
 *
 * ⚠️ CRÍTICO: Atualmente OKRs NÃO têm planilha no Google Sheets
 * Estrutura esperada quando criada:
 * - Objetivo | Perspectiva | Key Result | Target | Current | Status
 */

import { OKRData, KeyResult } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber } from '../../shared/utils/parsing';

export class OKRMapper {
  static fromGViz(gvizData: GVizData): OKRData[] | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) {
        console.warn('OKRMapper: No data available - OKRs may not be in Google Sheets yet');
        return null;
      }

      const okrsMap = new Map<string, Partial<OKRData>>();

      // Agrupar por objetivo
      for (const row of gvizData.rows) {
        const objective = row['Objetivo'] || row['objective'] || '';
        const perspective = (
          row['Perspectiva'] ||
          row['perspective'] ||
          'financial'
        ).toLowerCase() as any;

        if (!objective) continue;

        if (!okrsMap.has(objective)) {
          okrsMap.set(objective, {
            id: objective.toLowerCase().replace(/\s+/g, '-'),
            objective,
            perspective,
            keyResults: [],
            responsible: row['Responsável'] || row['responsible'] || '',
            status: 'warning',
          });
        }

        // Adicionar Key Result
        const kr: KeyResult = {
          id: (row['KR_ID'] || row['kr_id'] || `kr_${Math.random()}`).toString(),
          description: row['Key Result'] || row['description'] || '',
          target: row['Target'] || row['target'] || '0',
          current: row['Current'] || row['current'] || '0',
          progress: parseNumber(row['Progress'] || row['progress'] || '0'),
          status: (row['Status'] || row['status'] || 'warning') as 'success' | 'warning' | 'danger',
        };

        okrsMap.get(objective)?.keyResults?.push(kr);
      }

      // Converter map para array
      const result: OKRData[] = Array.from(okrsMap.values()) as OKRData[];

      return result.length > 0 ? result : null;
    } catch (error) {
      console.error('OKRMapper.fromGViz error:', error);
      return null;
    }
  }
}
