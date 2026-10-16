/**
 * Centralized Practice Data Model for Dhanam Financial Services
 * 
 * Client directory, compliance schedules, document registry,
 * and ledger records for practice management operations.
 */

export interface FictionalClient {
  id: string;
  name: string;
  tradeName: string;
  pan: string;
  gstin: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  entityType: 'Private Limited' | 'LLP' | 'Proprietorship' | 'Partnership' | 'Professional';
  industry: string;
  servicePackage: 'Essential Bookkeeping' | 'Growth Tax Compliance' | 'Enterprise Corporate Advisory';
  documentCompletionStatus: 'Complete' | 'Pending Review' | 'Action Needed';
  status: 'active' | 'pending_onboarding' | 'notice_received' | 'inactive';
  monthlyRetainer: number; // in INR
  complianceScore: number; // 0-100%
  assignedAccountant: string;
  onboardingDate: string; // YYYY-MM-DD
  activeFilingTypes: string[];
}

export interface FictionalDocument {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  category: 'Bank Statements' | 'Sales Invoices' | 'Purchase Vouchers' | 'Tax Challans' | 'Statutory Registrations';
  status: 'Requested' | 'Received' | 'Under Review' | 'Approved';
  period: string; // e.g. "2026-10", "2026-09", "Q2-2026"
  uploadedAt: string; // YYYY-MM-DD
  lastUpdated: string; // YYYY-MM-DD
  fileSize: string;
  fileType: 'PDF' | 'XLSX' | 'ZIP';
  notes?: string;
}

export interface FictionalDeadline {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  category: 'GST' | 'Direct Tax / TDS' | 'MCA / Companies Act' | 'Advance Tax' | 'Tax Audit';
  dueDate: string; // YYYY-MM-DD
  statutoryForm: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Overdue';
  clientsAffectedCount: number;
  completedCount: number;
  penaltyNote: string;
  period: string;
}

export interface FictionalTransaction {
  id: string;
  clientId: string;
  clientName: string;
  date: string; // YYYY-MM-DD
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number; // in INR
  status: 'reconciled' | 'pending' | 'flagged';
  paymentMethod: 'NEFT/RTGS' | 'UPI' | 'Direct Debit' | 'Cheque';
  voucherNo: string;
  notes?: string;
  period: string; // YYYY-MM
}

export interface MonthlyFinancialSummary {
  periodKey: string; // "2026-05"
  monthLabel: string; // "May 2026"
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  income: number;
  expenses: number;
  netMargin: number;
  documentsProcessed: number;
  deadlinesMet: number;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'urgent' | 'info' | 'warning';
  read: boolean;
  link?: string;
}

export interface ReportPeriodOption {
  key: string;
  label: string;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  month?: string; // YYYY-MM
  description: string;
}

export interface DemoSettings {
  displayName: string;
  displayCurrency: 'INR' | 'USD' | 'EUR';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  compactView: boolean;
  enableNotifications: boolean;
  defaultPeriod: string;
  firmFRN: string;
  seniorPartner: string;
}

export const INITIAL_SETTINGS: DemoSettings = {
  displayName: 'K. Ramanathan, FCA',
  displayCurrency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  compactView: false,
  enableNotifications: true,
  defaultPeriod: 'current-month',
  firmFRN: '014920S',
  seniorPartner: 'K. Ramanathan, FCA (Senior Managing Partner)',
};

