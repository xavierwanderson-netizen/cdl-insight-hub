import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { KPICard } from '../KPICard';
import { OKRCard } from '../OKRCard';
import { customerOKRs } from '@/data/dashboardData';
import type { KPIData, StatusType, TrendType } from '@/data/dashboardData';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2 } from 'lucide-react';

export function CustomersView() {
  const { customers, isLoading } = useDashboard();

  // KPIs dinâmicos baseados nos dados reais da planilha
  const customerKPIs: KPIData[] = [
    {
      id: 'nps',
      label: 'NPS Geral',
      value: customers.nps,
      target: customers.npsTarget,
      unit: '%',
      status: customers.nps >= customers.npsTarget * 0.9 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${customers.npsTarget}%`,
      responsible: 'Wanderson',
    },
    {
      id: 'fcr',
      label: 'FCR (First Call Resolution)',
      value: customers.fcr,
      target: customers.fcrTarget,
      unit: '%',
      status: customers.fcr >= customers.fcrTarget * 0.9 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${customers.fcrTarget}%`,
    },
    {
      id: 'churn',
      label: 'Taxa de Cancelamento',
      value: customers.churn,
      target: customers.churnTarget,
      unit: '%',
      status: customers.churn <= customers.churnTarget ? 'success' as StatusType : 'danger' as StatusType,
      trend: 'down' as TrendType,
      trendValue: `Meta: <${customers.churnTarget}%`,
      description: 'Reduzir 20% vs 2025',
    },
    {
      id: 'tempo-associacao',
      label: 'Tempo Médio Associação',
      value: customers.tempoMedioAssociacao,
      target: customers.tempoMedioAssociacaoTarget,
      unit: ' meses',
      status: customers.tempoMedioAssociacao >= customers.tempoMedioAssociacaoTarget * 0.8 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: ${customers.tempoMedioAssociacaoTarget}m`,
    },
    {
      id: 'receita-media',
      label: 'Receita Média/Associado',
      value: customers.receitaMediaAssociado,
      target: customers.receitaMediaAssociadoTarget,
      prefix: 'R$',
      status: customers.receitaMediaAssociado >= customers.receitaMediaAssociadoTarget * 0.85 ? 'warning' as StatusType : 'danger' as StatusType,
      trend: 'up' as TrendType,
      trendValue: `Meta: R$ ${customers.receitaMediaAssociadoTarget}`,
    },
  ];

  // Classificação de associados baseada nos dados reais
  const memberClassification = [
    { name: 'Promotores (Verde)', value: customers.zonaVerde, color: 'hsl(142, 71%, 45%)' },
    { name: 'Neutros/Risco (Amarelo)', value: customers.zonaAmarela, color: 'hsl(38, 92%, 50%)' },
    { name: 'Detratores (Vermelho)', value: customers.zonaVermelha, color: 'hsl(0, 84%, 60%)' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de clientes...</span>
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

        {/* NPS Goals Card */}
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

      {/* OKRs */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4">OKRs - Perspectiva Clientes</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {customerOKRs.map((okr, index) => (
            <OKRCard key={okr.id} data={okr} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}
