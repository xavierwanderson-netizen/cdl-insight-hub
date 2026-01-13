import { KPICard } from '../KPICard';
import { ServiceTable } from '../ServiceTable';
import { RevenueChart } from '../RevenueChart';
import { FunnelChart } from '../FunnelChart';
import { 
  executiveKPIs, 
  servicesData, 
  salesFunnel, 
  revenueEvolution,
  strategicProjects,
  formatCurrency
} from '@/data/dashboardData';
import { AlertTriangle, TrendingUp, Target, Users, DollarSign, BarChart3 } from 'lucide-react';

export function OverviewView() {
  // Calculate summary stats
  const totalRevenueMeta = 19811998;
  const totalRevenueRealized = 0;
  const revenueProgress = (totalRevenueRealized / totalRevenueMeta) * 100;

  return (
    <div className="space-y-6">
      {/* Executive Summary Banner */}
      <div className="executive-header rounded-xl p-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold">Visão Geral Executiva</h2>
            <p className="text-white/70 mt-1">Planejamento Estratégico 2026 - CDL Goiânia</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/70">Meta Faturamento 2026</p>
              <p className="text-xl font-bold font-display">{formatCurrency(totalRevenueMeta)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/70">Progresso Geral</p>
              <p className="text-xl font-bold font-display">{revenueProgress.toFixed(1)}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs text-white/70">Crescimento vs 2025</p>
              <p className="text-xl font-bold font-display">+12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="dashboard-card p-4 border-l-4 border-status-danger animate-fade-in">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-status-danger" />
          <div>
            <p className="font-medium text-sm">Pontos de Atenção</p>
            <p className="text-xs text-muted-foreground">
              Inadimplência acima da meta (7.2% vs 6%) • Taxa de conversão de leads baixa (4% vs 20%) • 0 integrações sistêmicas implementadas
            </p>
          </div>
        </div>
      </div>

      {/* Main KPIs Grid */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Indicadores-Chave de Performance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {executiveKPIs.map((kpi, index) => (
            <KPICard key={kpi.id} data={kpi} delay={index * 50} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueEvolution} />
        <FunnelChart data={salesFunnel} />
      </div>

      {/* Services Overview */}
      <ServiceTable services={servicesData.slice(0, 6)} />

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* OKR Progress */}
        <div className="dashboard-card p-5 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Progresso OKRs</p>
              <p className="text-xs text-muted-foreground">Geral do ano</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Financeiro</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill warning" style={{ width: '25%' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span>Clientes</span>
              <span className="font-semibold">35%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill warning" style={{ width: '35%' }} />
            </div>
          </div>
        </div>

        {/* Member Stats */}
        <div className="dashboard-card p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-status-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-status-success" />
            </div>
            <div>
              <p className="text-sm font-medium">Base de Associados</p>
              <p className="text-xs text-muted-foreground">Meta: +15%</p>
            </div>
          </div>
          <p className="text-3xl font-bold font-display">3.925</p>
          <p className="text-sm text-muted-foreground mt-1">Meta 2026: 4.514</p>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill warning" style={{ width: '87%' }} />
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="dashboard-card p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium">Faturamento</p>
              <p className="text-xs text-muted-foreground">Acumulado 2026</p>
            </div>
          </div>
          <p className="text-3xl font-bold font-display">{formatCurrency(0)}</p>
          <p className="text-sm text-muted-foreground mt-1">Meta: {formatCurrency(totalRevenueMeta)}</p>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill danger" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Projects Status */}
        <div className="dashboard-card p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Projetos Estratégicos</p>
              <p className="text-xs text-muted-foreground">Status geral</p>
            </div>
          </div>
          <div className="space-y-2">
            {strategicProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <span className="text-sm truncate flex-1">{project.name}</span>
                <span className={`status-badge ${project.status} shrink-0 ml-2`}>
                  {project.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