// ---------------------------------------------------------------------------
// 1. Initial 10 Fictional Business Clients
// ---------------------------------------------------------------------------
export const INITIAL_CLIENTS: FictionalClient[] = [
  {
    id: 'CLI-001',
    name: 'Venkata Cotton Ginning Mills LLP',
    tradeName: 'Venkata Agro Fibres',
    pan: 'AABCV1234F',
    gstin: '37AABCV1234F1Z8',
    contactPerson: 'P. Venkata Rao (Managing Partner)',
    contactEmail: 'accounts@venkatacotton.in',
    contactPhone: '+91 94401 23456',
    entityType: 'LLP',
    industry: 'Agro Textile & Ginning',
    servicePackage: 'Growth Tax Compliance',
    documentCompletionStatus: 'Complete',
    status: 'active',
    monthlyRetainer: 8500,
    complianceScore: 98,
    assignedAccountant: 'K. Ramanathan, FCA',
    onboardingDate: '2024-04-10',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'TDS 26Q', 'Income Tax'],
  },
  {
    id: 'CLI-002',
    name: 'Amaravati Health Diagnostics Pvt Ltd',
    tradeName: 'Amaravati Central Laboratories',
    pan: 'AAACA4567M',
    gstin: '37AAACA4567M1Z2',
    contactPerson: 'Dr. S. K. Murthy (Director)',
    contactEmail: 'billing@amaravatilabs.in',
    contactPhone: '+91 98480 34567',
    entityType: 'Private Limited',
    industry: 'Diagnostic Healthcare Services',
    servicePackage: 'Enterprise Corporate Advisory',
    documentCompletionStatus: 'Complete',
    status: 'active',
    monthlyRetainer: 14000,
    complianceScore: 100,
    assignedAccountant: 'K. Ramanathan, FCA',
    onboardingDate: '2023-11-15',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'TDS 24Q/26Q', 'MCA AOC-4', 'MGT-7'],
  },
  {
    id: 'CLI-003',
    name: 'Sri Sai Logistics & Fleet Services',
    tradeName: 'Sri Sai Interstate Cargo',
    pan: 'ABCFS9981K',
    gstin: '37ABCFS9981K1Z4',
    contactPerson: 'G. Nageswara Rao (Proprietor)',
    contactEmail: 'dispatch@srisailogistics.in',
    contactPhone: '+91 99890 45678',
    entityType: 'Proprietorship',
    industry: 'Freight Transportation & Logistics',
    servicePackage: 'Essential Bookkeeping',
    documentCompletionStatus: 'Action Needed',
    status: 'notice_received',
    monthlyRetainer: 4500,
    complianceScore: 82,
    assignedAccountant: 'M. Sowmya',
    onboardingDate: '2024-08-01',
    activeFilingTypes: ['GSTR-3B', 'TDS 26Q'],
  },
  {
    id: 'CLI-004',
    name: 'Prakasam Agro Exports Pvt Ltd',
    tradeName: 'Prakasam Organic Spices',
    pan: 'AADCP7721L',
    gstin: '37AADCP7721L1Z9',
    contactPerson: 'K. Subrahmanyam (CEO)',
    contactEmail: 'export.desk@prakasamagro.in',
    contactPhone: '+91 94412 56789',
    entityType: 'Private Limited',
    industry: 'Agricultural Food Processing & Exports',
    servicePackage: 'Enterprise Corporate Advisory',
    documentCompletionStatus: 'Complete',
    status: 'active',
    monthlyRetainer: 16500,
    complianceScore: 96,
    assignedAccountant: 'K. Ramanathan, FCA',
    onboardingDate: '2023-06-20',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'LUT Export Filing', 'Advance Tax', 'ROC AOC-4'],
  },
  {
    id: 'CLI-005',
    name: 'Krishna Dental & Orthodontic Clinic',
    tradeName: 'Krishna Smile Studio',
    pan: 'AJIPK3342E',
    gstin: '37AJIPK3342E1Z5',
    contactPerson: 'Dr. Radhika K., MDS',
    contactEmail: 'care@krishnadental.in',
    contactPhone: '+91 98499 67890',
    entityType: 'Professional',
    industry: 'Specialized Healthcare Practice',
    servicePackage: 'Essential Bookkeeping',
    documentCompletionStatus: 'Complete',
    status: 'active',
    monthlyRetainer: 3000,
    complianceScore: 100,
    assignedAccountant: 'M. Sowmya',
    onboardingDate: '2024-02-12',
    activeFilingTypes: ['ITR-4 Presumptive u/s 44ADA', 'Advance Tax'],
  },
  {
    id: 'CLI-006',
    name: 'Bhavani Electrical & Engineering Works',
    tradeName: 'Bhavani Tech Sol',
    pan: 'AALFB8812D',
    gstin: '37AALFB8812D1Z1',
    contactPerson: 'T. Bhavani Prasad (Managing Partner)',
    contactEmail: 'orders@bhavaniengineering.in',
    contactPhone: '+91 97010 11223',
    entityType: 'Partnership',
    industry: 'Industrial Switchgear & EPC Contracts',
    servicePackage: 'Growth Tax Compliance',
    documentCompletionStatus: 'Pending Review',
    status: 'active',
    monthlyRetainer: 5500,
    complianceScore: 91,
    assignedAccountant: 'M. Sowmya',
    onboardingDate: '2024-05-18',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'Tax Audit Form 3CD'],
  },
  {
    id: 'CLI-007',
    name: 'Godavari Cold Storage & Warehouse LLP',
    tradeName: 'Godavari Agri Cold Chain',
    pan: 'AAGCG4412H',
    gstin: '37AAGCG4412H1Z7',
    contactPerson: 'M. Sitarama Raju',
    contactEmail: 'ops@godavaricold.in',
    contactPhone: '+91 99491 77889',
    entityType: 'LLP',
    industry: 'Commercial Warehousing & Cold Chain',
    servicePackage: 'Growth Tax Compliance',
    documentCompletionStatus: 'Pending Review',
    status: 'active',
    monthlyRetainer: 7000,
    complianceScore: 94,
    assignedAccountant: 'K. Ramanathan, FCA',
    onboardingDate: '2024-01-15',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'TDS 26Q'],
  },
  {
    id: 'CLI-008',
    name: 'Kaveri Infotech Solutions Pvt Ltd',
    tradeName: 'Kaveri Cloud Technologies',
    pan: 'AABCK5581P',
    gstin: '37AABCK5581P1Z3',
    contactPerson: 'V. Ananya Reddy (Director - Finance)',
    contactEmail: 'finance@kavericloud.in',
    contactPhone: '+91 98850 23451',
    entityType: 'Private Limited',
    industry: 'Enterprise Software & IT Consulting',
    servicePackage: 'Enterprise Corporate Advisory',
    documentCompletionStatus: 'Complete',
    status: 'active',
    monthlyRetainer: 15000,
    complianceScore: 99,
    assignedAccountant: 'K. Ramanathan, FCA',
    onboardingDate: '2023-09-01',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B', 'TDS 24Q Payroll', 'Form 15CA/CB Remittances'],
  },
  {
    id: 'CLI-009',
    name: 'Annapurna Supermarket & Retail Mart',
    tradeName: 'Annapurna Grocery Hub',
    pan: 'AABCA7712M',
    gstin: '37AABCA7712M1Z6',
    contactPerson: 'C. Venkatesh (Proprietor)',
    contactEmail: 'store@annapurnaretail.in',
    contactPhone: '+91 94901 55443',
    entityType: 'Proprietorship',
    industry: 'FMCG Retail & Supermarket Chain',
    servicePackage: 'Essential Bookkeeping',
    documentCompletionStatus: 'Pending Review',
    status: 'active',
    monthlyRetainer: 4000,
    complianceScore: 95,
    assignedAccountant: 'M. Sowmya',
    onboardingDate: '2024-03-05',
    activeFilingTypes: ['GSTR-1', 'GSTR-3B'],
  },
  {
    id: 'CLI-010',
    name: 'Tirumala Engineering & Metal Fabricators',
    tradeName: 'Tirumala Precision Fab',
    pan: 'AABCT9921B',
    gstin: '37AABCT9921B1Z2',
    contactPerson: 'B. Satyanarayana (Founder)',
    contactEmail: 'fab@tirumalaengg.in',
    contactPhone: '+91 98492 99881',
    entityType: 'Proprietorship',
    industry: 'Structural Steel & Heavy Fabrication',
    servicePackage: 'Essential Bookkeeping',
    documentCompletionStatus: 'Action Needed',
    status: 'pending_onboarding',
    monthlyRetainer: 5000,
    complianceScore: 88,
    assignedAccountant: 'M. Sowmya',
    onboardingDate: '2026-10-02',
    activeFilingTypes: ['GST Registration Migration', 'Monthly Books'],
  },
];

