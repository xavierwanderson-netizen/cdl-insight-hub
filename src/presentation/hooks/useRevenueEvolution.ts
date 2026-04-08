import { useQuery } from '@tanstack/react-query';
import { RevenueEvolutionData } from '../../domain/types/common';
import { RevenueEvolutionRepository } from '../../data/repositories/RevenueEvolutionRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { RevenueEvolutionMapper } from '../../data/mappers/RevenueEvolutionMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const revenueRepository = new RevenueEvolutionRepository(new GoogleSheetsClient(), new RevenueEvolutionMapper());

export function useRevenueEvolution(options?: { enabled?: boolean }) {
  return useQuery<RevenueEvolutionData[] | null, Error>({
    queryKey: ['revenueEvolution'],
    queryFn: () => revenueRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
