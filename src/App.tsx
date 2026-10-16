import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public pages
import { Home } from './pages/public/Home';
import { Services } from './pages/public/Services';
import { Calculators } from './pages/public/Calculators';
import { Pricing } from './pages/public/Pricing';
import { Resources } from './pages/public/Resources';
import { ResourceDetail } from './pages/public/ResourceDetail';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { PortalEntry } from './pages/public/PortalEntry';
import { NotFound } from './pages/public/NotFound';

// Portal Dashboard pages
import { PortalDashboard } from './pages/portal/PortalDashboard';
import { PortalClients } from './pages/portal/PortalClients';
import { PortalDocuments } from './pages/portal/PortalDocuments';
import { PortalDeadlines } from './pages/portal/PortalDeadlines';
import { PortalBookkeeping } from './pages/portal/PortalBookkeeping';
import { PortalReports } from './pages/portal/PortalReports';
import { PortalSettings } from './pages/portal/PortalSettings';

import { DocumentTitleHandler } from './components/common/DocumentTitleHandler';

export default function App() {
  return (
    <Router>
      <DocumentTitleHandler />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Pricing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal" element={<PortalEntry />} />
        </Route>

        {/* Portal Dashboard Routes (Isolated Layout) */}
        <Route path="/portal" element={<DashboardLayout />}>
          <Route path="dashboard" element={<PortalDashboard />} />
          <Route path="clients" element={<PortalClients />} />
          <Route path="documents" element={<PortalDocuments />} />
          <Route path="deadlines" element={<PortalDeadlines />} />
          <Route path="bookkeeping" element={<PortalBookkeeping />} />
          <Route path="reports" element={<PortalReports />} />
          <Route path="settings" element={<PortalSettings />} />
        </Route>

        {/* Backward Compatibility Redirects */}
        <Route path="/dashboard" element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="/dashboard/clients" element={<Navigate to="/portal/clients" replace />} />
        <Route path="/dashboard/compliance" element={<Navigate to="/portal/deadlines" replace />} />
        <Route path="/dashboard/invoicing" element={<Navigate to="/portal/reports" replace />} />

        {/* 404 Not Found Page */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