// ---------------------------------------------------------------------------
// 2. Initial Documents Records
// ---------------------------------------------------------------------------
export const INITIAL_DOCUMENTS: FictionalDocument[] = [
  {
    id: 'DOC-101',
    clientId: 'CLI-001',
    clientName: 'Venkata Cotton Ginning Mills LLP',
    title: 'ICICI_Current_Account_Stmt_Sep2026.pdf',
    category: 'Bank Statements',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-10-04',
    lastUpdated: '2026-10-06',
    fileSize: '1.4 MB',
    fileType: 'PDF',
    notes: 'Opening and closing balances reconciled against cashbook.',
  },
  {
    id: 'DOC-102',
    clientId: 'CLI-002',
    clientName: 'Amaravati Health Diagnostics Pvt Ltd',
    title: 'GSTR_2B_AutoDrafted_ITC_Sep2026.xlsx',
    category: 'Sales Invoices',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-10-11',
    lastUpdated: '2026-10-12',
    fileSize: '3.8 MB',
    fileType: 'XLSX',
    notes: 'ITC matching completed with 99.4% vendor invoice parity.',
  },
  {
    id: 'DOC-103',
    clientId: 'CLI-004',
    clientName: 'Prakasam Agro Exports Pvt Ltd',
    title: 'TDS_Challan_281_Quarter2_Form26Q.pdf',
    category: 'Tax Challans',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-10-07',
    lastUpdated: '2026-10-08',
    fileSize: '420 KB',
    fileType: 'PDF',
    notes: 'BSR code and CIN verified on OLTAS tax portal.',
  },
  {
    id: 'DOC-104',
    clientId: 'CLI-003',
    clientName: 'Sri Sai Logistics & Fleet Services',
    title: 'HDFC_Vendor_Diesel_Disbursements_Sep26.xlsx',
    category: 'Bank Statements',
    status: 'Under Review',
    period: '2026-09',
    uploadedAt: '2026-10-12',
    lastUpdated: '2026-10-12',
    fileSize: '2.1 MB',
    fileType: 'XLSX',
    notes: 'Awaiting client classification on 4 unlabelled bulk fuel debits.',
  },
  {
    id: 'DOC-105',
    clientId: 'CLI-005',
    clientName: 'Krishna Dental & Orthodontic Clinic',
    title: 'Sales_Register_Card_And_UPI_Q2.xlsx',
    category: 'Sales Invoices',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-10-10',
    lastUpdated: '2026-10-11',
    fileSize: '890 KB',
    fileType: 'XLSX',
  },
  {
    id: 'DOC-106',
    clientId: 'CLI-006',
    clientName: 'Bhavani Electrical & Engineering Works',
    title: 'Advance_Tax_Challan_ITNS_280_Inst2.pdf',
    category: 'Tax Challans',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-09-15',
    lastUpdated: '2026-09-16',
    fileSize: '310 KB',
    fileType: 'PDF',
  },
  {
    id: 'DOC-107',
    clientId: 'CLI-002',
    clientName: 'Amaravati Health Diagnostics Pvt Ltd',
    title: 'Form_DIR_12_ROC_Appointment_Extract.pdf',
    category: 'Statutory Registrations',
    status: 'Approved',
    period: '2026-09',
    uploadedAt: '2026-09-28',
    lastUpdated: '2026-09-29',
    fileSize: '1.1 MB',
    fileType: 'PDF',
  },
  {
    id: 'DOC-108',
    clientId: 'CLI-003',
    clientName: 'Sri Sai Logistics & Fleet Services',
    title: 'Unreconciled_Purchase_Vouchers_Batch3.zip',
    category: 'Purchase Vouchers',
    status: 'Requested',
    period: '2026-10',
    uploadedAt: '2026-10-13',
    lastUpdated: '2026-10-13',
    fileSize: '5.6 MB',
    fileType: 'ZIP',
    notes: 'Client requested to re-upload with clear supplier GSTIN legible scans.',
  },
  {
    id: 'DOC-109',
    clientId: 'CLI-008',
    clientName: 'Kaveri Infotech Solutions Pvt Ltd',
    title: 'HDFC_Salary_Disbursement_Payroll_Sep26.xlsx',
    category: 'Bank Statements',
    status: 'Under Review',
    period: '2026-09',
    uploadedAt: '2026-10-03',
    lastUpdated: '2026-10-05',
    fileSize: '1.6 MB',
    fileType: 'XLSX',
    notes: 'TDS Section 192 deductions mapped against employee roster.',
  },
  {
    id: 'DOC-110',
    clientId: 'CLI-007',
    clientName: 'Godavari Cold Storage & Warehouse LLP',
    title: 'Electricity_Solar_Subsidy_Voucher_Sep26.pdf',
    category: 'Purchase Vouchers',
    status: 'Received',
    period: '2026-09',
    uploadedAt: '2026-10-12',
    lastUpdated: '2026-10-12',
    fileSize: '640 KB',
    fileType: 'PDF',
  },
  {
    id: 'DOC-111',
    clientId: 'CLI-009',
    clientName: 'Annapurna Supermarket & Retail Mart',
    title: 'Daily_POS_Z_Reports_Aggregated_Sep26.xlsx',
    category: 'Sales Invoices',
    status: 'Received',
    period: '2026-09',
    uploadedAt: '2026-10-12',
    lastUpdated: '2026-10-12',
    fileSize: '4.2 MB',
    fileType: 'XLSX',
  },
  {
    id: 'DOC-112',
    clientId: 'CLI-010',
    clientName: 'Tirumala Engineering & Metal Fabricators',
    title: 'Partnership_Deed_And_Udyam_Registration.pdf',
    category: 'Statutory Registrations',
    status: 'Under Review',
    period: '2026-10',
    uploadedAt: '2026-10-13',
    lastUpdated: '2026-10-13',
    fileSize: '2.8 MB',
    fileType: 'PDF',
    notes: 'Submitted for onboarding practice verification.',
  },
];

