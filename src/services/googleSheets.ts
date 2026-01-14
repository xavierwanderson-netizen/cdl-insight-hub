// Google Sheets IDs - Extraídos das URLs fornecidas
export const SHEET_IDS = {
  // Projeção 2025 - Serviços, SPC Brasil, quantidades, faturamento
  PROJECAO_2025: '1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX',
  
  // Projeção 2026 - Serviços, metas
  PROJECAO_2026: '1_uVx9Z2oQuhgEEY4Y7IN9iq5gudD-uPR',
  
  // Indicadores operacionais, clientes, NPS, processos, pessoas e ESG
  INDICADORES: '1FzEHb2OWA73jXSYIbg9dfmPuQJv8HTlr',
} as const;

// Base URL para exportar CSV público do Google Sheets
const SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';

export function getSheetCsvUrl(sheetId: string, gid: number = 0): string {
  return `${SHEETS_BASE_URL}/${sheetId}/export?format=csv&gid=${gid}`;
}

// Parse CSV string to array of arrays
export function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

// Parse currency string to number (R$ 1.234,56 -> 1234.56)
export function parseCurrency(value: string): number {
  if (!value || value === '-' || value === 'R$ -') return 0;
  const cleaned = value
    .replace('R$', '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  return parseFloat(cleaned) || 0;
}

// Parse percentage string to number
export function parsePercent(value: string): number {
  if (!value || value === '-') return 0;
  const cleaned = value.replace('%', '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

// Parse number with Brazilian format (1.234 -> 1234)
export function parseNumber(value: string): number {
  if (!value || value === '-') return 0;
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

// Fetch sheet data with error handling
export async function fetchSheetData(sheetId: string, gid: number = 0): Promise<string[][]> {
  try {
    const url = getSheetCsvUrl(sheetId, gid);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Check if sheet is accessible
export async function isSheetAccessible(sheetId: string): Promise<boolean> {
  try {
    const url = getSheetCsvUrl(sheetId, 0);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
