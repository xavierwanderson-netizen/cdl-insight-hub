import type { FunnelStage } from '@/data/dashboardData';
import { formatNumber } from '@/data/utils';

interface FunnelChartProps {
  data: FunnelStage[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <div className="dashboard-card p-6 animate-fade-in">
      <div className="dashboard-card-header px-0 pt-0">
        <h3 className="font-display font-semibold text-lg">Funil de Captação</h3>
      </div>
      
      <div className="space-y-3 mt-4">
        {data.map((stage, index) => {
          const widthPercent = 100 - (index * 15);
          
          return (
            <div key={stage.stage} className="relative">
              <div
                className="relative h-14 rounded-lg flex items-center justify-between px-4 transition-all hover:scale-[1.02]"
                style={{ 
                  width: `${widthPercent}%`,
                  backgroundColor: stage.color,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="text-white font-medium text-sm">{stage.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold">{formatNumber(stage.value)}</span>
                  <span className="text-white/70 text-sm">({stage.percentage}%)</span>
                </div>
              </div>
              
              {index < data.length - 1 && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-0 h-0 -bottom-2 z-10"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: `8px solid ${stage.color}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Taxa de Conversão Total</p>
            <p className="text-2xl font-bold font-display text-status-success">
              {data.length > 0 ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Meta de Conversão</p>
            <p className="text-2xl font-bold font-display text-muted-foreground">
              20%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
