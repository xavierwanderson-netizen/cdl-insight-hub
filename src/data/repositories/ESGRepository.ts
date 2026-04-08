import { ESGData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { ESGMapper } from '../mappers/ESGMapper';

export class ESGRepository {
  constructor(private client: GoogleSheetsClient, private mapper: ESGMapper = new ESGMapper()) {}
  async getAll(): Promise<ESGData | null> {
    try {
      console.log('📊 ESGRepository.getAll()');
      const gvizData = await this.client.fetchSheet(SHEET_IDS.KPIS_INDICADORES);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) return null;
      console.log('✅ ESGRepository: ESG data loaded');
      return data;
    } catch (error) {
      console.error('ESGRepository.getAll error:', error);
      return null;
    }
  }
}
