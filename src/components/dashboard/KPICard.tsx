import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import type { KPIData } from '@/data/dashboardData';
import { formatCurrency } from '@/data/dashboardData';
import { formatNumber } from '@/data/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface KPICardProps {
  data: KPIData;
  delay?: number;
}

export function KPICard({ data, delay = 0 }: KPICardProps) {
  const TrendIcon = data.trend === 'up' ? TrendingUp : data.trend === 'down' ? TrendingDown : Minus;
  
  const formatValue = (value: string | number, prefix?: string, unit?: string) => {
    if (typeof value === 'string') return value;
    
    if (prefix === 'R$') {
      return formatCurrency(value);
    }
    
    if (unit === '%') {
      return `${value}%`;
    }
    
    return formatNumber(value);
  };

  const getStatusClasses = () => {
    switch (data.status) {
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'danger':
        return 'status-danger';
      default:
        return '';
    }
  };

  const getTrendClasses = () => {
    switch (data.trend) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      default:
        return 'trend-stable';
    }
  };

  return (
    <div 
      className={`kpi-card ${getStatusClasses()} animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground line-clamp-1">
          {data.label}
        </span>
        <div className="flex items-center gap-1">
          <span className={`status-badge ${data.status}`}>
            {data.status === 'success' ? 'No alvo' : data.status === 'warning' ? 'Atenção' : 'Crítico'}
          </span>
          {data.description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-48">{data.description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold font-display text-foreground">
            {formatValue(data.value, data.prefix, data.unit)}
          </p>
          {data.target && (
            <p className="text-xs text-muted-foreground mt-1">
              Meta: {formatValue(data.target, data.prefix, data.unit)}
            </p>
          )}
        </div>
        
        {data.trendValue && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendClasses()}`}>
            <TrendIcon className="w-4 h-4" />
            <span>{data.trendValue}</span>
          </div>
        )}
      </div>
      
      {data.responsible && (
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
          Responsável: <span className="font-medium">{data.responsible}</span>
        </p>
      )}
    </div>
  );
}
