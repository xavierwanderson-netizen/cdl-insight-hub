// Dashboard Data Types and Mock Data for CDL Goiânia

export type StatusType = 'success' | 'warning' | 'danger';
export type TrendType = 'up' | 'down' | 'stable';

export interface KPIData {
  id: string;
  label: string;
  value: string | number;
  target?: string | number;
  unit?: string;
  prefix?: string;
  status: StatusType;
  trend: TrendType;
  trendValue?: string;
  responsible?: string;
  description?: string;
}

export interface ServiceData {
  id: string;
  name: string;
  quantity: number;
  quantityTarget: number;
  revenue: number;
  revenueTarget: number;
  ticketMedio: number;
  status: StatusType;
  monthlyData: { month: string; value: number; target: number }[];
}

export interface OKRData {
  id: string;
  objective: string;
  keyResults: {
    id: string;
    description: string;
    target: string;
    current: string;
    progress: number;
    status: StatusType;
    responsible: string;
  }[];
}

export interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// Executive Overview KPIs
export const executiveKPIs: KPIData[] = [
  {
    id: 'faturamento-total',
    label: 'Faturamento Total',
    value: 19811998,
    target: 19811998,
    prefix: 'R$',
    status: 'success',
    trend: 'up',
    trendValue: '+12%',
    description: 'Meta 2026 vs 2025',
  },
  {
    id: 'crescimento',
    label: 'Crescimento vs 2025',
    value: 12,
    target: 12,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 'Em linha',
  },
  {
    id: 'ebitda',
    label: 'EBITDA',
    value: 10,
    target: 10,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+2pp',
    responsible: 'Karla',
  },
  {
    id: 'margem-liquida',
    label: 'Margem Líquida',
    value: 8.5,
    target: 10,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+1.5pp',
    responsible: 'Karla',
  },
  {
    id: 'inadimplencia',
    label: 'Inadimplência',
    value: 7.2,
    target: 6,
    unit: '%',
    status: 'danger',
    trend: 'down',
    trendValue: '-1.8pp',
    responsible: 'Karla',
  },
  {
    id: 'nps',
    label: 'NPS Geral',
    value: 88,
    target: 95,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+5pts',
  },
  {
    id: 'base-associados',
    label: 'Base Associados Ativos',
    value: 3925,
    target: 4514,
    status: 'warning',
    trend: 'up',
    trendValue: '+15%',
  },
  {
    id: 'ticket-medio',
    label: 'Ticket Médio/Associado',
    value: 5050,
    target: 5960,
    prefix: 'R$',
    status: 'warning',
    trend: 'up',
    trendValue: '+18%',
  },
];

