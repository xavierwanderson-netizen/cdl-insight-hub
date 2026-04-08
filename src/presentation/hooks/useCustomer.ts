import { useQuery } from '@tanstack/react-query';
import { CustomerData } from '../../domain/types/common';
import { CustomerRepository } from '../../data/repositories/CustomerRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { CustomerMapper } from '../../data/mappers/CustomerMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const customerRepository = new CustomerRepository(new GoogleSheetsClient(), new CustomerMapper());

export function useCustomer(options?: { enabled?: boolean }) {
  return useQuery<CustomerData | null, Error>({
    queryKey: ['customer'],
    queryFn: () => customerRepository.getAll(),
    enabled: options?.enabled ?? true,
    ...REACT_QUERY_CONFIG,
  });
}
