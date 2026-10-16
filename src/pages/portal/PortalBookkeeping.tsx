import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  formatCurrencyINR,
  formatDateDisplay,
  type FictionalTransaction,
} from '../../data/sampleData';

export const PortalBookkeeping: React.FC = () => {
  const [transactions, setTransactions] = useState<FictionalTransaction[]>(
    () => loadDemoState().transactions
  );
  const [clients] = useState(() => loadDemoState().clients);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState<FictionalTransaction | null>(null);
  const [deletingTxnId, setDeletingTxnId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Inputs
  const [formDate, setFormDate] = useState('2026-10-13');
  const [formDesc, setFormDesc] = useState('');
  const [formClientName, setFormClientName] = useState('Venkata Cotton Ginning Mills LLP');
  const [formType, setFormType] = useState<'income' | 'expense'>('income');
  const [formCategory, setFormCategory] = useState('Retainer Accounting Fees');
  const [formAmount, setFormAmount] = useState('10000');
  const [formMethod, setFormMethod] = useState<FictionalTransaction['paymentMethod']>('NEFT/RTGS');
  const [formStatus, setFormStatus] = useState<FictionalTransaction['status']>('reconciled');
  const [formNotes, setFormNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleSync = () => {
      setTransactions(loadDemoState().transactions);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFormModal(false);
        setEditingTxn(null);
        setDeletingTxnId(null);
      }
    };
    window.addEventListener('dhanam_demo_data_change', handleSync);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('dhanam_demo_data_change', handleSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = typeFilter === 'All' || t.type === typeFilter;
      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;

      return matchSearch && matchType && matchCategory && matchStatus;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter, statusFilter]);

  // Derived Totals
  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const net = income - expense;

    return { income, expense, net, count: filteredTransactions.length };
  }, [filteredTransactions]);

  const openAddForm = () => {
    setEditingTxn(null);
    setFormDate('2026-10-13');
    setFormDesc('');
    setFormClientName(clients[0]?.name || 'Venkata Cotton Ginning Mills LLP');
    setFormType('income');
    setFormCategory('Retainer Accounting Fees');
    setFormAmount('12000');
    setFormMethod('NEFT/RTGS');
    setFormStatus('reconciled');
    setFormNotes('Bookkeeping voucher entry');
    setFormErrors({});
    setShowFormModal(true);
  };

  const openEditForm = (txn: FictionalTransaction) => {
    setEditingTxn(txn);
    setFormDate(txn.date);
    setFormDesc(txn.description);
    setFormClientName(txn.clientName);
    setFormType(txn.type);
    setFormCategory(txn.category);
    setFormAmount(String(txn.amount));
    setFormMethod(txn.paymentMethod);
    setFormStatus(txn.status);
    setFormNotes(txn.notes || '');
    setFormErrors({});
    setShowFormModal(true);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formDesc.trim()) errs.desc = 'Transaction description is required.';
    if (!formAmount || Number(formAmount) <= 0) errs.amount = 'Valid positive amount in INR required.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveTxn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const amt = Number(formAmount);

    if (editingTxn) {
      const updated = transactions.map((t) =>
        t.id === editingTxn.id
          ? {
              ...t,
              date: formDate,
              description: formDesc,
              clientName: formClientName,
              type: formType,
              category: formCategory,
              amount: amt,
              paymentMethod: formMethod,
              status: formStatus,
              notes: formNotes,
              period: formDate.substring(0, 7),
            }
          : t
      );
      setTransactions(updated);
      saveDemoState({ transactions: updated });
      showToast(`Updated transaction voucher "${editingTxn.voucherNo}".`);
    } else {
      const newTxn: FictionalTransaction = {
        id: `TXN-${700 + transactions.length + 1}`,
        clientId: 'CLI-001',
        clientName: formClientName,
        date: formDate,
        type: formType,
        category: formCategory,
        description: formDesc,
        amount: amt,
        paymentMethod: formMethod,
        status: formStatus,
        voucherNo: `VR-2026-${120 + transactions.length + 1}`,
        notes: formNotes,
        period: formDate.substring(0, 7),
      };
      const updated = [newTxn, ...transactions];
      setTransactions(updated);
      saveDemoState({ transactions: updated });
      showToast(`Recorded new ${formType} entry of ${formatCurrencyINR(amt)}.`);
    }

    setShowFormModal(false);
  };

  const confirmDelete = () => {
    if (!deletingTxnId) return;
    const target = transactions.find((t) => t.id === deletingTxnId);
    const updated = transactions.filter((t) => t.id !== deletingTxnId);
    setTransactions(updated);
    saveDemoState({ transactions: updated });
    setDeletingTxnId(null);
    showToast(`Deleted transaction voucher "${target?.voucherNo}".`);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-3 bg-sage border border-sage-dark/60 rounded-card text-xs text-forest-dark flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="font-bold text-forest">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Post Transaction CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Bookkeeping & Transaction Ledger
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Track client income and expense transactions, fee settlements, and operating disbursements.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openAddForm}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Post Transaction
        </Button>
      </div>

      {/* Recalculated Summary Totals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-border-subtle shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Filtered Inflow (Income)
            </span>
            <div className="w-7 h-7 rounded-button bg-sage text-forest flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-forest font-heading">
            {formatCurrencyINR(totals.income)}
          </div>
          <span className="text-[11px] text-charcoal-muted font-mono mt-1 block">
            From {filteredTransactions.filter((t) => t.type === 'income').length} fee vouchers
          </span>
        </Card>

        <Card className="p-4 bg-white border border-border-subtle shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Filtered Outflow (Expense)
            </span>
            <div className="w-7 h-7 rounded-button bg-status-error-bg text-status-error flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-charcoal font-heading">
            {formatCurrencyINR(totals.expense)}
          </div>
          <span className="text-[11px] text-charcoal-muted font-mono mt-1 block">
            From {filteredTransactions.filter((t) => t.type === 'expense').length} operating disbursements
          </span>
        </Card>

        <Card className="p-4 bg-sage/30 border border-sage-dark/60 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-dark">
              Net Balance Margin
            </span>
            <div className="w-7 h-7 rounded-button bg-white text-forest flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-forest font-heading">
            {formatCurrencyINR(totals.net)}
          </div>
          <span className="text-[11px] text-forest font-semibold mt-1 block">
            Derived net across {totals.count} transactions
          </span>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="w-full lg:w-96">
            <Input
              placeholder="Search description, client entity, or voucher #..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Nature:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest max-w-[170px] truncate"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Statuses</option>
                <option value="reconciled">Reconciled</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Ledger Table */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Transaction Ledger Register</CardTitle>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Displaying {filteredTransactions.length} of {transactions.length} records.
            </p>
          </div>
          <span className="text-xs font-mono text-charcoal-muted">
            All amounts illustrative INR
          </span>
        </CardHeader>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto text-charcoal-muted">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-charcoal">No Ledger Entries Found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              No transactions match your search keyword or selected filters. Try adjusting your query.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('All');
                setCategoryFilter('All');
                setStatusFilter('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Date / Voucher</th>
                  <th className="py-2.5 px-3">Client / Business</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3">Payment Method</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/80">
                {filteredTransactions.map((txn) => {
                  const isIncome = txn.type === 'income';
                  return (
                    <tr key={txn.id} className="hover:bg-surface/60 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-charcoal block">
                          {formatDateDisplay(txn.date)}
                        </span>
                        <span className="text-[10px] text-charcoal-muted font-mono">{txn.voucherNo}</span>
                      </td>
                      <td className="py-3 px-3 font-medium text-charcoal">{txn.clientName}</td>
                      <td className="py-3 px-3 text-charcoal-muted max-w-xs truncate" title={txn.description}>
                        <div>{txn.description}</div>
                        {txn.notes && <div className="text-[10px] text-charcoal font-mono">{txn.notes}</div>}
                      </td>
                      <td className="py-3 px-3 text-charcoal font-medium">{txn.category}</td>
                      <td className="py-3 px-3 font-mono text-charcoal-muted">{txn.paymentMethod}</td>
                      <td
                        className={`py-3 px-3 font-mono font-bold text-right ${
                          isIncome ? 'text-forest' : 'text-charcoal'
                        }`}
                      >
                        {isIncome ? '+' : '-'}
                        {formatCurrencyINR(txn.amount)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            txn.status === 'reconciled'
                              ? 'success'
                              : txn.status === 'flagged'
                              ? 'error'
                              : 'sage'
                          }
                          size="sm"
                        >
                          {txn.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEditForm(txn)}
                            className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors"
                            title="Edit Transaction"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingTxnId(txn.id)}
                            className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-status-error transition-colors"
                            title="Delete Transaction"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ------------------------------------------------------------------- */}
      {/* ADD / EDIT TRANSACTION MODAL                                        */}
      {/* ------------------------------------------------------------------- */}
      {showFormModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="txn-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-lg bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <CardTitle id="txn-modal-title" className="text-base">
                  {editingTxn ? 'Edit Ledger Voucher' : 'Post Bookkeeping Transaction'}
                </CardTitle>
                <p className="text-xs text-charcoal-muted">
                  Updates propagate to dashboard totals and charts immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFormModal(false)}
                aria-label="Close transaction form"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTxn} className="p-5 space-y-3.5 text-xs overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Client / Business Entity
                </label>
                <select
                  value={formClientName}
                  onChange={(e) => setFormClientName(e.target.value)}
                  className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  <option value="Dhanam Practice Operations">Dhanam Practice Operations</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Transaction Nature
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="income">Income (Inflow)</option>
                    <option value="expense">Expense (Outflow)</option>
                  </select>
                </div>

                <Input
                  label="Transaction Date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Amount (₹ INR) *"
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  error={formErrors.amount}
                />

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Category Head
                  </label>
                  <input
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              </div>

              <Input
                label="Description / Narration *"
                placeholder="e.g. October monthly retainer fee settlement"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                error={formErrors.desc}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Payment Method
                  </label>
                  <select
                    value={formMethod}
                    onChange={(e) => setFormMethod(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="NEFT/RTGS">NEFT / RTGS</option>
                    <option value="UPI">UPI Transfer</option>
                    <option value="Direct Debit">Direct Debit</option>
                    <option value="Cheque">Bank Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Reconciliation Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="reconciled">Reconciled</option>
                    <option value="pending">Pending</option>
                    <option value="flagged">Flagged</option>
                  </select>
                </div>
              </div>

              <Input
                label="Auditor Notes / Reference"
                placeholder="Optional audit memo"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
              />

              <div className="pt-3 border-t border-border-subtle flex justify-end gap-2 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setShowFormModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {editingTxn ? 'Save Changes' : 'Post Voucher Entry'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* DELETE TRANSACTION CONFIRMATION                                     */}
      {/* ------------------------------------------------------------------- */}
      {deletingTxnId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-txn-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-sm bg-white border border-border-subtle shadow-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-status-error-bg text-status-error flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="delete-txn-title" className="text-sm font-bold text-charcoal">
                  Delete Voucher Entry
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Permanently remove this bookkeeping record from the ledger?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
              <Button variant="secondary" size="sm" onClick={() => setDeletingTxnId(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmDelete}
                className="bg-status-error hover:bg-status-error-text text-white"
              >
                Delete Entry
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