// ---------------------------------------------------------------------------
// 3. Illustrative Deadlines (Upcoming, Overdue & Scheduled)
// ---------------------------------------------------------------------------
export const INITIAL_DEADLINES: FictionalDeadline[] = [
  {
    id: 'DLN-001',
    title: 'GSTR-3B Monthly Return Filing',
    clientId: 'CLI-001',
    clientName: 'Venkata Cotton Ginning Mills LLP',
    category: 'GST',
    dueDate: '2026-10-20',
    statutoryForm: 'Form GSTR-3B (September 2026 Tax Period)',
    priority: 'Urgent',
    status: 'Upcoming',
    clientsAffectedCount: 8,
    completedCount: 2,
    penaltyNote: 'Standard statutory cut-off falls on the 20th of the month.',
    period: '2026-10',
  },
  {
    id: 'DLN-002',
    title: 'Quarterly TDS / TCS Return (Q2)',
    clientId: 'CLI-002',
    clientName: 'Amaravati Health Diagnostics Pvt Ltd',
    category: 'Direct Tax / TDS',
    dueDate: '2026-10-31',
    statutoryForm: 'Form 26Q (Non-Salary TDS) & 24Q (Salary)',
    priority: 'High',
    status: 'In Progress',
    clientsAffectedCount: 7,
    completedCount: 3,
    penaltyNote: 'Quarterly statement compilation across deductor entries.',
    period: '2026-10',
  },
  {
    id: 'DLN-003',
    title: 'AOC-4 Financial Statements Filing',
    clientId: 'CLI-004',
    clientName: 'Prakasam Agro Exports Pvt Ltd',
    category: 'MCA / Companies Act',
    dueDate: '2026-10-29',
    statutoryForm: 'MCA Form AOC-4 (Within 30 days of AGM)',
    priority: 'High',
    status: 'In Progress',
    clientsAffectedCount: 3,
    completedCount: 1,
    penaltyNote: 'Corporate annual return and balance sheet submission.',
    period: '2026-10',
  },
  {
    id: 'DLN-004',
    title: 'TDS Monthly Deposit (Challan 281)',
    clientId: 'CLI-003',
    clientName: 'Sri Sai Logistics & Fleet Services',
    category: 'Direct Tax / TDS',
    dueDate: '2026-10-07',
    statutoryForm: 'Challan ITNS 281 (Deductions in Sep 2026)',
    priority: 'Urgent',
    status: 'Overdue',
    clientsAffectedCount: 8,
    completedCount: 7,
    penaltyNote: 'Deposit cut-off elapsed for September deductions (1 Client Pending).',
    period: '2026-10',
  },
  {
    id: 'DLN-005',
    title: 'GSTR-1 Outward Supply Return',
    clientId: 'CLI-006',
    clientName: 'Bhavani Electrical & Engineering Works',
    category: 'GST',
    dueDate: '2026-11-11',
    statutoryForm: 'Form GSTR-1 (October Outward Sales)',
    priority: 'Medium',
    status: 'Upcoming',
    clientsAffectedCount: 9,
    completedCount: 0,
    penaltyNote: 'Monthly outward supplies upload for recipient 2B credit.',
    period: '2026-11',
  },
  {
    id: 'DLN-006',
    title: 'Advance Tax Installment 3 (75% Cumulative)',
    clientId: 'CLI-008',
    clientName: 'Kaveri Infotech Solutions Pvt Ltd',
    category: 'Advance Tax',
    dueDate: '2026-12-15',
    statutoryForm: 'Direct Tax Challan ITNS 280',
    priority: 'Medium',
    status: 'Upcoming',
    clientsAffectedCount: 10,
    completedCount: 0,
    penaltyNote: 'Direct corporate advance tax installment planning.',
    period: '2026-12',
  },
  {
    id: 'DLN-007',
    title: 'Annual GST Return & Reconciliation Statement',
    clientId: 'CLI-007',
    clientName: 'Godavari Cold Storage & Warehouse LLP',
    category: 'GST',
    dueDate: '2026-12-31',
    statutoryForm: 'Form GSTR-9 & Self-Certified 9C',
    priority: 'Low',
    status: 'Upcoming',
    clientsAffectedCount: 4,
    completedCount: 0,
    penaltyNote: 'Annual composite turnover and tax reconciliation.',
    period: '2026-12',
  },
];

