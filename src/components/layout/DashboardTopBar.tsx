import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Calendar,
  ChevronRight,
  Sliders,
  AlertTriangle,
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  loadDemoState,
  saveDemoState,
  type DemoNotification,
} from '../../data/sampleData';

interface DashboardTopBarProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onMenuToggle,
  pageTitle = 'Practice Dashboard',
}) => {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState<'senior' | 'associate' | 'client'>('senior');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<DemoNotification[]>(
    loadDemoState().notifications
  );

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDataChange = () => {
      const state = loadDemoState();
      setNotifications(state.notifications);
    };

    window.addEventListener('dhanam_demo_data_change', handleDataChange);
    return () => {
      window.removeEventListener('dhanam_demo_data_change', handleDataChange);
    };
  }, []);

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

    readRole();
    window.addEventListener('dhanam_demo_role_change', readRole);
    return () => {
      window.removeEventListener('dhanam_demo_role_change', readRole);
    };
  }, []);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowRoleMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const roleDetails = {
    senior: {
      name: 'K. Ramanathan, FCA',
      role: 'Senior Managing Partner',
      initials: 'KR',
    },
    associate: {
      name: 'M. Sowmya',
      role: 'Compliance Associate',
      initials: 'MS',
    },
    client: {
      name: 'Sri Balaji Trading',
      role: 'Client Business View',
      initials: 'SB',
    },
  };

  const handleSwitchRole = (role: 'senior' | 'associate' | 'client') => {
    setActiveRole(role);
    try {
      localStorage.setItem('dhanam_demo_role', role);
      window.dispatchEvent(new Event('dhanam_demo_role_change'));
    } catch {
      // fallback
    }
    setShowRoleMenu(false);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveDemoState({ notifications: updated });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Build clean breadcrumb trail
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/clients')) return 'Client Portfolio';
    if (path.includes('/documents')) return 'Document Vault';
    if (path.includes('/deadlines')) return 'Statutory Deadlines';
    if (path.includes('/bookkeeping')) return 'Bookkeeping Ledger';
    if (path.includes('/reports')) return 'Financial Reports';
    if (path.includes('/settings')) return 'Practice Settings';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border-subtle h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-2xs">
      {/* Left side: Hamburger (mobile) + Breadcrumbs & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-button text-charcoal border border-border-subtle hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest shrink-0"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="space-y-0.5 min-w-0 flex-1">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-charcoal-muted truncate">
            <Link
              to="/portal"
              className="hover:text-forest transition-colors font-medium flex items-center gap-1 shrink-0"
            >
              <span>Portal</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border-strong shrink-0" />
            <span className="font-semibold text-charcoal truncate">{getBreadcrumb()}</span>
          </nav>

          <h1 className="text-xs sm:text-base font-bold text-charcoal tracking-tight font-heading leading-tight truncate">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right side: Portal status indicator + FY pill + User Menu */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Portal Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sage border border-sage-dark/60 text-[11px] text-forest font-semibold">
          <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
          <span>Portal Online • Active Session</span>
        </div>

        {/* FY Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-button bg-surface border border-border-subtle text-xs text-charcoal font-medium">
          <Calendar className="w-3.5 h-3.5 text-forest" />
          <span>FY 2025–26</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifMenuRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-button text-charcoal border border-border-subtle hover:bg-surface hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            aria-label={`View notifications (${unreadCount} unread)`}
            aria-expanded={showNotifications}
            aria-haspopup="true"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-error ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div
              role="region"
              aria-label="Practice Notifications"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-border-subtle rounded-card shadow-lg z-50 text-xs overflow-hidden"
            >
              <div className="p-3 border-b border-border-subtle flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal">Filing Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-forest text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-forest hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-border-subtle">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-charcoal-muted">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 space-y-1 transition-colors ${
                        notif.read ? 'bg-white' : 'bg-sage/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {notif.priority === 'urgent' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-status-error shrink-0" />
                          ) : notif.priority === 'warning' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          ) : (
                            <Info className="w-3.5 h-3.5 text-forest shrink-0" />
                          )}
                          <span className="font-bold text-charcoal text-xs">
                            {notif.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-charcoal-muted font-mono whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal-muted leading-relaxed">
                        {notif.message}
                      </p>
                      {notif.link && (
                        <div className="pt-1">
                          <Link
                            to={notif.link}
                            onClick={() => setShowNotifications(false)}
                            className="text-[11px] font-semibold text-forest hover:underline inline-flex items-center gap-1"
                          >
                            <span>Open in portal</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-border-subtle bg-surface text-center">
                <span className="text-[10px] text-charcoal-muted font-mono">
                  Practice compliance alerts & filing updates
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Menu Dropdown */}
        <div className="relative" ref={roleMenuRef}>
          <button
            type="button"
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-button border border-border-subtle hover:bg-surface hover:border-forest/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest text-left"
            aria-expanded={showRoleMenu}
            aria-haspopup="true"
          >
            <div className="w-7 h-7 rounded-full bg-forest text-white font-semibold text-xs flex items-center justify-center shrink-0">
              {roleDetails[activeRole].initials}
            </div>
            <div className="hidden md:block min-w-0">
              <span className="block text-xs font-bold text-charcoal truncate">
                {roleDetails[activeRole].name}
              </span>
              <span className="block text-[10px] text-charcoal-muted truncate">
                {roleDetails[activeRole].role}
              </span>
            </div>
          </button>

          {/* User & Role Dropdown Menu */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-border-subtle rounded-card shadow-lg p-2 z-50 text-xs">
              <div className="p-2 border-b border-border-subtle mb-1">
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-bold block">
                  Active Perspective
                </span>
                <span className="font-bold text-charcoal block mt-0.5">
                  {roleDetails[activeRole].name}
                </span>
                <span className="text-charcoal-muted text-[11px]">
                  {roleDetails[activeRole].role}
                </span>
              </div>

              <div className="py-1 space-y-1">
                <span className="text-[10px] text-charcoal-muted px-2 font-medium block">
                  Switch Account View:
                </span>
                <button
                  type="button"
                  onClick={() => handleSwitchRole('senior')}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    activeRole === 'senior' ? 'bg-sage text-forest font-bold' : 'hover:bg-surface'
                  }`}
                >
                  <span>Senior Managing Partner</span>
                  {activeRole === 'senior' && <span className="text-[10px]">Active</span>}
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchRole('associate')}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    activeRole === 'associate' ? 'bg-sage text-forest font-bold' : 'hover:bg-surface'
                  }`}
                >
                  <span>Tax & Compliance Associate</span>
                  {activeRole === 'associate' && <span className="text-[10px]">Active</span>}
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchRole('client')}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    activeRole === 'client' ? 'bg-sage text-forest font-bold' : 'hover:bg-surface'
                  }`}
                >
                  <span>Client Business View</span>
                  {activeRole === 'client' && <span className="text-[10px]">Active</span>}
                </button>
              </div>

              <div className="pt-2 border-t border-border-subtle mt-1 flex flex-col gap-1">
                <Link
                  to="/portal/settings"
                  onClick={() => setShowRoleMenu(false)}
                  className="px-2 py-1.5 rounded text-charcoal hover:text-forest hover:bg-surface transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Practice Settings</span>
                </Link>
                <Link
                  to="/"
                  onClick={() => setShowRoleMenu(false)}
                  className="px-2 py-1.5 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface transition-colors"
                >
                  Exit to Public Website
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
