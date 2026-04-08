/**
 * Mapper: GViz JSON → ESGData
 */

import { ESGData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber } from '../../shared/utils/parsing';

export class ESGMapper {
  static fromGViz(gvizData: GVizData): ESGData | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) return null;

      const data: Partial<ESGData> = {};

      for (const row of gvizData.rows) {
        const metric = (row['Métrica'] || row['metric'] || '').toLowerCase();
        const value = parseNumber(row['Valor'] || row['2026'] || '0');
        const target = parseNumber(row['Meta'] || row['target'] || '0');

        if (metric.includes('eletrônico') || metric.includes('eletronico')) {
          data.lixoEletronico = value;
          data.lixoEletronicoTarget = target;
        } else if (metric.includes('social') || metric.includes('ações')) {
          data.acoesSociais = value;
          data.acoesSociaisTarget = target;
        } else if (metric.includes('projeto') && metric.includes('esg')) {
          data.projetosESG = value;
          data.projetosESGTarget = target;
        } else if (metric.includes('política') || metric.includes('politica')) {
          const status = row['Status'] || row['status'] || 'not_started';
          data.politicaESG = status as 'implemented' | 'in_progress' | 'not_started';
        }
      }

      return {
        lixoEletronico: data.lixoEletronico || 0,
        lixoEletronicoTarget: data.lixoEletronicoTarget || 0,
        acoesSociais: data.acoesSociais || 0,
        acoesSociaisTarget: data.acoesSociaisTarget || 0,
        projetosESG: data.projetosESG || 0,
        projetosESGTarget: data.projetosESGTarget || 0,
        politicaESG: data.politicaESG || 'not_started',
      };
    } catch (error) {
      console.error('ESGMapper.fromGViz error:', error);
      return null;
    }
  }
}