// ---------------------------------------------------------------------------
// 4. Bookkeeping Entries (Income & Expenses)
// ---------------------------------------------------------------------------
export const INITIAL_TRANSACTIONS: FictionalTransaction[] = [
  {
    id: 'TXN-701',
    clientId: 'CLI-002',
    clientName: 'Amaravati Health Diagnostics Pvt Ltd',
    date: '2026-10-12',
    type: 'income',
    category: 'Retainer Accounting Fees',
    description: 'Monthly CA retainer & TDS reconciliation for Oct 2026',
    amount: 14000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-108',
    notes: 'Received via ICICI Net Banking',
    period: '2026-10',
  },
  {
    id: 'TXN-702',
    clientId: 'CLI-004',
    clientName: 'Prakasam Agro Exports Pvt Ltd',
    date: '2026-10-11',
    type: 'income',
    category: 'Corporate Advisory & Retainer',
    description: 'Q2 Management Accounts & Statutory Filing Fee',
    amount: 16500,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-109',
    notes: 'Includes export documentation support fee',
    period: '2026-10',
  },
  {
    id: 'TXN-703',
    clientId: 'CLI-001',
    clientName: 'Dhanam Practice Operations',
    date: '2026-10-10',
    type: 'expense',
    category: 'Tax Software & Utilities',
    description: 'CA Practice Management & GST API Cloud License (Oct)',
    amount: 4800,
    status: 'reconciled',
    paymentMethod: 'Direct Debit',
    voucherNo: 'PY-2026-081',
    notes: 'Monthly practice cloud subscription',
    period: '2026-10',
  },
  {
    id: 'TXN-704',
    clientId: 'CLI-001',
    clientName: 'Venkata Cotton Ginning Mills LLP',
    date: '2026-10-09',
    type: 'income',
    category: 'Retainer Accounting Fees',
    description: 'Monthly bookkeeping & GSTR-3B preparation retainer',
    amount: 8500,
    status: 'reconciled',
    paymentMethod: 'UPI',
    voucherNo: 'RC-2026-110',
    notes: 'Settled via UPI reference #98129048',
    period: '2026-10',
  },
  {
    id: 'TXN-705',
    clientId: 'CLI-003',
    clientName: 'Dhanam Practice Operations',
    date: '2026-10-08',
    type: 'expense',
    category: 'Office Operations & Research',
    description: 'Vijayawada practice office broadband, courier & documentation',
    amount: 3200,
    status: 'reconciled',
    paymentMethod: 'UPI',
    voucherNo: 'PY-2026-082',
    notes: 'Courier and stationery disbursements',
    period: '2026-10',
  },
  {
    id: 'TXN-706',
    clientId: 'CLI-008',
    clientName: 'Kaveri Infotech Solutions Pvt Ltd',
    date: '2026-10-05',
    type: 'income',
    category: 'Corporate Advisory & Retainer',
    description: 'Retainer & international remittance certification (Form 15CB)',
    amount: 15000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-111',
    notes: 'Remittance certificate issuance fee',
    period: '2026-10',
  },
  {
    id: 'TXN-707',
    clientId: 'CLI-006',
    clientName: 'Bhavani Electrical & Engineering Works',
    date: '2026-10-04',
    type: 'income',
    category: 'Retainer Accounting Fees',
    description: 'Partnership firm monthly accounts & GST reconciliation',
    amount: 5500,
    status: 'reconciled',
    paymentMethod: 'UPI',
    voucherNo: 'RC-2026-112',
    notes: 'Monthly accounting retainer',
    period: '2026-10',
  },
  {
    id: 'TXN-708',
    clientId: 'CLI-007',
    clientName: 'Godavari Cold Storage & Warehouse LLP',
    date: '2026-10-02',
    type: 'income',
    category: 'Retainer Accounting Fees',
    description: 'Monthly ledger balancing & warehouse payroll TDS desk',
    amount: 7000,
    status: 'pending',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-113',
    notes: 'Cheque in clearing at bank',
    period: '2026-10',
  },
  {
    id: 'TXN-709',
    clientId: 'CLI-001',
    clientName: 'Dhanam Practice Operations',
    date: '2026-10-01',
    type: 'expense',
    category: 'Staff & Compliance Associates',
    description: 'Senior audit stipend & research associate compensation',
    amount: 22000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'PY-2026-083',
    notes: 'Audit associates monthly stipend',
    period: '2026-10',
  },
  {
    id: 'TXN-601',
    clientId: 'CLI-002',
    clientName: 'Amaravati Health Diagnostics Pvt Ltd',
    date: '2026-09-28',
    type: 'income',
    category: 'Retainer Accounting Fees',
    description: 'September 2026 retainer fee settlement',
    amount: 14000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-098',
    period: '2026-09',
  },
  {
    id: 'TXN-602',
    clientId: 'CLI-004',
    clientName: 'Prakasam Agro Exports Pvt Ltd',
    date: '2026-09-25',
    type: 'income',
    category: 'Corporate Advisory & Retainer',
    description: 'Export incentive claims documentation fee',
    amount: 16500,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-099',
    period: '2026-09',
  },
  {
    id: 'TXN-603',
    clientId: 'CLI-001',
    clientName: 'Dhanam Practice Operations',
    date: '2026-09-22',
    type: 'expense',
    category: 'Office Operations & Research',
    description: 'Statutory compendium publications & client reporting stationery',
    amount: 5200,
    status: 'reconciled',
    paymentMethod: 'UPI',
    voucherNo: 'PY-2026-074',
    period: '2026-09',
  },
  {
    id: 'TXN-604',
    clientId: 'CLI-008',
    clientName: 'Kaveri Infotech Solutions Pvt Ltd',
    date: '2026-09-18',
    type: 'income',
    category: 'Corporate Advisory & Retainer',
    description: 'Monthly CA Retainer',
    amount: 15000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'RC-2026-100',
    period: '2026-09',
  },
  {
    id: 'TXN-605',
    clientId: 'CLI-001',
    clientName: 'Dhanam Practice Operations',
    date: '2026-09-02',
    type: 'expense',
    category: 'Staff & Compliance Associates',
    description: 'Practice staff salaries for August cycle',
    amount: 22000,
    status: 'reconciled',
    paymentMethod: 'NEFT/RTGS',
    voucherNo: 'PY-2026-075',
    period: '2026-09',
  },
];

