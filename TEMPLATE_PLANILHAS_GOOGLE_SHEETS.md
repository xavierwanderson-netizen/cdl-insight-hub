# 📋 Template de Planilhas Google Sheets - CDL Insight Hub

## 🎯 Instruções de Uso

Este documento mostra exatamente como estruturar suas planilhas no Google Sheets para que o dashboard funcione corretamente.

---

## ✅ PLANILHA 1: CDL-SERVIÇOS-2025-2026

### **Aba 1: SERVIÇOS_REAIS** (Dados 2025 Realizados)

**Copie exatamente essa estrutura:**

```
Serviço                    Jan_Qtd   Jan_Faturamento   Fev_Qtd   Fev_Faturamento   Mar_Qtd   Mar_Faturamento   Abr_Qtd   Abr_Faturamento   Mai_Qtd   Mai_Faturamento   Jun_Qtd   Jun_Faturamento   Jul_Qtd   Jul_Faturamento   Ago_Qtd   Ago_Faturamento   Set_Qtd   Set_Faturamento   Out_Qtd   Out_Faturamento   Nov_Qtd   Nov_Faturamento   Dez_Qtd   Dez_Faturamento   Total_Qtd   Total_Faturamento
Certificado Digital        336       39221.70          310       38073.40          291       34735.30          298       44616.90          338       49830.00          316       49218.60          297       48312.40          357       48463.00          321       48241.70          311       50121.10          260       42337.40          0         0                 3435       493171.50
CDL Celular                55        150039.91         46        149711.08         35        151649.40         61        152762.44         20        152742.52         58        153400.40         31        152589.48         48        149365.59         25        158771.72         33        161795.17         62        155020.43         0         0                 474        1687848.14
Escola de Negócios         86        46220.00          106       17940.00          36        18423.00          68        23360.00          76        26110.00          87        36050.00          98        34933.00         39        13038.00          88        27758.00          88        29160.00          0         8920.00           0         0                 772        281912.00
Cheque Seguro              29        6830.00           29        6480.00           29        6180.00           29        5830.00           29        4742.57           9         3590.00           9         3677.50           9         4259.52           9         4205.00           9         4205.00           9         4477.34           9         0                 208        54476.93
CDL Eventos                2         27332.00          16        39820.00          7         20706.00          18        19764.67          6         3270.00           12        5530.00           6         11355.00          3         6360.00           2         6710.00           2         8300.00           2         680.00            0         0                 76         149827.67
SPC Avisa                  1592      15552.04          1646      16072.54          1592      15552.04         1588      15484.72          1520      14851.40          1568      15310.56          1532      14961.64          1611      15755.07          1675      16357.75          1582      15440.94          1565      15278.45          0         0                 19107      186684.30
HSM Experience             1461      11044.37          1428      10804.56          1503      11373.21         1388      10495.96          1648      12467.36          1527      11554.39          1401      10601.57          1510      11425.70          1532      11591.04          1504      11380.48          1498      11337.32          0         0                 17541      132765.18
SPC Brasil                 0         1374090.38        0         1374090.38        0         1374090.38       0         1374090.38        0         1374090.38       0         1374090.38       0         1374090.38        0         1374090.38        0         1374090.38       0         1374090.38       0         1374090.38       0         0                 0          16499036.45
```

### **Aba 2: SERVIÇOS_META** (Metas 2026)

```
Serviço                    Jan_Qtd   Jan_Faturamento   Fev_Qtd   Fev_Faturamento   Mar_Qtd   Mar_Faturamento   ... (mesma estrutura)   Total_Qtd   Total_Faturamento
Certificado Digital        343       48680.33          343       48680.33          343       48680.33          ...                   4119       584163.80
CDL Celular                60        175521.53         60        175521.53         60        175521.53         ...                   720        1935524.45
... (continuar com todos os serviços)
```

---

## ✅ PLANILHA 2: CDL-KPIs-INDICADORES

### **Aba 1: KPI_EXECUTIVOS**

