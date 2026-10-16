import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopBar } from './DashboardTopBar';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    if (pathname.includes('/clients')) return 'Client Portfolio & Ledgers';
    if (pathname.includes('/documents')) return 'Document Vault & Tax Records';
    if (pathname.includes('/deadlines')) return 'Statutory Compliance Calendar';
    if (pathname.includes('/bookkeeping')) return 'Bookkeeping & Bank Reconciliation';
    if (pathname.includes('/reports')) return 'Management Accounts & Reports';
    if (pathname.includes('/settings')) return 'Practice Profile & Settings';
    return 'Chartered Accountant Overview';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col text-charcoal">
      <a
        href="#dashboard-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-white focus:rounded-button focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest font-semibold text-xs transition-transform"
      >
        Skip to dashboard content
      </a>
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <DashboardTopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          pageTitle={getPageTitle(location.pathname)}
        />

        <main id="dashboard-main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
