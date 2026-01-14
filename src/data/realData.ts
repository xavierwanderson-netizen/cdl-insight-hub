// ====================================
// DADOS REAIS - CDL GOIÂNIA
// Extraídos dos arquivos Excel fornecidos
// ====================================

import { 
  ServiceData, 
  RevenueEvolutionData, 
  FinancialData, 
  CustomerData,
  CaptacaoData,
  PeopleData,
  ESGData,
  ProcessesData,
  OKRData,
  MonthlyData,
  CaptacaoMonthlyData
} from './types';

// ====================================
// SERVIÇOS - DADOS 2025 (REALIZADO)
// ====================================

const servicesData2025: ServiceData[] = [
  {
    id: 'certificado-digital',
    name: 'Certificado Digital',
    quantity: 3435,
    quantityTarget: 4517,
    revenue: 493171.50,
    revenueTarget: 569167.20,
    ticketMedio: 143.57,
    status: 'warning',
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 336, quantityTarget: 412, revenue: 39221.70, revenueTarget: 51874.20 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 310, quantityTarget: 339, revenue: 38073.40, revenueTarget: 42745.50 },
      { month: 'Março', shortMonth: 'Mar', quantity: 291, quantityTarget: 412, revenue: 34735.30, revenueTarget: 51874.20 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 298, quantityTarget: 408, revenue: 44616.90, revenueTarget: 51439.50 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 338, quantityTarget: 409, revenue: 49830.00, revenueTarget: 51584.40 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 316, quantityTarget: 384, revenue: 49218.60, revenueTarget: 48396.60 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 297, quantityTarget: 375, revenue: 48312.40, revenueTarget: 47237.40 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 357, quantityTarget: 397, revenue: 48463.00, revenueTarget: 49990.50 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 321, quantityTarget: 375, revenue: 48241.70, revenueTarget: 47237.40 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 311, quantityTarget: 346, revenue: 50121.10, revenueTarget: 43614.90 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 260, quantityTarget: 344, revenue: 42337.40, revenueTarget: 43325.10 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 316, revenue: 0, revenueTarget: 39847.50 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 55, quantityTarget: 60, revenue: 150039.91, revenueTarget: 179811.63 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 46, quantityTarget: 60, revenue: 149711.08, revenueTarget: 175304.55 },
      { month: 'Março', shortMonth: 'Mar', quantity: 35, quantityTarget: 60, revenue: 151649.40, revenueTarget: 175275.66 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 61, quantityTarget: 60, revenue: 152762.44, revenueTarget: 178068.30 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 20, quantityTarget: 60, revenue: 152742.52, revenueTarget: 176265.80 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 58, quantityTarget: 60, revenue: 153400.40, revenueTarget: 179939.49 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 31, quantityTarget: 60, revenue: 152589.48, revenueTarget: 172706.75 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 48, quantityTarget: 60, revenue: 149365.59, revenueTarget: 173972.25 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 25, quantityTarget: 60, revenue: 158771.72, revenueTarget: 178669.91 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 33, quantityTarget: 60, revenue: 161795.17, revenueTarget: 172319.15 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 62, quantityTarget: 60, revenue: 155020.43, revenueTarget: 174887.24 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 170033.06 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 86, quantityTarget: 128, revenue: 46220.00, revenueTarget: 40320.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 106, quantityTarget: 128, revenue: 17940.00, revenueTarget: 40320.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 36, quantityTarget: 128, revenue: 18423.00, revenueTarget: 40320.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 68, quantityTarget: 128, revenue: 23360.00, revenueTarget: 40320.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 76, quantityTarget: 128, revenue: 26110.00, revenueTarget: 40320.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 87, quantityTarget: 128, revenue: 36050.00, revenueTarget: 40320.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 98, quantityTarget: 128, revenue: 34933.00, revenueTarget: 40320.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 39, quantityTarget: 128, revenue: 13038.00, revenueTarget: 40320.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 88, quantityTarget: 128, revenue: 27758.00, revenueTarget: 40320.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 88, quantityTarget: 128, revenue: 29160.00, revenueTarget: 40320.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 128, revenue: 8920.00, revenueTarget: 40320.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 90, revenue: 0, revenueTarget: 28350.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 29, quantityTarget: 0, revenue: 6830.00, revenueTarget: 8200.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 29, quantityTarget: 0, revenue: 6480.00, revenueTarget: 8200.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 29, quantityTarget: 0, revenue: 6180.00, revenueTarget: 8200.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 29, quantityTarget: 0, revenue: 5830.00, revenueTarget: 8200.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 29, quantityTarget: 0, revenue: 4742.57, revenueTarget: 8200.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 9, quantityTarget: 0, revenue: 3590.00, revenueTarget: 8200.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 9, quantityTarget: 0, revenue: 3677.50, revenueTarget: 8200.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 9, quantityTarget: 0, revenue: 4259.52, revenueTarget: 8200.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 9, quantityTarget: 0, revenue: 4205.00, revenueTarget: 8200.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 9, quantityTarget: 0, revenue: 4205.00, revenueTarget: 8200.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 9, quantityTarget: 0, revenue: 4477.34, revenueTarget: 8200.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 9, quantityTarget: 0, revenue: 0, revenueTarget: 8200.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 2, quantityTarget: 2, revenue: 27332.00, revenueTarget: 7000.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 16, quantityTarget: 2, revenue: 39820.00, revenueTarget: 7000.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 7, quantityTarget: 3, revenue: 20706.00, revenueTarget: 10500.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 18, quantityTarget: 4, revenue: 19764.67, revenueTarget: 14378.38 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 6, quantityTarget: 5, revenue: 3270.00, revenueTarget: 17500.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 12, quantityTarget: 4, revenue: 5530.00, revenueTarget: 14378.38 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 6, quantityTarget: 4, revenue: 11355.00, revenueTarget: 14378.38 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 3, quantityTarget: 6, revenue: 6360.00, revenueTarget: 21000.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 2, quantityTarget: 8, revenue: 6710.00, revenueTarget: 28000.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 2, quantityTarget: 4, revenue: 8300.00, revenueTarget: 14000.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 2, quantityTarget: 8, revenue: 680.00, revenueTarget: 28000.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 4, revenue: 0, revenueTarget: 14378.38 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 1863, quantityTarget: 1790, revenue: 18176.40, revenueTarget: 17900.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 1837, quantityTarget: 1802, revenue: 18008.10, revenueTarget: 18020.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 1815, quantityTarget: 1862, revenue: 17770.50, revenueTarget: 18620.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 1797, quantityTarget: 1924, revenue: 17186.40, revenueTarget: 19240.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 1735, quantityTarget: 1889, revenue: 16849.80, revenueTarget: 18890.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 1703, quantityTarget: 1914, revenue: 16711.20, revenueTarget: 19140.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 1687, quantityTarget: 1933, revenue: 16592.40, revenueTarget: 19330.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 1681, quantityTarget: 1954, revenue: 16770.60, revenueTarget: 19540.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 1688, quantityTarget: 1942, revenue: 16424.10, revenueTarget: 19420.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 1659, quantityTarget: 1881, revenue: 16255.80, revenueTarget: 18810.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 1642, quantityTarget: 1929, revenue: 15939.00, revenueTarget: 19290.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 1993, revenue: 0, revenueTarget: 19930.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 1599, quantityTarget: 1526, revenue: 13125.40, revenueTarget: 12808.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 3156, quantityTarget: 1608, revenue: 12293.20, revenueTarget: 13464.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 1460, quantityTarget: 1605, revenue: 11846.94, revenueTarget: 13440.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 1409, quantityTarget: 1507, revenue: 11771.16, revenueTarget: 12656.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 1396, quantityTarget: 1600, revenue: 11476.46, revenueTarget: 13400.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 1364, quantityTarget: 1584, revenue: 12234.26, revenueTarget: 13272.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 1454, quantityTarget: 1606, revenue: 11804.84, revenueTarget: 13448.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 1399, quantityTarget: 1620, revenue: 11594.34, revenueTarget: 13560.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 1377, quantityTarget: 1543, revenue: 12360.56, revenueTarget: 12944.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 1468, quantityTarget: 1641, revenue: 12284.78, revenueTarget: 13728.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 1459, quantityTarget: 1603, revenue: 11973.24, revenueTarget: 13424.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 1612, revenue: 0, revenueTarget: 13496.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 0, revenue: 1582780.03, revenueTarget: 1924959.45 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 0, revenue: 1582008.47, revenueTarget: 1844787.09 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 0, revenue: 1540062.15, revenueTarget: 1826197.47 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 0, revenue: 1675459.11, revenueTarget: 1963227.53 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 0, revenue: 1561338.04, revenueTarget: 1825694.43 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 0, revenue: 1563236.83, revenueTarget: 1856009.02 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 0, revenue: 1590528.00, revenueTarget: 1864523.20 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 0, revenue: 1588267.50, revenueTarget: 1850149.71 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 0, revenue: 1632165.79, revenueTarget: 1814807.20 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 0, revenue: 1179252.17, revenueTarget: 1829791.63 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 0, revenue: 1003938.36, revenueTarget: 1813793.37 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1593300.06 },
    ]
  },
];

