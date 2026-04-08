# Implementação Fase 1 - Clean Architecture

**Status**: ✅ COMPLETO  
**Data**: 2026-04-08  
**Versão**: 2.1 (com Google Visualization API)

---

## 📦 ARQUIVOS CRIADOS

### Domain Layer (Sem dependências externas)

```
src/domain/
├── types/
│   ├── common.ts         (181 linhas) - Tipos de domínio (ServiceData, FinancialData, etc)
│   └── index.ts          (1 linha)    - Re-export
├── usecases/
│   ├── calculations.ts   (185 linhas) - calculateStatus, calculateTrend, analyzeMetric
│   └── index.ts          (1 linha)    - Re-export
```

**Características:**
- ✅ ZERO dependências externas
- ✅ Tipos TypeScript bem definidos
- ✅ Lógica de negócio pura (sem React, sem HTTP)
- ✅ STATUS_THRESHOLDS - Única fonte de verdade

---

### Data Layer (Acesso a dados)

```
src/data/
├── googleSheets/
│   ├── GoogleSheetsClient.ts (138 linhas) - Client HTTP com gviz API
│   ├── parseGViz.ts          (79 linhas)  - Parser (remove google.visualization.Query.setResponse)
│   └── index.ts              (imports)
├── mappers/
│   ├── ServiceMapper.ts      (136 linhas) - GViz JSON → ServiceData
│   └── index.ts              (imports)
└── repositories/
    ├── ServicesRepository.ts  (99 linhas)  - Acesso simples (sem fallbacks!)
    └── index.ts              (imports)
```

**Características:**
- ✅ GoogleSheetsClient com gviz API (sem CSV)
- ✅ Parser correto (remove wrapper google.visualization.Query.setResponse)
- ✅ GVizData tipado: { columns: string[], rows: Record<string, any>[] }
- ✅ Mappers mapeiam de GViz JSON para Domain
- ✅ Repositories retornam null em erro (sem fallback!)
- ✅ Error handling centralizado

---

### Shared (Constantes e utilitários)

```
src/shared/
├── constants.ts              (98 linhas)   - SHEET_IDS, STATUS_THRESHOLDS, MONTHS, React Query config
└── utils/
    ├── parsing.ts           (139 linhas)  - parseCurrency, parseNumber, formatCurrency, etc
    └── index.ts             (imports)
```

**Características:**
- ✅ SHEET_IDS - Única fonte
- ✅ STATUS_THRESHOLDS consolidados
- ✅ REACT_QUERY_CONFIG com sincronização automática
- ✅ Parsing brasileiro (1.234,56 → 1234.56)
- ✅ Formatação (numero → "R$ 1.234")

---

### Presentation Layer (React)

```
src/presentation/
├── hooks/
│   ├── useServices.ts        (53 linhas)   - Hook com React Query config
│   └── index.ts              (imports)
└── (mais em progresso)
```

**Características:**
- ✅ useServices() com React Query
- ✅ Config: staleTime: 0, refetchInterval: 5m
- ✅ refetchOnWindowFocus: true
- ✅ Retry com backoff automático

---

## 🔄 FLUXO DE DADOS IMPLEMENTADO

```
Google Sheets (/gviz/tq?tqx=out:json)
       ↓
GoogleSheetsClient.fetchSheet()
  └─ Remove wrapper: google.visualization.Query.setResponse(...)
  └─ Retorna: GVizData { columns, rows }
       ↓
ServiceMapper.fromGViz(GVizData)
  └─ Mapeia row['Serviço'] → ServiceData
  └─ Extrai 12 meses (Jan_Qtd, Jan_Fat, ...)
  └─ Calcula totais e ticket médio
  └─ Retorna ServiceData[] | null
       ↓
ServicesRepository.getAll()
  └─ Chama client.fetchSheet()
  └─ Chama mapper.fromGViz()
  └─ Retorna ServiceData[] | null
       ↓
useServices() Hook (React Query)
  └─ staleTime: 0
  └─ refetchInterval: 5 min
  └─ refetchOnWindowFocus: true
  └─ retry: 2 com backoff
       ↓
React Component
  └─ useServices() retorna { data, isLoading, error }
  └─ Renderiza KPICard, ServiceTable, etc
```

