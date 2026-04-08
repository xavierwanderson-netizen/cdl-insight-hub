import { useQuery } from '@tanstack/react-query';
import { OKRData } from '../../domain/types/common';
import { OKRRepository } from '../../data/repositories/OKRRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { OKRMapper } from '../../data/mappers/OKRMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const okrRepository = new OKRRepository(new GoogleSheetsClient(), new OKRMapper());

export function useOKR(options?: { enabled?: boolean }) {
  return useQuery<OKRData[] | null, Error>({
    queryKey: ['okrs'],
    queryFn: () => okrRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