// ====================================
// SERVIÇOS - DADOS 2026 (METAS)
// ====================================

const servicesData2026: ServiceData[] = [
  {
    id: 'certificado-digital',
    name: 'Certificado Digital',
    quantity: 0,
    quantityTarget: 4119,
    revenue: 0,
    revenueTarget: 584163.80,
    ticketMedio: 141.87,
    status: 'warning',
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 370, revenue: 0, revenueTarget: 52483.20 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 341, revenue: 0, revenueTarget: 48422.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 320, revenue: 0, revenueTarget: 45454.20 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 328, revenue: 0, revenueTarget: 46547.60 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 372, revenue: 0, revenueTarget: 52795.60 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 348, revenue: 0, revenueTarget: 49359.20 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 327, revenue: 0, revenueTarget: 46391.40 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 393, revenue: 0, revenueTarget: 55763.40 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 353, revenue: 0, revenueTarget: 50140.20 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 342, revenue: 0, revenueTarget: 48578.20 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 286, revenue: 0, revenueTarget: 40612.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 340, revenue: 0, revenueTarget: 47616.80 },
    ]
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
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 157541.91 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 157196.63 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 159231.87 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 160400.56 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 160379.65 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 161070.42 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 160218.95 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 156833.87 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 166710.31 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 169884.93 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 162771.45 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 163283.90 },
    ]
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
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 80, revenue: 0, revenueTarget: 28000.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 60, revenue: 0, revenueTarget: 21000.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 100, revenue: 0, revenueTarget: 35000.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 70, revenue: 0, revenueTarget: 24500.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 30, revenue: 0, revenueTarget: 10500.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 4000.00 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 2, revenue: 0, revenueTarget: 4400.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 4, revenue: 0, revenueTarget: 8800.00 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 6, revenue: 0, revenueTarget: 13200.00 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 6, revenue: 0, revenueTarget: 13200.00 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 6, revenue: 0, revenueTarget: 13200.00 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 6, revenue: 0, revenueTarget: 13200.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 6, revenue: 0, revenueTarget: 13200.00 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 8, revenue: 0, revenueTarget: 17600.00 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 8, revenue: 0, revenueTarget: 17600.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 22000.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 22000.00 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 22000.00 },
    ]
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
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 1935, revenue: 0, revenueTarget: 18963.00 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 1909, revenue: 0, revenueTarget: 18708.20 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 1887, revenue: 0, revenueTarget: 18492.60 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 1869, revenue: 0, revenueTarget: 18316.20 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 1807, revenue: 0, revenueTarget: 17708.60 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 1775, revenue: 0, revenueTarget: 17395.00 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 1759, revenue: 0, revenueTarget: 17238.20 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 1753, revenue: 0, revenueTarget: 17179.40 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 1760, revenue: 0, revenueTarget: 17248.00 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 1731, revenue: 0, revenueTarget: 16963.80 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 1714, revenue: 0, revenueTarget: 16797.20 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 1743, revenue: 0, revenueTarget: 17085.32 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 1599, revenue: 0, revenueTarget: 12699.60 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 3156, revenue: 0, revenueTarget: 24532.80 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 1460, revenue: 0, revenueTarget: 11643.20 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 1409, revenue: 0, revenueTarget: 11255.60 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 1396, revenue: 0, revenueTarget: 11156.80 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 1364, revenue: 0, revenueTarget: 10913.60 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 1454, revenue: 0, revenueTarget: 11597.60 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 1399, revenue: 0, revenueTarget: 11179.60 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 1377, revenue: 0, revenueTarget: 11012.40 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 1468, revenue: 0, revenueTarget: 11704.00 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 1459, revenue: 0, revenueTarget: 11635.60 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 1431, revenue: 0, revenueTarget: 11425.84 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1735731.47 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1734946.27 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1688883.84 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1837889.74 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1712403.33 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1714518.02 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1744649.30 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1742194.66 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1790546.29 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1741712.36 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 1677052.87 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 0, revenue: 0, revenueTarget: 0 },
    ]
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
    monthlyData: [
      { month: 'Janeiro', shortMonth: 'Jan', quantity: 0, quantityTarget: 3, revenue: 0, revenueTarget: 0 },
      { month: 'Fevereiro', shortMonth: 'Fev', quantity: 0, quantityTarget: 5, revenue: 0, revenueTarget: 0 },
      { month: 'Março', shortMonth: 'Mar', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Abril', shortMonth: 'Abr', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Maio', shortMonth: 'Mai', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Junho', shortMonth: 'Jun', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Julho', shortMonth: 'Jul', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Agosto', shortMonth: 'Ago', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Setembro', shortMonth: 'Set', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Outubro', shortMonth: 'Out', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Novembro', shortMonth: 'Nov', quantity: 0, quantityTarget: 10, revenue: 0, revenueTarget: 0 },
      { month: 'Dezembro', shortMonth: 'Dez', quantity: 0, quantityTarget: 5, revenue: 0, revenueTarget: 0 },
    ]
  },
];

