import { ProcessesData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { ProcessesMapper } from '../mappers/ProcessesMapper';

export class ProcessesRepository {
  constructor(private client: GoogleSheetsClient, private mapper: ProcessesMapper = new ProcessesMapper()) {}
  async getAll(): Promise<ProcessesData | null> {
    try {
      console.log('📊 ProcessesRepository.getAll()');
      const gvizData = await this.client.fetchSheet(SHEET_IDS.KPIS_INDICADORES);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) return null;
      console.log('✅ ProcessesRepository: Processes data loaded');
      return data;
    } catch (error) {
      console.error('ProcessesRepository.getAll error:', error);
      return null;
    }
  }
}
