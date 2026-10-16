import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderLock,
  CalendarClock,
  BookOpen,
  BarChart3,
  Settings,
  ArrowLeft,
  X,
  Building2,
  CalendarDays,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { Badge } from '../ui/Badge';
import { loadDemoState } from '../../data/sampleData';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const [activeRole, setActiveRole] = useState<'senior' | 'associate' | 'client'>('senior');
  const [deadlines, setDeadlines] = useState(() => loadDemoState().deadlines);

  useEffect(() => {
    const readRole = () => {
      try {
        const r = localStorage.getItem('dhanam_demo_role');
        if (r === 'associate' || r === 'client' || r === 'senior') {
          setActiveRole(r);
        }
      } catch {
        // fallback
      }
    };
    const handleDataChange = () => {
      setDeadlines(loadDemoState().deadlines);
    };

    readRole();
    window.addEventListener('dhanam_demo_role_change', readRole);
    window.addEventListener('dhanam_demo_data_change', handleDataChange);
    return () => {
      window.removeEventListener('dhanam_demo_role_change', readRole);
      window.removeEventListener('dhanam_demo_data_change', handleDataChange);
    };
  }, []);

  const pendingDeadlinesCount = deadlines.filter((d) => d.status !== 'Completed').length;

  const roleLabels = {
    senior: { name: 'K. Ramanathan, FCA', title: 'Senior Partner' },
    associate: { name: 'M. Sowmya', title: 'Tax & Compliance Associate' },
    client: { name: 'Sri Balaji Trading', title: 'Client View' },
  };

  const navItems = [
    {
      label: 'Practice Dashboard',
      path: '/portal/dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      label: 'Client Portfolio',
      path: '/portal/clients',
      icon: Users,
    },
    {
      label: 'Document Vault',
      path: '/portal/documents',
      icon: FolderLock,
    },
    {
      label: 'Statutory Deadlines',
      path: '/portal/deadlines',
      icon: CalendarClock,
      badge: pendingDeadlinesCount > 0 ? `${pendingDeadlinesCount} Due` : '0 Due',
    },
    {
      label: 'Bookkeeping Ledger',
      path: '/portal/bookkeeping',
      icon: BookOpen,
    },
    {
      label: 'Financial Reports',
      path: '/portal/reports',
      icon: BarChart3,
    },
    {
      label: 'Practice Settings',
      path: '/portal/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-subtle flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Accountant Portal Sidebar"
      >
        {/* Brand Area */}
        <div className="p-4 sm:p-5 border-b border-border-subtle flex items-center justify-between">
          <div>
            <BrandLogo size="sm" showTagline={false} to="/portal/dashboard" />
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="sage" size="sm">
                Accountant Portal
              </Badge>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-button text-charcoal hover:bg-surface border border-border-subtle"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Firm Context */}
        <div className="px-4 py-2.5 bg-surface border-b border-border-subtle text-xs text-charcoal-muted flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="w-3.5 h-3.5 text-forest shrink-0" />
            <span className="font-medium text-charcoal truncate">Dhanam & Co. Associates</span>
          </div>
          <span className="text-[10px] bg-white border border-border-subtle px-1.5 py-0.5 rounded font-mono text-charcoal-muted">
            FRN: 014920S
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Portal Navigation">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
            Management Portal
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/portal/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium rounded-button transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                    isActive
                      ? 'bg-sage text-forest-dark font-semibold border border-sage-dark/60'
                      : 'text-charcoal hover:text-forest hover:bg-surface border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0 text-forest" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                      item.badge === '6 Due'
                        ? 'bg-status-error-bg text-status-error border border-[#F5C7C3]'
                        : 'bg-white text-forest border border-border-subtle'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
            Statutory Cutoffs
          </div>

          <div className="mx-1 p-2.5 rounded-button bg-surface border border-border-subtle text-xs space-y-2">
            <div className="flex items-center justify-between text-charcoal font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-forest" />
                GSTR-3B (Sep)
              </span>
              <span className="text-[11px] font-mono text-status-error">20th Oct</span>
            </div>
            <div className="flex items-center justify-between text-charcoal font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-forest" />
                TDS Q2 26Q
              </span>
              <span className="text-[11px] font-mono text-charcoal-muted">31st Oct</span>
            </div>
          </div>
        </nav>

        {/* Bottom Profile & Return to Public Site */}
        <div className="p-3 border-t border-border-subtle space-y-2 bg-white">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-charcoal bg-surface border border-border-subtle rounded-button hover:bg-sage/40 hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <Link
            to="/portal/settings"
            className="p-2.5 rounded-button bg-surface border border-border-subtle/80 flex items-center gap-2.5 hover:border-forest/50 transition-colors block"
          >
            <div className="w-7 h-7 rounded-full bg-forest text-white font-semibold text-xs flex items-center justify-center shrink-0">
              {activeRole === 'senior' ? 'KR' : activeRole === 'associate' ? 'MS' : 'SB'}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-semibold text-charcoal truncate">
                {roleLabels[activeRole].name}
              </p>
              <p className="text-[10px] text-charcoal-muted truncate">
                {roleLabels[activeRole].title}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
