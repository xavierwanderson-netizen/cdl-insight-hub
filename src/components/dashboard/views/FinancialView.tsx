import { KPICard } from '../KPICard';
import { OKRCard } from '../OKRCard';
import { financialOKRs } from '@/data/dashboardData';
import type { KPIData, StatusType, TrendType } from '@/data/dashboardData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/data/dashboardData';
import { useFinancialData, useServicesData } from '@/hooks/useDashboardData';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2 } from 'lucide-react';

export function FinancialView() {
  // Obter filtros do contexto
  const { year } = useDashboard();
  
  const { data: financialData, isLoading: loadingFinancial } = useFinancialData();
  const { data: servicesData, isLoading: loadingServices } = useServicesData(year);
  
  const isLoading = loadingFinancial || loadingServices;

  // KPIs dinâmicos baseados nos dados reais
  const financialKPIs: KPIData[] = [
    {
      id: 'inadimplencia',
      label: 'Inadimplência',
      value: financialData.inadimplencia,
      target: financialData.inadimplenciaTarget,
      unit: '%',
      status: financialData.inadimplencia > financialData.inadimplenciaTarget ? 'danger' as StatusType : 'success' as StatusType,
      trend: 'down' as TrendType,
      trendValue: `-${(financialData.inadimplencia - financialData.inadimplenciaTarget).toFixed(1)}pp`,
      responsible: 'Karla',
      description: 'KR1: Reduzir para < 6%',
    },
    {
      id: 'pontualidade',
      label: 'Pontualidade Pagamento',
      value: financialData.pontualidade,
      target: financialData.pontualidadeTarget,
      unit: '%',
      status: financialData.pontualidade >= financialData.pontualidadeTarget * 0.9 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `+${(financialData.pontualidadeTarget - financialData.pontualidade).toFixed(0)}pp`,
      responsible: 'Karla',
      description: 'KR2: Atingir 90%',
    },
    {
      id: 'ebitda',
      label: 'EBITDA',
      value: financialData.ebitda,
      target: financialData.ebitdaTarget,
      unit: '%',
      status: financialData.ebitda >= financialData.ebitdaTarget * 0.8 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `+${(financialData.ebitdaTarget - financialData.ebitda).toFixed(1)}pp`,
      responsible: 'Karla',
      description: 'KR3: Atingir 10%',
    },
    {
      id: 'margem-liquida',
      label: 'Margem Líquida',
      value: financialData.margemLiquida,
      target: financialData.margemLiquidaTarget,
      unit: '%',
      status: financialData.margemLiquida >= financialData.margemLiquidaTarget * 0.8 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `+${(financialData.margemLiquidaTarget - financialData.margemLiquida).toFixed(1)}pp`,
      responsible: 'Karla',
      description: 'KR4: Atingir 10%',
    },
    {
      id: 'margem-contribuicao',
      label: 'Margem de Contribuição',
      value: financialData.margemContribuicao,
      target: financialData.margemContribuicaoTarget,
      unit: '%',
      status: financialData.margemContribuicao >= financialData.margemContribuicaoTarget * 0.9 ? 'success' as StatusType : 'warning' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `+${(financialData.margemContribuicaoTarget - financialData.margemContribuicao).toFixed(0)}pp`,
      responsible: 'Karla',
      description: 'KR5: Atingir 55%',
    },
    {
      id: 'crescimento-receita',
      label: 'Crescimento Receita',
      value: financialData.faturamentoTotal.realized2025 > 0 
        ? Math.round(((financialData.faturamentoTotal.target2026 - financialData.faturamentoTotal.realized2025) / financialData.faturamentoTotal.realized2025) * 10000) / 100
        : 0,
      target: 12,
      unit: '%',
      status: 'warning' as StatusType,
      trend: 'stable' as TrendType,
      trendValue: 'Meta 2026',
      description: 'KR6: Crescer 12% vs 2025',
    },
  ];

  // Receita por serviço baseado nos dados reais
  const revenueByService = servicesData
    .filter(s => s.revenueTarget > 0)
    .sort((a, b) => b.revenueTarget - a.revenueTarget)
    .slice(0, 7)
    .map(service => ({
      name: service.name.length > 12 ? service.name.substring(0, 10) + '...' : service.name,
      fullName: service.name,
      value: service.revenue,
      target: service.revenueTarget,
    }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados financeiros...</span>
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

      {/* OKRs */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4">OKRs - Perspectiva Financeira</h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {financialOKRs.map((okr, index) => (
            <OKRCard key={okr.id} data={okr} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}
