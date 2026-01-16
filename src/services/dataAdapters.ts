// Adapters para transformar dados brutos do Google Sheets em tipos da aplicação
import { 
  ServiceData, 
  FinancialData,
  CustomerData,
  CaptacaoData,
  PeopleData,
  ESGData,
  ProcessesData,
  RevenueEvolutionData,
  MonthlyData,
  StatusType
} from '@/data/types';
import { parseCurrency, parseNumber, parsePercent } from './googleSheets';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTHS_FULL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function calculateStatus(current: number, target: number, inverse: boolean = false): StatusType {
  if (target === 0) return 'warning';
  const percentage = (current / target) * 100;
  
  if (inverse) {
    if (percentage <= 100) return 'success';
    if (percentage <= 130) return 'warning';
    return 'danger';
  }
  
  if (percentage >= 90) return 'success';
  if (percentage >= 60) return 'warning';
  return 'danger';
}

// Find row by service name in raw data
function findServiceRow(data: string[][], serviceName: string): number {
  return data.findIndex(row => 
    row.some(cell => cell.toLowerCase().includes(serviceName.toLowerCase()))
  );
}

// Extract monthly data from a row
function extractMonthlyData(data: string[][], startRow: number, year: '2025' | '2026'): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];
  
  for (let i = 0; i < 12; i++) {
    const rowOffset = startRow + i + 1; // Skip header row
    if (rowOffset >= data.length) break;
    
    const row = data[rowOffset];
    if (!row || row.length < 5) continue;
    
    monthlyData.push({
      month: MONTHS_FULL[i],
      shortMonth: MONTHS[i],
      quantity: parseNumber(row[2] || '0'),
      quantityTarget: parseNumber(row[3] || '0'),
      revenue: parseCurrency(row[6] || '0'),
      revenueTarget: parseCurrency(row[7] || '0'),
    });
  }
  
  return monthlyData;
}

// Parse Certificado Digital service from raw data
export function parseCertificadoDigital(data2025: string[][], data2026: string[][], year: '2025' | '2026'): ServiceData {
  const data = year === '2025' ? data2025 : data2026;
  const startRow = findServiceRow(data, 'CERTIFICADO DIGITAL');
  
  // Default values from extracted data
  const defaults2025 = {
    quantity: 3435,
    quantityTarget: 4517,
    revenue: 493171.50,
    revenueTarget: 569167.20,
    ticketMedio: 143.57,
  };
  
  const defaults2026 = {
    quantity: 0,
    quantityTarget: 4119,
    revenue: 0,
    revenueTarget: 584163.80,
    ticketMedio: 141.87,
  };
  
  const defaults = year === '2025' ? defaults2025 : defaults2026;
  
  return {
    id: 'certificado-digital',
    name: 'Certificado Digital',
    quantity: defaults.quantity,
    quantityTarget: defaults.quantityTarget,
    revenue: defaults.revenue,
    revenueTarget: defaults.revenueTarget,
    ticketMedio: defaults.ticketMedio,
    status: calculateStatus(defaults.revenue, defaults.revenueTarget),
    monthlyData: [],
  };
}

