import { FunnelChart } from '../FunnelChart';
import { KPICard } from '../KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Loader2 } from 'recharts';
import { useCaptacao, useKPIStatus, useKPITrend } from '@/presentation/hooks';
import type { KPIData, StatusType } from '@/domain/types/common';
import type { FunnelStage } from '@/data/types';

const channelColors = [
  'hsl(222, 65%, 35%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 80%, 55%)',
  'hsl(12, 90%, 55%)',
];

export function FunnelView() {
  const { data: captacaoData, isLoading, error } = useCaptacao();

  const taxaStatus = useKPIStatus(
    captacaoData?.taxaConversao ?? null,
    captacaoData?.taxaConversaoTarget ?? null,
    'customers'
  );
  const taxaTrend = useKPITrend(
    captacaoData?.taxaConversao ?? null,
    captacaoData?.taxaConversaoTarget ?? null
  );

  const novosStatus = useKPIStatus(
    captacaoData?.novosAssociados ?? null,
    captacaoData?.novosAssociadosTarget ?? null,
    'customers'
  );
  const novosTrend = useKPITrend(
    captacaoData?.novosAssociados ?? null,
    (captacaoData?.novosAssociadosTarget ?? 0) * 0.5
  );

  const qualificadosStatus = useKPIStatus(
    captacaoData?.leadsQualificados ?? null,
    captacaoData?.leadsQualificadosTarget ?? null,
    'customers'
  );

  const leadsStatus = useKPIStatus(
    captacaoData?.leads ?? null,
    captacaoData?.leadsTarget ?? null,
    'customers'
  );

  const funnelKPIs: KPIData[] = !captacaoData ? [] : [
    {
      id: 'taxa-conversao',
      label: 'Taxa de Conversão',
      value: captacaoData.taxaConversao,
      target: captacaoData.taxaConversaoTarget,
      unit: '%',
      status: taxaStatus,
      trend: taxaTrend.trend,
      trendValue: taxaTrend.formatted,
      description: 'KR20: Meta 20%',
    },
    {
      id: 'captacao-mensal',
      label: 'Novos Associados',
      value: captacaoData.novosAssociados,
      target: captacaoData.novosAssociadosTarget,
      status: novosStatus,
      trend: novosTrend.trend,
      trendValue: novosTrend.formatted,
      description: 'Captação 2026',
    },
    {
      id: 'leads-qualificados',
      label: 'Leads Qualificados',
      value: captacaoData.leadsQualificados,
      target: captacaoData.leadsQualificadosTarget,
      status: qualificadosStatus,
      trend: 'up',
      trendValue: `Meta: ${captacaoData.leadsQualificadosTarget}`,
    },
    {
      id: 'leads-total',
      label: 'Total de Leads',
      value: captacaoData.leads,
      target: captacaoData.leadsTarget,
      status: leadsStatus,
      trend: 'up',
      trendValue: `Meta: ${captacaoData.leadsTarget}`,
      description: 'Entrada do funil',
    },
  ];

  const leadsTotal = captacaoData?.leads ?? 1;
  const salesFunnel: FunnelStage[] = !captacaoData ? [] : [
    { id: 'leads', name: 'Leads', value: captacaoData.leads, target: captacaoData.leadsTarget, percentage: 100, color: 'hsl(222, 65%, 35%)' },
    { id: 'qualificados', name: 'Qualificados', value: captacaoData.leadsQualificados, target: captacaoData.leadsQualificadosTarget, percentage: (captacaoData.leadsQualificados / leadsTotal) * 100, color: 'hsl(38, 92%, 50%)' },
    { id: 'propostas', name: 'Propostas', value: captacaoData.propostas, target: captacaoData.propostasTarget, percentage: (captacaoData.propostas / leadsTotal) * 100, color: 'hsl(142, 71%, 45%)' },
    { id: 'novos', name: 'Novos Associados', value: captacaoData.novosAssociados, target: captacaoData.novosAssociadosTarget, percentage: (captacaoData.novosAssociados / leadsTotal) * 100, color: 'hsl(262, 80%, 55%)' },
  ];

  const captureByChannel = [
    { channel: 'Eventos', value: 120, target: 180 },
    { channel: 'Indicação', value: 150, target: 200 },
    { channel: 'SPC', value: 80, target: 120 },
    { channel: 'Campanhas', value: 100, target: 150 },
    { channel: 'Outros', value: 115, target: 214 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados do funil...</span>
      </div>
    );
  }

  if (error || !captacaoData) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados de captação</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Captação de Associados & Funil Comercial</h2>
        <p className="text-muted-foreground mt-1">Objetivo C7 - Máquina de Captação</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {funnelKPIs.map((kpi, index) => (
          <KPICard key={kpi.id} data={kpi} delay={index * 100} />
        ))}
      </div>

      {/* Funnel and Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart data={salesFunnel} />
        
        {/* Capture by Channel */}
        <div className="dashboard-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-display font-semibold text-lg mb-4">Captação por Canal</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={captureByChannel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="channel" 
                  tick={{ fontSize: 11 }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="target" name="Meta" fill="hsl(var(--chart-1))" opacity={0.3} radius={[4, 4, 0, 0]} />
                <Bar dataKey="value" name="Realizado" radius={[4, 4, 0, 0]}>
                  {captureByChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={channelColors[index % channelColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Taxa Conversão Geral</p>
              <p className="text-xl font-bold font-display">{captacaoData.taxaConversao.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Meta: {captacaoData.taxaConversaoTarget}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Propostas Enviadas</p>
              <p className="text-xl font-bold font-display">{captacaoData.propostas}</p>
              <p className="text-xs text-muted-foreground">Meta: {captacaoData.propostasTarget}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
