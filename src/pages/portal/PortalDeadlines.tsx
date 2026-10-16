import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  CalendarClock,
  X,
  AlertCircle,
} from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import {
  loadDemoState,
  saveDemoState,
  formatDateDisplay,
  type FictionalDeadline,
} from '../../data/sampleData';

export const PortalDeadlines: React.FC = () => {
  const [deadlines, setDeadlines] = useState<FictionalDeadline[]>(() => loadDemoState().deadlines);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<FictionalDeadline | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formClientName, setFormClientName] = useState('Venkata Cotton Ginning Mills LLP');
  const [formCategory, setFormCategory] = useState<FictionalDeadline['category']>('GST');
  const [formDueDate, setFormDueDate] = useState('2026-10-20');
  const [formFormType, setFormFormType] = useState('Form GSTR-3B');
  const [formPriority, setFormPriority] = useState<FictionalDeadline['priority']>('High');
  const [formStatus, setFormStatus] = useState<FictionalDeadline['status']>('Upcoming');
  const [formNote, setFormNote] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleSync = () => {
      setDeadlines(loadDemoState().deadlines);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFormModal(false);
        setEditingDeadline(null);
        setDeletingId(null);
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

  const categories = ['All', 'GST', 'Direct Tax / TDS', 'MCA / Companies Act', 'Advance Tax'];

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((d) => {
      const matchSearch =
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.statutoryForm.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      const matchPriority = priorityFilter === 'All' || d.priority === priorityFilter;
      const matchCategory = categoryFilter === 'All' || d.category === categoryFilter;

      return matchSearch && matchStatus && matchPriority && matchCategory;
    });
  }, [deadlines, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  // Toggle Complete / Pending
  const handleToggleComplete = (id: string) => {
    const updated = deadlines.map((d) => {
      if (d.id === id) {
        const isCurrentlyCompleted = d.status === 'Completed';
        const newStatus: FictionalDeadline['status'] = isCurrentlyCompleted ? 'Upcoming' : 'Completed';
        const newCount = isCurrentlyCompleted ? Math.max(0, d.completedCount - 1) : d.clientsAffectedCount;
        return {
          ...d,
          status: newStatus,
          completedCount: newCount,
        };
      }
      return d;
    });

    setDeadlines(updated);
    saveDemoState({ deadlines: updated });
    const target = deadlines.find((d) => d.id === id);
    showToast(
      target?.status === 'Completed'
        ? `Reopened task "${target?.title}".`
        : `Marked task "${target?.title}" as Completed.`
    );
  };

  // Open Add Form
  const openAddForm = () => {
    setEditingDeadline(null);
    setFormTitle('');
    setFormClientName('Venkata Cotton Ginning Mills LLP');
    setFormCategory('GST');
    setFormDueDate('2026-10-25');
    setFormFormType('GST Verification');
    setFormPriority('High');
    setFormStatus('Upcoming');
    setFormNote('Practice compliance task checklist item.');
    setFormErrors({});
    setShowFormModal(true);
  };

  // Open Edit Form
  const openEditForm = (item: FictionalDeadline) => {
    setEditingDeadline(item);
    setFormTitle(item.title);
    setFormClientName(item.clientName);
    setFormCategory(item.category);
    setFormDueDate(item.dueDate);
    setFormFormType(item.statutoryForm);
    setFormPriority(item.priority);
    setFormStatus(item.status);
    setFormNote(item.penaltyNote);
    setFormErrors({});
    setShowFormModal(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormErrors({ title: 'Task title is required.' });
      return;
    }

    if (editingDeadline) {
      const updated = deadlines.map((d) =>
        d.id === editingDeadline.id
          ? {
              ...d,
              title: formTitle,
              clientName: formClientName,
              category: formCategory,
              dueDate: formDueDate,
              statutoryForm: formFormType,
              priority: formPriority,
              status: formStatus,
              penaltyNote: formNote,
            }
          : d
      );
      setDeadlines(updated);
      saveDemoState({ deadlines: updated });
      showToast(`Updated task "${formTitle}".`);
    } else {
      const newDeadline: FictionalDeadline = {
        id: `DLN-00${deadlines.length + 1}`,
        title: formTitle,
        clientId: 'CLI-001',
        clientName: formClientName,
        category: formCategory,
        dueDate: formDueDate,
        statutoryForm: formFormType,
        priority: formPriority,
        status: formStatus,
        clientsAffectedCount: 6,
        completedCount: formStatus === 'Completed' ? 6 : 0,
        penaltyNote: formNote || 'Standard compliance filing checklist item.',
        period: '2026-10',
      };
      const updated = [newDeadline, ...deadlines];
      setDeadlines(updated);
      saveDemoState({ deadlines: updated });
      showToast(`Created new compliance task "${formTitle}".`);
    }

    setShowFormModal(false);
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    const target = deadlines.find((d) => d.id === deletingId);
    const updated = deadlines.filter((d) => d.id !== deletingId);
    setDeadlines(updated);
    saveDemoState({ deadlines: updated });
    setDeletingId(null);
    showToast(`Removed task "${target?.title}".`);
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

      {/* Header & Create Task Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Statutory Compliance & Task Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Statutory filing milestones and practice compliance calendar for active client accounts.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openAddForm}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Task
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="w-full lg:w-96">
            <Input
              placeholder="Search task title, client, or statutory form..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-charcoal-muted">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="p-1.5 rounded-button border border-border-subtle bg-surface text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Deadlines List */}
      <div className="space-y-4">
        {filteredDeadlines.length === 0 ? (
          <Card className="p-12 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto text-charcoal-muted">
              <CalendarClock className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-charcoal">No Compliance Tasks Found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              No tasks match your active filters. Clear search filters or create a new task.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setPriorityFilter('All');
                setCategoryFilter('All');
              }}
            >
              Reset Filters
            </Button>
          </Card>
        ) : (
          filteredDeadlines.map((task) => {
            const isOverdue = task.status === 'Overdue';
            const isCompleted = task.status === 'Completed';
            const isUrgent = task.priority === 'Urgent';

            return (
              <Card
                key={task.id}
                className={`p-5 transition-all bg-white border ${
                  isOverdue
                    ? 'border-status-error/40 bg-status-error-bg/10 shadow-xs'
                    : isCompleted
                    ? 'border-border-subtle opacity-80'
                    : 'border-border-subtle hover:border-forest/40'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          isOverdue
                            ? 'error'
                            : isCompleted
                            ? 'success'
                            : isUrgent
                            ? 'error'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {task.status.toUpperCase()}
                      </Badge>

                      <Badge
                        variant={
                          isUrgent ? 'error' : task.priority === 'High' ? 'neutral' : 'sage'
                        }
                        size="sm"
                      >
                        {task.priority} Priority
                      </Badge>

                      <span className="text-xs font-mono text-charcoal-muted">
                        Category: {task.category}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-base font-bold font-heading ${
                          isCompleted ? 'text-charcoal-muted line-through' : 'text-charcoal'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-charcoal-muted mt-0.5">
                        <span className="font-semibold text-charcoal">{task.clientName}</span>
                        <span>•</span>
                        <span className="font-mono">{task.statutoryForm}</span>
                      </div>
                    </div>

                    <div
                      className={`p-2.5 rounded border text-[11px] flex items-start gap-2 ${
                        isOverdue
                          ? 'bg-status-error-bg text-status-error border-status-error/30'
                          : 'bg-surface text-charcoal-muted border-border-subtle'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{task.penaltyNote}</span>
                    </div>
                  </div>

                  {/* Right: Due Date & Action Controls */}
                  <div className="lg:w-80 flex flex-col justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6 border-border-subtle">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal-muted font-medium">Illustrative Due Date:</span>
                        <span
                          className={`font-mono font-bold ${
                            isOverdue ? 'text-status-error' : 'text-charcoal'
                          }`}
                        >
                          {formatDateDisplay(task.dueDate)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-charcoal-muted">
                        <span>Filing Progress:</span>
                        <span className="font-semibold text-charcoal">
                          {task.completedCount} / {task.clientsAffectedCount} Completed
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => handleToggleComplete(task.id)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        className="flex-1"
                      >
                        {isCompleted ? 'Mark Pending' : 'Mark Completed'}
                      </Button>

                      <button
                        type="button"
                        onClick={() => openEditForm(task)}
                        className="p-2 rounded hover:bg-surface text-charcoal hover:text-forest transition-colors border border-border-subtle"
                        title="Edit Task"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingId(task.id)}
                        className="p-2 rounded hover:bg-surface text-charcoal hover:text-status-error transition-colors border border-border-subtle"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CREATE / EDIT TASK MODAL                                            */}
      {/* ------------------------------------------------------------------- */}
      {showFormModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-modal-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-lg bg-white border border-border-subtle shadow-xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between shrink-0">
              <div>
                <CardTitle id="task-modal-title" className="text-base">
                  {editingDeadline ? 'Edit Compliance Task' : 'Create Compliance Task'}
                </CardTitle>
                <p className="text-xs text-charcoal-muted">
                  Saves to active compliance task registry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFormModal(false)}
                aria-label="Close task form"
                className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-5 space-y-3.5 text-xs overflow-y-auto">
              <Input
                label="Task Title *"
                placeholder="e.g. Monthly GST Tax Calculation Check"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                error={formErrors.title}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Associated Client
                  </label>
                  <input
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Regulatory Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="GST">GST Compliance</option>
                    <option value="Direct Tax / TDS">Direct Tax / TDS</option>
                    <option value="MCA / Companies Act">MCA / Companies Act</option>
                    <option value="Advance Tax">Advance Tax</option>
                    <option value="Tax Audit">Tax Audit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Statutory Form / Description"
                  value={formFormType}
                  onChange={(e) => setFormFormType(e.target.value)}
                />

                <Input
                  label="Illustrative Due Date (YYYY-MM-DD)"
                  type="date"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-button border border-border-subtle bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <Input
                label="Compliance Notes / Penalty Clause"
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
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
                  {editingDeadline ? 'Save Task Updates' : 'Create Task'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* DELETE CONFIRMATION DIALOG                                          */}
      {/* ------------------------------------------------------------------- */}
      {deletingId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-task-title"
          className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-sm bg-white border border-border-subtle shadow-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-status-error-bg text-status-error flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="delete-task-title" className="text-sm font-bold text-charcoal">
                  Delete Task
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Remove this compliance reminder from the workspace?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
              <Button variant="secondary" size="sm" onClick={() => setDeletingId(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmDelete}
                className="bg-status-error hover:bg-status-error-text text-white"
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
