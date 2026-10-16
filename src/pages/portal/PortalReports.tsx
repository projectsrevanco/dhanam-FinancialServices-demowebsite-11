import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  FileSpreadsheet,
  Printer,
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
import {
  loadDemoState,
  formatCurrencyINR,
  formatDateDisplay,
  REPORT_PERIOD_OPTIONS,
  exportToCSV,
  type DemoAppState,
} from '../../data/sampleData';

export const PortalReports: React.FC = () => {
  const [appState, setAppState] = useState<DemoAppState>(loadDemoState);
  const [selectedPeriodKey, setSelectedPeriodKey] = useState<string>(
    appState.selectedPeriodKey || 'current-month'
  );
  const [reportTab, setReportTab] = useState<'financial' | 'documents' | 'deadlines'>('financial');
  const [showChartTable, setShowChartTable] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      setAppState(loadDemoState());
    };
    window.addEventListener('dhanam_demo_data_change', handleSync);
    return () => window.removeEventListener('dhanam_demo_data_change', handleSync);
  }, []);

  const activePeriod =
    REPORT_PERIOD_OPTIONS.find((p) => p.key === selectedPeriodKey) || REPORT_PERIOD_OPTIONS[0];

  // Filtered transactions for selected period
  const periodTransactions = useMemo(() => {
    if (activePeriod.month) {
      return appState.transactions.filter((t) => t.period === activePeriod.month);
    }
    // For quarters or full year
    return appState.transactions;
  }, [appState.transactions, activePeriod]);

  // Financial Summary
  const financialTotals = useMemo(() => {
    const income = periodTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = periodTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const net = income - expenses;
    const margin = income > 0 ? Math.round((net / income) * 100) : 0;

    return { income, expenses, net, margin, count: periodTransactions.length };
  }, [periodTransactions]);

  // Document Completion Report
  const documentCompletionData = useMemo(() => {
    return appState.clients.map((c) => {
      const clientDocs = appState.documents.filter((d) => d.clientId === c.id);
      const approved = clientDocs.filter((d) => d.status === 'Approved').length;
      const underReview = clientDocs.filter((d) => d.status === 'Under Review').length;
      const requested = clientDocs.filter((d) => d.status === 'Requested').length;
      const total = clientDocs.length;
      const rate = total > 0 ? Math.round((approved / total) * 100) : 100;

      return {
        clientId: c.id,
        clientName: c.name,
        package: c.servicePackage,
        total,
        approved,
        underReview,
        requested,
        rate,
      };
    });
  }, [appState.clients, appState.documents]);

  // Deadline Status Report
  const deadlineSummary = useMemo(() => {
    const total = appState.deadlines.length;
    const completed = appState.deadlines.filter((d) => d.status === 'Completed').length;
    const overdue = appState.deadlines.filter((d) => d.status === 'Overdue').length;
    const inProgress = appState.deadlines.filter((d) => d.status === 'In Progress').length;
    const upcoming = appState.deadlines.filter((d) => d.status === 'Upcoming').length;

    return { total, completed, overdue, inProgress, upcoming };
  }, [appState.deadlines]);

  // 6-Month Chart Data
  const chartData = useMemo(() => {
    const months = ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
    const labels = ['May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26', 'Oct 26'];

    return months.map((m, idx) => {
      const txns = appState.transactions.filter((t) => t.period === m);
      const income = txns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expenses = txns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

      // Default baseline if month has few local items
      const baselineIncome = income || [68500, 74200, 82000, 76800, 86400, 70500][idx];
      const baselineExpense = expenses || [26400, 28100, 31500, 29200, 32600, 30000][idx];

      return {
        month: labels[idx],
        income: baselineIncome,
        expenses: baselineExpense,
        net: baselineIncome - baselineExpense,
      };
    });
  }, [appState.transactions]);

  // CSV Export Action
  const handleExportCSV = () => {
    if (reportTab === 'financial') {
      const headers = ['Voucher #', 'Date', 'Client Entity', 'Type', 'Category', 'Amount (INR)', 'Payment Method', 'Status'];
      const rows = periodTransactions.map((t) => [
        t.voucherNo,
        t.date,
        t.clientName,
        t.type,
        t.category,
        t.amount,
        t.paymentMethod,
        t.status,
      ]);
      exportToCSV(`Dhanam_Financial_Report_${activePeriod.key}`, headers, rows);
    } else if (reportTab === 'documents') {
      const headers = ['Client ID', 'Client Name', 'Service Package', 'Total Documents', 'Approved', 'Under Review', 'Requested', 'Approval Rate (%)'];
      const rows = documentCompletionData.map((d) => [
        d.clientId,
        d.clientName,
        d.package,
        d.total,
        d.approved,
        d.underReview,
        d.requested,
        d.rate,
      ]);
      exportToCSV(`Dhanam_Document_Completion_Report`, headers, rows);
    } else {
      const headers = ['Task ID', 'Title', 'Client', 'Category', 'Due Date', 'Priority', 'Status', 'Statutory Form'];
      const rows = appState.deadlines.map((dl) => [
        dl.id,
        dl.title,
        dl.clientName,
        dl.category,
        dl.dueDate,
        dl.priority,
        dl.status,
        dl.statutoryForm,
      ]);
      exportToCSV(`Dhanam_Compliance_Deadlines_Report`, headers, rows);
    }
  };

  // Sample Printable Report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Management Accounts & Performance Reports
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Comprehensive practice performance analytics, document compliance summaries, and statutory audit reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<FileSpreadsheet className="w-3.5 h-3.5" />}
          >
            Export Filtered CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrintReport}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Period Selector & Report Switcher */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Period Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-forest" />
            <span className="font-bold text-charcoal">Report Cycle:</span>
            <select
              value={selectedPeriodKey}
              onChange={(e) => setSelectedPeriodKey(e.target.value)}
              className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal font-semibold focus:ring-2 focus:ring-forest cursor-pointer"
            >
              {REPORT_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Report Tab Buttons */}
          <div className="flex items-center gap-1.5 bg-surface p-1 rounded-button border border-border-subtle">
            <button
              type="button"
              onClick={() => setReportTab('financial')}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                reportTab === 'financial'
                  ? 'bg-forest text-white'
                  : 'text-charcoal hover:text-forest'
              }`}
            >
              Income vs Expenses
            </button>
            <button
              type="button"
              onClick={() => setReportTab('documents')}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                reportTab === 'documents'
                  ? 'bg-forest text-white'
                  : 'text-charcoal hover:text-forest'
              }`}
            >
              Document Completion
            </button>
            <button
              type="button"
              onClick={() => setReportTab('deadlines')}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                reportTab === 'deadlines'
                  ? 'bg-forest text-white'
                  : 'text-charcoal hover:text-forest'
              }`}
            >
              Compliance Status
            </button>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------- */}
      {/* TAB 1: FINANCIAL INCOME VS EXPENSE REPORT                           */}
      {/* ------------------------------------------------------------------- */}
      {reportTab === 'financial' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 bg-white border border-border-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Total Operating Inflow
              </span>
              <div className="text-xl font-bold font-heading text-forest mt-1">
                {formatCurrencyINR(financialTotals.income)}
              </div>
              <span className="text-[11px] text-charcoal-muted font-mono">
                From invoiced retainer fees
              </span>
            </Card>

            <Card className="p-4 bg-white border border-border-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Operating Disbursements
              </span>
              <div className="text-xl font-bold font-heading text-charcoal mt-1">
                {formatCurrencyINR(financialTotals.expenses)}
              </div>
              <span className="text-[11px] text-charcoal-muted font-mono">
                Software, stipend & office costs
              </span>
            </Card>

            <Card className="p-4 bg-sage/40 border border-sage-dark/60">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-dark block">
                Operating Net Margin
              </span>
              <div className="text-xl font-bold font-heading text-forest mt-1">
                {formatCurrencyINR(financialTotals.net)}
              </div>
              <span className="text-[11px] text-forest font-semibold">
                +{financialTotals.margin}% Operating Margin
              </span>
            </Card>

            <Card className="p-4 bg-white border border-border-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Vouchers Processed
              </span>
              <div className="text-xl font-bold font-heading text-charcoal mt-1">
                {financialTotals.count} Entries
              </div>
              <span className="text-[11px] text-charcoal-muted font-mono">
                In active reporting period
              </span>
            </Card>
          </div>

          {/* Multi-Bar Chart */}
          <Card className="p-5 sm:p-6 bg-white border border-border-subtle">
            <CardHeader className="p-0 pb-4 mb-2">
              <CardTitle className="text-base">Monthly Income vs Operating Expenses Trend</CardTitle>
              <p className="text-xs text-charcoal-muted">
                6-month deterministic cashflow history comparing Inflow vs Outflow (INR ₹).
              </p>
            </CardHeader>

            {/* Accessible screen-reader text summary */}
            <div className="sr-only" aria-live="polite">
              Monthly cashflow bar chart across 6 deterministic months. Income ranges from ₹2,20,000 to ₹2,90,000, with operating expenses from ₹95,000 to ₹1,20,000.
            </div>

            <div
              className="h-64 sm:h-72 w-full pt-2"
              role="img"
              aria-label="Monthly Cashflow Bar Chart comparing Inflow vs Outflow"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#4B5563', fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: '#4B5563', fontSize: 11 }}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val: any) => [formatCurrencyINR(Number(val) || 0), 'Amount']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#DFE5E0',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="income" name="Inflow (Revenue)" fill="#245C45" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Outflow (Expenses)" fill="#C87A54" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Accessible Tabular View Toggle & Data Table */}
            <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal-muted">
                  Tabular financial dataset for detail inspection & assistive technology:
                </span>
                <button
                  type="button"
                  onClick={() => setShowChartTable(!showChartTable)}
                  className="text-forest font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5"
                  aria-expanded={showChartTable}
                  aria-controls="chart-tabular-data-reports"
                >
                  {showChartTable ? 'Hide Table View' : 'Show Data Table View'}
                </button>
              </div>

              {showChartTable && (
                <div id="chart-tabular-data-reports" className="overflow-x-auto border border-border-subtle rounded-card">
                  <table className="w-full min-w-[500px] text-left text-xs border-collapse">
                    <caption className="sr-only">Monthly Inflow vs Outflow Numerical Table</caption>
                    <thead className="bg-surface text-charcoal-muted uppercase tracking-wider font-semibold border-b border-border-subtle">
                      <tr>
                        <th scope="col" className="py-2 px-3">Month</th>
                        <th scope="col" className="py-2 px-3 text-right">Inflow (₹)</th>
                        <th scope="col" className="py-2 px-3 text-right">Outflow (₹)</th>
                        <th scope="col" className="py-2 px-3 text-right">Net Margin (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {chartData.map((row) => (
                        <tr key={row.month} className="hover:bg-surface/50">
                          <td className="py-2 px-3 font-medium text-charcoal">{row.month}</td>
                          <td className="py-2 px-3 text-right font-mono text-status-success">{formatCurrencyINR(row.income)}</td>
                          <td className="py-2 px-3 text-right font-mono text-charcoal">{formatCurrencyINR(row.expenses)}</td>
                          <td className="py-2 px-3 text-right font-mono font-semibold text-forest">{formatCurrencyINR(row.net)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          {/* Results Table */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Transactions in Selected Scope</CardTitle>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Showing {periodTransactions.length} recorded voucher entries for {activePeriod.label}.
                </p>
              </div>
              <Badge variant="sage" size="sm">
                Transaction Ledger
              </Badge>
            </CardHeader>

            {periodTransactions.length === 0 ? (
              <div className="p-8 text-center text-xs text-charcoal-muted">
                No transaction entries recorded for this reporting period.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-4">Date / Voucher</th>
                      <th className="py-2.5 px-3">Entity</th>
                      <th className="py-2.5 px-3">Category Head</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/80">
                    {periodTransactions.map((t) => (
                      <tr key={t.id} className="hover:bg-surface/60 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-charcoal block">{formatDateDisplay(t.date)}</span>
                          <span className="text-[10px] text-charcoal-muted font-mono">{t.voucherNo}</span>
                        </td>
                        <td className="py-3 px-3 font-medium text-charcoal">{t.clientName}</td>
                        <td className="py-3 px-3 text-charcoal">{t.category}</td>
                        <td className="py-3 px-3 text-charcoal-muted">{t.description}</td>
                        <td
                          className={`py-3 px-3 font-mono font-bold text-right ${
                            t.type === 'income' ? 'text-forest' : 'text-charcoal'
                          }`}
                        >
                          {t.type === 'income' ? '+' : '-'}
                          {formatCurrencyINR(t.amount)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant={t.status === 'reconciled' ? 'success' : 'sage'} size="sm">
                            {t.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 2: CLIENT DOCUMENT-COMPLETION REPORT                            */}
      {/* ------------------------------------------------------------------- */}
      {reportTab === 'documents' && (
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Client Document Compliance Audit</CardTitle>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Evaluation of client submission integrity, review backlog, and approval completion rates.
              </p>
            </div>
            <span className="text-xs font-mono text-charcoal-muted">
              {documentCompletionData.length} Retained Clients
            </span>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Client Entity</th>
                  <th className="py-2.5 px-3">Service Package</th>
                  <th className="py-2.5 px-3 text-right">Approved</th>
                  <th className="py-2.5 px-3 text-right">Under Review</th>
                  <th className="py-2.5 px-3 text-right">Requested</th>
                  <th className="py-2.5 px-3 text-right">Total Vault Files</th>
                  <th className="py-2.5 px-4 text-right">Approval Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/80">
                {documentCompletionData.map((row) => (
                  <tr key={row.clientId} className="hover:bg-surface/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal">{row.clientName}</td>
                    <td className="py-3 px-3 text-charcoal-muted">{row.package}</td>
                    <td className="py-3 px-3 font-mono font-bold text-forest text-right">
                      {row.approved}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-800 text-right">
                      {row.underReview}
                    </td>
                    <td className="py-3 px-3 font-mono text-status-error text-right">
                      {row.requested}
                    </td>
                    <td className="py-3 px-3 font-mono text-charcoal text-right">{row.total}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono font-semibold text-charcoal">{row.rate}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-surface border border-border-subtle overflow-hidden">
                          <div
                            className="h-full bg-forest rounded-full"
                            style={{ width: `${row.rate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 3: DEADLINE STATUS REPORT                                       */}
      {/* ------------------------------------------------------------------- */}
      {reportTab === 'deadlines' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 bg-white border border-border-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Total Regulatory Tasks
              </span>
              <div className="text-2xl font-bold font-heading text-charcoal mt-1">
                {deadlineSummary.total}
              </div>
            </Card>

            <Card className="p-4 bg-status-success-bg/20 border border-status-success/30">
              <span className="text-xs font-bold uppercase tracking-wider text-status-success block">
                Completed Tasks
              </span>
              <div className="text-2xl font-bold font-heading text-status-success mt-1">
                {deadlineSummary.completed}
              </div>
            </Card>

            <Card className="p-4 bg-status-error-bg/20 border border-status-error/30">
              <span className="text-xs font-bold uppercase tracking-wider text-status-error block">
                Overdue Filings
              </span>
              <div className="text-2xl font-bold font-heading text-status-error mt-1">
                {deadlineSummary.overdue}
              </div>
            </Card>

            <Card className="p-4 bg-white border border-border-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Upcoming / In Progress
              </span>
              <div className="text-2xl font-bold font-heading text-charcoal mt-1">
                {deadlineSummary.upcoming + deadlineSummary.inProgress}
              </div>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Compliance Deadlines Audit Table</CardTitle>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Statutory deadlines, responsible clients, cut-off dates, and fulfillment milestones.
                </p>
              </div>
              <Badge variant="sage" size="sm">
                Compliance Audit
              </Badge>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-4">Task Title</th>
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3 text-right">Filing Progress</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/80">
                  {appState.deadlines.map((dl) => (
                    <tr key={dl.id} className="hover:bg-surface/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-charcoal">{dl.title}</td>
                      <td className="py-3 px-3 font-medium text-charcoal">{dl.clientName}</td>
                      <td className="py-3 px-3 text-charcoal-muted">{dl.category}</td>
                      <td className="py-3 px-3 font-mono text-charcoal font-semibold">
                        {formatDateDisplay(dl.dueDate)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={dl.priority === 'Urgent' ? 'error' : 'neutral'}
                          size="sm"
                        >
                          {dl.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-charcoal">
                        {dl.completedCount} / {dl.clientsAffectedCount} Filed
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={
                            dl.status === 'Completed'
                              ? 'success'
                              : dl.status === 'Overdue'
                              ? 'error'
                              : 'sage'
                          }
                          size="sm"
                        >
                          {dl.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
