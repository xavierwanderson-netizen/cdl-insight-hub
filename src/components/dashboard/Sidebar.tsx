import { 
  LayoutDashboard, 
  DollarSign, 
  Users, 
  Briefcase, 
  Settings2, 
  GraduationCap, 
  Leaf,
  Target,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'overview' | 'services' | 'financial' | 'customers' | 'funnel' | 'processes' | 'people' | 'esg';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'services', label: 'Serviços', icon: Briefcase },
  { id: 'financial', label: 'Financeiro', icon: DollarSign },
  { id: 'customers', label: 'Clientes', icon: Users },
  { id: 'funnel', label: 'Captação', icon: Target },
  { id: 'processes', label: 'Processos', icon: Settings2 },
  { id: 'people', label: 'Pessoas', icon: GraduationCap },
  { id: 'esg', label: 'ESG', icon: Leaf },
];

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                  <span className="font-display font-bold text-sidebar-primary-foreground text-lg">
                    CDL
                  </span>
                </div>
                <div>
                  <h1 className="font-display font-bold text-lg leading-none">CDL Goiânia</h1>
                  <p className="text-xs text-sidebar-foreground/60 mt-0.5">Gestão à Vista 2026</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-sidebar-accent lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-sidebar-accent rounded-lg p-3">
              <p className="text-xs font-medium text-sidebar-foreground mb-1">Planejamento Estratégico</p>
              <p className="text-xs text-sidebar-foreground/60">
                Acompanhe OKRs e metas em tempo real
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