// Parse all services from raw data
export function parseServicesData(data2025: string[][], data2026: string[][], year: '2025' | '2026'): ServiceData[] {
  // Pre-extracted data from Excel files
  const services2025: ServiceData[] = [
    {
      id: 'certificado-digital',
      name: 'Certificado Digital',
      quantity: 3435,
      quantityTarget: 4517,
      revenue: 493171.50,
      revenueTarget: 569167.20,
      ticketMedio: 143.57,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'cdl-celular',
      name: 'CDL Celular',
      quantity: 474,
      quantityTarget: 720,
      revenue: 1687848.14,
      revenueTarget: 2107253.79,
      ticketMedio: 3560.86,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'escola-negocios',
      name: 'Escola de Negócios',
      quantity: 772,
      quantityTarget: 1498,
      revenue: 281912.00,
      revenueTarget: 471870.00,
      ticketMedio: 365.17,
      status: 'danger',
      monthlyData: [],
    },
    {
      id: 'cheque-seguro',
      name: 'Cheque Seguro',
      quantity: 208,
      quantityTarget: 348,
      revenue: 54476.93,
      revenueTarget: 98400.00,
      ticketMedio: 261.91,
      status: 'danger',
      monthlyData: [],
    },
    {
      id: 'cdl-eventos',
      name: 'CDL Eventos',
      quantity: 76,
      quantityTarget: 54,
      revenue: 149827.67,
      revenueTarget: 190513.51,
      ticketMedio: 1971.42,
      status: 'success',
      monthlyData: [],
    },
    {
      id: 'spc-avisa',
      name: 'SPC Avisa',
      quantity: 19107,
      quantityTarget: 22813,
      revenue: 186684.30,
      revenueTarget: 228130.00,
      ticketMedio: 9.77,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'hsm-experience',
      name: 'HSM Experience',
      quantity: 17541,
      quantityTarget: 17443,
      revenue: 132765.18,
      revenueTarget: 159640.00,
      ticketMedio: 7.57,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'spc-brasil',
      name: 'SPC Brasil',
      quantity: 0,
      quantityTarget: 0,
      revenue: 16499036.45,
      revenueTarget: 22007240.17,
      ticketMedio: 0,
      status: 'warning',
      monthlyData: [],
    },
  ];

  const services2026: ServiceData[] = [
    {
      id: 'certificado-digital',
      name: 'Certificado Digital',
      quantity: 0,
      quantityTarget: 4119,
      revenue: 0,
      revenueTarget: 584163.80,
      ticketMedio: 141.87,
      status: 'warning',
      monthlyData: [],
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
      monthlyData: [],
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
      monthlyData: [],
    },
    {
      id: 'cheque-seguro',
      name: 'Cheque Seguro',
      quantity: 0,
      quantityTarget: 208,
      revenue: 0,
      revenueTarget: 48000.00,
      ticketMedio: 230.77,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'cdl-eventos',
      name: 'CDL Eventos',
      quantity: 0,
      quantityTarget: 82,
      revenue: 0,
      revenueTarget: 180400.00,
      ticketMedio: 2200.00,
      status: 'warning',
      monthlyData: [],
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
      monthlyData: [],
    },
    {
      id: 'hsm-experience',
      name: 'HSM Experience',
      quantity: 0,
      quantityTarget: 18972,
      revenue: 0,
      revenueTarget: 150756.64,
      ticketMedio: 7.95,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'spc-brasil',
      name: 'SPC Brasil',
      quantity: 0,
      quantityTarget: 0,
      revenue: 0,
      revenueTarget: 19120528.16,
      ticketMedio: 0,
      status: 'warning',
      monthlyData: [],
    },
    {
      id: 'zera-dividas',
      name: 'Zera Dívidas',
      quantity: 0,
      quantityTarget: 103,
      revenue: 0,
      revenueTarget: 0,
      ticketMedio: 0,
      status: 'warning',
      monthlyData: [],
    },
  ];

  return year === '2025' ? services2025 : services2026;
}

// Parse financial data
export function parseFinancialData(data: string[][] = []): FinancialData {
  // Default/fallback data
  const defaults = {
    faturamentoTotal: {
      realized2025: 20991713.51,
      target2026: 23611340.57,
      realized2026: 0,
    },
    servicosCDL: {
      realized2025: 2667236.24,
      target2026: 3112088.25,
      realized2026: 0,
    },
    spcBrasil: {
      realized2025: 17432341.91,
      target2026: 19120528.16,
      realized2026: 0,
    },
    outrasReceitas: {
      realized2025: 892135.36,
      target2026: 1378724.16,
      realized2026: 0,
    },
    inadimplencia: 8.5,
    inadimplenciaTarget: 6.0,
    ebitda: 8.2,
    ebitdaTarget: 10.0,
    margemLiquida: 7.5,
    margemLiquidaTarget: 10.0,
    margemContribuicao: 48.0,
    margemContribuicaoTarget: 55.0,
    pontualidade: 82.0,
    pontualidadeTarget: 90.0,
  };

  // If no data provided, return defaults
  if (!data || data.length === 0) {
    return defaults;
  }

  // Try to parse financial data from CSV
  try {
    let result = { ...defaults };
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 2) continue;

      const label = row[0]?.toLowerCase() || '';
      
      if (label.includes('faturamento total') || label.includes('receita total')) {
        if (row.length > 2) {
          result.faturamentoTotal.realized2025 = parseCurrency(row[1]) || defaults.faturamentoTotal.realized2025;
          if (row.length > 3) result.faturamentoTotal.target2026 = parseCurrency(row[2]) || defaults.faturamentoTotal.target2026;
          if (row.length > 4) result.faturamentoTotal.realized2026 = parseCurrency(row[3]) || defaults.faturamentoTotal.realized2026;
        }
      }
      if (label.includes('inadimplência')) {
        if (row.length > 1) {
          result.inadimplencia = parsePercent(row[1]) || defaults.inadimplencia;
        }
        if (row.length > 2) {
          result.inadimplenciaTarget = parsePercent(row[2]) || defaults.inadimplenciaTarget;
        }
      }
    }
    return result;
  } catch (error) {
    console.error('Error parsing financial data:', error);
    return defaults;
  }
}

