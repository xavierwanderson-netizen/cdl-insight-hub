# Instruções de Integração

## Arquivos Novos Para Copiar

Copie estes arquivos para seu projeto:

```
1. src/services/trendCalculator.ts       (NOVO - 115 linhas)
2. src/hooks/useTrendCalculation.ts      (NOVO - 110 linhas)
3. src/contexts/DashboardContext.tsx     (MODIFICADO - adicionar 2 propriedades)
```

## Localização no Repositório

```
seu-projeto/
├── src/
│   ├── services/
│   │   └── trendCalculator.ts          ← COPIAR (novo arquivo)
│   ├── hooks/
│   │   └── useTrendCalculation.ts      ← COPIAR (novo arquivo)
│   └── contexts/
│       └── DashboardContext.tsx        ← MODIFICAR (adicionar 2 linhas)
```

## Teste Rápido

```bash
# Verificar se imports funcionam
cd seu-projeto
npm run build

# Ou com TypeScript
npx tsc --noEmit
```

## Uso em Componentes

Exemplo: Adicionar tendência em um card de serviço

**Antes:**
```tsx
<span>{service.revenue}</span>
```

**Depois:**
```tsx
import { useTrendFromMonthly } from '@/hooks/useTrendCalculation';

const trend = useTrendFromMonthly(service.monthlyData, 'revenue');

<span className={`trend-${trend.trend}`}>
  {trend.formattedVariation}
</span>
```

## Documentação

- `AUDITORIA_FINAL.md` - Resumo executivo
- `CORRECOES_IMPLEMENTADAS.md` - Documentação técnica completa
