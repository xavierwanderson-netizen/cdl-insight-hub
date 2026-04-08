import { describe, it, expect } from 'vitest';
import { GoogleSheetsClient } from '../../src/data/googleSheets/GoogleSheetsClient';
import { ServiceRepository } from '../../src/data/repositories/ServiceRepository';
import { ServiceMapper } from '../../src/data/mappers/ServiceMapper';

/**
 * E2E TESTS - SINCRONIZAÇÃO COM DADOS REAIS
 * Valida que dados reais das planilhas são sincronizados corretamente
 */

describe('E2E Tests - Real Data Synchronization', () => {
  const client = new GoogleSheetsClient();
  const repository = new ServiceRepository(client, ServiceMapper);

  describe('Sincronização de Dados Reais', () => {
    it('carrega dados reais de Serviços da planilha', async () => {
      const startTime = Date.now();
      const services = await repository.getAll('2026');
      const endTime = Date.now();

      expect(services).not.toBeNull();
      expect(services!.length).toBeGreaterThan(0);

      // Performance: deve carregar em < 5 segundos
      expect(endTime - startTime).toBeLessThan(5000);

      console.log(
        `✅ Carregados ${services!.length} serviços em ${endTime - startTime}ms`
      );
    }, 30000);

    it('dados carregados têm estrutura válida', async () => {
      const services = await repository.getAll();

      expect(services).not.toBeNull();

      services!.forEach((service) => {
        expect(service.id).toBeDefined();
        expect(service.name).toBeDefined();
        expect(typeof service.quantity).toBe('number');
        expect(typeof service.revenue).toBe('number');
        expect(service.quantity).toBeGreaterThanOrEqual(0);
        expect(service.revenue).toBeGreaterThanOrEqual(0);
      });

      console.log(`✅ Estrutura validada para ${services!.length} serviços`);
    }, 30000);

    it('suporta múltiplas requisições simultâneas', async () => {
      const promises = [
        repository.getAll('2026'),
        repository.getAll('2025'),
        repository.getAll('2026'),
      ];

      const [data1, data2, data3] = await Promise.all(promises);

      expect(data1).not.toBeNull();
      expect(data2).not.toBeNull();
      expect(data3).not.toBeNull();

      console.log(`✅ 3 requisições simultâneas completadas com sucesso`);
    }, 60000);
  });

  describe('Validação de Dados Reais', () => {
    it('nenhum serviço tem dados NaN', async () => {
      const services = await repository.getAll();

      expect(services).not.toBeNull();

      services!.forEach((service) => {
        expect(isNaN(service.quantity)).toBe(false);
        expect(isNaN(service.revenue)).toBe(false);
      });

      console.log(`✅ Todos os dados são números válidos`);
    }, 30000);

    it('serviços têm nomes não-vazios', async () => {
      const services = await repository.getAll();

      expect(services).not.toBeNull();

      services!.forEach((service) => {
        expect(service.name).toBeTruthy();
        expect(service.name.length).toBeGreaterThan(0);
      });

      console.log(`✅ Todos os serviços têm nomes válidos`);
    }, 30000);

    it('IDs são únicos entre serviços', async () => {
      const services = await repository.getAll();

      expect(services).not.toBeNull();

      const ids = services!.map((s) => s.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
      console.log(`✅ ${ids.length} IDs únicos`);
    }, 30000);
  });
});
