import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  UploadCloud,
  FileText,
  Download,
  CheckCircle2,
  FileCheck,
  Eye,
  X,
  FileSpreadsheet,
  FolderOpen,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  formatDateDisplay,
  type FictionalDocument,
} from '../../data/sampleData';

export const PortalDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<FictionalDocument[]>(() => loadDemoState().documents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedClient, setSelectedClient] = useState<string>('All');

  const [previewDoc, setPreviewDoc] = useState<FictionalDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  useEffect(() => {
    const handleSync = () => {
      setDocuments(loadDemoState().documents);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewDoc(null);
        setIsUploading(false);
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
    setUploadToast(msg);
    setTimeout(() => setUploadToast(null), 3500);
  };

  const categories = [
    'All',
    'Bank Statements',
    'Sales Invoices',
    'Purchase Vouchers',
    'Tax Challans',
    'Statutory Registrations',
  ];

  const clientNames = useMemo(() => {
    const set = new Set(documents.map((d) => d.clientName));
    return ['All', ...Array.from(set)];
  }, [documents]);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.period.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || doc.status === selectedStatus;
      const matchClient = selectedClient === 'All' || doc.clientName === selectedClient;

      return matchSearch && matchCategory && matchStatus && matchClient;
    });
  }, [documents, searchTerm, selectedCategory, selectedStatus, selectedClient]);

  // Handle Document Status Change
  const handleUpdateStatus = (docId: string, newStatus: FictionalDocument['status']) => {
    const updated = documents.map((d) =>
      d.id === docId
        ? {
            ...d,
            status: newStatus,
            lastUpdated: '2026-10-13',
          }
        : d
    );
    setDocuments(updated);
    saveDemoState({ documents: updated });
    if (previewDoc && previewDoc.id === docId) {
      setPreviewDoc({ ...previewDoc, status: newStatus, lastUpdated: '2026-10-13' });
    }
    showToast(`Updated document status to "${newStatus}".`);
  };

  // Simulated Upload
  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: FictionalDocument = {
        id: `DOC-${100 + documents.length + 1}`,
        clientId: 'CLI-001',
        clientName: 'Venkata Cotton Ginning Mills LLP',
        title: file.name,
        category: file.name.toLowerCase().includes('bank') ? 'Bank Statements' : 'Sales Invoices',
        period: '2026-10',
        uploadedAt: '2026-10-13',
        lastUpdated: '2026-10-13',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Under Review',
        fileType: file.name.endsWith('.xlsx') ? 'XLSX' : file.name.endsWith('.zip') ? 'ZIP' : 'PDF',
        notes: 'Document uploaded and awaiting review.',
      };
      const updated = [newDoc, ...documents];
      setDocuments(updated);
      saveDemoState({ documents: updated });
      setIsUploading(false);
      showToast(`Document "${file.name}" successfully uploaded and indexed.`);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {uploadToast && (
        <div className="p-3 bg-sage border border-sage-dark/60 rounded-card text-xs text-forest-dark flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
            <span>{uploadToast}</span>
          </div>
          <button type="button" onClick={() => setUploadToast(null)} className="font-bold text-forest">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Simulated Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Document Compliance Tracker
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Audit repository for bank statements, tax challans, and GST e-invoices with verification status workflow.
          </p>
        </div>

        {/* Upload Simulation CTA */}
        <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-forest hover:bg-forest-dark rounded-button shadow-xs transition-colors">
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? 'Indexing File...' : 'Upload Document'}</span>
          <input
            type="file"
            className="hidden"
            onChange={handleSimulateUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="w-full lg:w-96">
            <Input
              placeholder="Search document title, client, or reporting period..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest max-w-[160px] truncate"
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Statuses</option>
                <option value="Requested">Requested</option>
                <option value="Received">Received</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            {/* Client Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Client:</span>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest max-w-[170px] truncate"
              >
                {clientNames.map((cl) => (
                  <option key={cl} value={cl}>
                    {cl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Document Compliance Register</CardTitle>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Showing {filteredDocs.length} of {documents.length} files matching active filter parameters.
            </p>
          </div>
          <span className="text-xs font-mono text-charcoal-muted">
            Format Standards: PDF • XLSX • ZIP
          </span>
        </CardHeader>

        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto text-charcoal-muted">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-charcoal">No Documents Found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              No files match your query. Try clearing the search or switching the category/status filter.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSelectedClient('All');
              }}
            >
              Reset Document Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Document Title</th>
                  <th className="py-2.5 px-3">Associated Client</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3">Last Updated</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/80">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-button bg-sage/60 text-forest flex items-center justify-center shrink-0">
                          {doc.fileType === 'XLSX' ? (
                            <FileSpreadsheet className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block truncate max-w-[220px]">
                            {doc.title}
                          </span>
                          <span className="text-[10px] text-charcoal-muted font-mono">
                            {doc.id} • {doc.fileSize}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-charcoal">{doc.clientName}</td>
                    <td className="py-3 px-3 text-charcoal-muted">{doc.category}</td>
                    <td className="py-3 px-3 font-mono text-charcoal-muted">{doc.period}</td>
                    <td className="py-3 px-3 font-mono text-charcoal-muted">
                      {formatDateDisplay(doc.lastUpdated)}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={doc.status}
                        onChange={(e) =>
                          handleUpdateStatus(doc.id, e.target.value as FictionalDocument['status'])
                        }
                        className={`text-[11px] font-semibold px-2 py-1 rounded border focus:ring-2 focus:ring-forest cursor-pointer ${
                          doc.status === 'Approved'
                            ? 'bg-status-success-bg text-status-success border-status-success/30'
                            : doc.status === 'Requested'
                            ? 'bg-status-error-bg text-status-error border-status-error/30'
                            : doc.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-sage text-forest border-sage-dark/60'
                        }`}
                      >
                        <option value="Requested">Requested</option>
                        <option value="Received">Received</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            showToast(
                              `Initiated download for "${doc.title}".`
                            )
                          }
                          className="p-1.5 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors"
                          title="Download Document"
                          aria-label={`Download document copy of ${doc.title}`}
                        >
                          <Download className="w-3.5 h-3.5" />
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
      {/* DOCUMENT DETAILS PANEL (MODAL)                                      */}
      {/* ------------------------------------------------------------------- */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-doc-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-lg bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono text-charcoal-muted uppercase">
                  {previewDoc.id} • Audit Record Details
                </span>
                <CardTitle id="preview-doc-title" className="text-base mt-0.5 truncate">
                  {previewDoc.title}
                </CardTitle>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                aria-label="Close document details"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="p-4 bg-surface rounded-card border border-border-subtle space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Associated Client:</span>
                  <span className="font-semibold text-charcoal">{previewDoc.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Category:</span>
                  <span className="text-charcoal">{previewDoc.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Reporting Period:</span>
                  <span className="font-mono text-charcoal">{previewDoc.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">File Size & Format:</span>
                  <span className="font-mono text-charcoal">
                    {previewDoc.fileSize} ({previewDoc.fileType})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">First Uploaded:</span>
                  <span className="font-mono text-charcoal">
                    {formatDateDisplay(previewDoc.uploadedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Last Updated:</span>
                  <span className="font-mono text-charcoal">
                    {formatDateDisplay(previewDoc.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="p-3 bg-white border border-border-subtle rounded-card space-y-2">
                <span className="font-semibold text-charcoal block">Verification Status:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['Requested', 'Received', 'Under Review', 'Approved'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(previewDoc.id, st)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        previewDoc.status === st
                          ? 'bg-forest text-white'
                          : 'bg-surface text-charcoal border border-border-subtle hover:bg-sage/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {previewDoc.notes && (
                <div className="p-3 rounded bg-sage/30 border border-border-subtle text-xs text-charcoal flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{previewDoc.notes}</p>
                </div>
              )}

              <p className="text-[11px] text-charcoal-muted">
                * Document securely archived and encrypted in practice records.
              </p>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
                Close Panel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast(`Downloaded archive copy for "${previewDoc.title}".`);
                  setPreviewDoc(null);
                }}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download Document
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