// Services Performance Data
export const servicesData: ServiceData[] = [
  {
    id: 'certificado-digital',
    name: 'Certificado Digital',
    quantity: 0,
    quantityTarget: 4119,
    revenue: 0,
    revenueTarget: 584163.80,
    ticketMedio: 141.84,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 52483.20 },
      { month: 'Fev', value: 0, target: 48422.00 },
      { month: 'Mar', value: 0, target: 45454.20 },
      { month: 'Abr', value: 0, target: 46547.60 },
      { month: 'Mai', value: 0, target: 52795.60 },
      { month: 'Jun', value: 0, target: 49359.20 },
      { month: 'Jul', value: 0, target: 46391.40 },
      { month: 'Ago', value: 0, target: 55763.40 },
      { month: 'Set', value: 0, target: 50140.20 },
      { month: 'Out', value: 0, target: 48578.20 },
      { month: 'Nov', value: 0, target: 40612.00 },
      { month: 'Dez', value: 0, target: 47616.80 },
    ],
  },
  {
    id: 'cdl-celular',
    name: 'CDL Celular',
    quantity: 0,
    quantityTarget: 720,
    revenue: 0,
    revenueTarget: 1935524.45,
    ticketMedio: 2688.23,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 157541.91 },
      { month: 'Fev', value: 0, target: 157196.63 },
      { month: 'Mar', value: 0, target: 159231.87 },
      { month: 'Abr', value: 0, target: 160400.56 },
      { month: 'Mai', value: 0, target: 160379.65 },
      { month: 'Jun', value: 0, target: 161070.42 },
      { month: 'Jul', value: 0, target: 160218.95 },
      { month: 'Ago', value: 0, target: 156833.87 },
      { month: 'Set', value: 0, target: 166710.31 },
      { month: 'Out', value: 0, target: 169884.93 },
      { month: 'Nov', value: 0, target: 162771.45 },
      { month: 'Dez', value: 0, target: 163283.90 },
    ],
  },
  {
    id: 'escola-negocios',
    name: 'Escola de Negócios',
    quantity: 0,
    quantityTarget: 1040,
    revenue: 0,
    revenueTarget: 364000.00,
    ticketMedio: 350.00,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 28000.00 },
      { month: 'Fev', value: 0, target: 35000.00 },
      { month: 'Mar', value: 0, target: 35000.00 },
      { month: 'Abr', value: 0, target: 35000.00 },
      { month: 'Mai', value: 0, target: 35000.00 },
      { month: 'Jun', value: 0, target: 21000.00 },
      { month: 'Jul', value: 0, target: 35000.00 },
      { month: 'Ago', value: 0, target: 35000.00 },
      { month: 'Set', value: 0, target: 35000.00 },
      { month: 'Out', value: 0, target: 35000.00 },
      { month: 'Nov', value: 0, target: 24500.00 },
      { month: 'Dez', value: 0, target: 10500.00 },
    ],
  },
  {
    id: 'cheque-seguro',
    name: 'Cheque Seguro',
    quantity: 0,
    quantityTarget: 0,
    revenue: 0,
    revenueTarget: 48000.00,
    ticketMedio: 4000.00,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 4000.00 },
      { month: 'Fev', value: 0, target: 4000.00 },
      { month: 'Mar', value: 0, target: 4000.00 },
      { month: 'Abr', value: 0, target: 4000.00 },
      { month: 'Mai', value: 0, target: 4000.00 },
      { month: 'Jun', value: 0, target: 4000.00 },
      { month: 'Jul', value: 0, target: 4000.00 },
      { month: 'Ago', value: 0, target: 4000.00 },
      { month: 'Set', value: 0, target: 4000.00 },
      { month: 'Out', value: 0, target: 4000.00 },
      { month: 'Nov', value: 0, target: 4000.00 },
      { month: 'Dez', value: 0, target: 4000.00 },
    ],
  },
  {
    id: 'spc-brasil',
    name: 'SPC Brasil - Consultas',
    quantity: 0,
    quantityTarget: 3044771,
    revenue: 0,
    revenueTarget: 2812486,
    ticketMedio: 0.92,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 272467 },
      { month: 'Fev', value: 0, target: 249237 },
      { month: 'Mar', value: 0, target: 238720 },
      { month: 'Abr', value: 0, target: 248610 },
      { month: 'Mai', value: 0, target: 278126 },
      { month: 'Jun', value: 0, target: 248228 },
      { month: 'Jul', value: 0, target: 256213 },
      { month: 'Ago', value: 0, target: 246569 },
      { month: 'Set', value: 0, target: 260470 },
      { month: 'Out', value: 0, target: 244888 },
      { month: 'Nov', value: 0, target: 249679 },
      { month: 'Dez', value: 0, target: 251564 },
    ],
  },
  {
    id: 'spc-avisa',
    name: 'SPC Avisa',
    quantity: 0,
    quantityTarget: 21642,
    revenue: 0,
    revenueTarget: 212095.52,
    ticketMedio: 9.80,
    status: 'warning',
    monthlyData: [
      { month: 'Jan', value: 0, target: 18963.00 },
      { month: 'Fev', value: 0, target: 18708.20 },
      { month: 'Mar', value: 0, target: 18492.60 },
      { month: 'Abr', value: 0, target: 18316.20 },
      { month: 'Mai', value: 0, target: 17708.60 },
      { month: 'Jun', value: 0, target: 17395.00 },
      { month: 'Jul', value: 0, target: 17238.20 },
      { month: 'Ago', value: 0, target: 17179.40 },
      { month: 'Set', value: 0, target: 17248.00 },
      { month: 'Out', value: 0, target: 16963.80 },
      { month: 'Nov', value: 0, target: 16797.20 },
      { month: 'Dez', value: 0, target: 17085.32 },
    ],
  },
  {
    id: 'cdl-eventos',
    name: 'CDL Eventos',
    quantity: 0,
    quantityTarget: 82,
    revenue: 0,
    revenueTarget: 158400.00,
    ticketMedio: 1931.71,
    status: 'warning',
    monthlyData: [],
  },
  {
    id: 'cdl-cobranca',
    name: 'CDL Cobrança',
    quantity: 0,
    quantityTarget: 103,
    revenue: 0,
    revenueTarget: 0,
    ticketMedio: 0,
    status: 'warning',
    monthlyData: [],
  },
];

