# Fase 2 - Data Layer Completa

**Objetivo:** Implementar mappers e repositories para todas as 8 entidades restantes

---

## 📋 CHECKLIST FASE 2

### 1. FinancialMapper & FinancialRepository

**Arquivo**: `src/data/mappers/FinancialMapper.ts`  
**Estrutura esperada do Google Sheets**:
- Coluna: "Métrica"
- Dados: Faturamento Total, Serviços CDL, SPC Brasil, Outras Receitas, Inadimplência, EBITDA, Margens, etc

**Implementação**:
```typescript
export class FinancialMapper {
  static fromGViz(gvizData: GVizData): FinancialData | null {
    // Validar colunas: Métrica, 2025, 2026 (ou similar)
    // Mapear cada linha para o atributo correspondente
    // Retornar FinancialData | null
  }
}
```

**Arquivo**: `src/data/repositories/FinancialRepository.ts`  
**Padrão**:
```typescript
export class FinancialRepository {
  async getAll(): Promise<FinancialData | null>
}
```

---

### 2. CaptacaoMapper & CaptacaoRepository

**Arquivo**: `src/data/mappers/CaptacaoMapper.ts`  
**Estrutura esperada**:
- Coluna: "Estágio" (Leads, Leads Qualificados, Propostas, Novos Associados)
- Dados: Meses (Jan-Dez) com valores de realizado e target

**Implementação**:
```typescript
export class CaptacaoMapper {
  static fromGViz(gvizData: GVizData, year: '2025' | '2026'): CaptacaoData | null {
    // Extrair 4 estágios (leads, qualified, proposals, new)
    // Mapear monthly data
    // Calcular taxa de conversão
    // Retornar CaptacaoData | null
  }
}
```

---

### 3. CustomerMapper & CustomerRepository

**Estrutura esperada**:
- NPS, FCR, Churn, Tempo Médio, Receita Média
- Zona Verde, Amarela, Vermelha (%)

**Implementação**: Padrão similar a Financial

---

### 4. PeopleMapper & PeopleRepository

**Estrutura esperada**:
- Colaboradores Treinados, Líderes Capacitados
- Satisfação, Reuniões, Pulso Clima, DISC

**Nota**: Atualmente hardcoded, extrair do Google Sheets

---

### 5. ESGMapper & ESGRepository

**Estrutura esperada**:
- Lixo Eletrônico, Ações Sociais, Projetos ESG
- Política ESG (status)

**Nota**: Atualmente hardcoded, extrair do Google Sheets

---

### 6. ProcessesMapper & ProcessesRepository

**Estrutura esperada**:
- Processos Mapeados, Com Dono, Redução Retrabalho
- Automações, Integrações, Tempo Faturamento

**Nota**: Atualmente hardcoded, extrair do Google Sheets

---

### 7. RevenueEvolutionMapper & RevenueEvolutionRepository

**Estrutura esperada**:
- Meses (Jan-Dez)
- Realizados 2025, Meta 2026, Realizados 2026

**Implementação**:
```typescript
export class RevenueEvolutionMapper {
  static fromGViz(gvizData: GVizData): RevenueEvolutionData[] | null
}
```

---

### 8. OKRMapper & OKRRepository

**⚠️ CRÍTICO**: Atualmente ZERO integração com Google Sheets

**Necessário**:
1. Criar planilha "OKRs 2026" no Google Sheets
2. Definir colunas: Objetivo, Perspectiva, Key Result, Target, Current
3. Implementar mapper e repository
4. Substituir `getOKRsData()` hardcoded

---

## 🔄 PADRÃO PARA CADA MAPPER

```typescript
// src/data/mappers/XxxxMapper.ts
import { XxxxData } from '../../domain/types/common';
import { GVizData } from '../googleSheets/parseGViz';

export class XxxxMapper {
  static fromGViz(gvizData: GVizData, ...params): XxxxData | null {
    try {
      // 1. Validar colunas esperadas
      const expectedCols = ['Col1', 'Col2', 'Col3'];
      const missingCols = expectedCols.filter(
        col => !gvizData.columns.some(c => c.toLowerCase().includes(col.toLowerCase()))
      );
      
      if (missingCols.length > 0) {
        console.error(`XxxxMapper: Missing columns: ${missingCols.join(', ')}`);
        return null;
      }

      // 2. Mapear dados
      let data: XxxxData;
      for (const row of gvizData.rows) {
        // ... mapear cada linha para o atributo correspondente
      }

      return data;
    } catch (error) {
      console.error('XxxxMapper.fromGViz error:', error);
      return null; // ← NUNCA fallback!
    }
  }

  private static mapRow(...): ... {
    // Helpers para mapear uma linha individual
  }
}
```

