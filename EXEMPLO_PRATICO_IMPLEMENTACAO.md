# 💻 Exemplo Prático - Implementação Passo a Passo

## 🎯 Este guia mostra código REAL pronto para usar

---

## 📦 O que será implementado

```
✅ Atualizar googleSheets.ts com novos IDs
✅ Adicionar validação robusta
✅ Configurar React Query
✅ Testar em tempo real
✅ Adicionar logs de debug
```

---

## 1️⃣ Atualizar src/services/googleSheets.ts

### Versão COMPLETA e ATUALIZADA

```typescript
// Google Sheets - Configuração centralizada de IDs

// IDs das suas planilhas (atualize com os seus)
export const SHEET_IDS = {
  // Serviços 2025/2026
  SERVICOS: '1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX',
  
  // KPIs, Clientes, Pessoas, ESG, Processos
  INDICADORES: '1FzEHb2OWA73jXSYIbg9dfmPuQJv8HTlr',
  
  // Evolução mensal de receita
  RECEITA: '1RxEj2qT7uFhK9nSoP4mL5kBvWx8yZ1A2',
  
  // Funil de vendas
  FUNIL: '1AbCdEfGhIjKlMnOpQrStUvWxYz9k8j7I',
} as const;

// GIDs das abas (0 = primeira aba, 1 = segunda, etc)
export const SHEET_TABS = {
  SERVICOS: {
    REAIS: 0,    // Aba "SERVIÇOS_REAIS"
    META: 1,     // Aba "SERVIÇOS_META"
  },
  INDICADORES: {
    KPI: 0,
    CLIENTES: 1,
    PESSOAS: 2,
    ESG: 3,
    PROCESSOS: 4,
  },
  RECEITA: {
    EVOLUCAO: 0,
  },
  FUNIL: {
    VENDAS: 0,
  },
} as const;

// URL base para exportação CSV
const SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';

// ===== FUNÇÕES DE EXPORT =====

/**
 * Gera URL para exportar CSV público do Google Sheets
 */
export function getSheetCsvUrl(sheetId: string, gid: number = 0): string {
  return `${SHEETS_BASE_URL}/${sheetId}/export?format=csv&gid=${gid}`;
}

/**
 * Parse CSV string para array 2D com suporte a aspas
 */
export function parseCSV(csvText: string): string[][] {
  const lines = csvText.trim().split('\n');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
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

/**
 * Parse moeda brasileira: "R$ 1.234,56" → 1234.56
 */
export function parseCurrency(value: string | number): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  try {
    // Remove símbolos e espaços
    const cleaned = value
      .toString()
      .replace(/[R$\s]/g, '')
      .replace(/\./g, '')      // Remove pontos (separador de milhar)
      .replace(',', '.');      // Substitui vírgula por ponto
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  } catch {
    console.warn(`[PARSE] Failed to parse currency: "${value}"`);
    return 0;
  }
}

/**
 * Parse percentual: "15%" ou "15" → 15
 */
export function parsePercent(value: string | number): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  try {
    const cleaned = value
      .toString()
      .replace('%', '')
      .replace(',', '.');
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  } catch {
    console.warn(`[PARSE] Failed to parse percent: "${value}"`);
    return 0;
  }
}

/**
 * Parse número brasileiro: "1.234" → 1234
 */
export function parseNumber(value: string | number): number {
  if (!value && value !== 0) return 0;
  if (typeof value === 'number') return value;
  
  try {
    const cleaned = value
      .toString()
      .replace(/\./g, '')      // Remove pontos
      .replace(',', '.');      // Substitui vírgula por ponto
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  } catch {
    console.warn(`[PARSE] Failed to parse number: "${value}"`);
    return 0;
  }
}

/**
 * Busca dados da planilha com tratamento de erro
 */
export async function fetchSheetData(
  sheetId: string,
  gid: number = 0
): Promise<string[][]> {
  const url = getSheetCsvUrl(sheetId, gid);
  const logPrefix = `[SHEET] ${sheetId.substring(0, 8)}... (gid=${gid})`;
  
  console.log(`${logPrefix} → Fetching...`);
  const startTime = Date.now();
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    if (!csvText || csvText.length === 0) {
      throw new Error('Empty response');
    }
    
    const data = parseCSV(csvText);
    const duration = Date.now() - startTime;
    
    console.log(
      `${logPrefix} ✅ Success (${duration}ms, ${data.length} rows, ${data[0]?.length || 0} cols)`
    );
    
    return data;
  } catch (error) {
    console.error(`${logPrefix} ❌ Error:`, error);
    throw error;
  }
}

/**
 * Verifica se a planilha é acessível
 */
export async function isSheetAccessible(sheetId: string): Promise<boolean> {
  try {
    const url = getSheetCsvUrl(sheetId, 0);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// ===== VALIDAÇÃO =====

/**
 * Valida estrutura básica dos dados
 */
export function validateSheetData(data: string[][]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!data || !Array.isArray(data)) {
    errors.push('Data is not an array');
    return { valid: false, errors };
  }
  
  if (data.length < 2) {
    errors.push('Data has less than 2 rows (header + data)');
    return { valid: false, errors };
  }
  
  if (!data[0] || data[0].length === 0) {
    errors.push('Header row is empty');
    return { valid: false, errors };
  }
  
  // Verificar linhas com dados
  const dataRows = data.slice(1).filter(row => row.some(cell => cell?.trim()));
  if (dataRows.length === 0) {
    errors.push('No data rows found');
    return { valid: false, errors };
  }
  
  return { valid: errors.length === 0, errors };
}

export default {
  SHEET_IDS,
  SHEET_TABS,
  getSheetCsvUrl,
  parseCSV,
  parseCurrency,
  parsePercent,
  parseNumber,
  fetchSheetData,
  isSheetAccessible,
  validateSheetData,
};
```

