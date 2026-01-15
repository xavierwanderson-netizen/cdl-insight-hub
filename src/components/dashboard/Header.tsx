import { Menu, Bell, Settings, ChevronDown, Calendar, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDashboard } from '@/contexts/DashboardContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { year, setYear, month, setMonth } = useDashboard();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-28 h-9">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={month} onValueChange={(value) => setMonth(value as any)}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os meses</SelectItem>
                <SelectItem value="jan">Janeiro</SelectItem>
                <SelectItem value="fev">Fevereiro</SelectItem>
                <SelectItem value="mar">Março</SelectItem>
                <SelectItem value="abr">Abril</SelectItem>
                <SelectItem value="mai">Maio</SelectItem>
                <SelectItem value="jun">Junho</SelectItem>
                <SelectItem value="jul">Julho</SelectItem>
                <SelectItem value="ago">Agosto</SelectItem>
                <SelectItem value="set">Setembro</SelectItem>
                <SelectItem value="out">Outubro</SelectItem>
                <SelectItem value="nov">Novembro</SelectItem>
                <SelectItem value="dez">Dezembro</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="h-9 gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <RefreshCw className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-danger rounded-full" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              AD
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Diretoria</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