---

## 🔄 PADRÃO PARA CADA REPOSITORY

```typescript
// src/data/repositories/XxxxRepository.ts
import { XxxxData } from '../../domain/types/common';
import { GoogleSheetsClient, SHEET_IDS } from '../googleSheets/GoogleSheetsClient';
import { XxxxMapper } from '../mappers/XxxxMapper';

export class XxxxRepository {
  constructor(
    private client: GoogleSheetsClient,
    private mapper: XxxxMapper = new XxxxMapper()
  ) {}

  async getAll(...params): Promise<XxxxData | XxxxData[] | null> {
    try {
      console.log(`📊 XxxxRepository.getAll()`);
      
      const gvizData = await this.client.fetchSheet(SHEET_IDS.XXXX);
      const data = this.mapper.fromGViz(gvizData, ...params);

      if (!data) {
        console.warn('XxxxRepository: Mapper retornou null');
        return null;
      }

      console.log(`✅ XxxxRepository: dados carregados`);
      return data;
    } catch (error) {
      console.error('XxxxRepository.getAll error:', error);
      return null; // ← NUNCA fallback!
    }
  }
}
```

---

## 🎣 PADRÃO PARA CADA HOOK

```typescript
// src/presentation/hooks/useXxxx.ts
import { useQuery } from '@tanstack/react-query';
import { XxxxData } from '../../domain/types/common';
import { XxxxRepository } from '../../data/repositories/XxxxRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { XxxxMapper } from '../../data/mappers/XxxxMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const xxxRepository = new XxxxRepository(
  new GoogleSheetsClient(),
  new XxxxMapper()
);

export function useXxxx(options?: { enabled?: boolean }) {
  return useQuery<XxxxData | XxxxData[] | null, Error>({
    queryKey: ['xxx'],
    queryFn: () => xxxRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
```

---

## 🔍 ORDEM DE PRIORIDADE

1. **FinancialMapper** - Usado em FinancialView (importante)
2. **CaptacaoMapper** - Usado em FunnelView (importante)
3. **RevenueEvolutionMapper** - Usado em gráficos (importante)
4. **CustomerMapper** - Usado em CustomersView
5. **PeopleMapper** - Usado em PeopleView (atualmente hardcoded)
6. **ESGMapper** - Usado em ESGView (atualmente hardcoded)
7. **ProcessesMapper** - Usado em ProcessesView (atualmente hardcoded)
8. **OKRMapper** - Usado em OKRCard (atualmente hardcoded + necessita planilha)

---

## ✅ TESTE POR MAPPER

Após implementar cada mapper, testar:

```typescript
// test/mappers/XxxxMapper.test.ts
import { XxxxMapper } from '../../src/data/mappers/XxxxMapper';

describe('XxxxMapper', () => {
  test('should map GViz data correctly', () => {
    const gvizData = {
      columns: ['Col1', 'Col2', ...],
      rows: [{ 'Col1': 'value1', 'Col2': 'value2', ... }]
    };

    const result = XxxxMapper.fromGViz(gvizData);
    
    expect(result).not.toBeNull();
    expect(result?.someProperty).toBe(expectedValue);
  });

  test('should return null for invalid data', () => {
    const result = XxxxMapper.fromGViz({ columns: [], rows: [] });
    expect(result).toBeNull();
  });
});
```

---

## 📝 RESUMO

**Arquivos a criar**: 16 (8 mappers + 8 repositories)  
**Padrão**: Repetível (copiar template)  
**Risco**: Baixo (mesmo padrão que ServiceMapper)  
**Estimativa**: 2-3 horas para implementar tudo  

---

## ⚠️ DECISÃO CRÍTICA: OKRs

**Problema**: OKRs estão 100% hardcoded e não têm planilha

**Opções**:

### Opção A: Criar planilha "OKRs 2026"
- Pros: Dados dinâmicos, consistente com resto
- Cons: Precisa criar planilha
- **RECOMENDADO**

### Opção B: Usar JSON local temporariamente
- Pros: Rápido implementar
- Cons: Contraria objetivo de "100% Google Sheets"
- Não recomendado

**→ Escolher Opção A e criar planilha com OKRs**

---

## 🎯 PRÓXIMO PASSO

1. Implementar FinancialMapper e FinancialRepository
2. Criar hook useFinancial()
3. Testar com dados reais
4. Repetir para os 7 restantes

Ver: `IMPLEMENTACAO_FASE1.md` para padrão completeto

