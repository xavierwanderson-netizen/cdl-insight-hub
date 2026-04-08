import { Users, GraduationCap, Heart, MessageSquare, Target, Award, Loader2 } from 'lucide-react';
import { usePeople, useKPIStatus } from '@/presentation/hooks';
import type { StatusType } from '@/domain/types/common';

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
  const { data: people, isLoading, error } = usePeople();

  // Hooks para cálculos de status
  const colaboradoresStatus = useKPIStatus(
    people?.colaboradoresTreinados ?? null,
    people?.colaboradoresTreinadosTarget ?? null,
    'people'
  );

  const lideresStatus = useKPIStatus(
    people?.lideresCapacitados ?? null,
    people?.lideresCapacitadosTarget ?? null,
    'people'
  );

  const satisfacaoStatus = useKPIStatus(
    people?.satisfacaoTreinamentos ?? null,
    people?.satisfacaoTreinamentosTarget ?? null,
    'people'
  );

  const reunioesStatus = useKPIStatus(
    people?.reunioesLideranca ?? null,
    people?.reunioesLiderancaTarget ?? null,
    'people'
  );

  const pulsoStatus = useKPIStatus(
    people?.pulsoClima ?? null,
    people?.pulsoClimaTarget ?? null,
    'people'
  );

  const discStatus = useKPIStatus(
    people?.discAplicado ?? null,
    people?.discAplicadoTarget ?? null,
    'people'
  );

  const peopleMetrics = !people ? [] : [
    { key: 'colaboradoresTreinados', label: 'Colaboradores Treinados', value: people.colaboradoresTreinados, target: people.colaboradoresTreinadosTarget, unit: '%', icon: GraduationCap, status: colaboradoresStatus },
    { key: 'lideresCapacitados', label: 'Líderes Capacitados', value: people.lideresCapacitados, target: people.lideresCapacitadosTarget, unit: '%', icon: Award, status: lideresStatus },
    { key: 'satisfacaoTreinamentos', label: 'Satisfação Treinamentos', value: people.satisfacaoTreinamentos, target: people.satisfacaoTreinamentosTarget, unit: '%', icon: Heart, status: satisfacaoStatus },
    { key: 'reunioesLideranca', label: 'Reuniões Liderança', value: people.reunioesLideranca, target: people.reunioesLiderancaTarget, unit: '/ano', icon: MessageSquare, status: reunioesStatus },
    { key: 'pulsoClima', label: 'Pulso Clima', value: people.pulsoClima, target: people.pulsoClimaTarget, unit: '%', icon: Users, status: pulsoStatus },
    { key: 'discAplicado', label: 'DISC Aplicado', value: people.discAplicado, target: people.discAplicadoTarget, unit: '%', icon: Target, status: discStatus },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de pessoas...</span>
      </div>
    );
  }

  if (error || !people) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados de pessoas</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
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

          return (
            <div
              key={metric.key}
              className={`kpi-card status-${metric.status} animate-fade-in`}
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
                  className={`progress-bar-fill ${metric.status}`}
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

    </div>
  );
}