// ---------------------------------------------------------------------------
// 5. Monthly Multi-Period Financial History (Deterministic 6 Months)
// ---------------------------------------------------------------------------
export const MONTHLY_FINANCIAL_HISTORY: MonthlyFinancialSummary[] = [
  {
    periodKey: '2026-05',
    monthLabel: 'May 2026',
    quarter: 'Q1',
    income: 68500,
    expenses: 26400,
    netMargin: 42100,
    documentsProcessed: 28,
    deadlinesMet: 8,
  },
  {
    periodKey: '2026-06',
    monthLabel: 'Jun 2026',
    quarter: 'Q1',
    income: 74200,
    expenses: 28100,
    netMargin: 46100,
    documentsProcessed: 32,
    deadlinesMet: 9,
  },
  {
    periodKey: '2026-07',
    monthLabel: 'Jul 2026',
    quarter: 'Q2',
    income: 82000,
    expenses: 31500,
    netMargin: 50500,
    documentsProcessed: 41,
    deadlinesMet: 11,
  },
  {
    periodKey: '2026-08',
    monthLabel: 'Aug 2026',
    quarter: 'Q2',
    income: 76800,
    expenses: 29200,
    netMargin: 47600,
    documentsProcessed: 35,
    deadlinesMet: 8,
  },
  {
    periodKey: '2026-09',
    monthLabel: 'Sep 2026',
    quarter: 'Q2',
    income: 86400,
    expenses: 32600,
    netMargin: 53800,
    documentsProcessed: 44,
    deadlinesMet: 12,
  },
  {
    periodKey: '2026-10',
    monthLabel: 'Oct 2026',
    quarter: 'Q3',
    income: 70500,
    expenses: 30000,
    netMargin: 40500,
    documentsProcessed: 36,
    deadlinesMet: 7,
  },
];

// ---------------------------------------------------------------------------
// 6. Report Period Options
// ---------------------------------------------------------------------------
export const REPORT_PERIOD_OPTIONS: ReportPeriodOption[] = [
  {
    key: 'current-month',
    label: 'Current Month (October 2026)',
    month: '2026-10',
    quarter: 'Q3',
    description: 'Active financial and compliance cycle for October 2026',
  },
  {
    key: 'prior-month',
    label: 'Prior Month (September 2026)',
    month: '2026-09',
    quarter: 'Q2',
    description: 'Closed accounting period with completed reconciliations',
  },
  {
    key: 'q2-fy26',
    label: 'Q2 FY 2025–26 (Jul – Sep 2026)',
    quarter: 'Q2',
    description: 'Quarter 2 composite performance and statutory tax filings',
  },
  {
    key: 'q1-fy26',
    label: 'Q1 FY 2025–26 (Apr – Jun 2026)',
    quarter: 'Q1',
    description: 'Quarter 1 composite performance and advance tax cycle',
  },
  {
    key: 'full-ytd',
    label: 'Full Year FY 2025–26 (YTD)',
    quarter: 'ALL',
    description: 'Cumulative 6-month fiscal metrics from April to October 2026',
  },
];