// Financial OKRs
export const financialOKRs: OKRData[] = [
  {
    id: 'f1',
    objective: 'F1. Assegurar a Solidez Financeira',
    keyResults: [
      {
        id: 'kr1',
        description: 'Reduzir a Inadimplência',
        target: '< 6%',
        current: '7.2%',
        progress: 45,
        status: 'danger',
        responsible: 'Karla',
      },
      {
        id: 'kr2',
        description: 'Aumentar a Pontualidade',
        target: '90%',
        current: '82%',
        progress: 75,
        status: 'warning',
        responsible: 'Karla',
      },
      {
        id: 'kr3',
        description: 'EBITDA',
        target: '10%',
        current: '8.5%',
        progress: 85,
        status: 'warning',
        responsible: 'Karla',
      },
      {
        id: 'kr4',
        description: 'Margem Líquida',
        target: '10%',
        current: '8%',
        progress: 80,
        status: 'warning',
        responsible: 'Karla',
      },
      {
        id: 'kr5',
        description: 'Margem de Contribuição',
        target: '55%',
        current: '52%',
        progress: 94,
        status: 'success',
        responsible: 'Karla',
      },
    ],
  },
  {
    id: 'f2',
    objective: 'F2. Elevar Faturamento com Diversificação das Receitas',
    keyResults: [
      {
        id: 'kr6',
        description: 'Aumentar faturamento total em 12% vs 2025',
        target: 'R$ 19.8M',
        current: 'R$ 0',
        progress: 0,
        status: 'warning',
        responsible: 'Wanderson e Juliana',
      },
      {
        id: 'kr7',
        description: 'Aumentar base de associados ativos em 15%',
        target: '4.514',
        current: '3.925',
        progress: 0,
        status: 'warning',
        responsible: 'Wanderson e Juliana',
      },
      {
        id: 'kr8',
        description: 'Adesão Zera Dívidas (5% dos associados que negativam)',
        target: '75 associados',
        current: '0',
        progress: 0,
        status: 'warning',
        responsible: 'Wanderson e Juliana',
      },
      {
        id: 'kr9',
        description: 'Adesão do Plano de Benefícios para 50% da base',
        target: '50%',
        current: '0%',
        progress: 0,
        status: 'warning',
        responsible: 'Wanderson e Juliana',
      },
    ],
  },
  {
    id: 'f3',
    objective: 'F3. Promover Eficiência Operacional e Financeira',
    keyResults: [
      {
        id: 'kr10',
        description: 'Implementar 5 ações de integração e otimização sistêmica',
        target: '5 ações',
        current: '0',
        progress: 0,
        status: 'warning',
        responsible: 'Fábio e Karla',
      },
      {
        id: 'kr11',
        description: 'Tempo médio de Operação de faturamento',
        target: '≤ 2 dias úteis',
        current: '4 dias',
        progress: 50,
        status: 'danger',
        responsible: 'Fábio e Karla',
      },
    ],
  },
];

