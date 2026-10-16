import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Users,
  FolderLock,
  CalendarClock,
  BookOpen,
  BarChart3,
  LockOpen,
  Sliders,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PortalEntry: React.FC = () => {
  const navigate = useNavigate();

  // Demonstration Role Selector (Visible control, not authentication)
  const [selectedRole, setSelectedRole] = useState<'senior' | 'associate' | 'client'>('senior');

  const roles = [
    {
      id: 'senior' as const,
      name: 'Senior Managing Accountant',
      designation: 'K. Ramanathan, FCA (Senior Partner)',
      description:
        'Full management console access: review all 48 client ledgers, authorize tax return drafts, view cash flow trends, and access firm settings.',
      badge: 'Full Management Scope',
    },
    {
      id: 'associate' as const,
      name: 'Tax & Compliance Associate',
      designation: 'M. Sowmya (Compliance Desk)',
      description:
        'Focus on statutory deadline tracking, monthly GSTR-3B filings, quarterly TDS Form 26Q reconciliations, and document indexing.',
      badge: 'Tax Operations Focus',
    },
    {
      id: 'client' as const,
      name: 'Client Business View',
      designation: 'Sri Balaji Trading & Co. (Retained Client)',
      description:
        'Dedicated client view to monitor monthly management accounts, document verification status, and filing acknowledgments.',
      badge: 'Client Portal Experience',
    },
  ];

  const modules = [
    {
      icon: LayoutDashboard,
      title: 'Practice Overview',
      desc: 'KPI cards, 6-month cashflow charts, and recent statutory filing acknowledgments.',
    },
    {
      icon: Users,
      title: 'Client Portfolio',
      desc: 'Searchable directory of 48 retained corporate and proprietary entities with compliance scores.',
    },
    {
      icon: FolderLock,
      title: 'Document Vault',
      desc: 'Bank statements, invoices, and challan vouchers categorized by fiscal period.',
    },
    {
      icon: CalendarClock,
      title: 'Statutory Deadlines',
      desc: 'Monthly GST (GSTR-1, 3B), quarterly TDS, and advance tax compliance calendar.',
    },
    {
      icon: BookOpen,
      title: 'Bookkeeping Ledger',
      desc: 'Double-entry journal records, debit/credit ledgers, and bank reconciliation balances.',
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      desc: 'Comparative Profit & Loss statements, balance sheets, and aged debtor reports.',
    },
  ];

  const handleEnterDashboard = () => {
    // Save selected role to localStorage for active session
    try {
      localStorage.setItem('dhanam_demo_role', selectedRole);
    } catch {
      // Ignore fallback
    }
    navigate('/portal/dashboard');
  };

  return (
    <div className="py-10 sm:py-16 space-y-12 sm:space-y-16">
      <Container size="md">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle text-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-charcoal hover:text-forest font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <span className="text-charcoal-muted font-mono">
            Environment: Client Portal Workspace
          </span>
        </div>

        {/* Header & Portal Workspace Access Notice */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="sage" size="md">
              Client & Practice Portal
            </Badge>
            <Badge variant="neutral" size="sm">
              Authorized Access
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight font-heading leading-tight">
            Dhanam Practice & Client Portal
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Welcome to the client and practice management console for Dhanam Financial Services. Access accounting ledgers, statutory filing trackers, document archives, and periodic financial reports.
          </p>

          {/* Portal Workspace Access Guide */}
          <div className="p-4 sm:p-5 rounded-card bg-surface border border-border-subtle flex items-start gap-3.5 text-xs text-charcoal">
            <ShieldAlert className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold text-charcoal text-sm">
                Portal Workspace Access & Role Selection
              </strong>
              <p className="text-charcoal-muted leading-relaxed">
                This portal provides authorized account access for Dhanam Financial Services partners, compliance associates, and retained business clients.
              </p>
              <p className="text-charcoal-muted leading-relaxed">
                Select your designated account perspective below to access your corresponding dashboard, records, filing calendars, and financial documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Visible Role Selector */}
        <Card className="p-6 sm:p-8 bg-white border border-border-subtle shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-forest" />
                <CardTitle className="text-base sm:text-lg">Select Account Perspective</CardTitle>
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Choose the workspace perspective to open your dashboard session.
              </p>
            </div>
            <span className="text-[11px] font-mono text-charcoal-muted hidden sm:inline">
              Workspace Role Switcher
            </span>
          </div>

          <div className="space-y-3">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-card border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-forest bg-sage/30 ring-1 ring-forest'
                      : 'border-border-subtle bg-white hover:bg-surface/60'
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedRole(role.id);
                    }
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-forest bg-forest' : 'border-border-strong bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="font-bold text-sm text-charcoal">{role.name}</span>
                      <span className="text-xs text-charcoal-muted font-mono">({role.designation})</span>
                    </div>
                    <p className="text-xs text-charcoal-muted leading-relaxed pl-6">
                      {role.description}
                    </p>
                  </div>

                  <Badge variant={isSelected ? 'forest' : 'neutral'} size="sm" className="self-start sm:self-center shrink-0">
                    {role.badge}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Primary Action Button */}
          <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-charcoal-muted">
              <LockOpen className="w-4 h-4 text-forest shrink-0" />
              <span>Direct workspace access • Active session</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleEnterDashboard}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Enter Portal Dashboard
            </Button>
          </div>
        </Card>

        {/* What You Can Explore Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-charcoal uppercase tracking-wider text-xs">
              Portal Modules & Practice Services
            </h2>
            <span className="text-xs text-charcoal-muted font-mono">7 Connected Views</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-card bg-white border border-border-subtle space-y-1.5"
                >
                  <div className="flex items-center gap-2 font-bold text-charcoal text-xs">
                    <Icon className="w-4 h-4 text-forest" />
                    <span>{mod.title}</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
          <span>Dhanam Financial Services Portal Workspace</span>
          <div className="flex items-center gap-3">
            <Link to="/about" className="hover:text-forest transition-colors">
              About the Practice
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-forest transition-colors">
              Contact Office
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-forest transition-colors">
              Services Catalog
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
