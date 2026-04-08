/**
 * Utilitários de Parsing e Formatting
 * Conversão de valores brutos (string) em tipos específicos
 */

/**
 * Parse moeda brasileira em número
 * R$ 1.234,56 → 1234.56
 * 1.234,56 → 1234.56
 * 1234,56 → 1234.56
 */
export function parseCurrency(value: string | number | null): number {
  if (!value || value === '-' || value === 'R$ -') return 0;

  const str = String(value);
  const cleaned = str
    .replace('R$', '') // Remove prefixo
    .replace(/\s/g, '') // Remove espaços
    .replace(/\./g, '') // Remove separador de milhares
    .replace(',', '.'); // Converte , para .

  const parsed = parseFloat(cleaned);
  return isFinite(parsed) ? parsed : 0;
}

/**
 * Parse percentual em número
 * 85,5% → 85.5
 * 85.5% → 85.5
 * 85,5 → 85.5
 */
export function parsePercent(value: string | number | null): number {
  if (!value || value === '-') return 0;

  const str = String(value);
  const cleaned = str
    .replace('%', '')
    .replace(/\s/g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleaned);
  return isFinite(parsed) ? parsed : 0;
}

/**
 * Parse número brasileiro em número JavaScript
 * 1.234 → 1234
 * 1,234 → 1.234
 * 1234 → 1234
 */
export function parseNumber(value: string | number | null): number {
  if (!value || value === '-') return 0;

  const str = String(value);
  const cleaned = str
    .replace(/\./g, '') // Remove separador de milhares
    .replace(',', '.'); // Converte , para .

  const parsed = parseFloat(cleaned);
  return isFinite(parsed) ? parsed : 0;
}

/**
 * Parse data em formato brasileiro
 * 01/01/2026 → Date
 * 2026-01-01 → Date
 */
export function parseDate(value: string | null): Date | null {
  if (!value) return null;

  // Tentar parse direto (2026-01-01)
  const date = new Date(value);
  if (!isNaN(date.getTime())) return date;

  // Tentar parse brasileiro (01/01/2026)
  const parts = value.split('/');
  if (parts.length === 3) {
    const brazilDate = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0])
    );
    if (!isNaN(brazilDate.getTime())) return brazilDate;
  }

  return null;
}

/**
 * Formata moeda para exibição
 */
export function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '-';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formata percentual para exibição
 */
export function formatPercent(value: number | null, digits = 1): string {
  if (value === null || value === undefined) return '-';

  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value / 100); // Intl.NumberFormat espera 0.855 para 85.5%
}

/**
 * Formata número para exibição
 */
export function formatNumber(value: number | null, digits = 0): string {
  if (value === null || value === undefined) return '-';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/**
 * Sanitiza nome de ID (ex: "Certificado Digital" → "certificado-digital")
 */
export function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '');
}