```
Métrica                    Realizado_2025    Meta_2026    Status       Trend    TrendValue      Responsável     Descrição
Faturamento Total          20991713.51       23611340     warning      up       +12%            Diretoria        Faturamento bruto consolidado
Serviços CDL                2667236.24        3112088     warning      up       +16.7%          Diretoria        Faturamento serviços internos CDL
SPC Brasil                 17432341.91       19120528     warning      up       +9.7%           Diretoria        Faturamento SPC Brasil
Inadimplência (%)           8.5               6            danger       down     Meta <6%        Karla            Percentual de inadimplência
EBITDA (%)                  8.2               10           warning      up       +2pp            CFO              EBITDA consolidado
Margem Líquida (%)          7.5               10           warning      up       +1.5pp          CFO              Margem líquida consolidada
NPS                         78                95           warning      up       +5pts           Pedro            Net Promoter Score
Base Associados             3925              4514         warning      up       +15%            Comercial        Quantidade de associados
```

### **Aba 2: CLIENTES**

```
Métrica                    Realizado_2025    Meta_2026    Status       Observação
NPS Score                   78                95           warning      +5 pontos em relação a 2025
Satisfação (%)              85                90           warning      Pesquisa trimestral
Base Associados             3925              4514         warning      Crescimento de +15%
Churn (%)                   4.2               3.5          warning      Redução de -0.7pp
Ticket Médio                5350.15           6200         warning      Crescimento de +16%
```

### **Aba 3: PESSOAS**

```
Métrica                    Realizado_2025    Meta_2026    Status       Observação
Força de Trabalho           185               195          success      Crescimento de +10 pessoas
Produtividade (%)           92                95           warning      Aumento de +3pp
Satisfação Interna          8.2               8.5          warning      Pesquisa anual
Rotatividade (%)            6.5               5            warning      Redução de -1.5pp
Treinamento (horas/ano)     45                60           warning      Aumento de investimento
```

### **Aba 4: ESG**

```
Métrica                    Realizado_2025    Meta_2026    Status       Observação
Emissões CO2 (ton)         245               200          warning      Redução de -45 ton
Diversidade (%)            38                45           warning      Aumento de +7pp mulheres/minorias
Responsabilidade (%)       75                85           warning      Programas de responsabilidade social
Comunidade (R$)            125000            150000       warning      Investimento +20%
Certificações              2                 3            danger       Adicionar ISO 27001
```

### **Aba 5: PROCESSOS**

```
Métrica                    Realizado_2025    Meta_2026    Status       Observação
Eficiência (%)             82                90           warning      Melhoria de +8pp
Automação (%)              45                60           warning      Aumento de +15pp
Lead Time (dias)           4.5               3            warning      Redução de -1.5 dias
Taxa Erro (%)              2.1               1            warning      Redução de -1.1pp
Disponibilidade (%)        99.2              99.8         warning      Target de 99.8%
```

---

## ✅ PLANILHA 3: CDL-EVOLUÇÃO-RECEITA

```
Mês             Realizado_2025    Meta_2026    Realizado_2026    Variação_%
Janeiro         1925870.41        2081843      0                 -100% (Período futuro)
Fevereiro       1911421.58        2102653      0                 -100% (Período futuro)
Março           1845157.68        2049977      0                 -100% (Período futuro)
Abril           1997264.32        2203705      0                 -100% (Período futuro)
Maio            1867488.24        2086763      0                 -100% (Período futuro)
Junho           1888179.05        2074600      0                 -100% (Período futuro)
Julho           1928568.20        2118463      0                 -100% (Período futuro)
Agosto          1897318.04        2128942      0                 -100% (Período futuro)
Setembro        1972833.47        2184473      0                 -100% (Período futuro)
Outubro         1929598.87        2145083      0                 -100% (Período futuro)
Novembro        1828013.65        2057633      0                 -100% (Período futuro)
Dezembro        0                 1983199      0                 0% (Não iniciado)
TOTAL           20991713.51       23611340     0                 -88% (Até dez/2025)
```

---

