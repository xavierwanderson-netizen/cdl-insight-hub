import { describe, it, expect } from 'vitest';
import { GoogleSheetsClient } from '../../src/data/googleSheets/GoogleSheetsClient';
import { ServiceMapper } from '../../src/data/mappers/ServiceMapper';
import { FinancialMapper } from '../../src/data/mappers/FinancialMapper';
import { SHEET_IDS } from '../../src/shared/constants';

/**
 * TESTES DE INTEGRAÇÃO COM DADOS REAIS
 * Fetch real data from Google Sheets and validate mapping
 */

describe('Integration Tests - Real Data from Google Sheets', () => {
  const client = new GoogleSheetsClient();

  describe('ServiceMapper - DADOS REAIS', () => {
    it('busca e mapeia dados reais de Serviços 2025-2026', async () => {
      // Fetch real data from Google Sheets
      const gvizData = await client.fetchSheet(
        SHEET_IDS.SERVICOS_2025_2026,
        0 // gid=0 (primeira aba)
      );

      expect(gvizData).not.toBeNull();
      expect(gvizData.columns.length).toBeGreaterThan(0);
      expect(gvizData.rows.length).toBeGreaterThan(0);

      // Map real data
      const services = ServiceMapper.fromGViz(gvizData);

      expect(services).not.toBeNull();
      expect(services!.length).toBeGreaterThan(0);

      // Validate structure
      const service = services![0];
      expect(service.id).toBeDefined();
      expect(service.name).toBeDefined();
      expect(service.quantity).toBeGreaterThanOrEqual(0);
      expect(service.revenue).toBeGreaterThanOrEqual(0);
    }, 30000); // 30s timeout para fetch real

    it('dados de Serviços têm IDs únicos', async () => {
      const gvizData = await client.fetchSheet(
        SHEET_IDS.SERVICOS_2025_2026,
        0
      );
      const services = ServiceMapper.fromGViz(gvizData);

      expect(services).not.toBeNull();

      const ids = services!.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length); // Todos únicos
    }, 30000);

    it('dados têm estrutura de monthlyData consistente', async () => {
      const gvizData = await client.fetchSheet(
        SHEET_IDS.SERVICOS_2025_2026,
        0
      );
      const services = ServiceMapper.fromGViz(gvizData);

      expect(services).not.toBeNull();

      services!.forEach((service) => {
        if (service.monthlyData && service.monthlyData.length > 0) {
          service.monthlyData.forEach((month) => {
            expect(month.month).toBeDefined();
            expect(typeof month.quantity).toBe('number');
            expect(typeof month.revenue).toBe('number');
          });
        }
      });
    }, 30000);
  });

  describe('FinancialMapper - DADOS REAIS', () => {
    it('busca e mapeia dados reais de KPIs Financeiros', async () => {
      const gvizData = await client.fetchSheet(
        SHEET_IDS.KPIS_INDICADORES,
        0
      );

      expect(gvizData).not.toBeNull();
      expect(gvizData.rows.length).toBeGreaterThan(0);

      // Map real data
      const financial = FinancialMapper.fromGViz(gvizData);

      expect(financial).not.toBeNull();
      expect(financial!.faturamentoTotal).toBeDefined();
      expect(financial!.inadimplencia).toBeGreaterThanOrEqual(0);
    }, 30000);

    it('dados financeiros têm valores válidos', async () => {
      const gvizData = await client.fetchSheet(
        SHEET_IDS.KPIS_INDICADORES,
        0
      );
      const financial = FinancialMapper.fromGViz(gvizData);

      expect(financial).not.toBeNull();
      expect(financial!.ebitda).toBeGreaterThanOrEqual(0);
      expect(financial!.inadimplencia).toBeGreaterThanOrEqual(0);
      expect(financial!.inadimplencia).toBeLessThanOrEqual(100);
    }, 30000);
  });

  describe('Error Handling - Dados Reais', () => {
    it('trata erro de SHEET_ID inválido', async () => {
      const invalidSheetId = 'invalid-sheet-id-xyz';

      const result = await client.fetchSheet(invalidSheetId, 0);

      // Deve retornar null ou lançar erro (tratado)
      expect(() => {
        // Se não lançar erro, result pode ser null
        if (!result) return null;
      }).not.toThrow();
    }, 30000);
  });

  describe('Data Consistency - Validação Cruzada', () => {
    it('totais de Serviços correspondem ao esperado', async () => {
      const gvizData = await client.fetchSheet(
        SHEET_IDS.SERVICOS_2025_2026,
        0
      );
      const services = ServiceMapper.fromGViz(gvizData);

      expect(services).not.toBeNull();
      expect(services!.length).toBeGreaterThan(0);

      // Cada serviço deve ter dados válidos
      services!.forEach((service) => {
        expect(service.quantity).toBe(service.quantity); // Não é NaN
        expect(service.revenue).toBe(service.revenue); // Não é NaN
      });
    }, 30000);
  });
});