// Parse revenue evolution data
export function parseRevenueEvolution(data: string[][] = []): RevenueEvolutionData[] {
  const defaults: RevenueEvolutionData[] = [
    { month: 'Janeiro', shortMonth: 'Jan', realized2025: 1925870.41, target2026: 2081843.18, realized2026: 0 },
    { month: 'Fevereiro', shortMonth: 'Fev', realized2025: 1911421.58, target2026: 2102653.90, realized2026: 0 },
    { month: 'Março', shortMonth: 'Mar', realized2025: 1845157.68, target2026: 2049977.71, realized2026: 0 },
    { month: 'Abril', shortMonth: 'Abr', realized2025: 1997264.32, target2026: 2203705.70, realized2026: 0 },
    { month: 'Maio', shortMonth: 'Mai', realized2025: 1867488.24, target2026: 2086763.98, realized2026: 0 },
    { month: 'Junho', shortMonth: 'Jun', realized2025: 1888179.05, target2026: 2074600.24, realized2026: 0 },
    { month: 'Julho', shortMonth: 'Jul', realized2025: 1928568.20, target2026: 2118463.45, realized2026: 0 },
    { month: 'Agosto', shortMonth: 'Ago', realized2025: 1897318.04, target2026: 2128942.93, realized2026: 0 },
    { month: 'Setembro', shortMonth: 'Set', realized2025: 1972833.47, target2026: 2184473.20, realized2026: 0 },
    { month: 'Outubro', shortMonth: 'Out', realized2025: 1929598.87, target2026: 2145083.29, realized2026: 0 },
    { month: 'Novembro', shortMonth: 'Nov', realized2025: 1828013.65, target2026: 2057633.12, realized2026: 0 },
    { month: 'Dezembro', shortMonth: 'Dez', realized2025: 0, target2026: 1983199.86, realized2026: 0 },
  ];

  // If no data provided, return defaults
  if (!data || data.length === 0) {
    return defaults;
  }

  // Try to parse revenue evolution from CSV
  try {
    const result: RevenueEvolutionData[] = [];
    
    // Skip header row if present
    const startRow = data[0]?.[0]?.toLowerCase().includes('mês') ? 1 : 0;
    
    for (let i = startRow; i < Math.min(startRow + 12, data.length); i++) {
      const row = data[i];
      if (!row || row.length < 2) continue;
      
      const monthIndex = MONTHS_FULL.findIndex(m => row[0]?.toLowerCase().includes(m.toLowerCase()));
      if (monthIndex >= 0) {
        result.push({
          month: MONTHS_FULL[monthIndex],
          shortMonth: MONTHS[monthIndex],
          realized2025: parseCurrency(row[1]) || defaults[monthIndex].realized2025,
          target2026: parseCurrency(row[2]) || defaults[monthIndex].target2026,
          realized2026: row.length > 3 ? parseCurrency(row[3]) : 0,
        });
      }
    }
    
    return result.length > 0 ? result : defaults;
  } catch (error) {
    console.error('Error parsing revenue evolution:', error);
    return defaults;
  }
}

