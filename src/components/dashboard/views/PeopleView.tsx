import { Users, GraduationCap, Heart, MessageSquare, Target, Award } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2 } from 'lucide-react';
import type { StatusType } from '@/data/dashboardData';

const initiativeCards = [
  {
    title: 'Programa Growth Comercial',
    icon: Target,
    description: 'Cultura de resultado, governança e mentalidade comercial',
    status: 'Em planejamento',
  },
  {
    title: 'Trilha para Líderes',
    icon: Award,
    description: 'Gestão de OKRs, leitura de indicadores, feedback estruturado',
    status: 'Em planejamento',
  },
  {
    title: 'Treinamento NR1',
    icon: Heart,
    description: 'Riscos Psicossociais - Parceria SESI',
    status: 'Análise',
  },
  {
    title: 'Ritual de Liderança',
    icon: MessageSquare,
    description: 'Reunião mensal obrigatória líder-equipe',
    status: 'A implementar',
  },
];

export function PeopleView() {
  const { people, isLoading } = useDashboard();

  // KPIs dinâmicos baseados nos dados reais
  const peopleMetrics = [
    { key: 'colaboradoresTreinados', label: 'Colaboradores Treinados', value: people.colaboradoresTreinados, target: people.colaboradoresTreinadosTarget, unit: '%', icon: GraduationCap },
    { key: 'lideresCapacitados', label: 'Líderes Capacitados', value: people.lideresCapacitados, target: people.lideresCapacitadosTarget, unit: '%', icon: Award },
    { key: 'satisfacaoTreinamentos', label: 'Satisfação Treinamentos', value: people.satisfacaoTreinamentos, target: people.satisfacaoTreinamentosTarget, unit: '%', icon: Heart },
    { key: 'reunioesLideranca', label: 'Reuniões Liderança', value: people.reunioesLideranca, target: people.reunioesLiderancaTarget, unit: '/ano', icon: MessageSquare },
    { key: 'pulsoClima', label: 'Pulso Clima', value: people.pulsoClima, target: people.pulsoClimaTarget, unit: '%', icon: Users },
    { key: 'discAplicado', label: 'DISC Aplicado', value: people.discAplicado, target: people.discAplicadoTarget, unit: '%', icon: Target },
  ];

  // KRs dinâmicos
  const peopleKRs = [
    { id: 'kr63', desc: '80% dos treinamentos com ação prática aplicada', target: `${people.colaboradoresTreinadosTarget}%`, current: `${people.colaboradoresTreinados}%`, status: people.colaboradoresTreinados >= people.colaboradoresTreinadosTarget * 0.5 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr64', desc: '85% de satisfação da equipe com treinamentos', target: `${people.satisfacaoTreinamentosTarget}%`, current: `${people.satisfacaoTreinamentos}%`, status: people.satisfacaoTreinamentos >= people.satisfacaoTreinamentosTarget * 0.9 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr65', desc: '80% dos colaboradores treinados', target: `${people.colaboradoresTreinadosTarget}%`, current: `${people.colaboradoresTreinados}%`, status: people.colaboradoresTreinados >= people.colaboradoresTreinadosTarget * 0.8 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr66', desc: '100% dos líderes capacitados na Trilha', target: `${people.lideresCapacitadosTarget}%`, current: `${people.lideresCapacitados}%`, status: people.lideresCapacitados >= people.lideresCapacitadosTarget * 0.7 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr67', desc: 'Reunião de área mensal em 100% das áreas', target: `${people.reunioesLiderancaTarget}`, current: `${people.reunioesLideranca}`, status: people.reunioesLideranca >= people.reunioesLiderancaTarget * 0.6 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr70', desc: 'Aplicar DISC em 100% dos líderes', target: `${people.discAplicadoTarget}%`, current: `${people.discAplicado}%`, status: people.discAplicado >= people.discAplicadoTarget * 0.3 ? 'warning' as StatusType : 'danger' as StatusType },
    { id: 'kr72', desc: 'Aplicar 4 pesquisas pulso no ano', target: '4', current: `${Math.floor(people.pulsoClima / 25)}`, status: people.pulsoClima >= 50 ? 'warning' as StatusType : 'danger' as StatusType },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de pessoas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Aprendizado, Liderança & Cultura</h2>
        <p className="text-muted-foreground mt-1">Objetivos AC14 e AC15 - Capacitação e Liderança</p>
      </div>

      {/* People KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {peopleMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const progress = metric.unit === '/ano' 
            ? (metric.value / metric.target) * 100 
            : (metric.value / metric.target) * 100;
          const status = progress >= 90 ? 'success' : progress >= 60 ? 'warning' : 'danger';
          
          return (
            <div 
              key={metric.key}
              className={`kpi-card status-${status} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-bold font-display">
                {metric.value}{metric.unit === '%' ? '%' : ''}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Meta: {metric.target}{metric.unit}
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

      {/* Strategic Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {initiativeCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title}
              className="dashboard-card p-5 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="status-badge warning">{card.status}</span>
              </div>
              <h4 className="font-semibold text-sm mb-1">{card.title}</h4>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Key Results */}
      <div className="dashboard-card p-6 animate-fade-in">
        <h3 className="font-display font-semibold text-lg mb-4">Key Results - Pessoas & Aprendizado</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {peopleKRs.map((kr) => (
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
