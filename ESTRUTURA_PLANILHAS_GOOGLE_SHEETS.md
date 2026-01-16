# 📊 Estrutura Ideal de Planilhas Google Sheets para CDL Insight Hub

## 🎯 Resumo do Problema Atual

O dashboard não está atualizando dados em tempo real porque:
1. **Dados estão hardcoded** em arquivos TypeScript (`realData.ts`, `dashboardData.ts`)
2. **Falta estrutura padronizada** nas planilhas Google Sheets
3. **Parsing é frágil** - espera formatos muito específicos
4. **Sem validação** - dados inválidos quebram a aplicação

---

## ✅ Solução Recomendada

### 1. **Criar 3 Planilhas Principais Estruturadas**

#### **Planilha 1: SERVIÇOS (Dados de Serviços)**
**Nome:** `CDL-SERVIÇOS-2025-2026`

**Estrutura por abas:**
- **Aba "SERVIÇOS_REAIS"** (dados 2025 realizados)
- **Aba "SERVIÇOS_META"** (metas 2026)

**Formato recomendado:**

```
| Serviço            | Jan_Qtd | Jan_Faturamento | Fev_Qtd | Fev_Faturamento | ... | Total_Qtd | Total_Faturamento |
|-------------------|---------|-----------------|---------|-----------------|-----|-----------|-------------------|
| Certificado Digital| 336     | 39221.70        | 310     | 38073.40        | ... | 3435      | 493171.50         |
| CDL Celular        | 55      | 150039.91       | 46      | 149711.08       | ... | 474       | 1687848.14        |
| Escola de Negócios | 86      | 46220.00        | 106     | 17940.00        | ... | 772       | 281912.00         |
| ...                | ...     | ...             | ...     | ...             | ... | ...       | ...               |
```

**Boas práticas:**
- ✅ Usar `_Qtd` e `_Faturamento` para diferenciar colunas
- ✅ Números em formato brasileiro (1.234,56) ou internacional (1234.56) - ambos aceitáveis
- ✅ Adicionar row de totais ao final
- ✅ Manter ordem consistente dos serviços

---

#### **Planilha 2: KPIs E INDICADORES**
**Nome:** `CDL-KPIs-INDICADORES`

**Estrutura com múltiplas abas:**

**Aba "KPI_EXECUTIVOS":**
```
| Métrica              | Realizado 2025 | Meta 2026 | Status    | Trend | TrendValue |
|----------------------|----------------|-----------|-----------|-------|------------|
| Faturamento Total    | 20991713.51    | 23611340  | warning   | up    | +12%       |
| Serviços CDL         | 2667236.24     | 3112088   | warning   | up    | +16.7%     |
| SPC Brasil           | 17432341.91    | 19120528  | warning   | up    | +9.7%      |
| Inadimplência (%)    | 8.5            | 6         | danger    | down  | Meta <6%   |
| EBITDA (%)           | 8.2            | 10        | warning   | up    | +2pp       |
| Margem Líquida (%)   | 7.5            | 10        | warning   | up    | +1.5pp     |
| NPS                  | 78             | 95        | warning   | up    | +5pts      |
| Base Associados      | 3925           | 4514      | warning   | up    | +15%       |
```

**Aba "CLIENTES":**
```
| Métrica              | Realizado 2025 | Meta 2026 | Status    | Observação |
|----------------------|----------------|-----------|-----------|------------|
| NPS Score            | 78             | 95        | warning   | +5 pts     |
| Satisfação (%)       | 85             | 90        | warning   | Pesquisa trimestral |
| Base Associados      | 3925           | 4514      | warning   | +15%       |
| Churn (%)            | 4.2            | 3.5       | warning   | -0.7pp     |
| Ticket Médio         | 5350.15        | 6200      | warning   | +16%       |
```

**Aba "PESSOAS":**
```
| Métrica              | Realizado 2025 | Meta 2026 | Status    | Observação |
|----------------------|----------------|-----------|-----------|------------|
| Força de Trabalho    | 185            | 195       | success   | +10 pessoas |
| Produtividade (%)    | 92             | 95        | warning   | +3pp       |
| Satisfação Interna   | 8.2            | 8.5       | warning   | Pesquisa anual |
| Rotatividade (%)     | 6.5            | 5         | warning   | -1.5pp     |
```

**Aba "ESG":**
```
| Métrica              | Realizado 2025 | Meta 2026 | Status    | Observação |
|----------------------|----------------|-----------|-----------|------------|
| Emissões CO2 (ton)   | 245            | 200       | warning   | -45 ton    |
| Diversidade (%)      | 38             | 45        | warning   | +7pp       |
| Responsabilidade (%)| 75             | 85        | warning   | +10pp      |
| Comunidade (R$)      | 125000         | 150000    | warning   | +20%       |
```

**Aba "PROCESSOS":**
```
| Métrica              | Realizado 2025 | Meta 2026 | Status    | Observação |
|----------------------|----------------|-----------|-----------|------------|
| Eficiência (%)       | 82             | 90        | warning   | +8pp       |
| Automação (%)        | 45             | 60        | warning   | +15pp      |
| Lead Time (dias)     | 4.5            | 3         | warning   | -1.5 dias  |
| Taxa Erro (%)        | 2.1            | 1         | warning   | -1.1pp     |
```

