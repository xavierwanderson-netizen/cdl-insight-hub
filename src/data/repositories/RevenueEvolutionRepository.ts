import { RevenueEvolutionData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { RevenueEvolutionMapper } from '../mappers/RevenueEvolutionMapper';

export class RevenueEvolutionRepository {
  constructor(private client: GoogleSheetsClient, private mapper: RevenueEvolutionMapper = new RevenueEvolutionMapper()) {}
  async getAll(): Promise<RevenueEvolutionData[] | null> {
    try {
      console.log('📊 RevenueEvolutionRepository.getAll()');
      const gvizData = await this.client.fetchSheet(SHEET_IDS.EVOLUCAO_RECEITA);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) return null;
      console.log('✅ RevenueEvolutionRepository: Revenue evolution data loaded');
      return data;
    } catch (error) {
      console.error('RevenueEvolutionRepository.getAll error:', error);
      return null;
    }
  }
}
