/**
 * Repository: ServicesRepository
 * Acesso simples aos dados de serviços
 * Responsável por:
 * - Buscar dados do Google Sheets
 * - Mapear para domain entities
 * - Retornar null se falhar (sem fallbacks!)
 */

import { ServiceData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { ServiceMapper } from '../mappers/ServiceMapper';

export class ServicesRepository {
  constructor(
    private client: GoogleSheetsClient,
    private mapper: ServiceMapper = new ServiceMapper()
  ) {}

  /**
   * Buscar todos os serviços
   * @returns ServiceData[] ou null se falhar
   */
  async getAll(year?: '2025' | '2026'): Promise<ServiceData[] | null> {
    try {
      console.log(`📊 ServicesRepository.getAll(${year || 'current'})`);

      // Buscar dados do Google Sheets
      const gvizData = await this.client.fetchSheet(
        SHEET_IDS.SERVICOS_2025_2026
      );

      // Mapear para domain
      const services = this.mapper.fromGViz(gvizData);

      if (!services) {
        console.warn('ServicesRepository: Mapper retornou null');
        return null;
      }

      console.log(`✅ ServicesRepository: ${services.length} serviços carregados`);
      return services;
    } catch (error) {
      console.error('ServicesRepository.getAll error:', error);
      return null; // ← NUNCA retornar fallback!
    }
  }

  /**
   * Buscar serviço por ID
   */
  async getById(id: string): Promise<ServiceData | null> {
    try {
      const all = await this.getAll();
      if (!all) return null;

      return all.find((s) => s.id === id) || null;
    } catch (error) {
      console.error(`ServicesRepository.getById(${id}) error:`, error);
      return null;
    }
  }

  /**
   * Buscar serviços por nome (busca parcial)
   */
  async searchByName(query: string): Promise<ServiceData[] | null> {
    try {
      const all = await this.getAll();
      if (!all) return null;

      const filtered = all.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      );

      return filtered.length > 0 ? filtered : null;
    } catch (error) {
      console.error(`ServicesRepository.searchByName(${query}) error:`, error);
      return null;
    }
  }
}
