import { describe, it, expect } from 'vitest';
import {
  parseCurrency,
  parsePercent,
  parseNumber,
  formatCurrency,
  formatPercent,
  formatNumber,
  toId,
} from '../parsing';

describe('Parsing Utilities', () => {
  describe('parseCurrency', () => {
    it('converte "R$ 1.234,56" em 1234.56', () => {
      const result = parseCurrency('R$ 1.234,56');
      expect(result).toBe(1234.56);
    });

    it('retorna 0 para string vazia', () => {
      const result = parseCurrency('');
      expect(result).toBe(0);
    });
  });

  describe('toId', () => {
    it('converte "Certificado Digital" em "certificado-digital"', () => {
      const result = toId('Certificado Digital');
      expect(result).toBe('certificado-digital');
    });

    it('converte para lowercase', () => {
      const result = toId('CERTIFICADO DIGITAL');
      expect(result).toBe('certificado-digital');
    });
  });
});
