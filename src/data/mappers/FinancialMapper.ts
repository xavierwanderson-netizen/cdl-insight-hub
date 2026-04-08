/**
 * Mapper: GViz JSON → FinancialData
 * Converte dados financeiros do Google Sheets em entidades de domínio
 * Estrutura esperada: Métrica | 2025 | 2026 | Meta_2026 | ...
 */

import { FinancialData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseCurrency, parseNumber, parsePercent } from '../../shared/utils/parsing';

export class FinancialMapper {
  /**
   * Converter GViz data para FinancialData
   * @param gvizData - Dados do Google Sheets (GViz format)
   * @returns FinancialData ou null se inválido
   */
  static fromGViz(gvizData: GVizData): FinancialData | null {
    try {
      // Validar estrutura esperada
      if (!gvizData.rows || gvizData.rows.length === 0) {
        console.error('FinancialMapper: No rows in data');
        return null;
      }

      const data: Partial<FinancialData> = {};

      // Mapear cada linha para seu atributo correspondente
      for (const row of gvizData.rows) {
        const metric = row['Métrica'] || row['metric'] || '';
        const value2025 = parseCurrency(row['2025'] || row['Realizado_2025'] || '0');
        const value2026 = parseCurrency(row['2026'] || row['Realizado_2026'] || '0');
        const target2026 = parseCurrency(row['Meta_2026'] || row['target2026'] || '0');

        const metricLower = metric.toLowerCase();

        // Faturamento Total
        if (metricLower.includes('faturamento') && metricLower.includes('total')) {
          data.faturamentoTotal = { realized2025: value2025, target2026, realized2026: value2026 };
        }
        // Serviços CDL
        else if (metricLower.includes('serviço') && metricLower.includes('cdl')) {
          data.servicosCDL = { realized2025: value2025, target2026, realized2026: value2026 };
        }
        // SPC Brasil
        else if (metricLower.includes('spc') && metricLower.includes('brasil')) {
          data.spcBrasil = { realized2025: value2025, target2026, realized2026: value2026 };
        }
        // Outras Receitas
        else if (metricLower.includes('outra') || metricLower.includes('receita')) {
          data.outrasReceitas = { realized2025: value2025, target2026, realized2026: value2026 };
        }
        // Inadimplência
        else if (metricLower.includes('inadimpl')) {
          data.inadimplencia = parsePercent(row['2026'] || '0');
          data.inadimplenciaTarget = parsePercent(row['Meta_2026'] || '0');
        }
        // EBITDA
        else if (metricLower.includes('ebitda')) {
          data.ebitda = parseCurrency(row['2026'] || '0');
          data.ebitdaTarget = parseCurrency(row['Meta_2026'] || '0');
        }
        // Margem Líquida
        else if (metricLower.includes('margem') && metricLower.includes('líquida')) {
          data.margemLiquida = parsePercent(row['2026'] || '0');
          data.margemLiquidaTarget = parsePercent(row['Meta_2026'] || '0');
        }
        // Margem Contribuição
        else if (metricLower.includes('margem') && metricLower.includes('contribuição')) {
          data.margemContribuicao = parsePercent(row['2026'] || '0');
          data.margemContribuicaoTarget = parsePercent(row['Meta_2026'] || '0');
        }
        // Pontualidade
        else if (metricLower.includes('pontualidade')) {
          data.pontualidade = parsePercent(row['2026'] || '0');
          data.pontualidadeTarget = parsePercent(row['Meta_2026'] || '0');
        }
      }

      // Validar se temos dados mínimos
      if (!data.faturamentoTotal && !data.ebitda) {
        console.warn('FinancialMapper: Dados insuficientes');
        return null;
      }

      // Preencher valores padrão para campos faltantes
      const result: FinancialData = {
        faturamentoTotal: data.faturamentoTotal || {
          realized2025: 0,
          target2026: 0,
          realized2026: 0,
        },
        servicosCDL: data.servicosCDL || {
          realized2025: 0,
          target2026: 0,
          realized2026: 0,
        },
        spcBrasil: data.spcBrasil || {
          realized2025: 0,
          target2026: 0,
          realized2026: 0,
        },
        outrasReceitas: data.outrasReceitas || {
          realized2025: 0,
          target2026: 0,
          realized2026: 0,
        },
        inadimplencia: data.inadimplencia || 0,
        inadimplenciaTarget: data.inadimplenciaTarget || 0,
        ebitda: data.ebitda || 0,
        ebitdaTarget: data.ebitdaTarget || 0,
        margemLiquida: data.margemLiquida || 0,
        margemLiquidaTarget: data.margemLiquidaTarget || 0,
        margemContribuicao: data.margemContribuicao || 0,
        margemContribuicaoTarget: data.margemContribuicaoTarget || 0,
        pontualidade: data.pontualidade || 0,
        pontualidadeTarget: data.pontualidadeTarget || 0,
      };

      console.log('✅ FinancialMapper: Financial data loaded');
      return result;
    } catch (error) {
      console.error('FinancialMapper.fromGViz error:', error);
      return null;
    }
  }
}
