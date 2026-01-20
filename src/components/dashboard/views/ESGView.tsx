import { Leaf, Recycle, Heart, FileCheck, Target } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2 } from 'lucide-react';

export function ESGView() {
  const { esg, isLoading } = useDashboard();

  // Iniciativas ESG dinâmicas
  const esgInitiatives = [
    {
      title: 'Coleta de Lixo Eletrônico',
      description: 'Programa de coleta e descarte responsável de equipamentos eletrônicos',
      target: `${esg.lixoEletronicoTarget} toneladas/ano`,
      current: `${esg.lixoEletronico} toneladas`,
      progress: (esg.lixoEletronico / esg.lixoEletronicoTarget) * 100,
      status: esg.lixoEletronico >= esg.lixoEletronicoTarget * 0.5 ? 'warning' : 'danger',
      icon: Recycle,
    },
    {
      title: 'Ações Sociais',
      description: 'Projetos de responsabilidade social com a comunidade',
      target: `${esg.acoesSociaisTarget} ações/ano`,
      current: `${esg.acoesSociais} ações`,
      progress: (esg.acoesSociais / esg.acoesSociaisTarget) * 100,
      status: esg.acoesSociais >= esg.acoesSociaisTarget * 0.5 ? 'warning' : 'danger',
      icon: Heart,
    },
    {
      title: 'Projetos ESG Ativos',
      description: 'Iniciativas ambientais, sociais e de governança',
      target: `${esg.projetosESGTarget} projetos`,
      current: `${esg.projetosESG} projetos`,
      progress: (esg.projetosESG / esg.projetosESGTarget) * 100,
      status: esg.projetosESG >= esg.projetosESGTarget * 0.6 ? 'warning' : 'danger',
      icon: Leaf,
    },
    {
      title: 'Política ESG',
      description: 'Documentação e implementação da política ESG institucional',
      target: '100%',
      current: esg.politicaESG === 'implemented' ? '100%' : esg.politicaESG === 'in_progress' ? '50%' : '0%',
      progress: esg.politicaESG === 'implemented' ? 100 : esg.politicaESG === 'in_progress' ? 50 : 0,
      status: esg.politicaESG === 'implemented' ? 'success' : 'warning',
      icon: FileCheck,
    },
  ];

  const sustainabilityGoals = [
    { name: 'Redução consumo papel', target: '-30%', current: `${Math.round((esg.projetosESG / esg.projetosESGTarget) * 30)}%`, progress: (esg.projetosESG / esg.projetosESGTarget) * 100, icon: '📄' },
    { name: 'Práticas sustentáveis', target: '5 ações', current: `${esg.projetosESG}`, progress: (esg.projetosESG / 5) * 100, icon: '🌱' },
    { name: 'Revisão fornecedores', target: '100%', current: `${Math.round((esg.acoesSociais / esg.acoesSociaisTarget) * 100)}%`, progress: (esg.acoesSociais / esg.acoesSociaisTarget) * 100, icon: '🤝' },
    { name: 'Gestão de resíduos', target: '100%', current: `${Math.round((esg.lixoEletronico / esg.lixoEletronicoTarget) * 100)}%`, progress: (esg.lixoEletronico / esg.lixoEletronicoTarget) * 100, icon: '♻️' },
  ];

  const policyProgress = esg.politicaESG === 'implemented' ? 100 : esg.politicaESG === 'in_progress' ? 50 : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados ESG...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">ESG - Ambiental, Social & Governança</h2>
        <p className="text-muted-foreground mt-1">Sustentabilidade e Responsabilidade Corporativa</p>
      </div>

      {/* Main ESG Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {esgInitiatives.map((initiative, index) => {
          const Icon = initiative.icon;
          return (
            <div 
              key={initiative.title}
              className={`kpi-card status-${initiative.status} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-status-success" />
                </div>
              </div>
              <h4 className="font-semibold text-sm mb-1">{initiative.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{initiative.description}</p>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Atual: {initiative.current}</span>
                  <span className="font-semibold">Meta: {initiative.target}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-bar-fill ${initiative.status}`}
                    style={{ width: `${Math.min(initiative.progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sustainability Goals & Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sustainability Goals */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-status-success" />
            <h3 className="font-display font-semibold text-lg">Metas de Sustentabilidade</h3>
          </div>
          
          <div className="space-y-4">
            {sustainabilityGoals.map((goal) => (
              <div key={goal.name} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{goal.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{goal.name}</p>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Atual: {goal.current}</span>
                      <span className="font-semibold">Meta: {goal.target}</span>
                    </div>
                  </div>
                </div>
                <div className="progress-bar mt-2">
                  <div 
                    className={`progress-bar-fill ${goal.progress >= 50 ? 'warning' : 'danger'}`}
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESG Policy Status */}
        <div className="dashboard-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">Status da Política ESG</h3>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={policyProgress >= 100 ? 'hsl(var(--status-success))' : 'hsl(var(--status-warning))'}
                    strokeWidth="8"
                    strokeDasharray={`${policyProgress * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold font-display">{policyProgress}%</span>
                  <span className="text-xs text-muted-foreground">Concluído</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Diagnóstico inicial', done: policyProgress >= 20 },
                { name: 'Definição de objetivos', done: policyProgress >= 35 },
                { name: 'Elaboração da política', done: policyProgress >= 50 },
                { name: 'Aprovação diretoria', done: policyProgress >= 70 },
                { name: 'Implementação', done: policyProgress >= 90 },
                { name: 'Comunicação interna', done: policyProgress >= 100 },
              ].map((step) => (
                <div key={step.name} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.done ? 'bg-status-success' : 'bg-muted'}`}>
                    {step.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="dashboard-card p-6 animate-fade-in">
        <h3 className="font-display font-semibold text-lg mb-4">Impacto ESG 2026</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-status-success/5 rounded-lg border border-status-success/20">
            <Recycle className="w-10 h-10 mx-auto text-status-success mb-3" />
            <p className="text-3xl font-bold font-display text-status-success">{esg.lixoEletronico}t</p>
            <p className="text-sm text-muted-foreground mt-1">de {esg.lixoEletronicoTarget}t lixo eletrônico</p>
          </div>
          
          <div className="text-center p-6 bg-status-warning/5 rounded-lg border border-status-warning/20">
            <Heart className="w-10 h-10 mx-auto text-status-warning mb-3" />
            <p className="text-3xl font-bold font-display text-status-warning">{esg.acoesSociais}</p>
            <p className="text-sm text-muted-foreground mt-1">de {esg.acoesSociaisTarget} ações sociais</p>
          </div>
          
          <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
            <Target className="w-10 h-10 mx-auto text-primary mb-3" />
            <p className="text-3xl font-bold font-display text-primary">{esg.projetosESG}</p>
            <p className="text-sm text-muted-foreground mt-1">de {esg.projetosESGTarget} projetos ESG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
