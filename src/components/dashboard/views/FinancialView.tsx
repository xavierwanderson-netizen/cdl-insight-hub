import { KPICard } from '../KPICard';
import { OKRCard } from '../OKRCard';
import { financialOKRs } from '@/data/dashboardData';
import type { KPIData } from '@/data/dashboardData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/data/dashboardData';

const financialKPIs: KPIData[] = [
  {
    id: 'inadimplencia',
    label: 'Inadimplência',
    value: 7.2,
    target: 6,
    unit: '%',
    status: 'danger',
    trend: 'down',
    trendValue: '-1.8pp',
    responsible: 'Karla',
    description: 'KR1: Reduzir para < 6%',
  },
  {
    id: 'pontualidade',
    label: 'Pontualidade Pagamento',
    value: 82,
    target: 90,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+5pp',
    responsible: 'Karla',
    description: 'KR2: Atingir 90%',
  },
  {
    id: 'ebitda',
    label: 'EBITDA',
    value: 8.5,
    target: 10,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+2pp',
    responsible: 'Karla',
    description: 'KR3: Atingir 10%',
  },
  {
    id: 'margem-liquida',
    label: 'Margem Líquida',
    value: 8,
    target: 10,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+1.5pp',
    responsible: 'Karla',
    description: 'KR4: Atingir 10%',
  },
  {
    id: 'margem-contribuicao',
    label: 'Margem de Contribuição',
    value: 52,
    target: 55,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: '+3pp',
    responsible: 'Karla',
    description: 'KR5: Atingir 55%',
  },
  {
    id: 'crescimento-receita',
    label: 'Crescimento Receita',
    value: 0,
    target: 12,
    unit: '%',
    status: 'warning',
    trend: 'stable',
    trendValue: 'A realizar',
    description: 'KR6: Crescer 12% vs 2025',
  },
];

const revenueByService = [
  { name: 'SPC Brasil', value: 2812486, target: 2812486 },
  { name: 'CDL Celular', value: 0, target: 1935524 },
  { name: 'Cert. Digital', value: 0, target: 584164 },
  { name: 'Escola Neg.', value: 0, target: 364000 },
  { name: 'SPC Avisa', value: 0, target: 212096 },
  { name: 'Eventos', value: 0, target: 158400 },
  { name: 'Cheque Seg.', value: 0, target: 48000 },
];

export function FinancialView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Perspectiva Financeira</h2>
        <p className="text-muted-foreground mt-1">OKRs F1, F2 e F3 - Solidez, Faturamento e Eficiência</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
                  formatter={(value: number) => formatCurrency(value)}
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
                <span className="text-sm text-muted-foreground">0 / 5 ações</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '0%' }} />
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
