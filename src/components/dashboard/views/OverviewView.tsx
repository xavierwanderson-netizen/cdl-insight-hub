import { KPICard } from '../KPICard';
import { ServiceTable } from '../ServiceTable';
import { RevenueChart } from '../RevenueChart';
import { FunnelChart } from '../FunnelChart';
import { AlertTriangle, TrendingUp, Target, Users, DollarSign, BarChart3, Loader2 } from 'lucide-react';
import { useFinancial, useRevenueEvolution, useServices, useCaptacao, useKPIStatus, useKPITrend } from '@/presentation/hooks';
import { formatCurrency } from '@/shared/utils/parsing';
import type { KPIData, StatusType } from '@/domain/types/common';
import type { FunnelStage } from '@/data/types';

export function OverviewView() {
  const { data: financialData, isLoading: loadingFinancial, error: errorFinancial } = useFinancial();
  const { data: revenueData, isLoading: loadingRevenue } = useRevenueEvolution();
  const { data: servicesData, isLoading: loadingServices } = useServices('2026');
  const { data: captacaoData, isLoading: loadingCaptacao } = useCaptacao();

  const isLoading = loadingFinancial || loadingRevenue || loadingServices || loadingCaptacao;
  const error = errorFinancial;

  const inadimplenciaStatus = useKPIStatus(
    financialData?.inadimplencia ?? null,
    financialData?.inadimplenciaTarget ?? null,
    'financial'
  );
  const inadimplenciaTrend = useKPITrend(
    financialData?.inadimplencia ?? null,
    financialData?.inadimplenciaTarget ?? null
  );

  const ebitdaStatus = useKPIStatus(
    financialData?.ebitda ?? null,
    financialData?.ebitdaTarget ?? null,
    'financial'
  );

  const margemStatus = useKPIStatus(
    financialData?.margemLiquida ?? null,
    financialData?.margemLiquidaTarget ?? null,
    'financial'
  );

  const totalRevenueMeta = financialData?.faturamentoTotal?.target2026 ?? 0;
  const totalRevenueRealized = financialData?.faturamentoTotal?.realized2026 ?? 0;
  const totalRevenue2025 = financialData?.faturamentoTotal?.realized2025 ?? 0;
  const revenueProgress = totalRevenueMeta > 0 ? (totalRevenueRealized / totalRevenueMeta) * 100 : 0;
  const growthVs2025 = totalRevenue2025 > 0 ? ((totalRevenueMeta - totalRevenue2025) / totalRevenue2025) * 100 : 0;

  const executiveKPIs: KPIData[] = !financialData ? [] : [
    {
      id: 'faturamento-total',
      label: 'Faturamento 2025',
      value: financialData.faturamentoTotal.realized2025,
      target: financialData.faturamentoTotal.target2026,
      prefix: 'R$',
      status: 'warning',
      trend: 'up',
      trendValue: `+${growthVs2025.toFixed(0)}%`,
    },
    {
      id: 'servicos-cdl',
      label: 'Serviços CDL',
      value: financialData.servicosCDL.realized2025,
      target: financialData.servicosCDL.target2026,
      prefix: 'R$',
      status: 'warning',
      trend: 'up',
      trendValue: '+16.7%',
    },
    {
      id: 'spc-brasil',
      label: 'SPC Brasil',
      value: financialData.spcBrasil.realized2025,
      target: financialData.spcBrasil.target2026,
      prefix: 'R$',
      status: 'warning',
      trend: 'up',
      trendValue: '+9.7%',
    },
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
    },
    {
      id: 'ebitda',
      label: 'EBITDA',
      value: financialData.ebitda,
      target: financialData.ebitdaTarget,
      unit: '%',
      status: ebitdaStatus,
      trend: 'up',
      trendValue: '+2pp',
    },
    {
      id: 'margem-liquida',
      label: 'Margem Líquida',
      value: financialData.margemLiquida,
      target: financialData.margemLiquidaTarget,
      unit: '%',
      status: margemStatus,
      trend: 'up',
      trendValue: '+1.5pp',
    },
  ];

  const salesFunnel: FunnelStage[] = !captacaoData ? [] : [
    { id: 'leads', name: 'Leads', value: captacaoData.leads, target: captacaoData.leadsTarget, percentage: 100, color: 'hsl(222, 65%, 35%)' },
    { id: 'qualificados', name: 'Qualificados', value: captacaoData.leadsQualificados, target: captacaoData.leadsQualificadosTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.leadsQualificados / captacaoData.leadsTarget) * 100 : 0, color: 'hsl(38, 92%, 50%)' },
    { id: 'propostas', name: 'Propostas', value: captacaoData.propostas, target: captacaoData.propostasTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.propostas / captacaoData.leadsTarget) * 100 : 0, color: 'hsl(142, 71%, 45%)' },
    { id: 'novos', name: 'Novos Associados', value: captacaoData.novosAssociados, target: captacaoData.novosAssociadosTarget, percentage: captacaoData.leadsTarget > 0 ? (captacaoData.novosAssociados / captacaoData.leadsTarget) * 100 : 0, color: 'hsl(262, 80%, 55%)' },
  ];

  const strategicProjects = [
    { id: 'sap', name: 'Otimização SAP', progress: 35, status: 'warning' as StatusType },
    { id: 'crm', name: 'CRM Bitrix', progress: 60, status: 'warning' as StatusType },
    { id: 'bi', name: 'BI Executivo', progress: 20, status: 'danger' as StatusType },
  ];

  const revenueEvolutionChart = revenueData
    ? revenueData.map(item => ({
        month: item.shortMonth,
        realized2025: item.realized2025,
        target2026: item.target2026,
        realized2026: item.realized2026,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados...</span>
      </div>
    );
  }

  if (error || !financialData || !captacaoData || !servicesData) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
      </div>
    );
  }

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
              <p className="text-xl font-bold font-display">+{growthVs2025.toFixed(0)}%</p>
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
              Inadimplência acima da meta ({financialData.inadimplencia}% vs {financialData.inadimplenciaTarget}%) • 
              Taxa de conversão: {captacaoData.taxaConversao.toFixed(0)}% (Meta: {captacaoData.taxaConversaoTarget}%) • 
              Integrações sistêmicas: 2/5 implementadas
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {executiveKPIs.map((kpi, index) => (
            <KPICard key={kpi.id} data={kpi} delay={index * 50} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueEvolutionChart} />
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

        {/* Member Stats - Dados da planilha via captação */}
        <div className="dashboard-card p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-status-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-status-success" />
            </div>
            <div>
              <p className="text-sm font-medium">Meta Novos Associados</p>
              <p className="text-xs text-muted-foreground">Captação 2026</p>
            </div>
          </div>
          <p className="text-3xl font-bold font-display">{captacaoData.novosAssociados}</p>
          <p className="text-sm text-muted-foreground mt-1">Meta 2026: {captacaoData.novosAssociadosTarget}</p>
          <div className="progress-bar mt-2">
            <div 
              className={`progress-bar-fill ${captacaoData.novosAssociados >= captacaoData.novosAssociadosTarget * 0.9 ? 'success' : 'warning'}`} 
              style={{ width: `${Math.min((captacaoData.novosAssociados / captacaoData.novosAssociadosTarget) * 100, 100)}%` }} 
            />
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
          <p className="text-3xl font-bold font-display">{formatCurrency(totalRevenueRealized)}</p>
          <p className="text-sm text-muted-foreground mt-1">Meta: {formatCurrency(totalRevenueMeta)}</p>
          <div className="progress-bar mt-2">
            <div className={`progress-bar-fill ${revenueProgress >= 90 ? 'success' : revenueProgress >= 50 ? 'warning' : 'danger'}`} style={{ width: `${Math.min(revenueProgress, 100)}%` }} />
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
            {strategicProjects.map((project) => (
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
