import { useQuery } from '@tanstack/react-query';
import { PeopleData } from '../../domain/types/common';
import { PeopleRepository } from '../../data/repositories/PeopleRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { PeopleMapper } from '../../data/mappers/PeopleMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const peopleRepository = new PeopleRepository(new GoogleSheetsClient(), new PeopleMapper());

export function usePeople(options?: { enabled?: boolean }) {
  return useQuery<PeopleData | null, Error>({
    queryKey: ['people'],
    queryFn: () => peopleRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
