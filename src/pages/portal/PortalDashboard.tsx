import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  FolderLock,
  CalendarClock,
  ArrowRight,
  Plus,
  CheckCircle2,
  BarChart3,
  DollarSign,
  X,
  CreditCard,
  Calendar,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  computeDashboardMetrics,
  formatCurrencyINR,
  formatDateDisplay,
  REPORT_PERIOD_OPTIONS,
  type FictionalClient,
  type FictionalDocument,
  type FictionalTransaction,
  type DemoAppState,
} from '../../data/sampleData';

export const PortalDashboard: React.FC = () => {
  const navigate = useNavigate();

  // 1. Centralized Local State
  const [appState, setAppState] = useState<DemoAppState>(loadDemoState);
  const [selectedPeriodKey, setSelectedPeriodKey] = useState<string>(
    appState.selectedPeriodKey || 'current-month'
  );
  const [activeRoleName, setActiveRoleName] = useState('K. Ramanathan, FCA');
  const [activeRoleTitle, setActiveRoleTitle] = useState('Senior Managing Partner');

  // Modals state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddTxnModal, setShowAddTxnModal] = useState(false);
  const [showChartTable, setShowChartTable] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states - New Client
  const [newClientName, setNewClientName] = useState('');
  const [newClientType, setNewClientType] = useState<FictionalClient['entityType']>('Private Limited');
  const [newClientPan, setNewClientPan] = useState('');
  const [newClientGstin, setNewClientGstin] = useState('');
  const [newClientRetainer, setNewClientRetainer] = useState('8500');

  // Form states - New Transaction
  const [newTxnClientId, setNewTxnClientId] = useState('');
  const [newTxnType, setNewTxnType] = useState<'income' | 'expense'>('income');
  const [newTxnCategory, setNewTxnCategory] = useState('Retainer Accounting Fees');
  const [newTxnAmount, setNewTxnAmount] = useState('12000');
  const [newTxnDesc, setNewTxnDesc] = useState('');

  // Read role from localStorage and setup Escape listener
  useEffect(() => {
    const updateRole = () => {
      try {
        const role = localStorage.getItem('dhanam_demo_role');
        if (role === 'associate') {
          setActiveRoleName('M. Sowmya');
          setActiveRoleTitle('Tax & Compliance Associate');
        } else if (role === 'client') {
          setActiveRoleName('Sri Balaji Trading');
          setActiveRoleTitle('Client View Perspective');
        } else {
          setActiveRoleName('K. Ramanathan, FCA');
          setActiveRoleTitle('Senior Managing Partner');
        }
      } catch {
        // fallback
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddClientModal(false);
        setShowAddTxnModal(false);
      }
    };

    updateRole();
    window.addEventListener('dhanam_demo_role_change', updateRole);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('dhanam_demo_role_change', updateRole);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Compute derived metrics whenever state or selected period changes
  const metrics = useMemo(() => {
    return computeDashboardMetrics(appState, selectedPeriodKey);
  }, [appState, selectedPeriodKey]);

  // Handle reporting period selection change
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = e.target.value;
    setSelectedPeriodKey(newKey);
    const updated = { ...appState, selectedPeriodKey: newKey };
    setAppState(updated);
    saveDemoState({ selectedPeriodKey: newKey });
    showToast(`Reporting period updated to: ${REPORT_PERIOD_OPTIONS.find((p) => p.key === newKey)?.label}`);
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Client Handler
  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newClient: FictionalClient = {
      id: `CLI-0${appState.clients.length + 1}`,
      name: newClientName,
      tradeName: newClientName,
      pan: newClientPan.toUpperCase() || 'AABCA1234F',
      gstin: newClientGstin.toUpperCase() || '37AABCA1234F1Z5',
      contactPerson: 'Director / Authorized Signatory',
      contactEmail: 'accounts@clientbusiness.in',
      contactPhone: '+91 98480 11223',
      entityType: newClientType,
      industry: 'General Enterprise & Services',
      servicePackage: 'Growth Tax Compliance',
      documentCompletionStatus: 'Pending Review',
      status: 'active',
      monthlyRetainer: Number(newClientRetainer) || 6000,
      complianceScore: 100,
      assignedAccountant: activeRoleName,
      onboardingDate: '2026-10-13',
      activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'Monthly Books'],
    };

    // Also record a welcome activity transaction
    const newTxn: FictionalTransaction = {
      id: `TXN-${700 + appState.transactions.length + 1}`,
      clientId: newClient.id,
      clientName: newClient.name,
      date: '2026-10-13',
      type: 'income',
      category: 'Onboarding & Retainer Fee',
      description: `Initial client onboarding & setup retainer for ${newClient.name}`,
      amount: newClient.monthlyRetainer,
      status: 'reconciled',
      paymentMethod: 'UPI',
      voucherNo: `RC-2026-${114 + appState.transactions.length}`,
      period: '2026-10',
    };

    const updatedState: DemoAppState = {
      ...appState,
      clients: [newClient, ...appState.clients],
      transactions: [newTxn, ...appState.transactions],
    };

    setAppState(updatedState);
    saveDemoState(updatedState);
    setShowAddClientModal(false);
    setNewClientName('');
    setNewClientPan('');
    setNewClientGstin('');
    showToast(`Added client "${newClient.name}" and recorded onboarding retainer entry.`);
  };

  // Add Transaction Handler
  const handleAddTxnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetClient = appState.clients.find((c) => c.id === newTxnClientId) || appState.clients[0];
    const amountNum = Number(newTxnAmount) || 5000;

    const newTxn: FictionalTransaction = {
      id: `TXN-${700 + appState.transactions.length + 1}`,
      clientId: targetClient.id,
      clientName: targetClient.name,
      date: '2026-10-13',
      type: newTxnType,
      category: newTxnCategory,
      description: newTxnDesc || `${newTxnType === 'income' ? 'Received fee from' : 'Disbursed for'} ${targetClient.name}`,
      amount: amountNum,
      status: 'reconciled',
      paymentMethod: 'NEFT/RTGS',
      voucherNo: `VR-2026-${120 + appState.transactions.length}`,
      period: '2026-10',
    };

    const updatedState: DemoAppState = {
      ...appState,
      transactions: [newTxn, ...appState.transactions],
    };

    setAppState(updatedState);
    saveDemoState(updatedState);
    setShowAddTxnModal(false);
    setNewTxnDesc('');
    showToast(`Recorded ${newTxnType === 'income' ? 'income' : 'expense'} entry of ${formatCurrencyINR(amountNum)}.`);
  };

  // Mark Deadline Complete Simulation
  const handleMarkDeadlineComplete = (id: string, title: string) => {
    const updatedDeadlines = appState.deadlines.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          completedCount: Math.min(d.clientsAffectedCount, d.completedCount + 1),
          status: (d.completedCount + 1 >= d.clientsAffectedCount ? 'completed' : d.status) as any,
        };
      }
      return d;
    });

    const updatedState = { ...appState, deadlines: updatedDeadlines };
    setAppState(updatedState);
    saveDemoState(updatedState);
    showToast(`Recorded statutory filing progress for "${title}".`);
  };

  // Category Document Statistics
  const documentCategoryStats = useMemo(() => {
    const categories: Array<FictionalDocument['category']> = [
      'Bank Statements',
      'Sales Invoices',
      'Purchase Vouchers',
      'Tax Challans',
      'Statutory Registrations',
    ];

    return categories.map((cat) => {
      const items = appState.documents.filter((d) => d.category === cat);
      const verified = items.filter((d) => d.status === 'Approved').length;
      const pending = items.filter((d) => d.status === 'Under Review' || d.status === 'Requested').length;
      return {
        category: cat,
        total: items.length,
        verified,
        pending,
        percent: items.length > 0 ? Math.round((verified / items.length) * 100) : 100,
      };
    });
  }, [appState.documents]);

  const activePeriodInfo = REPORT_PERIOD_OPTIONS.find((p) => p.key === selectedPeriodKey);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 bg-sage border border-sage-dark/60 rounded-card text-xs text-forest-dark flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-forest hover:text-forest-dark font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 1. WELCOME HEADER & REPORTING PERIOD SELECTOR                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-card border border-border-subtle shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
              Accountant Practice Console
            </h1>
            <Badge variant="sage" size="sm">
              v2.0
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted flex items-center gap-2">
            <span>Logged in as:</span>
            <strong className="text-charcoal font-semibold">{activeRoleName}</strong>
            <span className="text-charcoal-muted font-mono">({activeRoleTitle})</span>
          </p>
        </div>

        {/* Reporting Period Selector Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-surface p-2 rounded-card border border-border-subtle">
          <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-charcoal-muted">
            <Calendar className="w-3.5 h-3.5 text-forest" />
            <span>Reporting Cycle:</span>
          </div>

          <select
            id="dashboard-reporting-period"
            value={selectedPeriodKey}
            onChange={handlePeriodChange}
            className="text-xs font-semibold text-charcoal bg-white border border-border-subtle rounded-button px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest shadow-2xs cursor-pointer"
            aria-label="Select reporting cycle"
          >
            {REPORT_PERIOD_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. SUMMARY CARDS DERIVED FROM SAMPLE DATA                           */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Demo Clients */}
        <Link
          to="/portal/clients"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-card block"
          title="Open Client Directory"
        >
          <Card className="p-4 sm:p-5 h-full hover:border-forest/50 hover:shadow-sm transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted truncate">
                Retained Clients
              </span>
              <div className="w-8 h-8 rounded-button bg-sage text-forest flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-heading">
              {metrics.totalClientsCount}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
              <span>
                <strong className="text-charcoal font-semibold">{metrics.activeClientsCount} active</strong> • {metrics.pendingOnboardingCount} onboarding
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-forest opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </Card>
        </Link>

        {/* Card 2: Pending Document Review */}
        <Link
          to="/portal/documents"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-card block"
          title="Inspect Document Vault"
        >
          <Card className="p-4 sm:p-5 h-full hover:border-forest/50 hover:shadow-sm transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted truncate">
                Pending Documents
              </span>
              <div className="w-8 h-8 rounded-button bg-sage text-forest flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FolderLock className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-heading">
              {metrics.pendingDocumentsCount}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
              <span>
                {metrics.approvedDocumentsCount} approved • <strong className="text-status-error">{metrics.flaggedDocumentsCount} requested</strong>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-forest opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </Card>
        </Link>

        {/* Card 3: Upcoming Deadlines */}
        <Link
          to="/portal/deadlines"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-card block"
          title="Open Compliance Calendar"
        >
          <Card className="p-4 sm:p-5 h-full hover:border-forest/50 hover:shadow-sm transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted truncate">
                Statutory Deadlines
              </span>
              <div className="w-8 h-8 rounded-button bg-status-error-bg text-status-error flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CalendarClock className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-heading">
              {metrics.urgentDeadlinesCount} Urgent
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
              <span>
                {metrics.approachingDeadlinesCount} approaching • <strong className="text-status-error">{metrics.overdueDeadlinesCount} overdue</strong>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-forest opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </Card>
        </Link>

        {/* Card 4: Current-Period Income vs Expenses */}
        <Link
          to="/portal/reports"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-card block"
          title="Open Financial Reports"
        >
          <Card className="p-4 sm:p-5 h-full hover:border-forest/50 hover:shadow-sm transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted truncate">
                Period Net Margin
              </span>
              <div className="w-8 h-8 rounded-button bg-sage text-forest flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-extrabold text-forest tracking-tight font-heading">
              {formatCurrencyINR(metrics.periodNetProfit)}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
              <span className="truncate">
                Income: {formatCurrencyINR(metrics.periodIncome)} ({metrics.periodMarginPercentage}%)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-forest opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </Card>
        </Link>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. MONTHLY INCOME & EXPENSE CHART (Recharts)                         */}
      {/* ------------------------------------------------------------------- */}
      <Card className="p-5 sm:p-6 bg-white border border-border-subtle shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-forest" />
              <CardTitle className="text-base font-bold text-charcoal">
                Practice Cashflow & Monthly Operating Margin
              </CardTitle>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Invoiced Retainer Revenue vs Operating Practice Expenses (INR ₹) across 6 deterministic months.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="text-[11px] font-mono text-charcoal-muted bg-surface px-2 py-1 rounded border border-border-subtle">
              Period Filter: {activePeriodInfo?.label}
            </span>
          </div>
        </div>

        {/* Accessible Screen-Reader Summary */}
        <div className="sr-only" aria-live="polite">
          Practice Cashflow and Operating Margin chart comparing monthly income and expenses across 6 months. Current period net margin is {formatCurrencyINR(metrics.periodNetProfit)}.
        </div>

        {/* Recharts Bar Chart */}
        <div
          className="h-64 sm:h-72 w-full pt-2"
          role="img"
          aria-label="Practice Cashflow & Monthly Operating Margin Bar Chart"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metrics.chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#4B5563', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#DFE5E0' }}
              />
              <YAxis
                tick={{ fill: '#4B5563', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#DFE5E0' }}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrencyINR(Number(value) || 0), 'Amount']}
                labelFormatter={(label) => `Fiscal Month: ${label}`}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#DFE5E0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar
                dataKey="income"
                name="Invoiced Retainers (Income)"
                fill="#245C45"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="expenses"
                name="Operating Expenses"
                fill="#C87A54"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabular Financial Breakdown Toggle */}
        <div className="mt-4 pt-4 border-t border-border-subtle flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-charcoal-muted">
            <span>
              Current Period Net Inflow:{' '}
              <strong className="text-forest font-bold">
                {formatCurrencyINR(metrics.periodNetProfit)}
              </strong>{' '}
              (Operating expenses:{' '}
              <strong className="text-charcoal font-semibold">
                {formatCurrencyINR(metrics.periodExpenses)}
              </strong>
              )
            </span>
            <button
              type="button"
              onClick={() => setShowChartTable(!showChartTable)}
              className="text-forest font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5 self-start sm:self-auto"
              aria-expanded={showChartTable}
              aria-controls="chart-tabular-data-dashboard"
            >
              {showChartTable ? 'Hide Table View' : 'Show Data Table View'}
            </button>
          </div>

          {showChartTable && (
            <div id="chart-tabular-data-dashboard" className="overflow-x-auto border border-border-subtle rounded-card mt-1">
              <table className="w-full min-w-[500px] text-left text-xs border-collapse">
                <caption className="sr-only">Monthly Practice Cashflow Numerical Table</caption>
                <thead className="bg-surface text-charcoal-muted uppercase tracking-wider font-semibold border-b border-border-subtle">
                  <tr>
                    <th scope="col" className="py-2 px-3">Fiscal Month</th>
                    <th scope="col" className="py-2 px-3 text-right">Inflow (₹)</th>
                    <th scope="col" className="py-2 px-3 text-right">Outflow (₹)</th>
                    <th scope="col" className="py-2 px-3 text-right">Net Margin (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {metrics.chartData.map((row) => (
                    <tr key={row.period} className="hover:bg-surface/50">
                      <td className="py-2 px-3 font-medium text-charcoal">{row.label}</td>
                      <td className="py-2 px-3 text-right font-mono text-status-success">{formatCurrencyINR(row.income)}</td>
                      <td className="py-2 px-3 text-right font-mono text-charcoal">{formatCurrencyINR(row.expenses)}</td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-forest">{formatCurrencyINR(row.netMargin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      {/* ------------------------------------------------------------------- */}
      {/* 4. MAIN TWO-COLUMN SECTION: DEADLINES & RECENT ACTIVITY              */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Upcoming Deadlines & Document Status */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Deadline List */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-forest" />
                  <CardTitle className="text-base">Upcoming Statutory Deadlines</CardTitle>
                </div>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Filing cutoffs for GST, Direct Tax TDS, and corporate annual disclosures.
                </p>
              </div>
              <Badge variant="sage" size="sm">
                Live Tracker
              </Badge>
            </CardHeader>

            <div className="divide-y divide-border-subtle/80 text-xs">
              {appState.deadlines.slice(0, 4).map((d) => {
                const isOverdue = d.status === 'Overdue';
                const isUrgent = d.priority === 'Urgent';
                return (
                  <div key={d.id} className="p-4 hover:bg-surface/50 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-charcoal">{d.title}</span>
                          <Badge
                            variant={isOverdue ? 'error' : isUrgent ? 'error' : 'sage'}
                            size="sm"
                          >
                            {d.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-charcoal-muted font-mono">{d.statutoryForm}</span>
                      </div>

                      <div className="text-right sm:self-center">
                        <span className="text-xs font-mono font-bold text-charcoal block">
                          Cutoff: {formatDateDisplay(d.dueDate)}
                        </span>
                        <span className="text-[11px] text-charcoal-muted font-mono">
                          {d.completedCount} / {d.clientsAffectedCount} Filed
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-surface border border-border-subtle text-[11px] text-charcoal-muted flex items-start justify-between gap-2">
                      <span>{d.penaltyNote}</span>
                      <button
                        type="button"
                        onClick={() => handleMarkDeadlineComplete(d.id, d.title)}
                        className="text-forest hover:text-forest-dark font-semibold shrink-0 underline"
                      >
                        Record Filing
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border-subtle flex items-center justify-between text-xs text-charcoal-muted bg-surface/30">
              <span>Showing 4 of {appState.deadlines.length} compliance milestones</span>
              <Link
                to="/portal/deadlines"
                className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
              >
                <span>Open Compliance Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Document Status Summary */}
          <Card className="bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <div>
                <CardTitle className="text-base">Document Vault Verification Health</CardTitle>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Audit status by document classification (Rule 6F standards).
                </p>
              </div>
              <Link
                to="/portal/documents"
                className="text-xs font-semibold text-forest hover:underline inline-flex items-center gap-1"
              >
                <span>Vault</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5 text-xs">
              {documentCategoryStats.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal">{item.category}</span>
                    <span className="text-charcoal-muted font-mono">
                      {item.verified} verified / {item.total} total ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface border border-border-subtle overflow-hidden">
                    <div
                      className="h-full bg-forest rounded-full transition-all duration-300"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (5 Cols): Recent Activity & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions Panel */}
          <Card className="bg-white p-5 sm:p-6 border border-border-subtle shadow-2xs">
            <div className="pb-3 border-b border-border-subtle mb-4">
              <CardTitle className="text-base">Practice Quick Actions</CardTitle>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Execute client-side demonstration workflows.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddClientModal(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="justify-start text-xs"
              >
                Add Client
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAddTxnModal(true)}
                leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                className="justify-start text-xs"
              >
                Post Entry
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/portal/documents')}
                leftIcon={<FolderLock className="w-3.5 h-3.5" />}
                className="justify-start text-xs"
              >
                Vault Files
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/portal/reports')}
                leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
                className="justify-start text-xs"
              >
                Open P&L
              </Button>
            </div>
          </Card>

          {/* Recent Bookkeeping Activity */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Recent Ledger Activity</CardTitle>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Latest double-entry vouchers and billing entries.
                </p>
              </div>
              <Badge variant="sage" size="sm">
                Live Feed
              </Badge>
            </CardHeader>

            <div className="divide-y divide-border-subtle/80 text-xs">
              {appState.transactions.slice(0, 5).map((txn) => {
                const isIncome = txn.type === 'income';
                return (
                  <div key={txn.id} className="p-3.5 hover:bg-surface/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-charcoal truncate max-w-[200px]">
                        {txn.clientName}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isIncome ? 'text-forest' : 'text-charcoal'
                        }`}
                      >
                        {isIncome ? '+' : '-'}
                        {formatCurrencyINR(txn.amount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                      <span className="truncate max-w-[180px]">{txn.description}</span>
                      <span className="font-mono">{formatDateDisplay(txn.date)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 border-t border-border-subtle flex items-center justify-between text-xs text-charcoal-muted bg-surface/30">
              <span className="font-mono text-[11px]">
                {appState.transactions.length} total entries recorded
              </span>
              <Link
                to="/portal/bookkeeping"
                className="font-semibold text-forest hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* MODAL 1: ADD CLIENT (DEMO PROTOTYPE)                                */}
      {/* ------------------------------------------------------------------- */}
      {showAddClientModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-client-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-md bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <CardTitle id="add-client-modal-title" className="text-base">
                  Add Retained Client File
                </CardTitle>
                <p className="text-xs text-charcoal-muted">
                  Add a new client profile to the practice registry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddClientModal(false)}
                aria-label="Close add client form"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClientSubmit} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <Input
                label="Legal Business / Entity Name"
                placeholder="e.g. Balaji Agro Solutions LLP"
                required
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Entity Classification
                </label>
                <select
                  value={newClientType}
                  onChange={(e) => setNewClientType(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  <option value="Private Limited">Private Limited Company</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership Firm</option>
                  <option value="Professional">Individual Professional / Doctor</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="PAN Number"
                  placeholder="e.g. AABCB1234F"
                  value={newClientPan}
                  onChange={(e) => setNewClientPan(e.target.value)}
                />
                <Input
                  label="GSTIN Identification"
                  placeholder="e.g. 37AABCB1234F1Z2"
                  value={newClientGstin}
                  onChange={(e) => setNewClientGstin(e.target.value)}
                />
              </div>

              <Input
                label="Monthly Retainer Fee (₹ INR)"
                type="number"
                value={newClientRetainer}
                onChange={(e) => setNewClientRetainer(e.target.value)}
                required
              />

              <div className="pt-3 border-t border-border-subtle flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Client File
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL 2: RECORD TRANSACTION                                         */}
      {/* ------------------------------------------------------------------- */}
      {showAddTxnModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-txn-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-md bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <CardTitle id="add-txn-modal-title" className="text-base">
                  Record Bookkeeping Transaction
                </CardTitle>
                <p className="text-xs text-charcoal-muted">
                  Post a ledger entry with real-time financial chart updates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTxnModal(false)}
                aria-label="Close transaction recording form"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTxnSubmit} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Entity / Client
                </label>
                <select
                  value={newTxnClientId}
                  onChange={(e) => setNewTxnClientId(e.target.value)}
                  className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  {appState.clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Entry Type
                  </label>
                  <select
                    value={newTxnType}
                    onChange={(e) => setNewTxnType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="income">Income (Invoiced Fee)</option>
                    <option value="expense">Expense (Disbursement)</option>
                  </select>
                </div>

                <Input
                  label="Amount (₹ INR)"
                  type="number"
                  value={newTxnAmount}
                  onChange={(e) => setNewTxnAmount(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Classification Category"
                value={newTxnCategory}
                onChange={(e) => setNewTxnCategory(e.target.value)}
                required
              />

              <Input
                label="Description / Narration"
                placeholder="e.g. October monthly retainer fee settlement"
                value={newTxnDesc}
                onChange={(e) => setNewTxnDesc(e.target.value)}
              />

              <div className="pt-3 border-t border-border-subtle flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setShowAddTxnModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Post Voucher Entry
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
