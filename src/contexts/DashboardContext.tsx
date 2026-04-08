import React, { createContext, useContext, useState, ReactNode } from 'react';

export type YearType = '2025' | '2026';
export type MonthType = 'all' | 'jan' | 'fev' | 'mar' | 'abr' | 'mai' | 'jun' | 'jul' | 'ago' | 'set' | 'out' | 'nov' | 'dez';

interface DashboardContextType {
  year: YearType;
  setYear: (year: YearType) => void;
  month: MonthType;
  setMonth: (month: MonthType) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [year, setYear] = useState<YearType>('2026');
  const [month, setMonth] = useState<MonthType>('all');

  const value: DashboardContextType = {
    year,
    setYear,
    month,
    setMonth,
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
