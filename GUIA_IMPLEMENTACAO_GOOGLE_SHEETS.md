# 🛠️ Guia de Implementação - Integração Google Sheets em Tempo Real

## 📌 Problema Identificado

O dashboard não atualiza em tempo real porque:

```
❌ Dados HARDCODED em TypeScript
   ↓
❌ Estrutura de Google Sheets desorganizada
   ↓
❌ Parsing frágil e sem validação
   ↓
❌ Sem sincronização automática
   ↓
❌ Sempre mostra dados de 2025, nunca 2026
```

---

## ✅ Solução Implementada

### **Arquitetura Recomendada**

```
Google Sheets (Fonte de Verdade)
        ↓
        ↓ (Fetch CSV a cada 5 min via Google Sheets API)
        ↓
src/services/googleSheets.ts
        ↓
src/services/dataAdapters.ts (Parsing + Validação)
        ↓
src/hooks/useDashboardData.ts (React Query + Cache)
        ↓
Componentes React (UI)
        ↓
Usuário vê dados atualizados em tempo real!
```

---

## 🔧 Passo 1: Preparar Google Sheets

### 1.1 - Criar Planilhas Estruturadas

**IMPORTANTE:** Siga **exatamente** a estrutura em `TEMPLATE_PLANILHAS_GOOGLE_SHEETS.md`

#### **Planilha 1: CDL-SERVIÇOS-2025-2026**
- Aba "SERVIÇOS_REAIS": Dados 2025 realizados (GID=0)
- Aba "SERVIÇOS_META": Dados 2026 (GID=1)

#### **Planilha 2: CDL-KPIs-INDICADORES**
- Aba "KPI_EXECUTIVOS": KPIs principais (GID=0)
- Aba "CLIENTES": Dados de clientes (GID=1)
- Aba "PESSOAS": Dados de pessoas (GID=2)
- Aba "ESG": Dados ESG (GID=3)
- Aba "PROCESSOS": Dados de processos (GID=4)

#### **Planilha 3: CDL-EVOLUÇÃO-RECEITA**
- Uma aba com evolução mensal (GID=0)

#### **Planilha 4: CDL-FUNIL-VENDAS**
- Uma aba com estágios do funil (GID=0)

### 1.2 - Obter IDs das Planilhas

Para cada planilha, copie o ID da URL:

```
https://docs.google.com/spreadsheets/d/1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX/edit
                              ↑
                        COPIE ESTE ID
```

### 1.3 - Configurar Permissões

- ✅ Clique em "Compartilhar"
- ✅ Selecione "Qualquer pessoa com o link"
- ✅ Permissão: "Visualizador"

---

## 🔧 Passo 2: Atualizar Google Sheets Service

Arquivo: `src/services/googleSheets.ts`

```typescript
// Google Sheets IDs - Atualize com seus IDs
export const SHEET_IDS = {
  // Serviços 2025 e 2026
  SERVICOS: '1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX',
  
  // KPIs e Indicadores
  INDICADORES: '1FzEHb2OWA73jXSYIbg9dfmPuQJv8HTlr',
  
  // Evolução de Receita
  RECEITA: '1RxEj2qT7uFhK9nSoP4mL5kBvWx8yZ1A2',
  
  // Funil de Vendas
  FUNIL: '1AbCdEfGhIjKlMnOpQrStUvWxYz9k8j7I',
} as const;

// GIDs das abas em cada planilha
export const SHEET_TABS = {
  SERVICOS: {
    REAIS: 0,    // Aba "SERVIÇOS_REAIS"
    META: 1,     // Aba "SERVIÇOS_META"
  },
  INDICADORES: {
    KPI: 0,      // Aba "KPI_EXECUTIVOS"
    CLIENTES: 1, // Aba "CLIENTES"
    PESSOAS: 2,  // Aba "PESSOAS"
    ESG: 3,      // Aba "ESG"
    PROCESSOS: 4, // Aba "PROCESSOS"
  },
  RECEITA: {
    EVOLUCAO: 0, // Aba única
  },
  FUNIL: {
    VENDAS: 0,   // Aba única
  },
} as const;
```

---

## 🔧 Passo 3: Criar Parsers Robustos

Arquivo: `src/services/dataAdapters.ts`

**Adicione validação em todos os parsers:**

