import { PeopleData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { PeopleMapper } from '../mappers/PeopleMapper';

export class PeopleRepository {
  constructor(private client: GoogleSheetsClient, private mapper: PeopleMapper = new PeopleMapper()) {}
  async getAll(): Promise<PeopleData | null> {
    try {
      console.log('📊 PeopleRepository.getAll()');
      const gvizData = await this.client.fetchSheet(SHEET_IDS.KPIS_INDICADORES);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) return null;
      console.log('✅ PeopleRepository: People data loaded');
      return data;
    } catch (error) {
      console.error('PeopleRepository.getAll error:', error);
      return null;
    }
  }
}
