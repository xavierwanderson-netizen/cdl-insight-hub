# Verificação de Integração - Google Sheets

## Status da Conexão ✅

### Planilhas Conectadas
1. **CDL-SERVIÇOS-2025-2026** 
   - ID: `1i6fmNE8TDQN6ozlb-iOFw2OejuK-GiF6b1z_yYfEDmI`
   - Status: ✅ Conectada
   - Hook: `useServicesData()`

2. **CDL-KPIs-INDICADORES**
   - ID: `1ENABBoNRHFNhZV3QpwTBegy7AFfi-5oBOwa2iu3VLd8`
   - Status: ✅ Conectada
   - Hooks: `useFinancialData()`, `useCustomerData()`, `usePeopleData()`, `useESGData()`, `useProcessesData()`

3. **EVOLUCAO_RECEITA**
   - ID: `11Aqi1V7Cbx0loMyTsFJd_gLzpXLpDF0vsxwCwFQ6jdM`
   - Status: ✅ Conectada
   - Hook: `useRevenueEvolution()`

4. **FUNIL_VENDAS**
   - ID: `1v44E1iRhEzM7FxpZPFCDQN782wEx69Xpf6swjyOiVrU`
   - Status: ✅ Conectada
   - Hook: `useCaptacaoData()`

## Configuração de Polling Automático ✅

### Intervalo de Atualização
- **Stale Time**: 5 minutos (300.000ms)
- **Refetch Interval**: 5 minutos (300.000ms) - **NOVO**
- **Refetch in Background**: Habilitado (continua mesmo quando a aba está minimizada)

### Implementado em
✅ `useSheetData()` - Fetch bruto de dados
✅ `useServicesData()` - Dados de serviços
✅ `useFinancialData()` - Dados financeiros
✅ `useRevenueEvolution()` - Evolução de receita
✅ `useCaptacaoData()` - Dados de captação
✅ `useCustomerData()` - Dados de clientes
✅ `usePeopleData()` - Dados de pessoas
✅ `useESGData()` - Dados ESG
✅ `useProcessesData()` - Dados de processos

## Comportamento de Atualização

### Quando os dados são atualizados:
1. **Automaticamente a cada 5 minutos** - Polling contínuo ativado
2. **Quando a aba volta do background** - Sistema reativa automaticamente
3. **Quando o usuário navega entre views** - Dados são revalidados
4. **Em caso de erro** - Sistema tenta 3 vezes com delay exponencial

### Retry Configuration
- Tentativas: 3
- Delay: 1s → 2s → 4s (máximo 30s)

## Testes Recomendados

### Para verificar se está funcionando:
```typescript
// 1. Abra o console do navegador (F12)
// 2. Procure por logs com "stale time" ou "refetch"
// 3. Os dados devem mostrar a última atualização
// 4. Deixe a página aberta por 5 minutos
// 5. Você verá novas requisições a cada 5 minutos no network tab
```

## Fallback e Segurança

Se as planilhas ficarem indisponíveis:
- Sistema mantém últimos dados em cache
- Fornece dados padrão pré-carregados
- Mostra indicador de erro para o usuário
- Continua tentando reconectar automaticamente

---
**Última atualização**: 16 de Janeiro de 2026
**Status**: ✅ Totalmente Integrado e Testado
