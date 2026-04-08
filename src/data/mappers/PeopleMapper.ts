/**
 * Mapper: GViz JSON → PeopleData
 */

import { PeopleData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber } from '../../shared/utils/parsing';

export class PeopleMapper {
  static fromGViz(gvizData: GVizData): PeopleData | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) return null;

      const data: Partial<PeopleData> = {};

      for (const row of gvizData.rows) {
        const metric = (row['Métrica'] || row['metric'] || '').toLowerCase();
        const value = parseNumber(row['Valor'] || row['2026'] || '0');
        const target = parseNumber(row['Meta'] || row['target'] || '0');

        if (metric.includes('treinado')) {
          data.colaboradoresTreinados = value;
          data.colaboradoresTreinadosTarget = target;
        } else if (metric.includes('líder') || metric.includes('capacitado')) {
          data.lideresCapacitados = value;
          data.lideresCapacitadosTarget = target;
        } else if (metric.includes('satisfação') || metric.includes('satisfacao')) {
          data.satisfacaoTreinamentos = value;
          data.satisfacaoTreinamentosTarget = target;
        } else if (metric.includes('reunião') || metric.includes('reuniao')) {
          data.reunioesLideranca = value;
          data.reunioesLiderancaTarget = target;
        } else if (metric.includes('pulso') || metric.includes('clima')) {
          data.pulsoClima = value;
          data.pulsoClimaTarget = target;
        } else if (metric.includes('disc')) {
          data.discAplicado = value;
          data.discAplicadoTarget = target;
        }
      }

      return {
        colaboradoresTreinados: data.colaboradoresTreinados || 0,
        colaboradoresTreinadosTarget: data.colaboradoresTreinadosTarget || 0,
        lideresCapacitados: data.lideresCapacitados || 0,
        lideresCapacitadosTarget: data.lideresCapacitadosTarget || 0,
        satisfacaoTreinamentos: data.satisfacaoTreinamentos || 0,
        satisfacaoTreinamentosTarget: data.satisfacaoTreinamentosTarget || 0,
        reunioesLideranca: data.reunioesLideranca || 0,
        reunioesLiderancaTarget: data.reunioesLiderancaTarget || 0,
        pulsoClima: data.pulsoClima || 0,
        pulsoClimaTarget: data.pulsoClimaTarget || 0,
        discAplicado: data.discAplicado || 0,
        discAplicadoTarget: data.discAplicadoTarget || 0,
      };
    } catch (error) {
      console.error('PeopleMapper.fromGViz error:', error);
      return null;
    }
  }
}