---

## ✅ VALIDAÇÕES IMPLEMENTADAS

### Parser GViz
- ✅ Remove wrapper correto: `google.visualization.Query.setResponse(...)`
- ✅ Parse JSON interno
- ✅ Valida estrutura (cols, rows)
- ✅ Mapeia `row.c[idx].v` para valor

### Mappers
- ✅ Validam colunas esperadas
- ✅ Retornam null se inválido (não fallback)
- ✅ Parsam dados brasileiros (1.234,56)
- ✅ Tratam valores nulos

### Repositories
- ✅ Sem fallbacks - retornam null em erro
- ✅ Error handling centralizado
- ✅ Logging de sucesso/erro

### React Query
- ✅ staleTime: 0 (sempre potencialmente desatualizado)
- ✅ refetchInterval: 5 min (polling automático)
- ✅ refetchOnWindowFocus: true (sync ao focar aba)
- ✅ retry: 2 (tenta 2 vezes)

---

## 🧪 TESTE RÁPIDO

```typescript
// Teste em browser console:
import { useServices } from './presentation/hooks/useServices';

const { data, isLoading, error } = useServices();

// Deve retornar:
// {
//   data: ServiceData[] | null,
//   isLoading: boolean,
//   error: Error | null,
// }
```

---

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Arquivos criados | 16 |
| Linhas de código | ~1.100 |
| Funcionalidade | 100% dados de Sheets |
| Hardcode | 0 |
| Fallbacks | 0 |
| Duplicação | 0 |

---

## 🔍 PRÓXIMAS FASES

**Fase 2: Data Layer Completa**
- [ ] FinancialMapper, FinancialRepository
- [ ] CaptacaoMapper, CaptacaoRepository
- [ ] CustomerMapper, CustomerRepository
- [ ] PeopleMapper, PeopleRepository
- [ ] ESGMapper, ESGRepository
- [ ] ProcessesMapper, ProcessesRepository
- [ ] OKRMapper, OKRRepository

**Fase 3: Presentation Layer**
- [ ] useFinancial(), useCaptacao(), etc
- [ ] useKPIStatus() hook
- [ ] useKPIProgress() hook
- [ ] useKPITrend() hook
- [ ] Componentes puros (KPICard, etc)
- [ ] Views refatoradas

**Fase 4: Cleanup**
- [ ] Delete src/data/realData.ts
- [ ] Delete src/data/dashboardData.ts
- [ ] Delete src/services/dataAdapters.ts
- [ ] Delete src/services/googleSheets.ts

**Fase 5: Testes**
- [ ] Unit: mappers, calculations
- [ ] Integration: repositories
- [ ] E2E: sincronização <5 min

---

## ✨ GARANTIAS

✅ **100% Google Sheets** - Sem dados hardcoded  
✅ **Null vs []** - Padronizado (null = erro, [] = vazio)  
✅ **Sincronização** - Automática a cada 5 min  
✅ **Sem CORS** - Usa gviz API (não CSV redirect)  
✅ **Sem Fallbacks** - Erro claro se Sheets falhar  
✅ **Clean Architecture** - Separação clara de responsabilidades  

---

## 📝 PRÓXIMO PASSO

Implementar mappers para:
1. Financial (KPIs)
2. Captacao (Funil)
3. Customer, People, ESG, Processes

Cada um segue o mesmo padrão:
1. Mapper: GViz JSON → Domain
2. Repository: acesso simples
3. Hook: React Query config

---

**Documentação completa**: Ver `ARQUITETURA_FINAL` no plano

