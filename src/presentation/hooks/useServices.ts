/**
 * Hook: useServices
 * Busca dados de serviços com React Query
 * - Cache otimizado
 * - Refetch automático a cada 5 minutos
 * - Retry com backoff
 * - Window focus refetch
 */

import { useQuery } from '@tanstack/react-query';
import { ServiceData } from '../../domain/types/common';
import { ServicesRepository } from '../../data/repositories/ServicesRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { ServiceMapper } from '../../data/mappers/ServiceMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

// Instância singleton
const servicesRepository = new ServicesRepository(
  new GoogleSheetsClient(),
  new ServiceMapper()
);

interface UseServicesOptions {
  year?: '2025' | '2026';
  enabled?: boolean;
}

export function useServices(options: UseServicesOptions = {}) {
  const { year, enabled = true } = options;

  return useQuery<ServiceData[] | null, Error>({
    queryKey: ['services', year],
    queryFn: () => servicesRepository.getAll(year),
    enabled,
    ...REACT_QUERY_CONFIG,
  });
}

/**
 * Hook para buscar serviço específico por ID
 */
export function useService(id: string) {
  return useQuery<ServiceData | null, Error>({
    queryKey: ['service', id],
    queryFn: () => servicesRepository.getById(id),
    ...REACT_QUERY_CONFIG,
  });
}

/**
 * Hook para buscar serviços por nome
 */
export function useSearchServices(query: string) {
  return useQuery<ServiceData[] | null, Error>({
    queryKey: ['services-search', query],
    queryFn: () => servicesRepository.searchByName(query),
    enabled: query.length > 0,
    ...REACT_QUERY_CONFIG,
  });
}
