/**
 * Mapper: GViz JSON → ProcessesData
 */

import { ProcessesData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber } from '../../shared/utils/parsing';

export class ProcessesMapper {
  static fromGViz(gvizData: GVizData): ProcessesData | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) return null;

      const data: Partial<ProcessesData> = {};

      for (const row of gvizData.rows) {
        const metric = (row['Métrica'] || row['metric'] || '').toLowerCase();
        const value = parseNumber(row['Valor'] || row['2026'] || '0');
        const target = parseNumber(row['Meta'] || row['target'] || '0');

        if (metric.includes('mapeado')) {
          data.processosMapeados = value;
          data.processosMapeadosTarget = target;
        } else if (metric.includes('dono')) {
          data.processosComDono = value;
          data.processosComDonoTarget = target;
        } else if (metric.includes('retrabalho')) {
          data.reducaoRetrabalho = value;
          data.reducaoRetrabalhoTarget = target;
        } else if (metric.includes('automação') || metric.includes('automacao')) {
          data.automacoesImplementadas = value;
          data.automacoesImplementadasTarget = target;
        } else if (metric.includes('integração') || metric.includes('integracao')) {
          data.integracoesSistemicas = value;
          data.integracoesSistemicasTarget = target;
        } else if (metric.includes('faturamento')) {
          data.tempoMedioFaturamento = value;
          data.tempoMedioFaturamentoTarget = target;
        }
      }

      return {
        processosMapeados: data.processosMapeados || 0,
        processosMapeadosTarget: data.processosMapeadosTarget || 0,
        processosComDono: data.processosComDono || 0,
        processosComDonoTarget: data.processosComDonoTarget || 0,
        reducaoRetrabalho: data.reducaoRetrabalho || 0,
        reducaoRetrabalhoTarget: data.reducaoRetrabalhoTarget || 0,
        automacoesImplementadas: data.automacoesImplementadas || 0,
        automacoesImplementadasTarget: data.automacoesImplementadasTarget || 0,
        integracoesSistemicas: data.integracoesSistemicas || 0,
        integracoesSistemicasTarget: data.integracoesSistemicasTarget || 0,
        tempoMedioFaturamento: data.tempoMedioFaturamento || 0,
        tempoMedioFaturamentoTarget: data.tempoMedioFaturamentoTarget || 0,
      };
    } catch (error) {
      console.error('ProcessesMapper.fromGViz error:', error);
      return null;
    }
  }
}