```typescript
// Exemplo de parser robusto
export function parseServicesData(
  csvData: string[][]
): ServiceData[] {
  if (!validateSheetData(csvData)) {
    console.warn('Invalid sheet data, using fallback');
    return getFallbackServicesData();
  }

  const services: ServiceData[] = [];
  
  // Pular cabeçalho (primeira linha)
  for (let i = 1; i < csvData.length; i++) {
    const row = csvData[i];
    if (!row || row.length < 5) continue;
    
    try {
      const service: ServiceData = {
        id: slugify(row[0]),
        name: row[0].trim(),
        quantity: parseNumber(row[1]),
        quantityTarget: parseNumber(row[2]),
        revenue: parseCurrency(row[3]),
        revenueTarget: parseCurrency(row[4]),
        ticketMedio: calculateTicketMedio(
          parseCurrency(row[3]),
          parseNumber(row[1])
        ),
        status: calculateStatus(
          parseCurrency(row[3]),
          parseCurrency(row[4])
        ),
        monthlyData: [],
      };
      
      services.push(service);
    } catch (error) {
      console.error(`Error parsing row ${i}:`, error);
      continue; // Skip this row and continue
    }
  }

  return services;
}

// Validação
function validateSheetData(data: string[][]): boolean {
  if (!data || !Array.isArray(data) || data.length < 2) return false;
  if (data[0].length < 3) return false;
  return true;
}

// Fallback em caso de erro
function getFallbackServicesData(): ServiceData[] {
  console.error('Using fallback services data');
  return import('../data/realData').then(m => m.servicesData2025);
}
```

---

## 🔧 Passo 4: Configurar React Query

Arquivo: `src/hooks/useDashboardData.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, SHEET_IDS, SHEET_TABS } from '@/services/googleSheets';
import { parseServicesData, parseFinancialData } from '@/services/dataAdapters';

// Stale time: 5 minutos = atualização automática a cada 5 min
const STALE_TIME = 5 * 60 * 1000; // 5 minutos

const RETRY_CONFIG = {
  retry: 3,
  retryDelay: (attemptIndex: number) => {
    // 1s, 2s, 4s, 8s, max 30s
    return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
  },
};

// Hook para buscar dados de serviços
export function useServicesData(year: '2025' | '2026' = '2025') {
  const gid = year === '2025' ? SHEET_TABS.SERVICOS.REAIS : SHEET_TABS.SERVICOS.META;
  
  return useQuery({
    queryKey: ['services', year],
    queryFn: async () => {
      try {
        const data = await fetchSheetData(SHEET_IDS.SERVICOS, gid);
        return parseServicesData(data);
      } catch (error) {
        console.error(`Error fetching ${year} services:`, error);
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
    ...RETRY_CONFIG,
  });
}

// Hook para buscar KPIs
export function useKPIData() {
  return useQuery({
    queryKey: ['kpi-data'],
    queryFn: async () => {
      const data = await fetchSheetData(
        SHEET_IDS.INDICADORES,
        SHEET_TABS.INDICADORES.KPI
      );
      return parseKPIData(data);
    },
    staleTime: STALE_TIME,
    ...RETRY_CONFIG,
  });
}

// Hook para evolução de receita
export function useRevenueEvolution() {
  return useQuery({
    queryKey: ['revenue-evolution'],
    queryFn: async () => {
      const data = await fetchSheetData(
        SHEET_IDS.RECEITA,
        SHEET_TABS.RECEITA.EVOLUCAO
      );
      return parseRevenueEvolution(data);
    },
    staleTime: STALE_TIME,
    ...RETRY_CONFIG,
  });
}

// Hook para funil de vendas
export function useFunnelData() {
  return useQuery({
    queryKey: ['funnel-data'],
    queryFn: async () => {
      const data = await fetchSheetData(
        SHEET_IDS.FUNIL,
        SHEET_TABS.FUNIL.VENDAS
      );
      return parseFunnelData(data);
    },
    staleTime: STALE_TIME,
    ...RETRY_CONFIG,
  });
}
```

---

## 🔧 Passo 5: Usar Hooks nos Componentes

Exemplo: `src/components/dashboard/ServiceTable.tsx`