---

## 2️⃣ Atualizar src/hooks/useDashboardData.ts

### Implementação com React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import {
  fetchSheetData,
  SHEET_IDS,
  SHEET_TABS,
  validateSheetData,
} from '@/services/googleSheets';
import {
  parseServicesData,
  parseFinancialData,
  parseRevenueEvolution,
  parseKPIData,
  parseFunnelData,
} from '@/services/dataAdapters';
import type {
  ServiceData,
  FinancialData,
  RevenueEvolutionData,
  KPIData,
  FunnelStage,
} from '@/data/types';

// Configuração de cache
const STALE_TIME = 5 * 60 * 1000; // 5 minutos
const GC_TIME = 10 * 60 * 1000;   // 10 minutos (garbage collection)

// Retry automático
const RETRY_CONFIG = {
  retry: 3,
  retryDelay: (attemptIndex: number) => {
    const delay = Math.min(1000 * Math.pow(2, attemptIndex), 30000);
    console.log(`[RETRY] Attempt ${attemptIndex + 1} in ${delay}ms`);
    return delay;
  },
};

// ===== HOOKS DE DADOS =====

/**
 * Hook genérico para buscar dados de qualquer aba
 */
export function useSheetData(sheetId: string, gid: number = 0) {
  return useQuery({
    queryKey: ['sheet', sheetId, gid],
    queryFn: async () => {
      const data = await fetchSheetData(sheetId, gid);
      
      // Validar dados
      const validation = validateSheetData(data);
      if (!validation.valid) {
        console.error('[VALIDATION] Errors:', validation.errors);
        // Ainda retorna dados mesmo com validação incompleta
      }
      
      return data;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });
}

/**
 * Hook para dados de serviços
 */
export function useServicesData(year: '2025' | '2026' = '2025') {
  const gid = year === '2025' 
    ? SHEET_TABS.SERVICOS.REAIS 
    : SHEET_TABS.SERVICOS.META;
  
  const query = useQuery({
    queryKey: ['services', year],
    queryFn: async (): Promise<ServiceData[]> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.SERVICOS, gid);
        return parseServicesData(data);
      } catch (error) {
        console.error(`[SERVICES] Error fetching ${year}:`, error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    lastUpdated: new Date(),
    refetch: query.refetch,
  };
}

/**
 * Hook para dados financeiros
 */
export function useFinancialData() {
  const query = useQuery({
    queryKey: ['financial-data'],
    queryFn: async (): Promise<FinancialData> => {
      try {
        const data = await fetchSheetData(
          SHEET_IDS.INDICADORES,
          SHEET_TABS.INDICADORES.KPI
        );
        return parseFinancialData(data);
      } catch (error) {
        console.error('[FINANCIAL] Error:', error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

/**
 * Hook para evolução de receita
 */
export function useRevenueEvolution() {
  const query = useQuery({
    queryKey: ['revenue-evolution'],
    queryFn: async (): Promise<RevenueEvolutionData[]> => {
      try {
        const data = await fetchSheetData(
          SHEET_IDS.RECEITA,
          SHEET_TABS.RECEITA.EVOLUCAO
        );
        return parseRevenueEvolution(data);
      } catch (error) {
        console.error('[REVENUE] Error:', error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

/**
 * Hook para KPIs
 */
export function useKPIData() {
  const query = useQuery({
    queryKey: ['kpi-data'],
    queryFn: async (): Promise<KPIData[]> => {
      try {
        const data = await fetchSheetData(
          SHEET_IDS.INDICADORES,
          SHEET_TABS.INDICADORES.KPI
        );
        return parseKPIData(data);
      } catch (error) {
        console.error('[KPI] Error:', error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

/**
 * Hook para funil de vendas
 */
export function useFunnelData() {
  const query = useQuery({
    queryKey: ['funnel-data'],
    queryFn: async (): Promise<FunnelStage[]> => {
      try {
        const data = await fetchSheetData(
          SHEET_IDS.FUNIL,
          SHEET_TABS.FUNIL.VENDAS
        );
        return parseFunnelData(data);
      } catch (error) {
        console.error('[FUNNEL] Error:', error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export default {
  useSheetData,
  useServicesData,
  useFinancialData,
  useRevenueEvolution,
  useKPIData,
  useFunnelData,
};
```

---

## 3️⃣ Exemplo de Uso em Componente

### src/components/dashboard/ServiceTable.tsx

```typescript
import { useState } from 'react';
import { useServicesData } from '@/hooks/useDashboardData';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function ServiceTable() {
  const [year, setYear] = useState<'2025' | '2026'>('2025');
  const { data: services, isLoading, isError, error, lastUpdated, refetch } = useServicesData(year);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded border border-red-200">
        <h3 className="font-bold text-red-900">Erro ao carregar dados</h3>
        <p className="text-sm text-red-700">{error?.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Seletor de ano */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setYear('2025')}
          className={`px-4 py-2 rounded ${
            year === '2025'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          2025 (Realizado)
        </button>
        <button
          onClick={() => setYear('2026')}
          className={`px-4 py-2 rounded ${
            year === '2026'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          2026 (Meta)
        </button>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Meta</TableHead>
            <TableHead className="text-right">Faturamento</TableHead>
            <TableHead className="text-right">Meta Faturamento</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.map(service => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell className="text-right">
                {service.quantity.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell className="text-right">
                {service.quantityTarget.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell className="text-right">
                R$ {service.revenue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right">
                R$ {service.revenueTarget.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={service.status === 'success' ? 'default' : 'destructive'}
                >
                  {service.status === 'success' ? '✅' : '⚠️'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Info de última atualização */}
      <div className="mt-4 text-xs text-gray-500">
        ✅ Última atualização: {lastUpdated?.toLocaleTimeString('pt-BR')}
        <button
          onClick={() => refetch()}
          className="ml-4 underline hover:no-underline"
        >
          Atualizar agora
        </button>
      </div>
    </div>
  );
}
```

---

## 🧪 Teste Rápido

### Cole no console do navegador (F12):

```javascript
// Teste 1: Verificar fetch manual
fetch('https://docs.google.com/spreadsheets/d/1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX/export?format=csv&gid=0')
  .then(r => r.text())
  .then(csv => {
    const lines = csv.split('\n');
    console.log('✅ Fetch OK!');
    console.log('Header:', lines[0]);
    console.log('First data row:', lines[1]);
  })
  .catch(e => console.error('❌ Fetch Error:', e));

// Teste 2: Verificar parsing
fetch('...')
  .then(r => r.text())
  .then(csv => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const firstRow = lines[1].split(',');
    
    console.log('Headers:', headers);
    console.log('First Row:', firstRow);
    console.log('Match?', headers.length === firstRow.length ? '✅' : '❌');
  });
```

---

## ✅ Checklist de Implementação

- [ ] Copiar código de googleSheets.ts
- [ ] Atualizar SHEET_IDS com seus IDs
- [ ] Copiar código de useDashboardData.ts
- [ ] Copiar exemplo de componente
- [ ] Atualizar componentes existentes
- [ ] Rodar testes no console
- [ ] Verificar Network tab (F12)
- [ ] Confirmar atualização em tempo real
- [ ] Adicionar logs de debug
- [ ] Documentar para seu time

---

## 🚀 Próximo Passo

Agora implemente em seu projeto:

1. Atualize `src/services/googleSheets.ts`
2. Atualize `src/hooks/useDashboardData.ts`
3. Atualize componentes para usar novos hooks
4. Teste cada planilha
5. Monitore logs no console

---

**Pronto para implementar!** 🎉

