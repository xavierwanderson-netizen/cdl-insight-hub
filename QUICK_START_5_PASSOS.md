# 🚀 Quick Start - 5 Passos para Ativar Dashboard em Tempo Real

## ⏱️ Tempo Total: ~30 minutos

---

## ✅ PASSO 1: Criar 4 Planilhas no Google Drive (5 min)

### 1.1 - Abra Google Drive
```
https://drive.google.com
```

### 1.2 - Criar Planilha 1: SERVIÇOS
- Clique em "Novo" → "Google Sheets"
- Nomeie como: `CDL-SERVIÇOS-2025-2026`
- Crie 2 abas:
  - Aba 1: `SERVIÇOS_REAIS`
  - Aba 2: `SERVIÇOS_META`

### 1.3 - Criar Planilha 2: KPIs
- Clique em "Novo" → "Google Sheets"
- Nomeie como: `CDL-KPIs-INDICADORES`
- Crie 5 abas:
  - Aba 1: `KPI_EXECUTIVOS`
  - Aba 2: `CLIENTES`
  - Aba 3: `PESSOAS`
  - Aba 4: `ESG`
  - Aba 5: `PROCESSOS`

### 1.4 - Criar Planilha 3: RECEITA
- Nomeie como: `CDL-EVOLUÇÃO-RECEITA`
- Mantenha 1 aba padrão

### 1.5 - Criar Planilha 4: FUNIL
- Nomeie como: `CDL-FUNIL-VENDAS`
- Mantenha 1 aba padrão

---

## ✅ PASSO 2: Copiar Estrutura de Dados (10 min)

### 2.1 - Abra este arquivo
```
TEMPLATE_PLANILHAS_GOOGLE_SHEETS.md
```

### 2.2 - Copie dados para cada planilha

**Para SERVIÇOS:**
- Copie cabeçalhos e dados da seção "SERVIÇOS_REAIS"
- Cole na Aba 1
- Copie dados da seção "SERVIÇOS_META"
- Cole na Aba 2

**Para KPIs:**
- Copie cada tabela para sua aba correspondente

**Para RECEITA e FUNIL:**
- Copie dados de cada uma

### 2.3 - Verificar formato
```
✅ Primeiro linha: nomes de colunas
✅ Segunda linha em diante: dados
✅ Sem linhas em branco
✅ Números sem aspas
```

---

## ✅ PASSO 3: Obter IDs das Planilhas (5 min)

### 3.1 - Para cada planilha criada:

1. Abra a planilha
2. Copie a URL:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXX/edit
                                         ↑
                                   COPIE ISTO
   ```

3. Salve em um arquivo de texto:
   ```
   CDL-SERVIÇOS-2025-2026: 1i6fmNE8TDQN6ozlb-iOFw2OejuK-GiF6b1z_yYfEDmI
   CDL-KPIs-INDICADORES: 1ENABBoNRHFNhZV3QpwTBegy7AFfi-5oBOwa2iu3VLd8
   CDL-EVOLUÇÃO-RECEITA: 11Aqi1V7Cbx0loMyTsFJd_gLzpXLpDF0vsxwCwFQ6jdM
   CDL-FUNIL-VENDAS: 1v44E1iRhEzM7FxpZPFCDQN782wEx69Xpf6swjyOiVrU
   ```

---

## ✅ PASSO 4: Configurar Permissões (5 min)

### 4.1 - Para cada planilha:

1. Clique em "Compartilhar" (canto superior direito)
2. Selecione "Qualquer pessoa com o link"
3. Permissão: "Visualizador"
4. Clique em "Compartilhar"

---

## ✅ PASSO 5: Atualizar Código (5 min)

### 5.1 - Abra arquivo de configuração
```
src/services/googleSheets.ts
```

### 5.2 - Atualize os IDs:
```typescript
export const SHEET_IDS = {
  SERVICOS: '1CakEJ7MCGwWe2gM1SUNVrdv_gaGvcrdX',      // ← SEU ID AQUI
  INDICADORES: '1FzEH...',                             // ← SEU ID AQUI
  RECEITA: '1RxEj...',                                 // ← SEU ID AQUI
  FUNIL: '1AbCd...',                                   // ← SEU ID AQUI
};
```

### 5.3 - Teste em terminal
```bash
# Cole no console do navegador (F12 → Console)
fetch('https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/export?format=csv&gid=0')
  .then(r => r.text())
  .then(csv => console.log(csv.split('\n').slice(0, 5)))