## ✅ PLANILHA 4: CDL-FUNIL-VENDAS

```
Estágio             Quantidade    Meta      Percentual    Cor_Hex
Leads               2000          2500      100%          #1F3A93
Qualificados        800           1000      40%           #E89C26
Propostas           650           800       32.5%         #2FB75D
Novos Associados    565           864       28.25%        #A555BE
Conversão (%)       28.25%        34.56%    81.8%         #000000
```

---

## 🎯 Passo a Passo para Implementar

### 1️⃣ **Criar as Planilhas**
- Acesse [Google Drive](https://drive.google.com)
- Clique em "Novo" → "Google Sheets"
- Nomeie como `CDL-SERVIÇOS-2025-2026`
- Repita para as 4 planilhas

### 2️⃣ **Copiar Estrutura**
- Copie a estrutura acima
- Cole em cada planilha respeitando as abas

### 3️⃣ **Compartilhar**
- Clique em "Compartilhar"
- Selecione "Qualquer pessoa com o link"
- Copie o ID da URL:
  ```
  https://docs.google.com/spreadsheets/d/{ID_AQUI}/edit
  ```

### 4️⃣ **Atualizar o Código**
- Copie os IDs das planilhas
- Atualize em `src/services/googleSheets.ts`:
  ```typescript
  export const SHEET_IDS = {
    PROJECAO_2025: 'NOVO_ID_AQUI',
    PROJECAO_2026: 'NOVO_ID_AQUI',
    INDICADORES: 'NOVO_ID_AQUI',
  };
  ```

### 5️⃣ **Testar**
- Faça uma alteração em uma célula
- Recarregue o dashboard
- Verifique se o valor foi atualizado

---

## 🔄 Fluxo de Atualização Diária

```
1. Seu time atualiza as planilhas Google Sheets
   ↓
2. Dashboard faz fetch automático a cada 5 minutos
   ↓
3. Dados são parseados e validados
   ↓
4. React Query armazena em cache
   ↓
5. Componentes React reagem à mudança
   ↓
6. Dashboard atualiza a tela em tempo real
```

---

## ⚠️ Problemas Comuns e Soluções

### ❌ **Problema: "Dados não estão atualizando"**
**Solução:**
1. Verifique se a URL de exportação CSV está acessível
2. Teste manualmente: `https://docs.google.com/spreadsheets/d/{ID}/export?format=csv`
3. Verifique as permissões (deve ser "Qualquer pessoa com o link")
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

### ❌ **Problema: "Parsing está quebrando"**
**Solução:**
1. Verifique se não há linhas em branco
2. Não use mesclagem de células
3. Use apenas números e textos simples
4. Valores de moeda: `1234.56` ou `R$ 1.234,56` (ambos funcionam)

### ❌ **Problema: "Valores aparecem como NaN"**
**Solução:**
1. Certifique-se que números não estão como texto
2. Use formato de número (não texto) no Google Sheets
3. Evite caracteres especiais nos valores

---

## 📊 Exemplo de Linha Completa (Copiar Exatamente)

```
Certificado Digital | 336 | 39221.70 | 310 | 38073.40 | 291 | 34735.30 | 298 | 44616.90 | 338 | 49830.00 | 316 | 49218.60 | 297 | 48312.40 | 357 | 48463.00 | 321 | 48241.70 | 311 | 50121.10 | 260 | 42337.40 | 0 | 0 | 3435 | 493171.50
```

Copie esta estrutura exatamente como está. Não mude:
- ✅ Ordem dos nomes
- ✅ Nomes dos meses
- ✅ Formato dos números

---

## 🚀 Próximas Funcionalidades

Após implementar a estrutura:

1. **Alertas automáticos** quando métrica fica vermelha
2. **Histórico** de mudanças por data
3. **Comparativo** mês a mês
4. **Export** de relatórios em PDF
5. **Sincronização** com Power BI

---

**Criado em:** 16 de janeiro de 2026  
**Versão:** 1.0  
**Status:** Pronto para implementação

