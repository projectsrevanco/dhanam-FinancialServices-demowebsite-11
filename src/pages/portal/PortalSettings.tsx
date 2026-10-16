import React, { useState, useEffect } from 'react';
import {
  Sliders,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  Building,
  Save,
  User,
  DollarSign,
  Calendar,
  Eye,
  AlertTriangle,
  X,
  Bell,
  LayoutGrid,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  resetDemoStateToDefaults,
  type DemoSettings,
  REPORT_PERIOD_OPTIONS,
} from '../../data/sampleData';

export const PortalSettings: React.FC = () => {
  // Global Demo App State
  const [appState, setAppState] = useState(loadDemoState());
  const [activeRole, setActiveRole] = useState<'senior' | 'associate' | 'client'>('senior');

  // Form Fields for Settings
  const [displayName, setDisplayName] = useState(appState.settings.displayName);
  const [displayCurrency, setDisplayCurrency] = useState<'INR' | 'USD' | 'EUR'>(
    appState.settings.displayCurrency
  );
  const [dateFormat, setDateFormat] = useState<'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'>(
    appState.settings.dateFormat
  );
  const [compactView, setCompactView] = useState(appState.settings.compactView);
  const [enableNotifications, setEnableNotifications] = useState(
    appState.settings.enableNotifications
  );
  const [defaultPeriod, setDefaultPeriod] = useState(appState.settings.defaultPeriod);
  const [firmFRN, setFirmFRN] = useState(appState.settings.firmFRN);
  const [seniorPartner, setSeniorPartner] = useState(appState.settings.seniorPartner);

  // Form Validation & Modal States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Synchronize on external state change
  useEffect(() => {
    const handleSync = () => {
      const updated = loadDemoState();
      setAppState(updated);
      setDisplayName(updated.settings.displayName);
      setDisplayCurrency(updated.settings.displayCurrency);
      setDateFormat(updated.settings.dateFormat);
      setCompactView(updated.settings.compactView);
      setEnableNotifications(updated.settings.enableNotifications);
      setDefaultPeriod(updated.settings.defaultPeriod);
      setFirmFRN(updated.settings.firmFRN);
      setSeniorPartner(updated.settings.seniorPartner);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResetConfirmOpen(false);
      }
    };

    window.addEventListener('dhanam_demo_data_change', handleSync);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('dhanam_demo_data_change', handleSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Load active demo role
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dhanam_demo_role');
      if (saved === 'associate' || saved === 'client' || saved === 'senior') {
        setActiveRole(saved);
      }
    } catch {
      // fallback
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRoleChange = (role: 'senior' | 'associate' | 'client') => {
    setActiveRole(role);
    try {
      localStorage.setItem('dhanam_demo_role', role);
      window.dispatchEvent(new Event('dhanam_demo_role_change'));
    } catch {
      // fallback
    }
    triggerToast(`Switched active perspective to ${role.toUpperCase()}.`);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!displayName.trim()) {
      errs.displayName = 'Display name cannot be empty.';
    } else if (displayName.trim().length > 50) {
      errs.displayName = 'Display name must not exceed 50 characters.';
    }

    if (!firmFRN.trim()) {
      errs.firmFRN = 'Firm registration number is required for practice filing profiles.';
    }

    if (!seniorPartner.trim()) {
      errs.seniorPartner = 'Senior partner name is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newSettings: DemoSettings = {
      displayName: displayName.trim(),
      displayCurrency,
      dateFormat,
      compactView,
      enableNotifications,
      defaultPeriod,
      firmFRN: firmFRN.trim(),
      seniorPartner: seniorPartner.trim(),
    };

    saveDemoState({
      settings: newSettings,
      selectedPeriodKey: defaultPeriod,
    });

    triggerToast('Practice dashboard settings saved and applied across all views.');
  };

  const handleConfirmReset = () => {
    resetDemoStateToDefaults();
    try {
      localStorage.removeItem('dhanam_demo_role');
    } catch {
      // fallback
    }
    setActiveRole('senior');
    setIsResetConfirmOpen(false);
    triggerToast('Practice dataset and settings successfully reset to standard baseline.');
  };

  // Preview formatting helper
  const getFormattedSampleDate = () => {
    const sampleDate = '2026-10-13';
    const [y, m, d] = sampleDate.split('-');
    if (dateFormat === 'MM/DD/YYYY') return `${m}/${d}/${y}`;
    if (dateFormat === 'YYYY-MM-DD') return `${y}-${m}-${d}`;
    return `${d}/${m}/${y}`;
  };

  const getFormattedSampleCurrency = (amount: number) => {
    if (displayCurrency === 'USD') return `$${amount.toLocaleString('en-US')}`;
    if (displayCurrency === 'EUR') return `€${amount.toLocaleString('de-DE')}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest text-white px-5 py-3 rounded-card shadow-lg flex items-center gap-3 text-xs sm:text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80 p-0.5 rounded text-white"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Dashboard & Practice Settings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Configure display preferences, local presentation options, and active practitioner perspectives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="sage" size="md">
            Local Browser Storage
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-status-error" />}
            className="text-status-error border-status-error/30 hover:bg-status-error-bg"
          >
            Reset Practice Data
          </Button>
        </div>
      </div>

      {/* Practice Preferences Notice */}
      <div className="p-4 bg-sage/30 border border-border-subtle rounded-card flex items-start gap-3 text-xs text-charcoal-muted">
        <ShieldAlert className="w-5 h-5 text-forest shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-charcoal block font-semibold text-xs">
            Practice Preferences & Session Settings
          </strong>
          <p>
            Preferences updated below are saved in your browser session storage. Changes to currency formats, date conventions, and active role perspectives update across all dashboard modules.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Role Perspective */}
        <Card className="p-5 sm:p-6 bg-white border border-border-subtle shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-forest" />
                <CardTitle className="text-base">Operational Role Perspective</CardTitle>
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Switch user perspective to inspect portal layout and contextual options.
              </p>
            </div>
            <span className="text-[11px] font-mono text-charcoal-muted bg-surface px-2 py-0.5 rounded border border-border-subtle">
              Role Perspective
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'senior' as const,
                title: 'Senior Managing Accountant',
                name: 'K. Ramanathan, FCA',
                scope: 'Full practice supervision, ledger control, client onboarding, and firm settings.',
              },
              {
                id: 'associate' as const,
                title: 'Tax & Compliance Associate',
                name: 'M. Sowmya (Tax Desk)',
                scope: 'Statutory deadline tracking, document verification, and GSTR/TDS workflows.',
              },
              {
                id: 'client' as const,
                title: 'Client Business Perspective',
                name: 'Sri Balaji Trading (Client Representative)',
                scope: 'Direct view of client-submitted vouchers, invoices, and filing deadlines.',
              },
            ].map((role) => {
              const isSelected = activeRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`p-4 rounded-card border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-forest bg-sage/30 ring-1 ring-forest shadow-xs'
                      : 'border-border-subtle hover:bg-surface/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-charcoal">{role.title}</span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-forest bg-forest' : 'border-border-strong'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-forest font-semibold block mb-1">
                      {role.name}
                    </span>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">{role.scope}</p>
                  </div>

                  <Badge
                    variant={isSelected ? 'forest' : 'neutral'}
                    size="sm"
                    className="mt-3 self-start text-[10px]"
                  >
                    {isSelected ? 'Active Perspective' : 'Click to Switch'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Section 2: Display & Formatting Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 sm:p-6 bg-white border border-border-subtle shadow-xs space-y-5">
            <CardHeader className="p-0 pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-forest" />
                <CardTitle className="text-base">Display & Localization Preferences</CardTitle>
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Customize your display identity, financial currency token, and date rendering formats.
              </p>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Name */}
              <div>
                <Input
                  label="Practitioner Display Name *"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. K. Ramanathan, FCA"
                  error={errors.displayName}
                />
                <span className="text-[11px] text-charcoal-muted mt-1 block">
                  Shown in dashboard greetings, exports, and audit trails.
                </span>
              </div>

              {/* Display Currency */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Display Currency *
                </label>
                <div className="relative">
                  <select
                    value={displayCurrency}
                    onChange={(e) => setDisplayCurrency(e.target.value as 'INR' | 'USD' | 'EUR')}
                    className="w-full text-xs p-2.5 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest appearance-none pr-8"
                  >
                    <option value="INR">₹ Indian Rupee (INR) — Lakhs / Crores (en-IN)</option>
                    <option value="USD">$ US Dollar (USD) — Standard Millions (en-US)</option>
                    <option value="EUR">€ Euro (EUR) — European Format (de-DE)</option>
                  </select>
                  <DollarSign className="w-3.5 h-3.5 text-charcoal-muted absolute right-2.5 top-3 pointer-events-none" />
                </div>
                <span className="text-[11px] text-charcoal-muted mt-1 block">
                  Formats all ledger balances and financial widgets.
                </span>
              </div>

              {/* Date Format */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Date Format *
                </label>
                <div className="relative">
                  <select
                    value={dateFormat}
                    onChange={(e) =>
                      setDateFormat(e.target.value as 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD')
                    }
                    className="w-full text-xs p-2.5 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest appearance-none pr-8"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (Indian Standard — e.g. 13/10/2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US Format — e.g. 10/13/2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Format — e.g. 2026-10-13)</option>
                  </select>
                  <Calendar className="w-3.5 h-3.5 text-charcoal-muted absolute right-2.5 top-3 pointer-events-none" />
                </div>
                <span className="text-[11px] text-charcoal-muted mt-1 block">
                  Applied to deadlines, documents, and ledger tables.
                </span>
              </div>

              {/* Default Reporting Period */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Default Reporting Period *
                </label>
                <select
                  value={defaultPeriod}
                  onChange={(e) => setDefaultPeriod(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  {REPORT_PERIOD_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label} ({opt.description})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-charcoal-muted mt-1 block">
                  Initial filter loaded upon visiting dashboard and reports.
                </span>
              </div>
            </div>

            {/* Practice Details */}
            <div className="pt-4 border-t border-border-subtle">
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-forest" />
                Practice Firm Registration Parameters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Firm Registration No. (FRN) *"
                  value={firmFRN}
                  onChange={(e) => setFirmFRN(e.target.value)}
                  placeholder="e.g. 014920S"
                  error={errors.firmFRN}
                />
                <Input
                  label="Senior Partner / Member *"
                  value={seniorPartner}
                  onChange={(e) => setSeniorPartner(e.target.value)}
                  placeholder="e.g. K. Ramanathan, FCA"
                  error={errors.seniorPartner}
                />
              </div>
            </div>
          </Card>

          {/* Live Preview Card */}
          <Card className="p-5 sm:p-6 bg-surface border border-border-subtle shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-border-subtle mb-4">
                <Eye className="w-4 h-4 text-forest" />
                <CardTitle className="text-sm">Live Format Preview</CardTitle>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-white rounded-card border border-border-subtle space-y-1">
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block font-semibold">
                    Accountant Display
                  </span>
                  <div className="font-bold text-charcoal text-sm">{displayName}</div>
                  <div className="text-[11px] text-forest font-mono">{firmFRN}</div>
                </div>

                <div className="p-3 bg-white rounded-card border border-border-subtle space-y-1">
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block font-semibold">
                    Monetary Rendering ({displayCurrency})
                  </span>
                  <div className="font-mono font-bold text-status-success text-base">
                    {getFormattedSampleCurrency(485200)}
                  </div>
                  <div className="text-[10px] text-charcoal-muted">
                    Net Surplus Balance
                  </div>
                </div>

                <div className="p-3 bg-white rounded-card border border-border-subtle space-y-1">
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block font-semibold">
                    Date Rendering ({dateFormat})
                  </span>
                  <div className="font-mono font-semibold text-charcoal">
                    {getFormattedSampleDate()}
                  </div>
                  <div className="text-[10px] text-charcoal-muted">
                    Statutory Compliance Due Date
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle mt-4 text-[11px] text-charcoal-muted">
              Settings automatically update dashboard calculations and export tables.
            </div>
          </Card>
        </div>

        {/* Section 3: Dashboard Layout & Notification Preferences */}
        <Card className="p-5 sm:p-6 bg-white border border-border-subtle shadow-xs">
          <CardHeader className="p-0 pb-4 border-b border-border-subtle mb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-forest" />
              <CardTitle className="text-base">Dashboard Interaction Preferences</CardTitle>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Configure compact UI density and practice notification badges.
            </p>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compact View Toggle */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-card border border-border-subtle bg-surface/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-charcoal">Compact Table Density</span>
                  <Badge variant={compactView ? 'forest' : 'neutral'} size="sm">
                    {compactView ? 'Enabled' : 'Standard'}
                  </Badge>
                </div>
                <p className="text-[11px] text-charcoal-muted leading-relaxed">
                  Reduces vertical padding across ledger and client data grids to display more records simultaneously.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={compactView}
                  onChange={(e) => setCompactView(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-strong after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-forest" />
              </label>
            </div>

            {/* Notification Badges Toggle */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-card border border-border-subtle bg-surface/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-forest" />
                  <span className="text-xs font-bold text-charcoal">Practice Notifications</span>
                  <Badge variant={enableNotifications ? 'forest' : 'neutral'} size="sm">
                    {enableNotifications ? 'Active' : 'Muted'}
                  </Badge>
                </div>
                <p className="text-[11px] text-charcoal-muted leading-relaxed">
                  Display alert badges for statutory filing alerts and pending document verifications.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={enableNotifications}
                  onChange={(e) => setEnableNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-strong after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-forest" />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-charcoal-muted">
              Changes take effect immediately across all dashboard modules.
            </span>
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Settings
            </Button>
          </div>
        </Card>
      </form>

      {/* Confirmation Modal for Resetting Practice Data */}
      {isResetConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-card shadow-xl border border-border-subtle max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-border-subtle flex items-start gap-3 bg-status-error-bg/30">
              <div className="w-10 h-10 rounded-full bg-status-error-bg border border-status-error/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-status-error" />
              </div>
              <div className="flex-1">
                <h3 id="reset-modal-title" className="text-base font-bold text-charcoal">
                  Confirm Practice Data Reset
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Are you sure you want to reset practice data and restore initial baseline records?
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs text-charcoal-muted">
              <p>
                This action will erase any locally created or edited:
              </p>
              <ul className="list-disc list-inside space-y-1 text-charcoal font-medium pl-1">
                <li>Client profiles & service packages</li>
                <li>Document uploads & statuses</li>
                <li>Statutory compliance deadlines & completion states</li>
                <li>Ledger transactions & vouchers</li>
                <li>Customized display settings & format preferences</li>
              </ul>
              <p className="text-[11px] text-charcoal-muted italic pt-1">
                Standard baseline records will be restored immediately.
              </p>
            </div>

            <div className="p-4 bg-surface border-t border-border-subtle flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsResetConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmReset}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                className="bg-status-error hover:bg-status-error/90 text-white"
              >
                Confirm Reset to Baseline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
