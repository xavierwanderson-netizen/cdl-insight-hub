// ====================================
// TIPOS DE DADOS - CDL INSIGHT HUB
// ====================================

export type StatusType = 'success' | 'warning' | 'danger';
export type TrendType = 'up' | 'down' | 'stable';

// KPI Card Data
export interface KPIData {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  target: number;
  formattedTarget: string;
  unit?: string;
  status: StatusType;
  trend: TrendType;
  trendValue: string;
  description?: string;
}

// Service Performance Data
export interface ServiceData {
  id: string;
  name: string;
  quantity: number;
  quantityTarget: number;
  revenue: number;
  revenueTarget: number;
  ticketMedio: number;
  status: StatusType;
  monthlyData: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  shortMonth: string;
  quantity: number;
  quantityTarget: number;
  revenue: number;
  revenueTarget: number;
}

// OKR Data
export interface OKRData {
  id: string;
  objective: string;
  perspective: 'financial' | 'customers' | 'processes' | 'learning' | 'esg';
  keyResults: KeyResult[];
  responsible: string;
  status: StatusType;
}

export interface KeyResult {
  id: string;
  description: string;
  target: string;
  current: string;
  progress: number;
  status: StatusType;
}

// Funnel Data
export interface FunnelStage {
  id: string;
  name: string;
  value: number;
  target: number;
  percentage: number;
  color: string;
}

// Revenue Evolution
export interface RevenueEvolutionData {
  month: string;
  shortMonth: string;
  realized2025: number;
  target2026: number;
  realized2026: number;
}

// Financial Data
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

// Customer Data
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

// People Data
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

// ESG Data
export interface ESGData {
  lixoEletronico: number;
  lixoEletronicoTarget: number;
  acoesSociais: number;
  acoesSociaisTarget: number;
  projetosESG: number;
  projetosESGTarget: number;
  politicaESG: 'implemented' | 'in_progress' | 'not_started';
}

// Processes Data
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

// Captação de Associados
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

export interface CaptacaoMonthlyData {
  month: string;
  shortMonth: string;
  captacao: number;
  target: number;
}

// Dashboard Context Type
export interface DashboardData {
  year: '2025' | '2026';
  financial: FinancialData;
  services: ServiceData[];
  revenueEvolution: RevenueEvolutionData[];
  customers: CustomerData;
  captacao: CaptacaoData;
  people: PeopleData;
  esg: ESGData;
  processes: ProcessesData;
  okrs: OKRData[];
}