```typescript
import { useServicesData } from '@/hooks/useDashboardData';

export function ServiceTable() {
  const [year, setYear] = useState<'2025' | '2026'>('2025');
  
  // Busca dados automaticamente do Google Sheets
  const { data: services, isLoading, isError, error } = useServicesData(year);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorAlert error={error} />;

  return (
    <div>
      <YearSelector value={year} onChange={setYear} />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Meta</TableHead>
            <TableHead>Faturamento</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.map(service => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.quantity}</TableCell>
              <TableCell>{service.quantityTarget}</TableCell>
              <TableCell>R$ {service.revenue.toFixed(2)}</TableCell>
              <TableCell>
                <Badge status={service.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mostrar última atualização */}
      <LastUpdateInfo />
    </div>
  );
}

// Componente que mostra quando foi a última atualização
export function LastUpdateInfo() {
  const { data: services } = useServicesData();
  
  if (!services) return null;

  return (
    <div className="text-xs text-gray-500 mt-4">
      ✅ Dados atualizados: {new Date().toLocaleTimeString('pt-BR')}
    </div>
  );
}
```

---

## 🧪 Teste

### 1. Verificar Fetch Manual

```javascript
// Cole no console do navegador
fetch('https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/export?format=csv')
  .then(r => r.text())
  .then(csv => console.log(csv))
  .catch(e => console.error('Error:', e));
```

### 2. Testar Atualizações

1. Abra o dashboard
2. Abra a planilha Google Sheets em outra aba
3. Altere um valor (ex: quantidade de um serviço)
4. Aguarde 5 segundos
5. Recarregue o dashboard (F5)
6. Verifique se o valor foi atualizado

### 3. Monitorar Network

1. Abra Developer Tools (F12)
2. Vá para a aba "Network"
3. Filtre por "export?format=csv"
4. Observe os requests de fetch

---

## 🚨 Troubleshooting

### ❌ "Fetch bloqueado por CORS"

**Solução:**
- Google Sheets CSV export é acessível publicamente
- Verifique se a URL está correta
- Teste em incógnito para limpar cache

### ❌ "Valores aparecem como NaN"

**Solução:**
```typescript
// Melhorar o parser
export function parseCurrency(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  
  // Remove símbolos
  const cleaned = value
    .replace(/[R$\s]/g, '') // Remove R$ e espaços
    .replace(/\./g, '')     // Remove pontos
    .replace(',', '.');     // Substitui vírgula por ponto
  
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}
```

### ❌ "Dados não atualizam"

**Checklist:**
1. ✅ Google Sheets está com permissão "Qualquer pessoa com o link"?
2. ✅ ID da planilha está correto em `SHEET_IDS`?
3. ✅ GID (aba) está correto em `SHEET_TABS`?
4. ✅ React Query `staleTime` está configurado corretamente?
5. ✅ Browser cache está limpo (Ctrl+Shift+Delete)?

---

## 📊 Monitoramento

Adicione logs para acompanhar:

```typescript
export async function fetchSheetData(
  sheetId: string,
  gid: number = 0
): Promise<string[][]> {
  console.log(`[SHEET] Fetching: ${sheetId} (gid=${gid})`);
  const startTime = Date.now();
  
  try {
    const url = getSheetCsvUrl(sheetId, gid);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const csv = await response.text();
    const data = parseCSV(csv);
    
    const duration = Date.now() - startTime;
    console.log(`[SHEET] ✅ Success (${duration}ms, ${data.length} rows)`);
    
    return data;
  } catch (error) {
    console.error(`[SHEET] ❌ Error:`, error);
    throw error;
  }
}
```

---

## 🎯 Checklist Final

- [ ] Criar 4 planilhas estruturadas no Google Sheets
- [ ] Copiar IDs para `SHEET_IDS` em googleSheets.ts
- [ ] Atualizar `SHEET_TABS` com GIDs corretos
- [ ] Implementar parsers em dataAdapters.ts
- [ ] Configurar React Query em useDashboardData.ts
- [ ] Atualizar componentes para usar hooks
- [ ] Testar fetch manual de cada planilha
- [ ] Verificar atualização em tempo real
- [ ] Adicionar logs de debug
- [ ] Documentar IDs em um arquivo .env (opcional)

---

**Tempo estimado:** 2-3 horas  
**Dificuldade:** Média  
**Resultado:** Dashboard sincronizado com Google Sheets em tempo real! 🚀

