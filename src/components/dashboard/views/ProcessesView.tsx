import { CheckCircle2, Circle, Clock, Settings, GitBranch, Database, Zap } from 'lucide-react';
import { strategicProjects } from '@/data/dashboardData';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2 } from 'lucide-react';
import type { StatusType } from '@/data/dashboardData';

const automationActions = [
  { name: 'Integração Frente de Caixa', status: 'pending' },
  { name: 'Conciliação Cartão de Crédito', status: 'pending' },
  { name: 'Conciliação Bancária Automática', status: 'pending' },
  { name: 'Baixa de PIX via Arquivo', status: 'pending' },
  { name: 'Automação Faturamento Cert. Digital', status: 'pending' },
  { name: 'API Registro Boletos Automático', status: 'pending' },
  { name: 'Automação Baixa Inadimplentes', status: 'pending' },
];

export function ProcessesView() {
  const { processes, isLoading } = useDashboard();

  // Métricas dinâmicas de processos
  const processMetrics = [
    { key: 'processosMapeados', label: 'Processos Mapeados', value: processes.processosMapeados, target: processes.processosMapeadosTarget, unit: '%' },
    { key: 'processosComDono', label: 'Processos com Dono', value: processes.processosComDono, target: processes.processosComDonoTarget, unit: '%' },
    { key: 'reducaoRetrabalho', label: 'Redução Retrabalho', value: processes.reducaoRetrabalho, target: processes.reducaoRetrabalhoTarget, unit: '%' },
    { key: 'tempoFaturamento', label: 'Tempo Faturamento', value: processes.tempoMedioFaturamento, target: processes.tempoMedioFaturamentoTarget, unit: 'dias', inverse: true },
  ];

  // KRs dinâmicos
  const processKRs = [
    { id: 'kr57', desc: 'Definir donos para 100% dos processos críticos', target: `${processes.processosComDonoTarget}%`, current: `${processes.processosComDono}%`, status: processes.processosComDono >= processes.processosComDonoTarget * 0.6 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr58', desc: 'Estabelecer rotina de revisão trimestral', target: '4 revisões', current: `${Math.floor(processes.processosMapeados / 25)}`, status: processes.processosMapeados >= 50 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr59', desc: 'Mapear 100% dos processos-chave', target: `${processes.processosMapeadosTarget}%`, current: `${processes.processosMapeados}%`, status: processes.processosMapeados >= processes.processosMapeadosTarget * 0.5 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr60', desc: 'Reduzir retrabalho em 20%', target: `-${processes.reducaoRetrabalhoTarget}%`, current: `-${processes.reducaoRetrabalho}%`, status: processes.reducaoRetrabalho >= processes.reducaoRetrabalhoTarget * 0.4 ? 'warning' as StatusType : 'danger' as StatusType },
  ];

  // Calcular progresso de automações
  const automationProgress = (processes.automacoesImplementadas / processes.automacoesImplementadasTarget) * automationActions.length;
  const completedAutomations = Math.floor(automationProgress);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de processos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Processos Internos & Governança</h2>
        <p className="text-muted-foreground mt-1">Objetivos P11, P12 e P13 - Eficiência e Padronização</p>
      </div>

      {/* Process KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {processMetrics.map((metric, index) => {
          const progress = metric.inverse 
            ? (metric.target / metric.value) * 100 
            : (metric.value / metric.target) * 100;
          const status = progress >= 90 ? 'success' : progress >= 50 ? 'warning' : 'danger';
          
          return (
            <div 
              key={metric.key}
              className={`kpi-card status-${status} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold font-display">
                {metric.value}{metric.unit === '%' ? '%' : ` ${metric.unit}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Meta: {metric.inverse ? '≤' : ''}{metric.target}{metric.unit === '%' ? '%' : ` ${metric.unit}`}
              </p>
              <div className="progress-bar mt-2">
                <div 
                  className={`progress-bar-fill ${status}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Projects & Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Projects */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">Projetos Estratégicos</h3>
          </div>
          
          <div className="space-y-4">
            {strategicProjects.map((project) => (
              <div key={project.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {project.id === 'sap' && <Database className="w-4 h-4 text-primary" />}
                    {project.id === 'crm' && <GitBranch className="w-4 h-4 text-primary" />}
                    {project.id === 'bi' && <Zap className="w-4 h-4 text-primary" />}
                    {project.id === 'automacao' && <Settings className="w-4 h-4 text-primary" />}
                    <span className="font-medium">{project.name}</span>
                  </div>
                  <span className={`status-badge ${project.status}`}>
                    {project.progress}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-bar-fill ${project.status}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Checklist */}
        <div className="dashboard-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-secondary" />
            <h3 className="font-display font-semibold text-lg">Ações de Automação (F3)</h3>
          </div>
          
          <div className="space-y-2">
            {automationActions.map((action, index) => {
              const isDone = index < completedAutomations;
              const isInProgress = index === completedAutomations && processes.automacoesImplementadas > 0;
              
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
                  ) : isInProgress ? (
                    <Clock className="w-5 h-5 text-status-warning shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={`text-sm ${isDone ? 'line-through text-muted-foreground' : ''}`}>{action.name}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso geral</span>
              <span className="font-semibold">{processes.automacoesImplementadas} / {processes.automacoesImplementadasTarget} ações</span>
            </div>
            <div className="progress-bar mt-2">
              <div 
                className={`progress-bar-fill ${processes.automacoesImplementadas >= processes.automacoesImplementadasTarget * 0.6 ? 'warning' : 'danger'}`} 
                style={{ width: `${(processes.automacoesImplementadas / processes.automacoesImplementadasTarget) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Process Key Results */}
      <div className="dashboard-card p-6 animate-fade-in">
        <h3 className="font-display font-semibold text-lg mb-4">Key Results - Processos Internos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processKRs.map((kr) => (
            <div key={kr.id} className="p-4 bg-muted/30 rounded-lg">
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
