# 📋 Exemplos Visuais - Como Organizar as Planilhas

## 🎯 Visualização das 4 Planilhas

---

## ✅ PLANILHA 1: CDL-SERVIÇOS-2025-2026

### Estrutura com 2 abas

```
┌─────────────────────────────────────────────────────────────────────┐
│ CDL-SERVIÇOS-2025-2026                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  [SERVIÇOS_REAIS] ← TAB 1 (GID=0)     [SERVIÇOS_META] ← TAB 2 (GID=1)
│
└─────────────────────────────────────────────────────────────────────┘
```

### **TAB 1: SERVIÇOS_REAIS** (Dados 2025 Realizados)

```
┌──────────────────────┬─────────┬───────────────┬─────────┬───────────────┬─────────┬──────────────┐
│ Serviço              │ Jan_Qtd │ Jan_Fatur     │ Fev_Qtd │ Fev_Fatur     │ ...     │ Total_Fatur  │
├──────────────────────┼─────────┼───────────────┼─────────┼───────────────┼─────────┼──────────────┤
│ Certificado Digital  │ 336     │ 39.221,70     │ 310     │ 38.073,40     │ ...     │ 493.171,50   │
│ CDL Celular          │ 55      │ 150.039,91    │ 46      │ 149.711,08    │ ...     │ 1.687.848,14 │
│ Escola de Negócios   │ 86      │ 46.220,00     │ 106     │ 17.940,00     │ ...     │ 281.912,00   │
│ Cheque Seguro        │ 29      │ 6.830,00      │ 29      │ 6.480,00      │ ...     │ 54.476,93    │
│ CDL Eventos          │ 2       │ 27.332,00     │ 16      │ 39.820,00     │ ...     │ 149.827,67   │
│ SPC Avisa            │ 1.592   │ 15.552,04     │ 1.646   │ 16.072,54     │ ...     │ 186.684,30   │
│ HSM Experience       │ 1.461   │ 11.044,37     │ 1.428   │ 10.804,56     │ ...     │ 132.765,18   │
│ SPC Brasil           │ 0       │ 1.374.090,38  │ 0       │ 1.374.090,38  │ ...     │ 16.499.036,45│
└──────────────────────┴─────────┴───────────────┴─────────┴───────────────┴─────────┴──────────────┘
```

### **TAB 2: SERVIÇOS_META** (Metas 2026)

```
┌──────────────────────┬─────────┬───────────────┬─────────┬───────────────┬─────────┬──────────────┐
│ Serviço              │ Jan_Qtd │ Jan_Fatur     │ Fev_Qtd │ Fev_Fatur     │ ...     │ Total_Fatur  │
├──────────────────────┼─────────┼───────────────┼─────────┼───────────────┼─────────┼──────────────┤
│ Certificado Digital  │ 343     │ 48.680,33     │ 343     │ 48.680,33     │ ...     │ 584.163,80   │
│ CDL Celular          │ 60      │ 175.521,53    │ 60      │ 175.521,53    │ ...     │ 1.935.524,45 │
│ Escola de Negócios   │ ...     │ ...           │ ...     │ ...           │ ...     │ ...          │
│ ...                  │ ...     │ ...           │ ...     │ ...           │ ...     │ ...          │
└──────────────────────┴─────────┴───────────────┴─────────┴───────────────┴─────────┴──────────────┘
```

---

## ✅ PLANILHA 2: CDL-KPIs-INDICADORES