// ---------------------------------------------------------------------------
// 7. Initial Demo Notifications
// ---------------------------------------------------------------------------
export const INITIAL_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'GSTR-3B Cutoff in 7 Days',
    message: '6 client entities have pending GSTR-3B return drafts for September 2026 tax period.',
    timestamp: 'Today, 11:30 AM',
    priority: 'urgent',
    read: false,
    link: '/portal/deadlines',
  },
  {
    id: 'NOTIF-02',
    title: 'Flagged Document Alert',
    message: 'Purchase vouchers batch #3 for Sri Sai Logistics flagged with supplier GSTIN mismatch.',
    timestamp: 'Yesterday, 4:15 PM',
    priority: 'warning',
    read: false,
    link: '/portal/documents',
  },
  {
    id: 'NOTIF-03',
    title: 'New Client Onboarding Request',
    message: 'Tirumala Engineering uploaded initial partnership deed and Udyam certification.',
    timestamp: '12 Oct 2026',
    priority: 'info',
    read: true,
    link: '/portal/clients',
  },
  {
    id: 'NOTIF-04',
    title: 'Reconciliation Health Notice',
    message: 'Bank reconciliation statement (BRS) completed for Venkata Cotton Ginning Mills.',
    timestamp: '11 Oct 2026',
    priority: 'info',
    read: true,
    link: '/portal/bookkeeping',
  },
];

// ---------------------------------------------------------------------------
// 8. Currency & Formatting Utilities
// ---------------------------------------------------------------------------
export const formatCurrencyINR = (amount: number, currency: string = 'INR'): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(amount / 83));
  }
  if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(Math.round(amount / 90));
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumberINR = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatDateDisplay = (dateStr: string, format: string = 'DD/MM/YYYY'): string => {
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    if (format === 'MM/DD/YYYY') {
      return `${month}/${day}/${year}`;
    }
    if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`;
    }
    // Default DD/MM/YYYY
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

// ---------------------------------------------------------------------------
// 9. Local Storage Persistence & State Hydration Helpers
// ---------------------------------------------------------------------------
const STORAGE_PREFIX = 'dhanam_demo_v2_';

export interface DemoAppState {
  clients: FictionalClient[];
  documents: FictionalDocument[];
  deadlines: FictionalDeadline[];
  transactions: FictionalTransaction[];
  notifications: DemoNotification[];
  settings: DemoSettings;
  selectedPeriodKey: string;
}

export const loadDemoState = (): DemoAppState => {
  try {
    const clientsRaw = localStorage.getItem(`${STORAGE_PREFIX}clients`);
    const docsRaw = localStorage.getItem(`${STORAGE_PREFIX}documents`);
    const deadlinesRaw = localStorage.getItem(`${STORAGE_PREFIX}deadlines`);
    const txnsRaw = localStorage.getItem(`${STORAGE_PREFIX}transactions`);
    const notifsRaw = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
    const settingsRaw = localStorage.getItem(`${STORAGE_PREFIX}settings`);
    const periodRaw = localStorage.getItem(`${STORAGE_PREFIX}period`);

    return {
      clients: clientsRaw ? JSON.parse(clientsRaw) : INITIAL_CLIENTS,
      documents: docsRaw ? JSON.parse(docsRaw) : INITIAL_DOCUMENTS,
      deadlines: deadlinesRaw ? JSON.parse(deadlinesRaw) : INITIAL_DEADLINES,
      transactions: txnsRaw ? JSON.parse(txnsRaw) : INITIAL_TRANSACTIONS,
      notifications: notifsRaw ? JSON.parse(notifsRaw) : INITIAL_NOTIFICATIONS,
      settings: settingsRaw ? JSON.parse(settingsRaw) : INITIAL_SETTINGS,
      selectedPeriodKey: periodRaw || 'current-month',
    };
  } catch {
    return {
      clients: INITIAL_CLIENTS,
      documents: INITIAL_DOCUMENTS,
      deadlines: INITIAL_DEADLINES,
      transactions: INITIAL_TRANSACTIONS,
      notifications: INITIAL_NOTIFICATIONS,
      settings: INITIAL_SETTINGS,
      selectedPeriodKey: 'current-month',
    };
  }
};

export const saveDemoState = (state: Partial<DemoAppState>): void => {
  try {
    if (state.clients) localStorage.setItem(`${STORAGE_PREFIX}clients`, JSON.stringify(state.clients));
    if (state.documents) localStorage.setItem(`${STORAGE_PREFIX}documents`, JSON.stringify(state.documents));
    if (state.deadlines) localStorage.setItem(`${STORAGE_PREFIX}deadlines`, JSON.stringify(state.deadlines));
    if (state.transactions) localStorage.setItem(`${STORAGE_PREFIX}transactions`, JSON.stringify(state.transactions));
    if (state.notifications) localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(state.notifications));
    if (state.settings) localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(state.settings));
    if (state.selectedPeriodKey) localStorage.setItem(`${STORAGE_PREFIX}period`, state.selectedPeriodKey);

    // Notify all listening components in real time
    window.dispatchEvent(new Event('dhanam_demo_data_change'));
  } catch {
    // Ignore fallback
  }
};

export const resetDemoStateToDefaults = (): DemoAppState => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}clients`);
    localStorage.removeItem(`${STORAGE_PREFIX}documents`);
    localStorage.removeItem(`${STORAGE_PREFIX}deadlines`);
    localStorage.removeItem(`${STORAGE_PREFIX}transactions`);
    localStorage.removeItem(`${STORAGE_PREFIX}notifications`);
    localStorage.removeItem(`${STORAGE_PREFIX}settings`);
    localStorage.removeItem(`${STORAGE_PREFIX}period`);

    window.dispatchEvent(new Event('dhanam_demo_data_change'));
  } catch {
    // Ignore fallback
  }

  return {
    clients: INITIAL_CLIENTS,
    documents: INITIAL_DOCUMENTS,
    deadlines: INITIAL_DEADLINES,
    transactions: INITIAL_TRANSACTIONS,
    notifications: INITIAL_NOTIFICATIONS,
    settings: INITIAL_SETTINGS,
    selectedPeriodKey: 'current-month',
  };
};

