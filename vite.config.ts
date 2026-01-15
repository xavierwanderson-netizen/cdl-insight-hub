import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tabs'],
          'chart-vendor': ['recharts'],
          'views': [
            './src/components/dashboard/views/OverviewView.tsx',
            './src/components/dashboard/views/ServicesView.tsx',
            './src/components/dashboard/views/FinancialView.tsx',
            './src/components/dashboard/views/CustomersView.tsx',
            './src/components/dashboard/views/FunnelView.tsx',
            './src/components/dashboard/views/ProcessesView.tsx',
            './src/components/dashboard/views/PeopleView.tsx',
            './src/components/dashboard/views/ESGView.tsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
