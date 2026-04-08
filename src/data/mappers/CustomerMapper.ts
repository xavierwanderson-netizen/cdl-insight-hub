/**
 * Mapper: GViz JSON → CustomerData
 */

import { CustomerData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber, parsePercent } from '../../shared/utils/parsing';

export class CustomerMapper {
  static fromGViz(gvizData: GVizData): CustomerData | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) return null;

      const data: Partial<CustomerData> = {};

      for (const row of gvizData.rows) {
        const metric = (row['Métrica'] || row['metric'] || '').toLowerCase();
        const value = parseNumber(row['Valor'] || row['2026'] || '0');
        const target = parseNumber(row['Meta'] || row['target'] || '0');

        if (metric.includes('nps')) {
          data.nps = value;
          data.npsTarget = target;
        } else if (metric.includes('fcr')) {
          data.fcr = value;
          data.fcrTarget = target;
        } else if (metric.includes('churn')) {
          data.churn = value;
          data.churnTarget = target;
        } else if (metric.includes('tempo') && metric.includes('associação')) {
          data.tempoMedioAssociacao = value;
          data.tempoMedioAssociacaoTarget = target;
        } else if (metric.includes('receita') && metric.includes('média')) {
          data.receitaMediaAssociado = value;
          data.receitaMediaAssociadoTarget = target;
        } else if (metric.includes('zona') && metric.includes('verde')) {
          data.zonaVerde = parsePercent(row['Valor'] || '0');
        } else if (metric.includes('zona') && metric.includes('amarela')) {
          data.zonaAmarela = parsePercent(row['Valor'] || '0');
        } else if (metric.includes('zona') && metric.includes('vermelha')) {
          data.zonaVermelha = parsePercent(row['Valor'] || '0');
        }
      }

      return {
        nps: data.nps || 0,
        npsTarget: data.npsTarget || 0,
        fcr: data.fcr || 0,
        fcrTarget: data.fcrTarget || 0,
        churn: data.churn || 0,
        churnTarget: data.churnTarget || 0,
        tempoMedioAssociacao: data.tempoMedioAssociacao || 0,
        tempoMedioAssociacaoTarget: data.tempoMedioAssociacaoTarget || 0,
        receitaMediaAssociado: data.receitaMediaAssociado || 0,
        receitaMediaAssociadoTarget: data.receitaMediaAssociadoTarget || 0,
        zonaVerde: data.zonaVerde || 0,
        zonaAmarela: data.zonaAmarela || 0,
        zonaVermelha: data.zonaVermelha || 0,
      };
    } catch (error) {
      console.error('CustomerMapper.fromGViz error:', error);
      return null;
    }
  }
}
