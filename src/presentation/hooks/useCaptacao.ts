import { useQuery } from '@tanstack/react-query';
import { CaptacaoData } from '../../domain/types/common';
import { CaptacaoRepository } from '../../data/repositories/CaptacaoRepository';
import { GoogleSheetsClient } from '../../data/googleSheets/GoogleSheetsClient';
import { CaptacaoMapper } from '../../data/mappers/CaptacaoMapper';
import { REACT_QUERY_CONFIG } from '../../shared/constants';

const captacaoRepository = new CaptacaoRepository(new GoogleSheetsClient(), new CaptacaoMapper());

export function useCaptacao(options?: { year?: '2025' | '2026'; enabled?: boolean }) {
  const { year = '2026', enabled = true } = options || {};
  return useQuery<CaptacaoData | null, Error>({
    queryKey: ['captacao', year],
    queryFn: () => captacaoRepository.getAll(year),
    enabled,
    ...REACT_QUERY_CONFIG,
  });
}
