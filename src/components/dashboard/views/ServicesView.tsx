import { ServiceTable } from '../ServiceTable';
import { RevenueChart } from '../RevenueChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Loader2 } from 'recharts';
import { useServices, useRevenueEvolution } from '@/presentation/hooks';
import { formatCurrency } from '@/shared/utils/parsing';

export function ServicesView() {
  const { data: services, isLoading, error } = useServices('2026');
  const { data: revenueEvolution } = useRevenueEvolution();

  const serviceComparison = services
    ? services.slice(0, 6).map(s => ({
        name: s.name.length > 15 ? s.name.substring(0, 12) + '...' : s.name,
        realizado: s.revenue,
        meta: s.revenueTarget,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados de serviços...</span>
      </div>
    );
  }

  if (error || !services) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        <p className="font-medium">Erro ao carregar dados de serviços</p>
        <p className="text-sm mt-1">{error?.message || 'Dados não disponíveis'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Performance de Serviços</h2>
        <p className="text-muted-foreground mt-1">Acompanhamento comercial e receita por serviço</p>
      </div>

      {/* Revenue Evolution */}
      <RevenueChart data={revenueEvolution} />

      {/* Service Comparison Chart */}
      <div className="dashboard-card p-6 animate-fade-in">
        <h3 className="font-display font-semibold text-lg mb-4">Comparativo de Serviços</h3>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={serviceComparison}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar 
                dataKey="meta" 
                name="Meta 2026"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                opacity={0.4}
              />
              <Bar 
                dataKey="realizado" 
                name="Realizado"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Table */}
      <ServiceTable services={services} />

      {/* Service Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.slice(0, 6).map((service, index) => {
          const progress = service.revenueTarget > 0 ? (service.revenue / service.revenueTarget) * 100 : 0;
          const statusClass = progress >= 90 ? 'success' : progress >= 60 ? 'warning' : 'danger';

          return (
            <div
              key={service.id}
              className="dashboard-card p-4 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{service.name}</h4>
                <span className={`status-badge ${statusClass}`}>
                  {statusClass === 'success' ? 'No alvo' : statusClass === 'warning' ? 'Atenção' : 'Crítico'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Quantidade</p>
                  <p className="font-semibold">{service.quantity} / {service.quantityTarget.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ticket Médio</p>
                  <p className="font-semibold">{formatCurrency(service.ticketMedio)}</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Faturamento</span>
                  <span>{Math.min(progress, 100).toFixed(0)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${statusClass}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Meta: {formatCurrency(service.revenueTarget)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
