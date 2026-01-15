import { ChevronRight, TrendingUp } from 'lucide-react';
import type { ServiceData, StatusType } from '@/data/dashboardData';
import { formatCurrency } from '@/data/dashboardData';
import { formatNumber } from '@/data/utils';

interface ServiceTableProps {
  services: ServiceData[];
}

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={`status-badge ${status}`}>
      {status === 'success' ? 'No alvo' : status === 'warning' ? 'Atenção' : 'Crítico'}
    </span>
  );
}

function ProgressBar({ current, target, status }: { current: number; target: number; status: StatusType }) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  
  return (
    <div className="w-full">
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill ${status}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground mt-1">{percentage.toFixed(0)}%</span>
    </div>
  );
}

export function ServiceTable({ services }: ServiceTableProps) {
  return (
    <div className="dashboard-card overflow-hidden animate-fade-in">
      <div className="dashboard-card-header">
        <h3 className="font-display font-semibold text-lg">Performance de Serviços</h3>
        <span className="text-sm text-muted-foreground">Meta 2026</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serviço</th>
              <th className="text-right">Quantidade</th>
              <th className="text-right">Faturamento</th>
              <th className="text-right">Ticket Médio</th>
              <th className="text-center">Progresso</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="group cursor-pointer">
                <td className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{service.name}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
                <td className="text-right">
                  <div className="text-sm">
                    <span className="font-semibold">{formatNumber(service.quantity)}</span>
                    <span className="text-muted-foreground"> / {formatNumber(service.quantityTarget)}</span>
                  </div>
                </td>
                <td className="text-right">
                  <div className="text-sm">
                    <span className="font-semibold">{formatCurrency(service.revenue)}</span>
                    <span className="text-muted-foreground"> / {formatCurrency(service.revenueTarget)}</span>
                  </div>
                </td>
                <td className="text-right font-medium">
                  {formatCurrency(service.ticketMedio)}
                </td>
                <td className="w-32">
                  <ProgressBar 
                    current={service.revenue} 
                    target={service.revenueTarget} 
                    status={service.status}
                  />
                </td>
                <td className="text-center">
                  <StatusBadge status={service.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
