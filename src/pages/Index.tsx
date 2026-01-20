import { useState, lazy, Suspense } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useDashboard } from '@/contexts/DashboardContext';

const OverviewView = lazy(() => import('@/components/dashboard/views/OverviewView').then(m => ({ default: m.OverviewView })));
const ServicesView = lazy(() => import('@/components/dashboard/views/ServicesView').then(m => ({ default: m.ServicesView })));
const FinancialView = lazy(() => import('@/components/dashboard/views/FinancialView').then(m => ({ default: m.FinancialView })));
const CustomersView = lazy(() => import('@/components/dashboard/views/CustomersView').then(m => ({ default: m.CustomersView })));
const FunnelView = lazy(() => import('@/components/dashboard/views/FunnelView').then(m => ({ default: m.FunnelView })));
const ProcessesView = lazy(() => import('@/components/dashboard/views/ProcessesView').then(m => ({ default: m.ProcessesView })));
const PeopleView = lazy(() => import('@/components/dashboard/views/PeopleView').then(m => ({ default: m.PeopleView })));
const ESGView = lazy(() => import('@/components/dashboard/views/ESGView').then(m => ({ default: m.ESGView })));

type TabType = 'overview' | 'services' | 'financial' | 'customers' | 'funnel' | 'processes' | 'people' | 'esg';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useDashboard();

  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'services':
        return <ServicesView />;
      case 'financial':
        return <FinancialView />;
      case 'customers':
        return <CustomersView />;
      case 'funnel':
        return <FunnelView />;
      case 'processes':
        return <ProcessesView />;
      case 'people':
        return <PeopleView />;
      case 'esg':
        return <ESGView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Carregando...</div>}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Atualizando dados...</span>
              </div>
            ) : (
              renderView()
            )}
          </Suspense>
        </main>
        
        <footer className="px-4 lg:px-6 py-3 border-t border-border bg-card/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2026 CDL Goiânia - Painel de Gestão à Vista</span>
            <span>Última atualização: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
