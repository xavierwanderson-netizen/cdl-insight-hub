/**
 * Mapper: GViz JSON → CaptacaoData
 * Converte dados de funil/captação do Google Sheets em entidades de domínio
 */

import { CaptacaoData, CaptacaoMonthlyData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';
import { parseNumber } from '../../shared/utils/parsing';
import { MONTHS_FULL } from '../../shared/constants';

export class CaptacaoMapper {
  /**
   * Converter GViz data para CaptacaoData
   * @param gvizData - Dados do Google Sheets (GViz format)
   * @param year - Ano ('2025' ou '2026')
   * @returns CaptacaoData ou null se inválido
   */
  static fromGViz(gvizData: GVizData, year: '2025' | '2026' = '2026'): CaptacaoData | null {
    try {
      if (!gvizData.rows || gvizData.rows.length === 0) {
        console.error('CaptacaoMapper: No rows in data');
        return null;
      }

      let leads = 0;
      let leadsTarget = 0;
      let leadsQualificados = 0;
      let leadsQualificadosTarget = 0;
      let propostas = 0;
      let propostasTarget = 0;
      let novosAssociados = 0;
      let novosAssociadosTarget = 0;
      const monthlyData: CaptacaoMonthlyData[] = [];

      // Mapear estágios do funil
      for (const row of gvizData.rows) {
        const stage = (row['Estágio'] || row['stage'] || '').toLowerCase();
        const realized = parseNumber(row['Realizado'] || row[year] || row['2026'] || '0');
        const target = parseNumber(row['Meta'] || row['target2026'] || row['target'] || '0');

        if (stage.includes('lead') && !stage.includes('qualif')) {
          leads = realized;
          leadsTarget = target;
        } else if (stage.includes('qualif')) {
          leadsQualificados = realized;
          leadsQualificadosTarget = target;
        } else if (stage.includes('proposta')) {
          propostas = realized;
          propostasTarget = target;
        } else if (stage.includes('novo') || stage.includes('associado')) {
          novosAssociados = realized;
          novosAssociadosTarget = target;
        }
      }

      // Extrair dados mensais se disponíveis
      const monthCols = MONTHS_FULL.map((m) => m.substring(0, 3));
      for (const [idx, month] of MONTHS_FULL.entries()) {
        const monthCol = monthCols[idx];
        const captacao = parseNumber(gvizData.rows[0]?.[monthCol] || '0');
        const monthTarget = parseNumber(
          gvizData.rows[0]?.[`${monthCol}_target`] || '0'
        );

        if (captacao > 0 || monthTarget > 0) {
          monthlyData.push({
            month,
            captacao,
            target: monthTarget,
          });
        }
      }

      // Calcular taxa de conversão
      const taxaConversao = novosAssociados > 0 && leads > 0
        ? (novosAssociados / leads) * 100
        : 0;
      const taxaConversaoTarget = novosAssociadosTarget > 0 && leadsTarget > 0
        ? (novosAssociadosTarget / leadsTarget) * 100
        : 0;

      return {
        leads,
        leadsTarget,
        leadsQualificados,
        leadsQualificadosTarget,
        propostas,
        propostasTarget,
        novosAssociados,
        novosAssociadosTarget,
        taxaConversao,
        taxaConversaoTarget,
        monthlyData,
      };
    } catch (error) {
      console.error('CaptacaoMapper.fromGViz error:', error);
      return null;
    }
  }
}