```

Se retornar dados = ✅ Funcionando!

---

## 🧪 TESTE RÁPIDO

### 1. Abra o Dashboard
```
http://localhost:5173
```

### 2. Faça alteração em uma célula
- Abra uma planilha Google Sheets
- Altere um valor (ex: 100 → 200)

### 3. Aguarde atualização
- Espere 5 segundos
- Recarregue o dashboard (F5)

### 4. Verifique
- Valor foi atualizado? ✅ **PRONTO!**
- Valor não mudou? ❌ Veja troubleshooting abaixo

---

## 🆘 Troubleshooting Rápido

### ❌ "Dados não aparecem"

**Verificar:**
```
1. ✅ ID da planilha está correto?
2. ✅ Permissão é "Qualquer pessoa com o link"?
3. ✅ Cabeçalhos estão na primeira linha?
4. ✅ Dados começam na segunda linha?
```

**Testar:**
```javascript
// Console do navegador (F12)
fetch('https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv&gid=0')
  .then(r => r.text())
  .then(t => alert(t.substring(0, 200)))
```

### ❌ "Valores aparecem como NaN"

**Verificar:**
- Números não têm aspas
- Não há símbolos especiais
- Formato: `1234.56` ou `1.234,56` (ambos OK)

### ❌ "Só mostra dados de 2025"

**Solução:**
- Verifique se aba 2 tem os dados de 2026
- Confirme que GID está correto em `SHEET_TABS`

---

## 📋 Estrutura Final Esperada

```
Google Drive
│
├── CDL-SERVIÇOS-2025-2026
│   ├── SERVIÇOS_REAIS (8 serviços × 12 meses)
│   └── SERVIÇOS_META (8 serviços × 12 meses)
│
├── CDL-KPIs-INDICADORES
│   ├── KPI_EXECUTIVOS (8 KPIs)
│   ├── CLIENTES (5 métricas)
│   ├── PESSOAS (5 métricas)
│   ├── ESG (4 métricas)
│   └── PROCESSOS (5 métricas)
│
├── CDL-EVOLUÇÃO-RECEITA
│   └── (12 meses + total)
│
└── CDL-FUNIL-VENDAS
    └── (4 estágios + taxa conversão)
```

---

## ✅ Checklist Final

- [ ] 4 planilhas criadas
- [ ] 2 abas em serviços, 5 em KPIs
- [ ] Dados copiados e formatados
- [ ] IDs obtidos
- [ ] Permissões configuradas
- [ ] Código atualizado com IDs
- [ ] Teste de fetch bem-sucedido
- [ ] Dashboard aberto e testado
- [ ] Mudança refletida em tempo real

---

## 🎉 Parabéns!

Você agora tem um dashboard que:
- ✅ Lê dados do Google Sheets em tempo real
- ✅ Atualiza automaticamente a cada 5 minutos
- ✅ Mostra dados 2025 e 2026
- ✅ Sem dados hardcoded
- ✅ Fácil manutenção

---

## 📚 Documentos de Referência

Se precisar de mais detalhes:

1. **ESTRUTURA_PLANILHAS_GOOGLE_SHEETS.md**
   - Visão geral completa
   - Boas práticas

2. **TEMPLATE_PLANILHAS_GOOGLE_SHEETS.md**
   - Dados de exemplo prontos
   - Copiar e colar

3. **EXEMPLOS_VISUAIS_PLANILHAS.md**
   - Tabelas visuais
   - Formato esperado

4. **GUIA_IMPLEMENTACAO_GOOGLE_SHEETS.md**
   - Detalhes técnicos
   - Código de exemplo

---

## 💬 Suporte

Se algo não funcionar:

1. Verifique os 4 Troubleshooting items
2. Limpe cache (Ctrl+Shift+Delete)
3. Recarregue página (Ctrl+F5)
4. Verifique console (F12 → Console)

---

**Criado em:** 16 de janeiro de 2026  
**Versão:** 1.0 - Quick Start  
**Status:** Pronto para usar em 30 minutos! 🚀

