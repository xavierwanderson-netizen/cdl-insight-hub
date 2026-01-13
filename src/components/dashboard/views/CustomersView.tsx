import { Users, UserCheck, UserMinus, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { KPICard } from '../KPICard';
import { OKRCard } from '../OKRCard';
import { customerOKRs } from '@/data/dashboardData';
import type { KPIData, StatusType } from '@/data/dashboardData';

const customerKPIs: KPIData[] = [
  {
    id: 'nps',
    label: 'NPS Geral',
    value: 88,
    target: 95,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+5pts',
    responsible: 'Wanderson',
  },
  {
    id: 'fcr',
    label: 'FCR (First Call Resolution)',
    value: 78,
    target: 85,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: '+3pts',
  },
  {
    id: 'churn',
    label: 'Taxa de Cancelamento',
    value: 12,
    target: 9.6,
    unit: '%',
    status: 'danger',
    trend: 'down',
    trendValue: '-2pp',
    description: 'Meta: reduzir 20% vs 2025',
  },
  {
    id: 'tempo-associacao',
    label: 'Tempo Médio Associação',
    value: 14,
    target: 18,
    unit: ' meses',
    status: 'warning',
    trend: 'up',
    trendValue: '+2 meses',
  },
  {
    id: 'receita-media',
    label: 'Receita Média/Associado',
    value: 5050,
    target: 5960,
    prefix: 'R$',
    status: 'warning',
    trend: 'up',
    trendValue: '+18%',
  },
];

const memberClassification = [
  { name: 'Promotores (Verde)', value: 65, color: 'hsl(142, 71%, 45%)' },
  { name: 'Neutros/Risco (Amarelo)', value: 25, color: 'hsl(38, 92%, 50%)' },
  { name: 'Detratores (Vermelho)', value: 10, color: 'hsl(0, 84%, 60%)' },
];

const npsEvolution = [
  { month: 'Jan', value: 82 },
  { month: 'Fev', value: 83 },
  { month: 'Mar', value: 84 },
  { month: 'Abr', value: 85 },
  { month: 'Mai', value: 86 },
  { month: 'Jun', value: 87 },
  { month: 'Jul', value: 88 },
];

export function CustomersView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Perspectiva Clientes</h2>
        <p className="text-muted-foreground mt-1">Experiência do associado, NPS e fidelização</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
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
                <span className="text-sm text-muted-foreground">88% / 95%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '92%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">FCR</span>
                <span className="text-sm text-muted-foreground">78% / 85%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '92%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Redução Cancelamento</span>
                <span className="text-sm text-muted-foreground">-8% / -20%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill danger" style={{ width: '40%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tempo Médio Associação</span>
                <span className="text-sm text-muted-foreground">14m / 18m</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '78%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ticket Médio</span>
                <span className="text-sm text-muted-foreground">R$ 5.050 / R$ 5.960</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill warning" style={{ width: '85%' }} />
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