// ====================================
// EVOLUÇÃO DE RECEITA
// ====================================

const revenueEvolution2025: RevenueEvolutionData[] = [
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

// ====================================
// DADOS FINANCEIROS
// ====================================

const financialData2025: FinancialData = {
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

// ====================================
// CAPTAÇÃO DE ASSOCIADOS
// ====================================

const captacaoData2025: CaptacaoData = {
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
  ]
};

const captacaoData2026: CaptacaoData = {
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
  monthlyData: [
    { month: 'Janeiro', shortMonth: 'Jan', captacao: 0, target: 72 },
    { month: 'Fevereiro', shortMonth: 'Fev', captacao: 0, target: 72 },
    { month: 'Março', shortMonth: 'Mar', captacao: 0, target: 72 },
    { month: 'Abril', shortMonth: 'Abr', captacao: 0, target: 72 },
    { month: 'Maio', shortMonth: 'Mai', captacao: 0, target: 72 },
    { month: 'Junho', shortMonth: 'Jun', captacao: 0, target: 72 },
    { month: 'Julho', shortMonth: 'Jul', captacao: 0, target: 72 },
    { month: 'Agosto', shortMonth: 'Ago', captacao: 0, target: 72 },
    { month: 'Setembro', shortMonth: 'Set', captacao: 0, target: 72 },
    { month: 'Outubro', shortMonth: 'Out', captacao: 0, target: 72 },
    { month: 'Novembro', shortMonth: 'Nov', captacao: 0, target: 72 },
    { month: 'Dezembro', shortMonth: 'Dez', captacao: 0, target: 72 },
  ]
};

// ====================================
// CLIENTES
// ====================================

const customerData2025: CustomerData = {
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

// ====================================
// PESSOAS
// ====================================

const peopleData2025: PeopleData = {
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

// ====================================
// ESG
// ====================================

const esgData2025: ESGData = {
  lixoEletronico: 2.5,
  lixoEletronicoTarget: 5.0,
  acoesSociais: 6,
  acoesSociaisTarget: 12,
  projetosESG: 3,
  projetosESGTarget: 5,
  politicaESG: 'in_progress',
};

// ====================================
// PROCESSOS
// ====================================

const processesData2025: ProcessesData = {
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

// ====================================
// OKRs - PLANEJAMENTO ESTRATÉGICO 2026
// ====================================

const okrsData: OKRData[] = [
  // PERSPECTIVA FINANCEIRA
  {
    id: 'f1',
    objective: 'F1. Assegurar a Solidez Financeira',
    perspective: 'financial',
    responsible: 'Karla',
    status: 'warning',
    keyResults: [
      { id: 'kr1', description: 'Reduzir a Inadimplência', target: '< 6%', current: '8.5%', progress: 41, status: 'danger' },
      { id: 'kr2', description: 'Aumentar a Pontualidade', target: '90%', current: '82%', progress: 91, status: 'warning' },
      { id: 'kr3', description: 'EBITDA', target: '10%', current: '8.2%', progress: 82, status: 'warning' },
      { id: 'kr4', description: 'Margem Líquida', target: '10%', current: '7.5%', progress: 75, status: 'warning' },
      { id: 'kr5', description: 'Margem de Contribuição', target: '55%', current: '48%', progress: 87, status: 'warning' },
    ]
  },
  {
    id: 'f2',
    objective: 'F2. Elevar o Faturamento com Diversificação das Receitas',
    perspective: 'financial',
    responsible: 'Wanderson / Juliana',
    status: 'warning',
    keyResults: [
      { id: 'kr6', description: 'Aumentar o faturamento total em 12% vs 2025', target: '12%', current: '0%', progress: 0, status: 'danger' },
      { id: 'kr7', description: 'Aumentar a base de associados ativos em 15%', target: '15%', current: '0%', progress: 0, status: 'danger' },
      { id: 'kr8', description: 'Aumentar a adesão do Zera Dívidas (75 associados)', target: '75', current: '7', progress: 9, status: 'danger' },
      { id: 'kr9', description: 'Aumentar associados no Plano de Benefícios para 50%', target: '50%', current: '25%', progress: 50, status: 'warning' },
    ]
  },
  {
    id: 'f3',
    objective: 'F3. Promover a Eficiência Operacional e Financeira',
    perspective: 'financial',
    responsible: 'Fábio / Karla',
    status: 'warning',
    keyResults: [
      { id: 'kr10', description: 'Implementar 5 ações de integração e otimização sistêmica', target: '5', current: '2', progress: 40, status: 'danger' },
      { id: 'kr11', description: 'Reduzir tempo médio de faturamento para ≤ 2 dias úteis', target: '2 dias', current: '4 dias', progress: 50, status: 'warning' },
    ]
  },
  // PERSPECTIVA CLIENTES
  {
    id: 'c5',
    objective: 'C5. Promover Excelente Experiência e Fidelização do Associado',
    perspective: 'customers',
    responsible: 'Equipe CS',
    status: 'warning',
    keyResults: [
      { id: 'kr12', description: 'Elevar NPS para 95%', target: '95%', current: '78%', progress: 82, status: 'warning' },
      { id: 'kr13', description: 'Resolver 85% das demandas no primeiro contato (FCR)', target: '85%', current: '72%', progress: 85, status: 'warning' },
      { id: 'kr14', description: 'Reduzir Cancelamento anual em 20%', target: '20%', current: '12%', progress: 60, status: 'warning' },
    ]
  },
  {
    id: 'c7',
    objective: 'C7. Melhorar o Processo de Captação de Associados',
    perspective: 'customers',
    responsible: 'Wanderson',
    status: 'warning',
    keyResults: [
      { id: 'kr20', description: 'Garantir taxa de conversão de leads 20%', target: '20%', current: '28.25%', progress: 100, status: 'success' },
      { id: 'kr28', description: 'Mapear e documentar 100% do funil', target: '100%', current: '60%', progress: 60, status: 'warning' },
      { id: 'kr33', description: 'Mínimo de 10 captações/mês pela equipe SPC', target: '120/ano', current: '80', progress: 67, status: 'warning' },
    ]
  },
  // PERSPECTIVA PROCESSOS
  {
    id: 'p13',
    objective: 'P13. Contar com Processos Atualizados, Virtualizados e Digitalizados',
    perspective: 'processes',
    responsible: 'Fábio / Hélia',
    status: 'warning',
    keyResults: [
      { id: 'kr57', description: 'Definir donos para 100% dos processos críticos', target: '100%', current: '60%', progress: 60, status: 'warning' },
      { id: 'kr59', description: 'Mapear 100% dos processos-chave', target: '100%', current: '45%', progress: 45, status: 'danger' },
      { id: 'kr60', description: 'Reduzir retrabalho em 20%', target: '20%', current: '8%', progress: 40, status: 'danger' },
    ]
  },
  // PERSPECTIVA APRENDIZADO
  {
    id: 'ac14',
    objective: 'AC14. Promover Capacitação e Aprimoramento dos Colaboradores',
    perspective: 'learning',
    responsible: 'Lívia / Hélia',
    status: 'warning',
    keyResults: [
      { id: 'kr65', description: 'Atingir 80% dos colaboradores treinados', target: '80%', current: '65%', progress: 81, status: 'warning' },
      { id: 'kr66', description: 'Capacitar 100% dos líderes na Trilha proposta', target: '100%', current: '70%', progress: 70, status: 'warning' },
      { id: 'kr64', description: 'Atingir 85% de satisfação com treinamentos', target: '85%', current: '78%', progress: 92, status: 'warning' },
    ]
  },
  {
    id: 'ac15',
    objective: 'AC15. Impulsionar Resultados por meio de Liderança',
    perspective: 'learning',
    responsible: 'Lívia / Hélia',
    status: 'warning',
    keyResults: [
      { id: 'kr67', description: 'Implantar reunião de área mensal em 100% das áreas', target: '100%', current: '67%', progress: 67, status: 'warning' },
      { id: 'kr70', description: 'Aplicar DISC em 100% dos líderes', target: '100%', current: '30%', progress: 30, status: 'danger' },
      { id: 'kr72', description: 'Aplicar 4 pesquisas pulso no ano', target: '4', current: '2', progress: 50, status: 'warning' },
    ]
  },
  // ESG
  {
    id: 'esg17',
    objective: 'ESG17. Atuação da CDL no âmbito Ambiental, Social e Governança',
    perspective: 'esg',
    responsible: 'Serviços Gerais / Hélia',
    status: 'warning',
    keyResults: [
      { id: 'kr78', description: 'Coleta de 5 toneladas de lixo eletrônico', target: '5 ton', current: '2.5 ton', progress: 50, status: 'warning' },
    ]
  },
];

// ====================================
// EXPORT DAS FUNÇÕES DE ACESSO
// ====================================

export function getServicesData(year: '2025' | '2026'): ServiceData[] {
  return year === '2025' ? servicesData2025 : servicesData2026;
}

export function getRevenueEvolution(): RevenueEvolutionData[] {
  return revenueEvolution2025;
}

export function getFinancialData(): FinancialData {
  return financialData2025;
}

export function getCaptacaoData(year: '2025' | '2026'): CaptacaoData {
  return year === '2025' ? captacaoData2025 : captacaoData2026;
}

export function getCustomerData(): CustomerData {
  return customerData2025;
}

export function getPeopleData(): PeopleData {
  return peopleData2025;
}

export function getESGData(): ESGData {
  return esgData2025;
}

export function getProcessesData(): ProcessesData {
  return processesData2025;
}

export function getOKRsData(): OKRData[] {
  return okrsData;
}

export function getOKRsByPerspective(perspective: OKRData['perspective']): OKRData[] {
  return okrsData.filter(okr => okr.perspective === perspective);
}
