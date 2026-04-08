import { useQuery } from '@tanstack/react-query';
import { ProcessesData } from '../../domain/types/common';
import { ProcessesRepository } from '../../data/repositories/ProcessesRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { ProcessesMapper } from '../../data/mappers/ProcessesMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const processesRepository = new ProcessesRepository(new GoogleSheetsClient(), new ProcessesMapper());

export function useProcesses(options?: { enabled?: boolean }) {
  return useQuery<ProcessesData | null, Error>({
    queryKey: ['processes'],
    queryFn: () => processesRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
