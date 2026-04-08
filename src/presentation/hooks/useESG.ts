import { useQuery } from '@tanstack/react-query';
import { ESGData } from '../../domain/types/common';
import { ESGRepository } from '../../data/repositories/ESGRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { ESGMapper } from '../../data/mappers/ESGMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const esgRepository = new ESGRepository(new GoogleSheetsClient(), new ESGMapper());

export function useESG(options?: { enabled?: boolean }) {
  return useQuery<ESGData | null, Error>({
    queryKey: ['esg'],
    queryFn: () => esgRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
