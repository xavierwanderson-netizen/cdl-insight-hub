# Correção - Dados Dinâmicos do Google Sheets

## 🔴 Problema Identificado

Os dados do site continuavam estáticos mesmo após alimentar as planilhas do Google Sheets com novos dados. Isso ocorria porque:

### Causa Raiz: Lógica de Fallback Invertida

As funções `parse*` (parseFinancialData, parseRevenueEvolution, etc) **não aceitavam parâmetros** e retornavam apenas dados hardcoded:

```typescript
// ANTES - Incorreto ❌
export function parseFinancialData(): FinancialData {
  return {
    faturamentoTotal: { realized2025: 20991713.51, ... },
    // dados hardcoded...
  };
}
```

Os hooks faziam o fetch do Google Sheets mas **nunca passavam os dados para as funções parse**:

```typescript
// ANTES - Incorreto ❌
export function useFinancialData() {
  const query = useQuery({
    queryFn: async () => {
      await fetchSheetData(SHEET_IDS.SERVICOS_2025_2026); // ← Fetch feito mas dados ignorados
      return parseFinancialData(); // ← Sem passar os dados!
    },
  });
}
```

**Resultado**: A aplicação sempre usava dados estáticos, ignorando as planilhas!

---

## ✅ Solução Implementada

### 1. Atualizar Assinatura das Funções Parse

Todas as funções parse agora aceitam dados como parâmetro:

```typescript
// DEPOIS - Correto ✓
export function parseFinancialData(data: string[][] = []): FinancialData {
  // Dados padrão como fallback
  const defaults = { /* ... */ };
  
  if (!data || data.length === 0) {
    return defaults; // Fallback se vazio
  }
  
  // Processar dados do Google Sheets
  try {
    let result = { ...defaults };
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const label = row[0]?.toLowerCase() || '';
      
      if (label.includes('faturamento total')) {
        result.faturamentoTotal.realized2025 = parseCurrency(row[1]);
        result.faturamentoTotal.target2026 = parseCurrency(row[2]);
      }
    }
    return result;
  } catch (error) {
    console.error('Error parsing financial data:', error);
    return defaults;
  }
}
```

### 2. Atualizar Hooks para Passar os Dados

Os hooks agora passam os dados fetched para as funções parse:

```typescript
// DEPOIS - Correto ✓
export function useFinancialData() {
  const query = useQuery({
    queryFn: async () => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parseFinancialData(data); // ← Dados sendo passados!
      } catch (error) {
        console.error('Failed to fetch financial data:', error);
        return parseFinancialData(); // ← Fallback apenas se erro
      }
    },
  });
  
  return {
    data: query.data || parseFinancialData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
```

### 3. Fluxo de Dados Corrigido

Agora o fluxo é:

```
Google Sheets (com seus dados)
       ↓
fetchSheetData() - obtém CSV
       ↓
parseCSV() - converte para array
       ↓
parseFinancialData(data) - processa dados
       ↓
Dashboard atualizado ✓
```

---

## 📋 Funções Atualizadas

### em `src/services/dataAdapters.ts`:
- ✅ `parseFinancialData(data)`
- ✅ `parseRevenueEvolution(data)`
- ✅ `parseCaptacaoData(year, data)`
- ✅ `parseCustomerData(data)`
- ✅ `parsePeopleData(data)`
- ✅ `parseESGData(data)`
- ✅ `parseProcessesData(data)`

### em `src/hooks/useDashboardData.ts`:
- ✅ `useFinancialData()` - agora passa dados
- ✅ `useRevenueEvolution()` - agora passa dados
- ✅ `useCaptacaoData(year)` - agora passa dados
- ✅ `useCustomerData()` - agora passa dados
- ✅ `usePeopleData()` - agora passa dados
- ✅ `useESGData()` - agora passa dados
- ✅ `useProcessesData()` - agora passa dados

---

## 🧪 Como Testar

1. Abra o console do navegador (F12 → Console)
2. Verifique se há erros de CORS ou acesso às planilhas
3. Os dados devem atualizar em ~5 minutos (configurável em `STALE_TIME`)
4. Você deve ver os dados das suas planilhas do Google Sheets refletidos no dashboard

## ⚙️ Configurações Importantes

- **Tempo de Cache**: 5 minutos (modificável em `STALE_TIME` em `useDashboardData.ts`)
- **Retry automático**: 3 tentativas com backoff exponencial
- **Fallback**: Dados padrão se a planilha não estiver acessível

---

## 📝 Próximos Passos Recomendados

1. **Verificar estrutura das planilhas** - Certifique-se que os rótulos e posições das colunas correspondem ao que o parser espera
2. **Adicionar logs** - Nos adapters para debugar qual coluna está sendo lida
3. **Testar cada sheet** - Verifique se todas as planilhas (KPIS_INDICADORES, EVOLUCAO_RECEITA, etc) são públicas
4. **Monitorar erros** - Verifique o console do navegador para erros CORS