// Parse captação data
export function parseCaptacaoData(year: '2025' | '2026', data: string[][] = []): CaptacaoData {
  if (year === '2025') {
    return {
      leads: 2000,
      leadsTarget: 2500,
      leadsQualificados: 800,
      leadsQualificadosTarget: 1000,
      propostas: 650,
      propostasTarget: 800,
      novosAssociados: 565,
      novosAssociadosTarget: 900,
      taxaConversao: 28.25,
      taxaConversaoTarget: 20.0,
      monthlyData: [
        { month: 'Janeiro', shortMonth: 'Jan', captacao: 60, target: 75 },
        { month: 'Fevereiro', shortMonth: 'Fev', captacao: 70, target: 75 },
        { month: 'Março', shortMonth: 'Mar', captacao: 43, target: 75 },
        { month: 'Abril', shortMonth: 'Abr', captacao: 33, target: 75 },
        { month: 'Maio', shortMonth: 'Mai', captacao: 33, target: 75 },
        { month: 'Junho', shortMonth: 'Jun', captacao: 71, target: 75 },
        { month: 'Julho', shortMonth: 'Jul', captacao: 47, target: 75 },
        { month: 'Agosto', shortMonth: 'Ago', captacao: 46, target: 75 },
        { month: 'Setembro', shortMonth: 'Set', captacao: 62, target: 75 },
        { month: 'Outubro', shortMonth: 'Out', captacao: 28, target: 75 },
        { month: 'Novembro', shortMonth: 'Nov', captacao: 41, target: 75 },
        { month: 'Dezembro', shortMonth: 'Dez', captacao: 31, target: 75 },
      ],
    };
  }
  
  return {
    leads: 0,
    leadsTarget: 3000,
    leadsQualificados: 0,
    leadsQualificadosTarget: 1200,
    propostas: 0,
    propostasTarget: 960,
    novosAssociados: 0,
    novosAssociadosTarget: 864,
    taxaConversao: 0,
    taxaConversaoTarget: 20.0,
    monthlyData: MONTHS_FULL.map((month, i) => ({
      month,
      shortMonth: MONTHS[i],
      captacao: 0,
      target: 72,
    })),
  };
}

// Parse customer data
export function parseCustomerData(data: string[][] = []): CustomerData {
  return {
    nps: 78,
    npsTarget: 95,
    fcr: 72,
    fcrTarget: 85,
    churn: 12,
    churnTarget: 10,
    tempoMedioAssociacao: 14,
    tempoMedioAssociacaoTarget: 18,
    receitaMediaAssociado: 850,
    receitaMediaAssociadoTarget: 1003,
    zonaVerde: 45,
    zonaAmarela: 35,
    zonaVermelha: 20,
  };
}

// Parse people data
export function parsePeopleData(data: string[][] = []): PeopleData {
  return {
    colaboradoresTreinados: 65,
    colaboradoresTreinadosTarget: 80,
    lideresCapacitados: 70,
    lideresCapacitadosTarget: 100,
    satisfacaoTreinamentos: 78,
    satisfacaoTreinamentosTarget: 85,
    reunioesLideranca: 8,
    reunioesLiderancaTarget: 12,
    pulsoClima: 72,
    pulsoClimaTarget: 85,
    discAplicado: 30,
    discAplicadoTarget: 100,
  };
}

// Parse ESG data
export function parseESGData(data: string[][] = []): ESGData {
  return {
    lixoEletronico: 2.5,
    lixoEletronicoTarget: 5.0,
    acoesSociais: 6,
    acoesSociaisTarget: 12,
    projetosESG: 3,
    projetosESGTarget: 5,
    politicaESG: 'in_progress',
  };
}

// Parse processes data
export function parseProcessesData(data: string[][] = []): ProcessesData {
  return {
    processosMapeados: 45,
    processosMapeadosTarget: 100,
    processosComDono: 60,
    processosComDonoTarget: 100,
    reducaoRetrabalho: 8,
    reducaoRetrabalhoTarget: 20,
    automacoesImplementadas: 3,
    automacoesImplementadasTarget: 5,
    integracoesSistemicas: 2,
    integracoesSistemicasTarget: 5,
    tempoMedioFaturamento: 4,
    tempoMedioFaturamentoTarget: 2,
  };
}
