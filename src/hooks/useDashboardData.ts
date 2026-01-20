import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, SHEET_IDS } from '@/services/googleSheets';
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
import type { ServiceData, FinancialData, RevenueEvolutionData, CaptacaoData, CustomerData, PeopleData, ESGData, ProcessesData } from '@/data/types';

// Stale time: 5 minutos - dados mudam poucas vezes ao dia
const STALE_TIME = 5 * 60 * 1000;

// Refetch interval: 5 minutos - polling otimizado para economia de requisições
const REFETCH_INTERVAL = 5 * 60 * 1000;

// Retry configuration
const RETRY_CONFIG = {
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
};

// Hook para buscar dados brutos das planilhas
export function useSheetData(sheetId: string, gid: number = 0) {
  return useQuery({
    queryKey: ['sheet', sheetId, gid],
    queryFn: () => fetchSheetData(sheetId, gid),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });
}

// Hook para buscar dados de serviços (query única otimizada)
export function useServicesData(year: '2025' | '2026') {
  const query = useQuery({
    queryKey: ['sheet-services', SHEET_IDS.SERVICOS_2025_2026],
    queryFn: () => fetchSheetData(SHEET_IDS.SERVICOS_2025_2026),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: false,
    ...RETRY_CONFIG,
  });

  // Use parsed data with fallback to pre-extracted data
  const services: ServiceData[] = parseServicesData(
    query.data || [], 
    query.data || [], 
    year
  );

  return {
    data: services,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// Hook para dados financeiros
export function useFinancialData() {
  const query = useQuery({
    queryKey: ['financial-data'],
    queryFn: async (): Promise<FinancialData> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parseFinancialData(data);
      } catch (error) {
        console.error('Failed to fetch financial data:', error);
        return parseFinancialData();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseFinancialData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para evolução de receita
export function useRevenueEvolution() {
  const query = useQuery({
    queryKey: ['revenue-evolution'],
    queryFn: async (): Promise<RevenueEvolutionData[]> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.EVOLUCAO_RECEITA);
        return parseRevenueEvolution(data);
      } catch (error) {
        console.error('Failed to fetch revenue evolution:', error);
        return parseRevenueEvolution();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseRevenueEvolution(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para dados de captação - busca da planilha FUNIL_VENDAS
export function useCaptacaoData(year: '2025' | '2026') {
  const query = useQuery({
    queryKey: ['captacao-data', year],
    queryFn: async (): Promise<CaptacaoData> => {
      try {
        // Buscar dados da planilha correta: FUNIL_VENDAS
        const data = await fetchSheetData(SHEET_IDS.FUNIL_VENDAS);
        console.log(`[useCaptacaoData] Dados do funil carregados: ${data.length} linhas`);
        return parseCaptacaoData(year, data);
      } catch (error) {
        console.error('Failed to fetch captacao data:', error);
        return parseCaptacaoData(year);
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseCaptacaoData(year),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para dados de clientes
export function useCustomerData() {
  const query = useQuery({
    queryKey: ['customer-data'],
    queryFn: async (): Promise<CustomerData> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parseCustomerData(data);
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
        return parseCustomerData();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseCustomerData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para dados de pessoas
export function usePeopleData() {
  const query = useQuery({
    queryKey: ['people-data'],
    queryFn: async (): Promise<PeopleData> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parsePeopleData(data);
      } catch (error) {
        console.error('Failed to fetch people data:', error);
        return parsePeopleData();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parsePeopleData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para dados ESG
export function useESGData() {
  const query = useQuery({
    queryKey: ['esg-data'],
    queryFn: async (): Promise<ESGData> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parseESGData(data);
      } catch (error) {
        console.error('Failed to fetch ESG data:', error);
        return parseESGData();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseESGData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// Hook para dados de processos
export function useProcessesData() {
  const query = useQuery({
    queryKey: ['processes-data'],
    queryFn: async (): Promise<ProcessesData> => {
      try {
        const data = await fetchSheetData(SHEET_IDS.KPIS_INDICADORES);
        return parseProcessesData(data);
      } catch (error) {
        console.error('Failed to fetch processes data:', error);
        return parseProcessesData();
      }
    },
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    ...RETRY_CONFIG,
  });

  return {
    data: query.data || parseProcessesData(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