// Customer Perspective OKRs
export const customerOKRs: OKRData[] = [
  {
    id: 'c5',
    objective: 'C5. Promover Excelente Experiência e Fidelização',
    keyResults: [
      {
        id: 'kr12',
        description: 'Elevar NPS',
        target: '95%',
        current: '88%',
        progress: 92,
        status: 'warning',
        responsible: 'Wanderson',
      },
      {
        id: 'kr13',
        description: 'FCR (First Call Resolution)',
        target: '85%',
        current: '78%',
        progress: 92,
        status: 'warning',
        responsible: 'Wanderson',
      },
      {
        id: 'kr14',
        description: 'Reduzir Cancelamento anual em 20%',
        target: '-20%',
        current: '-8%',
        progress: 40,
        status: 'danger',
        responsible: 'Wanderson',
      },
    ],
  },
];

// Funnel Data
export const salesFunnel: FunnelStage[] = [
  { name: 'Leads', value: 1250, percentage: 100, color: 'hsl(222, 65%, 35%)' },
  { name: 'Leads Qualificados', value: 625, percentage: 50, color: 'hsl(222, 65%, 45%)' },
  { name: 'Propostas', value: 250, percentage: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'Novos Associados', value: 50, percentage: 4, color: 'hsl(142, 71%, 45%)' },
];

// ESG Data
export const esgData = {
  lixoEletronico: { value: 0, target: 2, unit: 'toneladas' },
  acoesSociais: { value: 0, target: 12, unit: 'ações' },
  projetosAtivos: { value: 0, target: 5, unit: 'projetos' },
  politicaESG: { status: 'Em elaboração', progress: 30 },
};

// People & Learning Data
export const peopleData = {
  colaboradoresTreinados: { value: 0, target: 80, unit: '%' },
  lideresCapacitados: { value: 0, target: 100, unit: '%' },
  satisfacaoTreinamentos: { value: 0, target: 85, unit: '%' },
  reunioesLideranca: { value: 0, target: 12, unit: 'reuniões' },
  pulsoClima: { value: 0, target: 4, unit: 'pesquisas' },
  discAplicado: { value: 0, target: 100, unit: '% líderes' },
};

// Internal Processes Data
export const processData = {
  processosMapeados: { value: 0, target: 100, unit: '%' },
  processosComDono: { value: 0, target: 100, unit: '%' },
  reducaoRetrabalho: { value: 0, target: 20, unit: '%' },
  automacoesImplementadas: { value: 0, target: 5, unit: 'ações' },
  integracoesSistemicas: { value: 0, target: 5, unit: 'integrações' },
};

// Strategic Projects
export const strategicProjects = [
  { id: 'sap', name: 'SAP - Melhorias', progress: 20, status: 'warning' as StatusType },
  { id: 'crm', name: 'CRM - Bitrix', progress: 35, status: 'warning' as StatusType },
  { id: 'bi', name: 'BI - Dashboard', progress: 15, status: 'danger' as StatusType },
  { id: 'automacao', name: 'Automações', progress: 10, status: 'danger' as StatusType },
];

// Monthly Revenue Evolution
export const revenueEvolution = [
  { month: 'Jan', target: 1650999.83, realized: 0 },
  { month: 'Fev', target: 1650999.83, realized: 0 },
  { month: 'Mar', target: 1650999.83, realized: 0 },
  { month: 'Abr', target: 1650999.83, realized: 0 },
  { month: 'Mai', target: 1650999.83, realized: 0 },
  { month: 'Jun', target: 1650999.83, realized: 0 },
  { month: 'Jul', target: 1650999.83, realized: 0 },
  { month: 'Ago', target: 1650999.83, realized: 0 },
  { month: 'Set', target: 1650999.83, realized: 0 },
  { month: 'Out', target: 1650999.83, realized: 0 },
  { month: 'Nov', target: 1650999.83, realized: 0 },
  { month: 'Dez', target: 1650999.83, realized: 0 },
];

// Capture by Channel
export const captureByChannel = [
  { channel: 'Eventos', value: 25, target: 30 },
  { channel: 'Indicação', value: 20, target: 25 },
  { channel: 'SPC Brasil', value: 10, target: 15 },
  { channel: 'Campanhas', value: 15, target: 20 },
  { channel: 'Orgânico', value: 10, target: 10 },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