### Estrutura com 5 abas

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ CDL-KPIs-INDICADORES                                                             │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│  [KPI_EXECUTIVOS] ← (GID=0)                                                      │
│  [CLIENTES] ← (GID=1)                                                            │
│  [PESSOAS] ← (GID=2)                                                             │
│  [ESG] ← (GID=3)                                                                 │
│  [PROCESSOS] ← (GID=4)                                                           │
│
└──────────────────────────────────────────────────────────────────────────────────┘
```

### **TAB 1: KPI_EXECUTIVOS**

```
┌─────────────────────────┬──────────────────┬──────────┬─────────┬───────┬──────────────┐
│ Métrica                 │ Realizado_2025   │ Meta_2026│ Status  │ Trend │ TrendValue   │
├─────────────────────────┼──────────────────┼──────────┼─────────┼───────┼──────────────┤
│ Faturamento Total       │ 20.991.713,51    │ 23.611.340│warning │ up    │ +12%        │
│ Serviços CDL            │ 2.667.236,24     │ 3.112.088 │warning │ up    │ +16.7%      │
│ SPC Brasil              │ 17.432.341,91    │ 19.120.528│warning │ up    │ +9.7%       │
│ Inadimplência (%)       │ 8,5              │ 6        │danger  │ down  │ Meta <6%    │
│ EBITDA (%)              │ 8,2              │ 10       │warning │ up    │ +2pp        │
│ Margem Líquida (%)      │ 7,5              │ 10       │warning │ up    │ +1.5pp      │
│ NPS                     │ 78               │ 95       │warning │ up    │ +5pts       │
│ Base Associados         │ 3.925            │ 4.514    │warning │ up    │ +15%        │
└─────────────────────────┴──────────────────┴──────────┴─────────┴───────┴──────────────┘
```

### **TAB 2: CLIENTES**

```
┌──────────────────────┬──────────────────┬──────────┬─────────┬────────────────────────────┐
│ Métrica              │ Realizado_2025   │ Meta_2026│ Status  │ Observação                 │
├──────────────────────┼──────────────────┼──────────┼─────────┼────────────────────────────┤
│ NPS Score            │ 78               │ 95       │warning │ +5 pontos em relação 2025  │
│ Satisfação (%)       │ 85               │ 90       │warning │ Pesquisa trimestral        │
│ Base Associados      │ 3.925            │ 4.514    │warning │ Crescimento de +15%        │
│ Churn (%)            │ 4,2              │ 3,5      │warning │ Redução de -0.7pp          │
│ Ticket Médio         │ 5.350,15         │ 6.200    │warning │ Crescimento de +16%        │
└──────────────────────┴──────────────────┴──────────┴─────────┴────────────────────────────┘
```

### **TAB 3: PESSOAS**

```
┌──────────────────────┬──────────────────┬──────────┬─────────┬───────────────────────────┐
│ Métrica              │ Realizado_2025   │ Meta_2026│ Status  │ Observação                │
├──────────────────────┼──────────────────┼──────────┼─────────┼───────────────────────────┤
│ Força de Trabalho    │ 185              │ 195      │success │ Crescimento de +10 pessoas│
│ Produtividade (%)    │ 92               │ 95       │warning │ Aumento de +3pp           │
│ Satisfação Interna   │ 8,2              │ 8,5      │warning │ Pesquisa anual            │
│ Rotatividade (%)     │ 6,5              │ 5        │warning │ Redução de -1.5pp         │
└──────────────────────┴──────────────────┴──────────┴─────────┴───────────────────────────┘
```

### **TAB 4: ESG**

```
┌────────────────────────────┬──────────────────┬──────────┬─────────┬──────────────────┐
│ Métrica                    │ Realizado_2025   │ Meta_2026│ Status  │ Observação       │
├────────────────────────────┼──────────────────┼──────────┼─────────┼──────────────────┤
│ Emissões CO2 (ton)         │ 245              │ 200      │warning │ -45 ton          │
│ Diversidade (%)            │ 38               │ 45       │warning │ +7pp             │
│ Responsabilidade Social(%) │ 75               │ 85       │warning │ +10pp            │
│ Investimento Comunidade(R$)│ 125.000          │ 150.000  │warning │ +20%             │
└────────────────────────────┴──────────────────┴──────────┴─────────┴──────────────────┘
```

### **TAB 5: PROCESSOS**

```
┌─────────────────────┬──────────────────┬──────────┬─────────┬──────────────────────┐
│ Métrica             │ Realizado_2025   │ Meta_2026│ Status  │ Observação           │
├─────────────────────┼──────────────────┼──────────┼─────────┼──────────────────────┤
│ Eficiência (%)      │ 82               │ 90       │warning │ +8pp                 │
│ Automação (%)       │ 45               │ 60       │warning │ +15pp                │
│ Lead Time (dias)    │ 4,5              │ 3        │warning │ -1.5 dias            │
│ Taxa Erro (%)       │ 2,1              │ 1        │warning │ -1.1pp               │
└─────────────────────┴──────────────────┴──────────┴─────────┴──────────────────────┘
```

---

## ✅ PLANILHA 3: CDL-EVOLUÇÃO-RECEITA

### Estrutura simples com 1 aba

```
┌──────────────┬─────────────────┬───────────┬──────────────────┬────────────┐
│ Mês          │ Realizado_2025  │ Meta_2026 │ Realizado_2026   │ Variação % │
├──────────────┼─────────────────┼───────────┼──────────────────┼────────────┤
│ Janeiro      │ 1.925.870,41    │ 2.081.843 │ 0                │ -100%      │
│ Fevereiro    │ 1.911.421,58    │ 2.102.653 │ 0                │ -100%      │
│ Março        │ 1.845.157,68    │ 2.049.977 │ 0                │ -100%      │
│ Abril        │ 1.997.264,32    │ 2.203.705 │ 0                │ -100%      │
│ Maio         │ 1.867.488,24    │ 2.086.763 │ 0                │ -100%      │
│ Junho        │ 1.888.179,05    │ 2.074.600 │ 0                │ -100%      │
│ Julho        │ 1.928.568,20    │ 2.118.463 │ 0                │ -100%      │
│ Agosto       │ 1.897.318,04    │ 2.128.942 │ 0                │ -100%      │
│ Setembro     │ 1.972.833,47    │ 2.184.473 │ 0                │ -100%      │
│ Outubro      │ 1.929.598,87    │ 2.145.083 │ 0                │ -100%      │
│ Novembro     │ 1.828.013,65    │ 2.057.633 │ 0                │ -100%      │
│ Dezembro     │ 0                │ 1.983.199 │ 0                │ 0%         │
├──────────────┼─────────────────┼───────────┼──────────────────┼────────────┤
│ TOTAL        │ 20.991.713,51   │ 23.611.340│ 0                │ -88%       │
└──────────────┴─────────────────┴───────────┴──────────────────┴────────────┘
```

---

## ✅ PLANILHA 4: CDL-FUNIL-VENDAS

### Estrutura simples com 1 aba

```
┌──────────────────────┬─────────────┬──────┬─────────┬─────────────┐
│ Estágio              │ Quantidade  │ Meta │ Percent │ Cor_Hex     │
├──────────────────────┼─────────────┼──────┼─────────┼─────────────┤
│ Leads                │ 2.000       │ 2.500│ 100%    │ #1F3A93     │
│ Qualificados         │ 800         │ 1.000│ 40%     │ #E89C26     │
│ Propostas            │ 650         │ 800  │ 32,5%   │ #2FB75D     │
│ Novos Associados     │ 565         │ 864  │ 28,25%  │ #A555BE     │
├──────────────────────┼─────────────┼──────┼─────────┼─────────────┤
│ Taxa Conversão (%)   │ 28,25%      │34,56%│ 81,8%   │ #000000     │
└──────────────────────┴─────────────┴──────┴─────────┴─────────────┘
```

---

## 🎨 Mapa de Cores (Opcional)

Para melhor visualização nas planilhas, use essas cores:

```
┌────────┬─────────┬─────────────┐
│ Status │ Hex     │ RGB         │
├────────┼─────────┼─────────────┤
│ Success│ #2FB75D │ 47, 183, 93 │
│ Warning│ #E89C26 │ 232, 156, 38│
│ Danger │ #EF4444 │ 239, 68, 68 │
│ Info   │ #1F3A93 │ 31, 58, 147 │
└────────┴─────────┴─────────────┘
```

---

## 📊 Exemplo de Linha Completa (COPIAR E COLAR)

### Serviço Certificado Digital (2025):

```
Certificado Digital	336	39221.70	310	38073.40	291	34735.30	298	44616.90	338	49830.00	316	49218.60	297	48312.40	357	48463.00	321	48241.70	311	50121.10	260	42337.40	0	0	3435	493171.50
```

Se copiar e colar direto, as tabulações serão convertidas em colunas automaticamente.

---

## 🔗 Exemplo de URL Completa

Quando você criar uma planilha, a URL será assim:

```
https://docs.google.com/spreadsheets/d/1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX/edit
```

Para exportar como CSV:

```
https://docs.google.com/spreadsheets/d/1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX/export?format=csv&gid=0
```

Partes importantes:
- `1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX` = ID da planilha (COPIE ESTE)
- `gid=0` = Número da aba (0 para primeira, 1 para segunda, etc)

---

## ✅ Checklist Visual

Ao criar cada planilha, verifique:

- [ ] Primeira linha tem nomes de colunas?
- [ ] Dados começam na segunda linha?
- [ ] Não há linhas em branco no meio?
- [ ] Números estão formatados (não como texto)?
- [ ] Nomes de serviços são consistentes?
- [ ] Status contém apenas: success, warning, danger?
- [ ] Trend contém apenas: up, down, stable?
- [ ] Nenhuma célula está mesclada?
- [ ] Permissão está "Qualquer pessoa com o link"?

---

## 🧪 Teste de Exportação

Para verificar se a exportação CSV está funcionando:

```bash
# Cole no terminal do seu computador (não no dev container)
curl -s "https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/export?format=csv" | head -20
```

Você deve ver as 20 primeiras linhas em formato CSV.

---

**Criado em:** 16 de janeiro de 2026  
**Versão:** 1.0  
**Pronto para usar!**

