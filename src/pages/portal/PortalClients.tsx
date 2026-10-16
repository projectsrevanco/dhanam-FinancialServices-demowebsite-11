import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  ExternalLink,
  Phone,
  Mail,
  X,
  ArrowUpDown,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  formatCurrencyINR,
  type FictionalClient,
} from '../../data/sampleData';

export const PortalClients: React.FC = () => {
  const [clientList, setClientList] = useState<FictionalClient[]>(() => loadDemoState().clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'name' | 'retainer' | 'complianceScore'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modals & Panels state
  const [inspectClient, setInspectClient] = useState<FictionalClient | null>(null);
  const [editingClient, setEditingClient] = useState<FictionalClient | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formTradeName, setFormTradeName] = useState('');
  const [formPan, setFormPan] = useState('');
  const [formGstin, setFormGstin] = useState('');
  const [formContactPerson, setFormContactPerson] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEntityType, setFormEntityType] = useState<FictionalClient['entityType']>('Private Limited');
  const [formIndustry, setFormIndustry] = useState('Agro Processing & Trading');
  const [formPackage, setFormPackage] = useState<FictionalClient['servicePackage']>('Growth Tax Compliance');
  const [formDocStatus, setFormDocStatus] = useState<FictionalClient['documentCompletionStatus']>('Complete');
  const [formStatus, setFormStatus] = useState<FictionalClient['status']>('active');
  const [formRetainer, setFormRetainer] = useState('8500');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleSync = () => {
      setClientList(loadDemoState().clients);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddModal(false);
        setEditingClient(null);
        setInspectClient(null);
        setDeletingClientId(null);
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
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const industries = useMemo(() => {
    const set = new Set(clientList.map((c) => c.industry));
    return ['All', ...Array.from(set)];
  }, [clientList]);

  const filteredAndSortedClients = useMemo(() => {
    const filtered = clientList.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || c.industry === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });

    return filtered.sort((a, b) => {
      let result = 0;
      if (sortField === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (sortField === 'retainer') {
        result = a.monthlyRetainer - b.monthlyRetainer;
      } else if (sortField === 'complianceScore') {
        result = a.complianceScore - b.complianceScore;
      }
      return sortDirection === 'asc' ? result : -result;
    });
  }, [clientList, searchTerm, statusFilter, categoryFilter, sortField, sortDirection]);

  const handleSortToggle = (field: 'name' | 'retainer' | 'complianceScore') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Form Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formName.trim()) errs.name = 'Client legal business name is required.';
    if (!formContactPerson.trim()) errs.contactPerson = 'Primary contact name is required.';
    if (!formEmail.trim() || !formEmail.includes('@')) errs.email = 'Valid contact email is required.';
    if (!formRetainer || Number(formRetainer) <= 0) errs.retainer = 'Enter a valid monthly retainer fee in INR.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const openAddForm = () => {
    setFormName('');
    setFormTradeName('');
    setFormPan('AABCV1234F');
    setFormGstin('37AABCV1234F1Z8');
    setFormContactPerson('');
    setFormEmail('');
    setFormPhone('+91 98480 12345');
    setFormEntityType('Private Limited');
    setFormIndustry('Agro Processing & Trading');
    setFormPackage('Growth Tax Compliance');
    setFormDocStatus('Complete');
    setFormStatus('active');
    setFormRetainer('8500');
    setFormErrors({});
    setEditingClient(null);
    setShowAddModal(true);
  };

  const openEditForm = (client: FictionalClient) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormTradeName(client.tradeName);
    setFormPan(client.pan);
    setFormGstin(client.gstin);
    setFormContactPerson(client.contactPerson);
    setFormEmail(client.contactEmail);
    setFormPhone(client.contactPhone);
    setFormEntityType(client.entityType);
    setFormIndustry(client.industry);
    setFormPackage(client.servicePackage);
    setFormDocStatus(client.documentCompletionStatus);
    setFormStatus(client.status);
    setFormRetainer(String(client.monthlyRetainer));
    setFormErrors({});
    setShowAddModal(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingClient) {
      // Edit existing
      const updated = clientList.map((c) =>
        c.id === editingClient.id
          ? {
              ...c,
              name: formName,
              tradeName: formTradeName || formName,
              pan: formPan.toUpperCase(),
              gstin: formGstin.toUpperCase(),
              contactPerson: formContactPerson,
              contactEmail: formEmail,
              contactPhone: formPhone,
              entityType: formEntityType,
              industry: formIndustry,
              servicePackage: formPackage,
              documentCompletionStatus: formDocStatus,
              status: formStatus,
              monthlyRetainer: Number(formRetainer),
            }
          : c
      );
      setClientList(updated);
      saveDemoState({ clients: updated });
      showToast(`Updated client records for "${formName}".`);
    } else {
      // Add new
      const newClient: FictionalClient = {
        id: `CLI-0${clientList.length + 1}`,
        name: formName,
        tradeName: formTradeName || formName,
        pan: formPan.toUpperCase() || 'ABCDE1234F',
        gstin: formGstin.toUpperCase() || '37ABCDE1234F1Z5',
        contactPerson: formContactPerson,
        contactEmail: formEmail,
        contactPhone: formPhone,
        entityType: formEntityType,
        industry: formIndustry,
        servicePackage: formPackage,
        documentCompletionStatus: formDocStatus,
        status: formStatus,
        monthlyRetainer: Number(formRetainer),
        complianceScore: 100,
        assignedAccountant: 'K. Ramanathan, FCA',
        onboardingDate: '2026-10-13',
        activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'Monthly Books'],
      };
      const updated = [newClient, ...clientList];
      setClientList(updated);
      saveDemoState({ clients: updated });
      showToast(`Added new business client "${formName}".`);
    }

    setShowAddModal(false);
  };

  const confirmDeleteClient = () => {
    if (!deletingClientId) return;
    const target = clientList.find((c) => c.id === deletingClientId);
    const updated = clientList.filter((c) => c.id !== deletingClientId);
    setClientList(updated);
    saveDemoState({ clients: updated });
    setDeletingClientId(null);
    showToast(`Removed client "${target?.name}" from client registry.`);
  };

  return (
    <div className="space-y-6">
      {feedbackToast && (
        <div className="p-3 bg-sage border border-sage-dark/60 rounded-card text-xs text-forest-dark flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
            <span>{feedbackToast}</span>
          </div>
          <button type="button" onClick={() => setFeedbackToast(null)} className="font-bold text-forest">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Title & Add Client CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Client Portfolio Directory
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Retained SME business clients, service packages, and document compliance tracker.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openAddForm}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Client
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="w-full lg:w-96">
            <Input
              placeholder="Search by client name, GSTIN, contact person, or industry..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active Retainers</option>
                <option value="pending_onboarding">Pending Onboarding</option>
                <option value="notice_received">Notice Received</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Category / Industry Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Industry:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest max-w-[180px] truncate"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Clients Table */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Client Records Ledger</CardTitle>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Displaying {filteredAndSortedClients.length} of {clientList.length} clients in database.
            </p>
          </div>
          <span className="text-xs font-mono text-charcoal-muted">
            Sorted by: {sortField} ({sortDirection})
          </span>
        </CardHeader>

        {filteredAndSortedClients.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto text-charcoal-muted">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-charcoal">No Clients Found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              No business records match your search query or active filter settings. Try adjusting the keywords or clear filters.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setCategoryFilter('All');
              }}
            >
              Clear Search Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                  <th
                    className="py-2.5 px-4 cursor-pointer hover:text-charcoal"
                    onClick={() => handleSortToggle('name')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Client & Entity</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3">Industry / Sector</th>
                  <th className="py-2.5 px-3">Primary Contact</th>
                  <th className="py-2.5 px-3">Service Package</th>
                  <th className="py-2.5 px-3">Documents Status</th>
                  <th
                    className="py-2.5 px-3 cursor-pointer hover:text-charcoal"
                    onClick={() => handleSortToggle('retainer')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Retainer Fee</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/80">
                {filteredAndSortedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-surface/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-charcoal block">{client.name}</span>
                      <span className="text-[10px] text-charcoal-muted font-mono">
                        {client.id} • {client.entityType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-charcoal-muted">{client.industry}</td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-charcoal block">{client.contactPerson}</span>
                      <span className="text-[11px] text-charcoal-muted font-mono">{client.contactPhone}</span>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="neutral" size="sm">
                        {client.servicePackage}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          client.documentCompletionStatus === 'Complete'
                            ? 'success'
                            : client.documentCompletionStatus === 'Action Needed'
                            ? 'error'
                            : 'sage'
                        }
                        size="sm"
                      >
                        {client.documentCompletionStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-forest">
                      {formatCurrencyINR(client.monthlyRetainer)}/mo
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          client.status === 'active'
                            ? 'success'
                            : client.status === 'notice_received'
                            ? 'error'
                            : 'sage'
                        }
                        size="sm"
                      >
                        {client.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setInspectClient(client)}
                          className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors"
                          title="Inspect Details"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditForm(client)}
                          className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors"
                          title="Edit Client"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingClientId(client.id)}
                          className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-status-error transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ------------------------------------------------------------------- */}
      {/* CLIENT DETAILS VIEW (DRAWER / MODAL)                                */}
      {/* ------------------------------------------------------------------- */}
      {inspectClient && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspect-client-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-lg bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono text-charcoal-muted uppercase">
                  {inspectClient.id} • Practice Client File
                </span>
                <CardTitle id="inspect-client-modal-title" className="text-lg mt-0.5">
                  {inspectClient.name}
                </CardTitle>
              </div>
              <button
                type="button"
                onClick={() => setInspectClient(null)}
                aria-label="Close client file inspection"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface rounded-card border border-border-subtle font-mono">
                <div>
                  <span className="text-charcoal-muted block text-[10px]">GSTIN</span>
                  <span className="font-semibold text-charcoal">{inspectClient.gstin}</span>
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[10px]">PAN</span>
                  <span className="font-semibold text-charcoal">{inspectClient.pan}</span>
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[10px]">Package</span>
                  <span className="font-semibold text-forest">{inspectClient.servicePackage}</span>
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[10px]">Monthly Retainer</span>
                  <span className="font-semibold text-charcoal">
                    {formatCurrencyINR(inspectClient.monthlyRetainer)}/mo
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px]">
                  Contact & Assigned Practice Manager
                </h4>
                <div className="flex items-center gap-2 text-charcoal">
                  <Phone className="w-3.5 h-3.5 text-forest" />
                  <span>{inspectClient.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal">
                  <Mail className="w-3.5 h-3.5 text-forest" />
                  <span>{inspectClient.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal">
                  <Building className="w-3.5 h-3.5 text-forest" />
                  <span>Accountant: {inspectClient.assignedAccountant}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
                <span className="text-charcoal-muted">
                  Compliance Score: <strong>{inspectClient.complianceScore}%</strong>
                </span>
                <Badge
                  variant={inspectClient.status === 'active' ? 'success' : 'error'}
                  size="sm"
                >
                  {inspectClient.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setInspectClient(null)}>
                Close Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const target = inspectClient;
                  setInspectClient(null);
                  openEditForm(target);
                }}
              >
                Edit Client Data
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* ADD / EDIT CLIENT FORM MODAL WITH VALIDATION                        */}
      {/* ------------------------------------------------------------------- */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="client-form-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-lg bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <CardTitle id="client-form-modal-title" className="text-base">
                  {editingClient ? 'Edit Client Record' : 'Add New Business Client'}
                </CardTitle>
                <p className="text-xs text-charcoal-muted">
                  All changes persist in local shared demonstration storage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Close client form"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="p-5 space-y-3.5 text-xs overflow-y-auto">
              <Input
                label="Legal Business Name *"
                placeholder="e.g. Sri Balaji Spinning Mills LLP"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                error={formErrors.name}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Entity Structure
                  </label>
                  <select
                    value={formEntityType}
                    onChange={(e) => setFormEntityType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Industry / Category
                  </label>
                  <input
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="PAN Number"
                  value={formPan}
                  onChange={(e) => setFormPan(e.target.value)}
                />
                <Input
                  label="GSTIN Identification"
                  value={formGstin}
                  onChange={(e) => setFormGstin(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Contact Person *"
                  value={formContactPerson}
                  onChange={(e) => setFormContactPerson(e.target.value)}
                  error={formErrors.contactPerson}
                />
                <Input
                  label="Contact Email *"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  error={formErrors.email}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Service Package
                  </label>
                  <select
                    value={formPackage}
                    onChange={(e) => setFormPackage(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Essential Bookkeeping">Essential Bookkeeping</option>
                    <option value="Growth Tax Compliance">Growth Tax Compliance</option>
                    <option value="Enterprise Corporate Advisory">Enterprise Corporate Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Document Compliance
                  </label>
                  <select
                    value={formDocStatus}
                    onChange={(e) => setFormDocStatus(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Complete">Complete</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Action Needed">Action Needed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Monthly Retainer Fee (₹ INR) *"
                  type="number"
                  value={formRetainer}
                  onChange={(e) => setFormRetainer(e.target.value)}
                  error={formErrors.retainer}
                />

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Client Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="active">Active Retainer</option>
                    <option value="pending_onboarding">Pending Onboarding</option>
                    <option value="notice_received">Notice Received</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-end gap-2 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {editingClient ? 'Save Changes' : 'Create Client File'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* DELETE CONFIRMATION DIALOG                                          */}
      {/* ------------------------------------------------------------------- */}
      {deletingClientId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-client-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-sm bg-white border border-border-subtle shadow-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-status-error-bg text-status-error flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="delete-client-modal-title" className="text-sm font-bold text-charcoal">
                  Confirm Client Deletion
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Are you sure you want to delete this client record from the demo workspace?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
              <Button variant="secondary" size="sm" onClick={() => setDeletingClientId(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmDeleteClient}
                className="bg-status-error hover:bg-status-error-text text-white"
              >
                Delete Client
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
