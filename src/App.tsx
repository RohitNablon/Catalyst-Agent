import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import AgentSidebar from './components/layout/AgentSidebar';
import Dashboard from './views/Dashboard';
import ProductActionCenter from './views/ProductActionCenter';
import Competitive from './views/Competitive';
import InnovationLab from './views/InnovationLab';
import TrendRadar from './views/TrendRadar';
import AutonomousRoadmap from './views/AutonomousRoadmap';
import FullReport from './views/FullReport';
import './index.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950">
        {/* Header */}
        <Header />

        {/* Agent Sidebar */}
        <AgentSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`transition-all duration-300 mt-16 ${isSidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/full-report" element={<FullReport />} />
            <Route path="/product-action-center" element={<ProductActionCenter />} />
            <Route path="/competitive" element={<Competitive />} />
            <Route path="/innovation" element={<InnovationLab />} />
            <Route path="/trends" element={<TrendRadar />} />
            <Route path="/roadmap" element={<AutonomousRoadmap />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
