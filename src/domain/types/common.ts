/**
 * Tipos de domínio comuns a toda a aplicação
 * NÃO contém dados reais, apenas interfaces
 */

export type StatusType = 'success' | 'warning' | 'danger';
export type TrendType = 'up' | 'down' | 'stable';

// ========================================
// SERVIÇOS
// ========================================

export interface MonthlyData {
  month: string;
  quantity: number;
  quantityTarget: number;
  revenue: number;
  revenueTarget: number;
}

export interface ServiceData {
  id: string;
  name: string;
  quantity: number;
  quantityTarget: number;
  revenue: number;
  revenueTarget: number;
  ticketMedio: number;
  monthlyData: MonthlyData[];
}

// ========================================
// FINANCEIRO
// ========================================

export interface RevenueEvolutionData {
  month: string;
  realized2025: number;
  target2026: number;
  realized2026: number;
}

export interface FinancialData {
  faturamentoTotal: {
    realized2025: number;
    target2026: number;
    realized2026: number;
  };
  servicosCDL: {
    realized2025: number;
    target2026: number;
    realized2026: number;
  };
  spcBrasil: {
    realized2025: number;
    target2026: number;
    realized2026: number;
  };
  outrasReceitas: {
    realized2025: number;
    target2026: number;
    realized2026: number;
  };
  inadimplencia: number;
  inadimplenciaTarget: number;
  ebitda: number;
  ebitdaTarget: number;
  margemLiquida: number;
  margemLiquidaTarget: number;
  margemContribuicao: number;
  margemContribuicaoTarget: number;
  pontualidade: number;
  pontualidadeTarget: number;
}

// ========================================
// CAPTAÇÃO
// ========================================

export interface CaptacaoMonthlyData {
  month: string;
  captacao: number;
  target: number;
}

export interface CaptacaoData {
  leads: number;
  leadsTarget: number;
  leadsQualificados: number;
  leadsQualificadosTarget: number;
  propostas: number;
  propostasTarget: number;
  novosAssociados: number;
  novosAssociadosTarget: number;
  taxaConversao: number;
  taxaConversaoTarget: number;
  monthlyData: CaptacaoMonthlyData[];
}

// ========================================
// CLIENTES
// ========================================

export interface CustomerData {
  nps: number;
  npsTarget: number;
  fcr: number;
  fcrTarget: number;
  churn: number;
  churnTarget: number;
  tempoMedioAssociacao: number;
  tempoMedioAssociacaoTarget: number;
  receitaMediaAssociado: number;
  receitaMediaAssociadoTarget: number;
  zonaVerde: number;
  zonaAmarela: number;
  zonaVermelha: number;
}

// ========================================
// PESSOAS
// ========================================

export interface PeopleData {
  colaboradoresTreinados: number;
  colaboradoresTreinadosTarget: number;
  lideresCapacitados: number;
  lideresCapacitadosTarget: number;
  satisfacaoTreinamentos: number;
  satisfacaoTreinamentosTarget: number;
  reunioesLideranca: number;
  reunioesLiderancaTarget: number;
  pulsoClima: number;
  pulsoClimaTarget: number;
  discAplicado: number;
  discAplicadoTarget: number;
}

// ========================================
// ESG
// ========================================

export interface ESGData {
  lixoEletronico: number;
  lixoEletronicoTarget: number;
  acoesSociais: number;
  acoesSociaisTarget: number;
  projetosESG: number;
  projetosESGTarget: number;
  politicaESG: 'implemented' | 'in_progress' | 'not_started';
}

// ========================================
// PROCESSOS
// ========================================

export interface ProcessesData {
  processosMapeados: number;
  processosMapeadosTarget: number;
  processosComDono: number;
  processosComDonoTarget: number;
  reducaoRetrabalho: number;
  reducaoRetrabalhoTarget: number;
  automacoesImplementadas: number;
  automacoesImplementadasTarget: number;
  integracoesSistemicas: number;
  integracoesSistemicasTarget: number;
  tempoMedioFaturamento: number;
  tempoMedioFaturamentoTarget: number;
}

// ========================================
// OKRs
// ========================================

export interface KeyResult {
  id: string;
  description: string;
  target: string;
  current: string;
  progress: number;
  status: StatusType;
}

export interface OKRData {
  id: string;
  objective: string;
  perspective: 'financial' | 'customers' | 'processes' | 'learning' | 'esg';
  keyResults: KeyResult[];
  responsible: string;
  status: StatusType;
}

// ========================================
// AGREGADO RAIZ
// ========================================

export interface DashboardData {
  year: '2025' | '2026';
  financial: FinancialData | null;
  services: ServiceData[] | null;
  revenueEvolution: RevenueEvolutionData[] | null;
  customers: CustomerData | null;
  captacao: CaptacaoData | null;
  people: PeopleData | null;
  esg: ESGData | null;
  processes: ProcessesData | null;
  okrs: OKRData[] | null;
}
