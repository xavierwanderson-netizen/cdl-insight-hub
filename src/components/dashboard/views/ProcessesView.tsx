import { CheckCircle2, Circle, Clock, Settings, GitBranch, Database, Zap, Loader2 } from 'lucide-react';
import { useProcesses, useKPIStatus } from '@/presentation/hooks';

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
  const { data: processes, isLoading, error } = useProcesses();

  const processosStatus = useKPIStatus(
    processes?.processosMapeados ?? null,
    processes?.processosMapeadosTarget ?? null,
    'processes'
  );

  const donoStatus = useKPIStatus(
    processes?.processosComDono ?? null,
    processes?.processosComDonoTarget ?? null,
    'processes'
  );

  const retrabalhoStatus = useKPIStatus(
    processes?.reducaoRetrabalho ?? null,
    processes?.reducaoRetrabalhoTarget ?? null,
    'processes'
  );

  const tempoStatus = useKPIStatus(
    processes?.tempoMedioFaturamento ?? null,
    processes?.tempoMedioFaturamentoTarget ?? null,
    'processes'
  );

  const processMetrics = !processes ? [] : [
    { key: 'processosMapeados', label: 'Processos Mapeados', value: processes.processosMapeados, target: processes.processosMapeadosTarget, unit: '%', status: processosStatus },
    { key: 'processosComDono', label: 'Processos com Dono', value: processes.processosComDono, target: processes.processosComDonoTarget, unit: '%', status: donoStatus },
    { key: 'reducaoRetrabalho', label: 'Redução Retrabalho', value: processes.reducaoRetrabalho, target: processes.reducaoRetrabalhoTarget, unit: '%', status: retrabalhoStatus },
    { key: 'tempoFaturamento', label: 'Tempo Faturamento', value: processes.tempoMedioFaturamento, target: processes.tempoMedioFaturamentoTarget, unit: 'dias', inverse: true, status: tempoStatus },
  ];

  const automationProgress = processes
    ? (processes.automacoesImplementadas / processes.automacoesImplementadasTarget) * automationActions.length
    : 0;
  const completedAutomations = Math.floor(automationProgress);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de processos...</span>
      </div>
    );
  }

  if (error || !processes) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados de processos</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
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

          return (
            <div
              key={metric.key}
              className={`kpi-card status-${metric.status} animate-fade-in`}
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
                  className={`progress-bar-fill ${metric.status}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Automation */}
      <div>
        {/* Automation Checklist */}
        <div className="dashboard-card p-6 animate-fade-in">
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
    </div>
  );
}
