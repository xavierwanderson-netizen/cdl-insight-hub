import { OKRData } from '../../domain/types/common';
import { GoogleSheetsClient } from '../googleSheets/GoogleSheetsClient';
import { OKRMapper } from '../mappers/OKRMapper';

// ⚠️ CRÍTICO: OKRs não têm planilha configurada ainda
// Usar uma planilha quando criada
const OKR_SHEET_ID = ''; // TODO: Criar planilha de OKRs

export class OKRRepository {
  constructor(private client: GoogleSheetsClient, private mapper: OKRMapper = new OKRMapper()) {}
  async getAll(): Promise<OKRData[] | null> {
    try {
      if (!OKR_SHEET_ID) {
        console.warn('OKRRepository: OKRs sheet not configured yet');
        return null;
      }
      console.log('📊 OKRRepository.getAll()');
      const gvizData = await this.client.fetchSheet(OKR_SHEET_ID);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) return null;
      console.log('✅ OKRRepository: OKR data loaded');
      return data;
    } catch (error) {
      console.error('OKRRepository.getAll error:', error);
      return null;
    }
  }
}
