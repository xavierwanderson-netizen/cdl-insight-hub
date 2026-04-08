import { KPICard } from '../KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useFinancial, useServices, useKPIStatus, useKPITrend } from '@/presentation/hooks';
import { formatCurrency } from '@/shared/utils/parsing';
import type { KPIData, StatusType } from '@/domain/types/common';

export function FinancialView() {
  const { data: financialData, isLoading: loadingFinancial, error: errorFinancial } = useFinancial();
  const { data: servicesData, isLoading: loadingServices, error: errorServices } = useServices('2026');

  const isLoading = loadingFinancial || loadingServices;
  const error = errorFinancial || errorServices;

  // Hooks para cálculos de KPI
  const inadimplenciaStatus = useKPIStatus(
    financialData?.inadimplencia ?? null,
    financialData?.inadimplenciaTarget ?? null,
    'financial'
  );
  const inadimplenciaTrend = useKPITrend(
    financialData?.inadimplencia ?? null,
    financialData?.inadimplenciaTarget ?? null
  );

  const pontualidadeStatus = useKPIStatus(
    financialData?.pontualidade ?? null,
    financialData?.pontualidadeTarget ?? null,
    'financial'
  );
  const pontualidadeTrend = useKPITrend(
    financialData?.pontualidade ?? null,
    (financialData?.pontualidadeTarget ?? 0) * 0.9
  );

  const ebitdaStatus = useKPIStatus(
    financialData?.ebitda ?? null,
    financialData?.ebitdaTarget ?? null,
    'financial'
  );
  const ebitdaTrend = useKPITrend(
    financialData?.ebitda ?? null,
    (financialData?.ebitdaTarget ?? 0) * 0.8
  );

  const margemLiquidaStatus = useKPIStatus(
    financialData?.margemLiquida ?? null,
    financialData?.margemLiquidaTarget ?? null,
    'financial'
  );
  const margemLiquidaTrend = useKPITrend(
    financialData?.margemLiquida ?? null,
    (financialData?.margemLiquidaTarget ?? 0) * 0.8
  );

  const margemContribuicaoStatus = useKPIStatus(
    financialData?.margemContribuicao ?? null,
    financialData?.margemContribuicaoTarget ?? null,
    'financial'
  );
  const margemContribuicaoTrend = useKPITrend(
    financialData?.margemContribuicao ?? null,
    (financialData?.margemContribuicaoTarget ?? 0) * 0.9
  );

  const crescimentoReceita = financialData?.faturamentoTotal?.realized2025 ?? 0 > 0
    ? Math.round(((financialData!.faturamentoTotal!.target2026 - financialData!.faturamentoTotal!.realized2025) / financialData!.faturamentoTotal!.realized2025) * 10000) / 100
    : 0;

  const financialKPIs: KPIData[] = !financialData ? [] : [
    {
      id: 'inadimplencia',
      label: 'Inadimplência',
      value: financialData.inadimplencia,
      target: financialData.inadimplenciaTarget,
      unit: '%',
      status: inadimplenciaStatus,
      trend: inadimplenciaTrend.trend,
      trendValue: inadimplenciaTrend.formatted,
      responsible: 'Karla',
      description: 'KR1: Reduzir para < 6%',
    },
    {
      id: 'pontualidade',
      label: 'Pontualidade Pagamento',
      value: financialData.pontualidade,
      target: financialData.pontualidadeTarget,
      unit: '%',
      status: pontualidadeStatus,
      trend: pontualidadeTrend.trend,
      trendValue: pontualidadeTrend.formatted,
      responsible: 'Karla',
      description: 'KR2: Atingir 90%',
    },
    {
      id: 'ebitda',
      label: 'EBITDA',
      value: financialData.ebitda,
      target: financialData.ebitdaTarget,
      unit: '%',
      status: ebitdaStatus,
      trend: ebitdaTrend.trend,
      trendValue: ebitdaTrend.formatted,
      responsible: 'Karla',
      description: 'KR3: Atingir 10%',
    },
    {
      id: 'margem-liquida',
      label: 'Margem Líquida',
      value: financialData.margemLiquida,
      target: financialData.margemLiquidaTarget,
      unit: '%',
      status: margemLiquidaStatus,
      trend: margemLiquidaTrend.trend,
      trendValue: margemLiquidaTrend.formatted,
      responsible: 'Karla',
      description: 'KR4: Atingir 10%',
    },
    {
      id: 'margem-contribuicao',
      label: 'Margem de Contribuição',
      value: financialData.margemContribuicao,
      target: financialData.margemContribuicaoTarget,
      unit: '%',
      status: margemContribuicaoStatus,
      trend: margemContribuicaoTrend.trend,
      trendValue: margemContribuicaoTrend.formatted,
      responsible: 'Karla',
      description: 'KR5: Atingir 55%',
    },
    {
      id: 'crescimento-receita',
      label: 'Crescimento Receita',
      value: crescimentoReceita,
      target: 12,
      unit: '%',
      status: 'warning' as StatusType,
      trend: 'stable',
      trendValue: 'Meta 2026',
      description: 'KR6: Crescer 12% vs 2025',
    },
  ];

  const revenueByService = servicesData
    ? servicesData
        .filter(s => s.revenueTarget > 0)
        .sort((a, b) => b.revenueTarget - a.revenueTarget)
        .slice(0, 7)
        .map(service => ({
          name: service.name.length > 12 ? service.name.substring(0, 10) + '...' : service.name,
          fullName: service.name,
          value: service.revenue,
          target: service.revenueTarget,
        }))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados financeiros...</span>
      </div>
    );
  }

  if (error || !financialData) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados financeiros</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Perspectiva Financeira</h2>
        <p className="text-muted-foreground mt-1">OKRs F1, F2 e F3 - Solidez, Faturamento e Eficiência</p>
      </div>

      {/* KPIs Grid - 3 colunas para melhor visualização */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {financialKPIs.map((kpi, index) => (
          <KPICard key={kpi.id} data={kpi} delay={index * 100} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Service */}
        <div className="dashboard-card p-6 animate-fade-in">
          <h3 className="font-display font-semibold text-lg mb-4">Receita por Serviço (Meta 2026)</h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={revenueByService} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis 
                  type="number"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  width={65}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [formatCurrency(value), name === 'target' ? 'Meta' : 'Realizado']}
                  labelFormatter={(label) => {
                    const item = revenueByService.find(r => r.name === label);
                    return item?.fullName || label;
                  }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  dataKey="target" 
                  name="Meta"
                  fill="hsl(var(--chart-1))"
                  radius={[0, 4, 4, 0]}
                  opacity={0.3}
                />
                <Bar 
                  dataKey="value" 
                  name="Realizado"
                  fill="hsl(var(--chart-2))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Reduction */}
        <div className="dashboard-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-display font-semibold text-lg mb-4">Indicadores de Eficiência</h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Redução de Custos</span>
                <span className="text-sm text-muted-foreground">Em andamento</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '25%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Projeto de revisão de custos e desperdícios</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tempo Médio Faturamento</span>
                <span className="text-sm text-muted-foreground">4 dias / Meta: ≤ 2 dias</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill danger" style={{ width: '50%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">KR11: Reduzir tempo de operação</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Integrações Sistêmicas</span>
                <span className="text-sm text-muted-foreground">2 / 5 ações</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '40%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">KR10: SAP, CRM, BI, Automações</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">E-commerce</span>
                <span className="text-sm text-muted-foreground">Projeto F2</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '10%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Diversificação de receita - Escola de Negócios</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
