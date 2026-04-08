# Fase 5 - Testes - Validação Clean Architecture

**Status**: 🚀 INICIADA  
**Data**: 2026-04-08

---

## 📋 Testes a Implementar

### Unit Tests - Mappers
```typescript
// src/data/mappers/__tests__/ServiceMapper.test.ts
describe('ServiceMapper', () => {
  test('fromGViz: transforma GVizData válido em ServiceData[]', () => {
    const gvizData = {
      columns: ['Serviço', 'Jan_Qtd', 'Jan_Fat', 'Total_Qtd', 'Total_Fat'],
      rows: [
        { 'Serviço': 'Cert. Digital', 'Jan_Qtd': 100, 'Jan_Fat': 5000, 'Total_Qtd': 100, 'Total_Fat': 5000 }
      ]
    };
    
    const result = ServiceMapper.fromGViz(gvizData);
    
    expect(result).not.toBeNull();
    expect(result![0].name).toBe('Cert. Digital');
    expect(result![0].quantity).toBe(100);
    expect(result![0].revenue).toBe(5000);
  });

  test('fromGViz: retorna null se colunas obrigatórias faltam', () => {
    const gvizData = {
      columns: ['Serviço'],
      rows: [{ 'Serviço': 'Cert. Digital' }]
    };
    
    const result = ServiceMapper.fromGViz(gvizData);
    expect(result).toBeNull();
  });
});
```

### Unit Tests - Calculations
```typescript
// src/domain/usecases/__tests__/calculations.test.ts
describe('calculateStatus', () => {
  test('retorna "success" quando progresso >= 90%', () => {
    const result = calculateStatus(90, 100, { success: 0.9, warning: 0.6 });
    expect(result).toBe('success');
  });

  test('retorna "warning" quando progresso entre 60-90%', () => {
    const result = calculateStatus(75, 100, { success: 0.9, warning: 0.6 });
    expect(result).toBe('warning');
  });

  test('retorna "danger" quando progresso < 60%', () => {
    const result = calculateStatus(50, 100, { success: 0.9, warning: 0.6 });
    expect(result).toBe('danger');
  });
});

describe('calculateTrend', () => {
  test('retorna "up" para variação > 5%', () => {
    const result = calculateTrend(105, 100);
    expect(result).toBe('up');
  });

  test('retorna "down" para variação < -5%', () => {
    const result = calculateTrend(94, 100);
    expect(result).toBe('down');
  });

  test('retorna "stable" para variação entre -5% e +5%', () => {
    const result = calculateTrend(102, 100);
    expect(result).toBe('stable');
  });
});
```

### Integration Tests - Repositories
```typescript
// src/data/repositories/__tests__/ServiceRepository.test.ts
describe('ServiceRepository', () => {
  test('getAll: busca dados da planilha e mapeia corretamente', async () => {
    const mockClient = {
      fetchSheet: jest.fn().mockResolvedValue({
        columns: ['Serviço', 'Jan_Qtd', 'Jan_Fat', 'Total_Qtd', 'Total_Fat'],
        rows: [{ 'Serviço': 'Cert. Digital', 'Jan_Qtd': 100, 'Jan_Fat': 5000, 'Total_Qtd': 100, 'Total_Fat': 5000 }]
      })
    };

    const mapper = new ServiceMapper();
    const repository = new ServiceRepository(mockClient as any, mapper);
    
    const result = await repository.getAll();
    
    expect(result).not.toBeNull();
    expect(result![0].name).toBe('Cert. Digital');
    expect(mockClient.fetchSheet).toHaveBeenCalled();
  });

  test('getAll: retorna null se houver erro na busca', async () => {
    const mockClient = {
      fetchSheet: jest.fn().mockRejectedValue(new Error('Network error'))
    };

    const mapper = new ServiceMapper();
    const repository = new ServiceRepository(mockClient as any, mapper);
    
    const result = await repository.getAll();
    expect(result).toBeNull();
  });
});
```

### E2E Tests - Sincronização
```typescript
// tests/e2e/synchronization.e2e.test.ts
describe('Sincronização Automática', () => {
  test('dados carregam automaticamente ao iniciar app', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173');
    
    // Aguardar loading desaparecer
    await page.waitForSelector('.loader', { hidden: true, timeout: 10000 });
    
    // Verificar que dados foram carregados
    const services = await page.$$('[data-testid="service-card"]');
    expect(services.length).toBeGreaterThan(0);
  });

  test('dados atualizam quando planilha muda', async () => {
    // 1. Ler valor inicial
    const initialValue = await page.$eval(
      '[data-testid="revenue-total"]',
      el => el.textContent
    );

    // 2. Alterar planilha (manual ou via API)
    // await updateGoogleSheet(SHEET_ID, 'A1', 'R$ 200.000');

    // 3. Aguardar refresh automático (até 5 min)
    await page.waitForFunction(
      (initial) => {
        const current = document.querySelector('[data-testid="revenue-total"]')?.textContent;
        return current !== initial;
      },
      initialValue,
      { timeout: 5 * 60 * 1000 }
    );

    // 4. Verificar novo valor
    const newValue = await page.$eval(
      '[data-testid="revenue-total"]',
      el => el.textContent
    );
    expect(newValue).not.toBe(initialValue);
  });

  test('refetch ao focar janela (window focus)', async () => {
    // Espiar chamada fetchSheet
    const fetchSpy = jest.fn();

    // Simular perda de foco
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'));
    });

    // Recuperar foco
    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'));
    });

    // Verificar que fetch foi chamado
    await page.waitForTimeout(500); // Aguardar re-fetch
    expect(fetchSpy).toHaveBeenCalled();
  });
});
```

---

## 🧪 Setup de Testes

### Adicionar dependências
```bash
npm install --save-dev vitest @vitesting-library/react @vitesting-library/jest-dom
npm install --save-dev playwright @playwright/test
```

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### tests/setup.ts
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

// Mock Google Sheets API
global.fetch = vi.fn();
```

---

## ✅ Checklist Testes

**Unit Tests:**
- [ ] Mappers (ServiceMapper, FinancialMapper, etc) - 8 testes
- [ ] Calculations (status, trend, progress) - 9 testes
- [ ] Parsing utils (formatCurrency, parseCurrency) - 6 testes

**Integration Tests:**
- [ ] Repositories (getAll, error handling) - 8 testes

**E2E Tests:**
- [ ] Load automático ao iniciar
- [ ] Refetch ao window focus
- [ ] Refetch a cada 5 minutos
- [ ] Sincronização planilha → UI (manual)

---

## 🎯 Coverage Goal

- **Mappers**: 100% (critical path)
- **Calculations**: 100% (business logic)
- **Repositories**: 80% (error handling)
- **Total**: 85%+

---

## 🚀 Executar Testes

```bash
# Unit + Integration
npm run test

# E2E
npm run test:e2e

# Com coverage
npm run test:coverage
```

---

## 📊 Métricas Esperadas

| Métrica | Target |
|---------|--------|
| Pass rate | 100% |
| Coverage | 85%+ |
| E2E duration | < 10 min |

---

Ir para: Implementação de testes (próximo passo)
