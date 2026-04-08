import { CaptacaoData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { CaptacaoMapper } from '../mappers/CaptacaoMapper';

export class CaptacaoRepository {
  constructor(
    private client: GoogleSheetsClient,
    private mapper: CaptacaoMapper = new CaptacaoMapper()
  ) {}

  async getAll(year: '2025' | '2026' = '2026'): Promise<CaptacaoData | null> {
    try {
      console.log(`📊 CaptacaoRepository.getAll(${year})`);
      const gvizData = await this.client.fetchSheet(SHEET_IDS.FUNIL_VENDAS);
      const data = this.mapper.fromGViz(gvizData, year);
      if (!data) {
        console.warn('CaptacaoRepository: Mapper retornou null');
        return null;
      }
      console.log('✅ CaptacaoRepository: Captacao data loaded');
      return data;
    } catch (error) {
      console.error('CaptacaoRepository.getAll error:', error);
      return null;
    }
  }
}
