import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { formatCurrency, type RevenueEvolutionData } from '@/data/dashboardData';

interface RevenueChartProps {
  data: RevenueEvolutionData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="dashboard-card p-6 animate-fade-in">
      <div className="dashboard-card-header px-0 pt-0">
        <h3 className="font-display font-semibold text-lg">Evolução do Faturamento</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Meta 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Realizado 2025</span>
          </div>
        </div>
      </div>
      
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Bar 
              dataKey="target2026" 
              name="Meta 2026"
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
              opacity={0.3}
            />
            <Bar 
              dataKey="realized2025" 
              name="Realizado 2025"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="target2026" 
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
