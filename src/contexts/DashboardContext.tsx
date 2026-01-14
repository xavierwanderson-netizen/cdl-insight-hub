import React, { createContext, useContext, useState, ReactNode } from 'react';
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

export type YearType = '2025' | '2026';

interface DashboardContextType {
  year: YearType;
  setYear: (year: YearType) => void;
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
  const [isLoading] = useState(false);

  // Get data based on selected year
  const services = parseServicesData([], [], year);
  const financial = parseFinancialData();
  const revenueEvolution = parseRevenueEvolution();
  const captacao = parseCaptacaoData(year);
  const customers = parseCustomerData();
  const people = parsePeopleData();
  const esg = parseESGData();
  const processes = parseProcessesData();
  const okrs = getOKRsData();

  const value: DashboardContextType = {
    year,
    setYear,
    services,
    financial,
    revenueEvolution,
    captacao,
    customers,
    people,
    esg,
    processes,
    okrs,
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