// ---------------------------------------------------------------------------
// 10. CSV Export Utility Function
// ---------------------------------------------------------------------------
export const exportToCSV = (filename: string, headers: string[], rows: (string | number)[][]): void => {
  const sanitize = (val: string | number) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = [
    headers.map(sanitize).join(','),
    ...rows.map((row) => row.map(sanitize).join(',')),
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ---------------------------------------------------------------------------
// 11. Derived Totals & Calculation Rules
// ---------------------------------------------------------------------------
export interface DerivedDashboardMetrics {
  totalClientsCount: number;
  activeClientsCount: number;
  pendingOnboardingCount: number;
  
  totalDocumentsCount: number;
  pendingDocumentsCount: number;
  approvedDocumentsCount: number;
  flaggedDocumentsCount: number;

  totalDeadlinesCount: number;
  urgentDeadlinesCount: number;
  approachingDeadlinesCount: number;
  overdueDeadlinesCount: number;
  completedDeadlinesCount: number;

  periodIncome: number;
  periodExpenses: number;
  periodNetProfit: number;
  periodMarginPercentage: number;
  
  chartData: Array<{
    period: string;
    label: string;
    income: number;
    expenses: number;
    netMargin: number;
    isCurrentPeriod: boolean;
  }>;
}

export const computeDashboardMetrics = (
  state: DemoAppState,
  selectedPeriodKey: string
): DerivedDashboardMetrics => {
  const { clients, documents, deadlines, transactions } = state;
  const currentOption = REPORT_PERIOD_OPTIONS.find((p) => p.key === selectedPeriodKey) || REPORT_PERIOD_OPTIONS[0];

  // 1. Client counts
  const totalClientsCount = clients.length;
  const activeClientsCount = clients.filter((c) => c.status === 'active').length;
  const pendingOnboardingCount = clients.filter((c) => c.status === 'pending_onboarding').length;

  // 2. Document counts
  const totalDocumentsCount = documents.length;
  const pendingDocumentsCount = documents.filter((d) => d.status === 'Under Review' || d.status === 'Requested' || d.status === 'Received').length;
  const approvedDocumentsCount = documents.filter((d) => d.status === 'Approved').length;
  const flaggedDocumentsCount = documents.filter((d) => d.status === 'Requested').length;

  // 3. Deadline counts
  const totalDeadlinesCount = deadlines.length;
  const urgentDeadlinesCount = deadlines.filter((d) => d.priority === 'Urgent' && d.status !== 'Completed').length;
  const approachingDeadlinesCount = deadlines.filter((d) => d.priority === 'High' && d.status !== 'Completed').length;
  const overdueDeadlinesCount = deadlines.filter((d) => d.status === 'Overdue').length;
  const completedDeadlinesCount = deadlines.filter((d) => d.status === 'Completed').length;

  // 4. Financial Calculations based on selected reporting period
  let periodIncome = 0;
  let periodExpenses = 0;

  if (currentOption.month) {
    const matchingTxns = transactions.filter((t) => t.period === currentOption.month);
    periodIncome = matchingTxns.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    periodExpenses = matchingTxns.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const historicalMonth = MONTHLY_FINANCIAL_HISTORY.find((m) => m.periodKey === currentOption.month);
    if (historicalMonth && periodIncome === 0) {
      periodIncome = historicalMonth.income;
      periodExpenses = historicalMonth.expenses;
    }
  } else if (currentOption.quarter && currentOption.quarter !== 'ALL') {
    const quarterMonths = MONTHLY_FINANCIAL_HISTORY.filter((m) => m.quarter === currentOption.quarter);
    periodIncome = quarterMonths.reduce((sum, m) => sum + m.income, 0);
    periodExpenses = quarterMonths.reduce((sum, m) => sum + m.expenses, 0);
  } else {
    periodIncome = MONTHLY_FINANCIAL_HISTORY.reduce((sum, m) => sum + m.income, 0);
    periodExpenses = MONTHLY_FINANCIAL_HISTORY.reduce((sum, m) => sum + m.expenses, 0);
  }

  const periodNetProfit = periodIncome - periodExpenses;
  const periodMarginPercentage = periodIncome > 0 ? Math.round((periodNetProfit / periodIncome) * 100) : 0;

  const chartData = MONTHLY_FINANCIAL_HISTORY.map((m) => ({
    period: m.periodKey,
    label: m.monthLabel.split(' ')[0],
    income: m.income,
    expenses: m.expenses,
    netMargin: m.netMargin,
    isCurrentPeriod: currentOption.month === m.periodKey,
  }));

  return {
    totalClientsCount,
    activeClientsCount,
    pendingOnboardingCount,
    totalDocumentsCount,
    pendingDocumentsCount,
    approvedDocumentsCount,
    flaggedDocumentsCount,
    totalDeadlinesCount,
    urgentDeadlinesCount,
    approachingDeadlinesCount,
    overdueDeadlinesCount,
    completedDeadlinesCount,
    periodIncome,
    periodExpenses,
    periodNetProfit,
    periodMarginPercentage,
    chartData,
  };
};