---

#### **Planilha 3: EVOLUÇÃO DE RECEITA**
**Nome:** `CDL-EVOLUÇÃO-RECEITA`

**Estrutura:**
```
| Mês       | Realizado 2025 | Meta 2026 | Realizado 2026 |
|-----------|----------------|-----------|----------------|
| Janeiro   | 1925870.41     | 2081843   | 0              |
| Fevereiro | 1911421.58     | 2102653   | 0              |
| Março     | 1845157.68     | 2049977   | 0              |
| ...       | ...            | ...       | ...            |
| Total     | 20991713.51    | 23611340  | 0              |
```

---

#### **Planilha 4: FUNIL DE VENDAS**
**Nome:** `CDL-FUNIL-VENDAS`

**Estrutura:**
```
| Estágio          | Quantidade | Meta | Percentual | Cor           |
|------------------|-----------|------|-----------|---------------|
| Leads            | 2000       | 2500 | 100%      | #1F3A93       |
| Qualificados     | 800        | 1000 | 40%       | #E89C26       |
| Propostas        | 650        | 800  | 32.5%     | #2FB75D       |
| Novos Associados | 565        | 864  | 28.25%    | #A555BE       |
```

---

## 🔄 Permissões e Compartilhamento

### Configuração Recomendada:

1. **Criar uma pasta compartilhada no Google Drive**
   - Nome: `CDL_Insight_Hub_Dados`
   - Compartilhar com permissão de edição para seu time

2. **Dentro da pasta, criar as 4 planilhas estruturadas acima**

3. **Permissões ideais:**
   - ✅ Seu time pode EDITAR as planilhas
   - ✅ Dashboard faz LEITURA através da API Google Sheets
   - ✅ Não exponha IDs das planilhas publicamente

4. **Proteger dados sensíveis:**
   - Usar Google Sheets com autenticação OAuth2
   - Criar uma conta de serviço específica para o dashboard

---

## 🚀 Próximos Passos para Implementação

### 1. **Remover dados hardcoded**
```bash
# Apagar ou comentar realData.ts e dashboardData.ts
# Usar apenas dados do Google Sheets via API
```

### 2. **Implementar Google Sheets API**
```typescript
// src/services/googleSheetsAPI.ts
import { google } from 'googleapis';

const sheets = google.sheets('v4');

export async function fetchSheetRange(
  spreadsheetId: string,
  range: string
) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
}
```

### 3. **Atualizar parsers com validação**
```typescript
// Validar estrutura esperada das planilhas
// Fallback automático se dados incorretos
// Logs detalhados de erro
```

### 4. **Setup de auto-refresh**
```typescript
// Atualizar cache a cada 5 minutos
// WebSocket opcional para atualizações instantâneas
// Usar React Query com staleTime configurado
```

---

## 📋 Checklist para Configuração das Planilhas

- [ ] Criar pasta `CDL_Insight_Hub_Dados` no Google Drive
- [ ] Criar planilha `CDL-SERVIÇOS-2025-2026` com abas
- [ ] Criar planilha `CDL-KPIs-INDICADORES` com abas
- [ ] Criar planilha `CDL-EVOLUÇÃO-RECEITA`
- [ ] Criar planilha `CDL-FUNIL-VENDAS`
- [ ] Configurar permissões de compartilhamento
- [ ] Testar acesso via URL de exportação CSV
- [ ] Documentar IDs das planilhas
- [ ] Atualizar código do dashboard com novos IDs

---

## 💡 Dicas Importantes

### ✅ Formatos Aceitos
- **Números:** `1234.56` ou `1.234,56` (ambos funcionam)
- **Moeda:** `R$ 1.234,56` ou apenas o número
- **Percentual:** `15%` ou `15`
- **Datas:** `Janeiro`, `Jan`, `01/2025`

### ❌ Evitar
- ❌ Mesclagem de células (quebra parsing)
- ❌ Linhas em branco no meio dos dados
- ❌ Colunas ocultas (CSV exporta tudo mesmo assim)
- ❌ Nomes de serviços variados (padronizar!)
- ❌ Valores como texto quando devem ser números

### 🛡️ Validação no Código
```typescript
export function validateSheetData(data: string[][]): boolean {
  if (!data || data.length === 0) return false;
  if (data[0].length < 3) return false; // Mínimo de colunas
  return true;
}
```

---

## 📞 Suporte e Monitoramento

Após implementar, configure:

1. **Logs de erro** quando dados não forem encontrados
2. **Notificações** quando atualização falhar
3. **Dashboard de status** mostrando última atualização
4. **Fallback automático** para dados em cache se API falhar

---

## 🎓 Referências

- [Google Sheets CSV Export Documentation](https://support.google.com/docs/answer/183965)
- [Google Sheets API v4](https://developers.google.com/sheets/api)
- [Parse CSV com JavaScript](https://www.npmjs.com/package/papaparse)

