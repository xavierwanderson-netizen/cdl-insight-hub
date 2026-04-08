import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { KPICard } from '../KPICard';
import { Loader2 } from 'lucide-react';
import { useCustomer, useKPIStatus, useKPITrend } from '@/presentation/hooks';
import type { KPIData, StatusType } from '@/domain/types/common';

export function CustomersView() {
  const { data: customers, isLoading, error } = useCustomer();

  // Hooks para cálculos de KPI
  const npsStatus = useKPIStatus(
    customers?.nps ?? null,
    customers?.npsTarget ?? null,
    'customers'
  );
  const npsTrend = useKPITrend(
    customers?.nps ?? null,
    (customers?.npsTarget ?? 0) * 0.9
  );

  const fcrStatus = useKPIStatus(
    customers?.fcr ?? null,
    customers?.fcrTarget ?? null,
    'customers'
  );
  const fcrTrend = useKPITrend(
    customers?.fcr ?? null,
    (customers?.fcrTarget ?? 0) * 0.9
  );

  const churnStatus = useKPIStatus(
    customers?.churn ?? null,
    customers?.churnTarget ?? null,
    'customers'
  );
  const churnTrend = useKPITrend(
    customers?.churn ?? null,
    customers?.churnTarget ?? null
  );

  const tempoStatus = useKPIStatus(
    customers?.tempoMedioAssociacao ?? null,
    customers?.tempoMedioAssociacaoTarget ?? null,
    'customers'
  );
  const tempoTrend = useKPITrend(
    customers?.tempoMedioAssociacao ?? null,
    (customers?.tempoMedioAssociacaoTarget ?? 0) * 0.8
  );

  const receitaStatus = useKPIStatus(
    customers?.receitaMediaAssociado ?? null,
    customers?.receitaMediaAssociadoTarget ?? null,
    'customers'
  );
  const receitaTrend = useKPITrend(
    customers?.receitaMediaAssociado ?? null,
    (customers?.receitaMediaAssociadoTarget ?? 0) * 0.85
  );

  const customerKPIs: KPIData[] = !customers ? [] : [
    {
      id: 'nps',
      label: 'NPS Geral',
      value: customers.nps,
      target: customers.npsTarget,
      unit: '%',
      status: npsStatus,
      trend: npsTrend.trend,
      trendValue: npsTrend.formatted,
      responsible: 'Wanderson',
    },
    {
      id: 'fcr',
      label: 'FCR (First Call Resolution)',
      value: customers.fcr,
      target: customers.fcrTarget,
      unit: '%',
      status: fcrStatus,
      trend: fcrTrend.trend,
      trendValue: fcrTrend.formatted,
    },
    {
      id: 'churn',
      label: 'Taxa de Cancelamento',
      value: customers.churn,
      target: customers.churnTarget,
      unit: '%',
      status: churnStatus,
      trend: churnTrend.trend,
      trendValue: churnTrend.formatted,
      description: 'Reduzir 20% vs 2025',
    },
    {
      id: 'tempo-associacao',
      label: 'Tempo Médio Associação',
      value: customers.tempoMedioAssociacao,
      target: customers.tempoMedioAssociacaoTarget,
      unit: ' meses',
      status: tempoStatus,
      trend: tempoTrend.trend,
      trendValue: tempoTrend.formatted,
    },
    {
      id: 'receita-media',
      label: 'Receita Média/Associado',
      value: customers.receitaMediaAssociado,
      target: customers.receitaMediaAssociadoTarget,
      prefix: 'R$',
      status: receitaStatus,
      trend: receitaTrend.trend,
      trendValue: receitaTrend.formatted,
    },
  ];

  const memberClassification = customers
    ? [
        { name: 'Promotores (Verde)', value: customers.zonaVerde, color: 'hsl(142, 71%, 45%)' },
        { name: 'Neutros/Risco (Amarelo)', value: customers.zonaAmarela, color: 'hsl(38, 92%, 50%)' },
        { name: 'Detratores (Vermelho)', value: customers.zonaVermelha, color: 'hsl(0, 84%, 60%)' },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de clientes...</span>
      </div>
    );
  }

  if (error || !customers) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados de clientes</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Perspectiva Clientes</h2>
        <p className="text-muted-foreground mt-1">Experiência do associado, NPS e fidelização</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerKPIs.map((kpi, index) => (
          <KPICard key={kpi.id} data={kpi} delay={index * 100} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Classification */}
        <div className="dashboard-card p-6 animate-fade-in">
          <h3 className="font-display font-semibold text-lg mb-4">Classificação de Associados</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memberClassification}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {memberClassification.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Porcentagem']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            {memberClassification.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Card */}
        <div className="dashboard-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-display font-semibold text-lg mb-4">Metas de Experiência</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">NPS Geral</span>
                <span className="text-sm text-muted-foreground">{customers.nps}% / {customers.npsTarget}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: `${(customers.nps / customers.npsTarget) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">FCR</span>
                <span className="text-sm text-muted-foreground">{customers.fcr}% / {customers.fcrTarget}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: `${(customers.fcr / customers.fcrTarget) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Redução Cancelamento</span>
                <span className="text-sm text-muted-foreground">{customers.churn}% / {customers.churnTarget}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-bar-fill ${customers.churn <= customers.churnTarget ? 'success' : 'danger'}`} style={{ width: `${Math.min((customers.churnTarget / customers.churn) * 100, 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tempo Médio Associação</span>
                <span className="text-sm text-muted-foreground">{customers.tempoMedioAssociacao}m / {customers.tempoMedioAssociacaoTarget}m</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: `${(customers.tempoMedioAssociacao / customers.tempoMedioAssociacaoTarget) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Receita Média/Associado</span>
                <span className="text-sm text-muted-foreground">R$ {customers.receitaMediaAssociado} / R$ {customers.receitaMediaAssociadoTarget}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: `${(customers.receitaMediaAssociado / customers.receitaMediaAssociadoTarget) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
