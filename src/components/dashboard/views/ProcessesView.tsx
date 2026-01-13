import { CheckCircle2, Circle, Clock, AlertTriangle, Settings, GitBranch, Database, Zap } from 'lucide-react';
import { processData, strategicProjects } from '@/data/dashboardData';
import type { StatusType } from '@/data/dashboardData';

const processKRs = [
  { id: 'kr57', desc: 'Definir donos para 100% dos processos críticos', target: '100%', current: '25%', status: 'danger' as StatusType },
  { id: 'kr58', desc: 'Estabelecer rotina de revisão trimestral', target: '4 revisões', current: '0', status: 'danger' as StatusType },
  { id: 'kr59', desc: 'Mapear 100% dos processos-chave', target: '100%', current: '20%', status: 'danger' as StatusType },
  { id: 'kr60', desc: 'Reduzir retrabalho em 20%', target: '-20%', current: '0%', status: 'danger' as StatusType },
];

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Processos Internos & Governança</h2>
        <p className="text-muted-foreground mt-1">Objetivos P11, P12 e P13 - Eficiência e Padronização</p>
      </div>

      {/* Process KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(processData).map(([key, data], index) => (
          <div 
            key={key}
            className="kpi-card status-warning animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
            <p className="text-2xl font-bold font-display">
              {data.value}{data.unit === '%' ? '%' : ` ${data.unit}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Meta: {data.target}{data.unit === '%' ? '%' : ` ${data.unit}`}
            </p>
            <div className="progress-bar mt-2">
              <div 
                className="progress-bar-fill warning"
                style={{ width: `${(data.value / data.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
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
            {automationActions.map((action, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                {action.status === 'done' ? (
                  <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
                ) : action.status === 'in-progress' ? (
                  <Clock className="w-5 h-5 text-status-warning shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm">{action.name}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso geral</span>
              <span className="font-semibold">0 / 7 ações</span>
            </div>
            <div className="progress-bar mt-2">
              <div className="progress-bar-fill danger" style={{ width: '0%' }} />
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
