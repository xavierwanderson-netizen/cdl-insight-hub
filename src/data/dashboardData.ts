// Dashboard Data - CDL Insight Hub (Dados Reais 2025/2026)

export type StatusType = 'success' | 'warning' | 'danger';
export type TrendType = 'up' | 'down' | 'stable';

export interface KPIData {
  id: string;
  label: string;
  value: number;
  target: number;
  unit?: string;
  prefix?: string;
  status: StatusType;
  trend: TrendType;
  trendValue: string;
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
}

export interface OKRData {
  id: string;
  objective: string;
  responsible: string;
  keyResults: Array<{ id: string; description: string; target: string; current: string; progress: number; status: StatusType; }>;
  status: StatusType;
}

export interface FunnelStage {
  stage: string;
  value: number;
  target: number;
  percentage: number;
  color: string;
}

export interface RevenueEvolutionData {
  month: string;
  realized2025: number;
  target2026: number;
  realized2026: number;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export const executiveKPIs: KPIData[] = [
  { id: 'faturamento-total', label: 'Faturamento 2025', value: 20991713.51, target: 23611340.57, prefix: 'R$', status: 'warning', trend: 'up', trendValue: '+12%' },
  { id: 'servicos-cdl', label: 'Serviços CDL', value: 2667236.24, target: 3112088.25, prefix: 'R$', status: 'warning', trend: 'up', trendValue: '+16.7%' },
  { id: 'spc-brasil', label: 'SPC Brasil', value: 17432341.91, target: 19120528.16, prefix: 'R$', status: 'warning', trend: 'up', trendValue: '+9.7%' },
  { id: 'inadimplencia', label: 'Inadimplência', value: 8.5, target: 6, unit: '%', status: 'danger', trend: 'down', trendValue: 'Meta <6%', responsible: 'Karla' },
  { id: 'ebitda', label: 'EBITDA', value: 8.2, target: 10, unit: '%', status: 'warning', trend: 'up', trendValue: '+2pp' },
  { id: 'margem-liquida', label: 'Margem Líquida', value: 7.5, target: 10, unit: '%', status: 'warning', trend: 'up', trendValue: '+1.5pp' },
  { id: 'nps', label: 'NPS', value: 78, target: 95, unit: '%', status: 'warning', trend: 'up', trendValue: '+5pts' },
  { id: 'base-associados', label: 'Base Associados', value: 3925, target: 4514, status: 'warning', trend: 'up', trendValue: '+15%' },
];

export const servicesData: ServiceData[] = [
  { id: 'certificado-digital', name: 'Certificado Digital', quantity: 3435, quantityTarget: 4119, revenue: 493171.50, revenueTarget: 584163.80, ticketMedio: 143.57, status: 'warning' },
  { id: 'cdl-celular', name: 'CDL Celular', quantity: 474, quantityTarget: 720, revenue: 1687848.14, revenueTarget: 1935524.45, ticketMedio: 3560.86, status: 'warning' },
  { id: 'escola-negocios', name: 'Escola de Negócios', quantity: 772, quantityTarget: 1040, revenue: 281912.00, revenueTarget: 364000.00, ticketMedio: 365.17, status: 'danger' },
  { id: 'cheque-seguro', name: 'Cheque Seguro', quantity: 208, quantityTarget: 208, revenue: 54476.93, revenueTarget: 48000.00, ticketMedio: 261.91, status: 'success' },
  { id: 'cdl-eventos', name: 'CDL Eventos', quantity: 76, quantityTarget: 82, revenue: 149827.67, revenueTarget: 180400.00, ticketMedio: 1971.42, status: 'warning' },
  { id: 'spc-avisa', name: 'SPC Avisa', quantity: 19107, quantityTarget: 21642, revenue: 186684.30, revenueTarget: 212095.52, ticketMedio: 9.77, status: 'warning' },
  { id: 'hsm-experience', name: 'HSM Experience', quantity: 17541, quantityTarget: 18972, revenue: 132765.18, revenueTarget: 150756.64, ticketMedio: 7.57, status: 'warning' },
  { id: 'spc-brasil', name: 'SPC Brasil', quantity: 0, quantityTarget: 0, revenue: 17432341.91, revenueTarget: 19120528.16, ticketMedio: 0, status: 'warning' },
];

export const revenueEvolution: RevenueEvolutionData[] = [
  { month: 'Jan', realized2025: 1925870.41, target2026: 2081843.18, realized2026: 0 },
  { month: 'Fev', realized2025: 1911421.58, target2026: 2102653.90, realized2026: 0 },
  { month: 'Mar', realized2025: 1845157.68, target2026: 2049977.71, realized2026: 0 },
  { month: 'Abr', realized2025: 1997264.32, target2026: 2203705.70, realized2026: 0 },
  { month: 'Mai', realized2025: 1867488.24, target2026: 2086763.98, realized2026: 0 },
  { month: 'Jun', realized2025: 1888179.05, target2026: 2074600.24, realized2026: 0 },
  { month: 'Jul', realized2025: 1928568.20, target2026: 2118463.45, realized2026: 0 },
  { month: 'Ago', realized2025: 1897318.04, target2026: 2128942.93, realized2026: 0 },
  { month: 'Set', realized2025: 1972833.47, target2026: 2184473.20, realized2026: 0 },
  { month: 'Out', realized2025: 1929598.87, target2026: 2145083.29, realized2026: 0 },
  { month: 'Nov', realized2025: 1828013.65, target2026: 2057633.12, realized2026: 0 },
  { month: 'Dez', realized2025: 0, target2026: 1983199.86, realized2026: 0 },
];

export const salesFunnel: FunnelStage[] = [
  { stage: 'Leads', value: 2000, target: 2500, percentage: 100, color: 'hsl(222, 65%, 35%)' },
  { stage: 'Qualificados', value: 800, target: 1000, percentage: 40, color: 'hsl(38, 92%, 50%)' },
  { stage: 'Propostas', value: 650, target: 800, percentage: 32.5, color: 'hsl(142, 71%, 45%)' },
  { stage: 'Novos Associados', value: 565, target: 864, percentage: 28.25, color: 'hsl(262, 80%, 55%)' },
];

export const captureByChannel = [
  { channel: 'Eventos', value: 120, target: 180 },
  { channel: 'Indicação', value: 150, target: 200 },
  { channel: 'SPC', value: 80, target: 120 },
  { channel: 'Campanhas', value: 100, target: 150 },
  { channel: 'Outros', value: 115, target: 214 },
];

export const financialOKRs: OKRData[] = [
  { id: 'f1', objective: 'F1. Assegurar a Solidez Financeira', responsible: 'Karla', status: 'warning', keyResults: [
    { id: 'kr1', description: 'Reduzir Inadimplência < 6%', target: '<6%', current: '8.5%', progress: 41, status: 'danger' },
    { id: 'kr2', description: 'Pontualidade 90%', target: '90%', current: '82%', progress: 91, status: 'warning' },
    { id: 'kr3', description: 'EBITDA 10%', target: '10%', current: '8.2%', progress: 82, status: 'warning' },
  ]},
  { id: 'f2', objective: 'F2. Elevar Faturamento', responsible: 'Wanderson', status: 'warning', keyResults: [
    { id: 'kr6', description: 'Faturamento +12%', target: '12%', current: '0%', progress: 0, status: 'danger' },
    { id: 'kr7', description: 'Base associados +15%', target: '15%', current: '0%', progress: 0, status: 'danger' },
  ]},
  { id: 'f3', objective: 'F3. Eficiência Operacional', responsible: 'Fábio', status: 'warning', keyResults: [
    { id: 'kr10', description: '5 integrações sistêmicas', target: '5', current: '2', progress: 40, status: 'danger' },
    { id: 'kr11', description: 'Tempo faturamento ≤ 2 dias', target: '2 dias', current: '4 dias', progress: 50, status: 'warning' },
  ]},
];

export const customerOKRs: OKRData[] = [
  { id: 'c5', objective: 'C5. Experiência e Fidelização', responsible: 'CS', status: 'warning', keyResults: [
    { id: 'kr12', description: 'NPS 95%', target: '95%', current: '78%', progress: 82, status: 'warning' },
    { id: 'kr13', description: 'FCR 85%', target: '85%', current: '72%', progress: 85, status: 'warning' },
  ]},
  { id: 'c7', objective: 'C7. Captação de Associados', responsible: 'Wanderson', status: 'warning', keyResults: [
    { id: 'kr20', description: 'Conversão leads 20%', target: '20%', current: '28%', progress: 100, status: 'success' },
  ]},
];

export const strategicProjects = [
  { id: 'sap', name: 'Otimização SAP', progress: 35, status: 'warning' as StatusType },
  { id: 'crm', name: 'CRM Bitrix', progress: 60, status: 'warning' as StatusType },
  { id: 'bi', name: 'BI Executivo', progress: 20, status: 'danger' as StatusType },
  { id: 'automacao', name: 'Automação', progress: 15, status: 'danger' as StatusType },
];

export const processData: Record<string, { value: number; target: number; unit: string }> = {
  processosMapeados: { value: 45, target: 100, unit: '%' },
  processosComDono: { value: 60, target: 100, unit: '%' },
  reducaoRetrabalho: { value: 8, target: 20, unit: '%' },
  tempoFaturamento: { value: 4, target: 2, unit: 'dias' },
};

export const peopleData: Record<string, { value: number; target: number; unit: string }> = {
  colaboradoresTreinados: { value: 65, target: 80, unit: '%' },
  lideresCapacitados: { value: 70, target: 100, unit: '%' },
  satisfacaoTreinamentos: { value: 78, target: 85, unit: '%' },
  reunioesLideranca: { value: 8, target: 12, unit: '/ano' },
  pulsoClima: { value: 72, target: 85, unit: '%' },
  discAplicado: { value: 30, target: 100, unit: '%' },
};

export const esgData: Record<string, { value: number; target: number; unit: string }> = {
  lixoEletronico: { value: 2.5, target: 5, unit: 'ton' },
  acoesSociais: { value: 6, target: 12, unit: '/ano' },
  projetosESG: { value: 3, target: 5, unit: '' },
  politicaESG: { value: 30, target: 100, unit: '%' },
};
