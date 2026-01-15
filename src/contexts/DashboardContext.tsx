import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { ServiceData, FinancialData, CustomerData, CaptacaoData, PeopleData, ESGData, ProcessesData, RevenueEvolutionData, OKRData } from '@/data/types';
import { 
  parseServicesData, 
  parseFinancialData, 
  parseRevenueEvolution,
  parseCaptacaoData,
  parseCustomerData,
  parsePeopleData,
  parseESGData,
  parseProcessesData,
} from '@/services/dataAdapters';
import { getOKRsData } from '@/data/realData';
import { useServicesData, useFinancialData, useRevenueEvolution, useCaptacaoData, useCustomerData, usePeopleData, useESGData, useProcessesData } from '@/hooks/useDashboardData';

// Month mapping helper
function getMonthName(monthCode: string): string {
  const monthMap: { [key: string]: string } = {
    'jan': 'Janeiro',
    'fev': 'Fevereiro',
    'mar': 'Março',
    'abr': 'Abril',
    'mai': 'Maio',
    'jun': 'Junho',
    'jul': 'Julho',
    'ago': 'Agosto',
    'set': 'Setembro',
    'out': 'Outubro',
    'nov': 'Novembro',
    'dez': 'Dezembro',
  };
  return monthMap[monthCode] || '';
}

export type YearType = '2025' | '2026';
export type MonthType = 'all' | 'jan' | 'fev' | 'mar' | 'abr' | 'mai' | 'jun' | 'jul' | 'ago' | 'set' | 'out' | 'nov' | 'dez';

interface DashboardContextType {
  year: YearType;
  setYear: (year: YearType) => void;
  month: MonthType;
  setMonth: (month: MonthType) => void;
  services: ServiceData[];
  financial: FinancialData;
  revenueEvolution: RevenueEvolutionData[];
  captacao: CaptacaoData;
  customers: CustomerData;
  people: PeopleData;
  esg: ESGData;
  processes: ProcessesData;
  okrs: OKRData[];
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [year, setYear] = useState<YearType>('2026');
  const [month, setMonth] = useState<MonthType>('all');

  // Fetch data from Google Sheets
  const servicesQuery = useServicesData(year);
  const financialQuery = useFinancialData();
  const revenueQuery = useRevenueEvolution();
  const captacaoQuery = useCaptacaoData(year);
  const customersQuery = useCustomerData();
  const peopleQuery = usePeopleData();
  const esgQuery = useESGData();
  const processesQuery = useProcessesData();

  // Helper function to filter service data by month
  const filterServicesByMonth = (services: ServiceData[], selectedMonth: MonthType): ServiceData[] => {
    if (selectedMonth === 'all') return services;
    
    return services.map(service => {
      const monthlyData = service.monthlyData || [];
      const monthName = getMonthName(selectedMonth);
      const filteredMonth = monthlyData.find(m => m.month === monthName);
      
      if (filteredMonth) {
        return {
          ...service,
          quantity: filteredMonth.quantity,
          quantityTarget: filteredMonth.quantityTarget,
          revenue: filteredMonth.revenue,
          revenueTarget: filteredMonth.revenueTarget,
          monthlyData: [filteredMonth],
        };
      }
      return service;
    });
  };

  // Apply month filter to services
  const services = useMemo(() => 
    filterServicesByMonth(servicesQuery.data, month),
    [servicesQuery.data, month]
  );

  // Check if any query is loading
  const isLoading = servicesQuery.isLoading || financialQuery.isLoading || 
                   revenueQuery.isLoading || captacaoQuery.isLoading ||
                   customersQuery.isLoading || peopleQuery.isLoading ||
                   esgQuery.isLoading || processesQuery.isLoading;

  const value: DashboardContextType = {
    year,
    setYear,
    month,
    setMonth,
    services,
    financial: financialQuery.data,
    revenueEvolution: revenueQuery.data,
    captacao: captacaoQuery.data,
    customers: customersQuery.data,
    people: peopleQuery.data,
    esg: esgQuery.data,
    processes: processesQuery.data,
    okrs: getOKRsData(),
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
