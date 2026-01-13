import { Users, GraduationCap, Heart, MessageSquare, Target, Award } from 'lucide-react';
import { peopleData } from '@/data/dashboardData';
import type { StatusType } from '@/data/dashboardData';

const peopleKRs = [
  { id: 'kr63', desc: '80% dos treinamentos com ação prática aplicada', target: '80%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr64', desc: '85% de satisfação da equipe com treinamentos', target: '85%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr65', desc: '80% dos colaboradores treinados', target: '80%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr66', desc: '100% dos líderes capacitados na Trilha', target: '100%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr67', desc: 'Reunião de área mensal em 100% das áreas', target: '100%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr68', desc: '85% de realização das reuniões', target: '85%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr70', desc: 'Aplicar DISC em 100% dos líderes', target: '100%', current: '0%', status: 'danger' as StatusType },
  { id: 'kr72', desc: 'Aplicar 4 pesquisas pulso no ano', target: '4', current: '0', status: 'danger' as StatusType },
];

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Aprendizado, Liderança & Cultura</h2>
        <p className="text-muted-foreground mt-1">Objetivos AC14 e AC15 - Capacitação e Liderança</p>
      </div>

      {/* People KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Object.entries(peopleData).map(([key, data], index) => (
          <div 
            key={key}
            className="kpi-card status-warning animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              {key === 'colaboradoresTreinados' && <GraduationCap className="w-4 h-4 text-primary" />}
              {key === 'lideresCapacitados' && <Award className="w-4 h-4 text-primary" />}
              {key === 'satisfacaoTreinamentos' && <Heart className="w-4 h-4 text-primary" />}
              {key === 'reunioesLideranca' && <MessageSquare className="w-4 h-4 text-primary" />}
              {key === 'pulsoClima' && <Users className="w-4 h-4 text-primary" />}
              {key === 'discAplicado' && <Target className="w-4 h-4 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-2xl font-bold font-display">
              {data.value}{data.unit === '%' || data.unit === '% líderes' ? '%' : ''}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Meta: {data.target} {data.unit}
            </p>
          </div>
        ))}
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
