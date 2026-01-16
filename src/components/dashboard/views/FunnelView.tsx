import { FunnelChart } from '../FunnelChart';
import { KPICard } from '../KPICard';
import type { StatusType, TrendType } from '@/data/dashboardData';
import type { KPIData } from '@/data/dashboardData';
import type { FunnelStage } from '@/data/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCaptacaoData } from '@/hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

const channelColors = [
  'hsl(222, 65%, 35%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 80%, 55%)',
  'hsl(12, 90%, 55%)',
];

export function FunnelView() {
  const { data: captacaoData, isLoading } = useCaptacaoData('2026');

  // KPIs dinâmicos baseados nos dados reais de captação
  const funnelKPIs: KPIData[] = [
    {
      id: 'taxa-conversao',
      label: 'Taxa de Conversão',
      value: captacaoData.taxaConversao,
      target: captacaoData.taxaConversaoTarget,
      unit: '%',
      status: captacaoData.taxaConversao >= captacaoData.taxaConversaoTarget ? 'success' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: captacaoData.taxaConversao > 0 ? `${captacaoData.taxaConversao.toFixed(0)}%` : 'A iniciar',
      description: 'KR20: Meta 20%',
    },
    {
      id: 'captacao-mensal',
      label: 'Novos Associados',
      value: captacaoData.novosAssociados,
      target: captacaoData.novosAssociadosTarget,
      status: captacaoData.novosAssociados >= captacaoData.novosAssociadosTarget * 0.5 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${captacaoData.novosAssociadosTarget}`,
      description: 'Captação 2026',
    },
    {
      id: 'leads-qualificados',
      label: 'Leads Qualificados',
      value: captacaoData.leadsQualificados,
      target: captacaoData.leadsQualificadosTarget,
      status: captacaoData.leadsQualificados >= captacaoData.leadsQualificadosTarget * 0.5 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${captacaoData.leadsQualificadosTarget}`,
    },
    {
      id: 'leads-total',
      label: 'Total de Leads',
      value: captacaoData.leads,
      target: captacaoData.leadsTarget,
      status: captacaoData.leads >= captacaoData.leadsTarget * 0.5 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${captacaoData.leadsTarget}`,
      description: 'Entrada do funil',
    },
  ];

  // Funil de vendas dinâmico
  const salesFunnel: FunnelStage[] = [
    { id: 'leads', name: 'Leads', value: captacaoData.leads, target: captacaoData.leadsTarget, percentage: 100, color: 'hsl(222, 65%, 35%)' },
    { id: 'qualificados', name: 'Qualificados', value: captacaoData.leadsQualificados, target: captacaoData.leadsQualificadosTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.leadsQualificadosTarget / captacaoData.leadsTarget) * 100 : 40, color: 'hsl(38, 92%, 50%)' },
    { id: 'propostas', name: 'Propostas', value: captacaoData.propostas, target: captacaoData.propostasTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.propostasTarget / captacaoData.leadsTarget) * 100 : 32, color: 'hsl(142, 71%, 45%)' },
    { id: 'novos', name: 'Novos Associados', value: captacaoData.novosAssociados, target: captacaoData.novosAssociadosTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.novosAssociadosTarget / captacaoData.leadsTarget) * 100 : 28.8, color: 'hsl(262, 80%, 55%)' },
  ];

  // Captação por canal (dados estáticos por enquanto - pode ser conectado a planilha futura)
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

      {/* Key Results */}
      <div className="dashboard-card p-6 animate-fade-in">
        <h3 className="font-display font-semibold text-lg mb-4">Key Results - Captação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'kr28', desc: 'Mapear e documentar 100% do funil', target: '100%', current: '30%', status: 'warning' },
            { id: 'kr29', desc: `Taxa de conversão de leads ${captacaoData.taxaConversaoTarget}%`, target: `${captacaoData.taxaConversaoTarget}%`, current: `${captacaoData.taxaConversao.toFixed(0)}%`, status: captacaoData.taxaConversao >= captacaoData.taxaConversaoTarget ? 'success' : 'danger' },
            { id: 'kr30', desc: 'Automação de nutrição para 100% leads', target: '100%', current: '0%', status: 'danger' },
            { id: 'kr31', desc: 'Converter 25% dos leads de eventos', target: '25%', current: '20%', status: 'warning' },
            { id: 'kr32', desc: 'Converter 30% leads por indicação', target: '30%', current: '25%', status: 'warning' },
            { id: 'kr34', desc: 'Crescer base NDL Aparecida em 20%', target: '20%', current: '5%', status: 'danger' },
          ].map((kr) => (
            <div 
              key={kr.id}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">{kr.id}</span>
                <span className={`status-badge ${kr.status}`}>
                  {kr.status === 'success' ? 'No alvo' : kr.status === 'warning' ? 'Atenção' : 'Crítico'}
                </span>
              </div>
              <p className="text-sm font-medium mb-2">{kr.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Atual: {kr.current}</span>
                <span className="font-semibold">Meta: {kr.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
