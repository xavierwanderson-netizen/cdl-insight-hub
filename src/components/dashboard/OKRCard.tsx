import { ChevronRight } from 'lucide-react';
import type { OKRData, StatusType } from '@/data/dashboardData';

interface OKRCardProps {
  data: OKRData;
  delay?: number;
}

function ProgressBar({ progress, status }: { progress: number; status: StatusType }) {
  return (
    <div className="progress-bar">
      <div 
        className={`progress-bar-fill ${status}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}

export function OKRCard({ data, delay = 0 }: OKRCardProps) {
  return (
    <div 
      className="dashboard-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-4 bg-primary text-primary-foreground">
        <h3 className="font-display font-semibold text-sm">
          {data.objective}
        </h3>
      </div>
      
      <div className="divide-y divide-border">
        {data.keyResults.map((kr) => (
          <div key={kr.id} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-foreground flex-1 pr-4">
                {kr.description}
              </p>
              <span className={`status-badge ${kr.status} shrink-0`}>
                {kr.status === 'success' ? 'No alvo' : kr.status === 'warning' ? 'Atenção' : 'Crítico'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
              <div>
                <span className="text-muted-foreground">Meta:</span>
                <span className="font-semibold text-foreground ml-1">{kr.target}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Atual:</span>
                <span className="font-semibold text-foreground ml-1">{kr.current}</span>
              </div>
            </div>
            
            <ProgressBar progress={kr.progress} status={kr.status} />
            
            <div className="flex items-center justify-end mt-2">
              <span className="text-xs font-medium text-muted-foreground">
                {kr.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
