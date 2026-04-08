import { useQuery } from '@tanstack/react-query';
import { FinancialData } from '../../domain/types/common';
import { FinancialRepository } from '../../data/repositories/FinancialRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { FinancialMapper } from '../../data/mappers/FinancialMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const financialRepository = new FinancialRepository(new GoogleSheetsClient(), new FinancialMapper());

export function useFinancial(options?: { enabled?: boolean }) {
  return useQuery<FinancialData | null, Error>({
    queryKey: ['financial'],
    queryFn: () => financialRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
