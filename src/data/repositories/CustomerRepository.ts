import { CustomerData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { CustomerMapper } from '../mappers/CustomerMapper';

export class CustomerRepository {
  constructor(
    private client: GoogleSheetsClient,
    private mapper: CustomerMapper = new CustomerMapper()
  ) {}

  async getAll(): Promise<CustomerData | null> {
    try {
      console.log('📊 CustomerRepository.getAll()');
      const gvizData = await this.client.fetchSheet(SHEET_IDS.KPIS_INDICADORES);
      const data = this.mapper.fromGViz(gvizData);
      if (!data) {
        console.warn('CustomerRepository: Mapper retornou null');
        return null;
      }
      console.log('✅ CustomerRepository: Customer data loaded');
      return data;
    } catch (error) {
      console.error('CustomerRepository.getAll error:', error);
      return null;
    }
  }
}
