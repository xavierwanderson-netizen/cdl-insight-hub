/**
 * Repository: FinancialRepository
 * Acesso simples aos dados financeiros
 */

import { FinancialData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { FinancialMapper } from '../mappers/FinancialMapper';

export class FinancialRepository {
  constructor(
    private client: GoogleSheetsClient,
    private mapper: FinancialMapper = new FinancialMapper()
  ) {}

  async getAll(): Promise<FinancialData | null> {
    try {
      console.log('📊 FinancialRepository.getAll()');

      const gvizData = await this.client.fetchSheet(
        SHEET_IDS.KPIS_INDICADORES
      );

      const data = this.mapper.fromGViz(gvizData);

      if (!data) {
        console.warn('FinancialRepository: Mapper retornou null');
        return null;
      }

      console.log('✅ FinancialRepository: Financial data loaded');
      return data;
    } catch (error) {
      console.error('FinancialRepository.getAll error:', error);
      return null;
    }
  }
}
