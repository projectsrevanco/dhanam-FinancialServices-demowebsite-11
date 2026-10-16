export interface ResourceItem {
  id: string;
  title: string;
  summary: string;
  category: 'Bookkeeping' | 'Taxation' | 'Financial Management' | 'Compliance';
  readTime: string;
  lastUpdated: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string[];
    checklist?: string[];
  }[];
}

export const resourcesData: ResourceItem[] = [
  {
    id: 'bookkeeping-preparation-checklist',
    title: 'Bookkeeping Preparation Checklist for Small Businesses',
    summary:
      'A practical step-by-step checklist to organize sales invoices, vendor payments, and monthly bank transactions for clean, audit-ready ledgers.',
    category: 'Bookkeeping',
    readTime: '6 min read',
    lastUpdated: 'October 2026',
    keyTakeaways: [
      'Maintain separate business and personal banking accounts from day one.',
      'Establish a weekly routine for collecting and filing physical and digital invoices.',
      'Reconcile bank and credit card statements at least once every month.',
      'Capture GSTINs and HSN codes on every purchase voucher to safeguard Input Tax Credit.',
    ],
    sections: [
      {
        heading: 'Why Systematic Bookkeeping Matters',
        content: [
          'Orderly bookkeeping is not merely about complying with tax authorities; it is the foundation of clear business visibility. When financial records are updated continuously rather than in a year-end scramble, business owners understand true profitability, avoid duplicate payments, and eliminate last-minute audit stress.',
          'Double-entry principles ensure that every rupee entering or leaving your commercial accounts is matched with a corresponding source voucher. The checklist below outlines essential records needed each month.',
        ],
      },
      {
        heading: 'Monthly Document Collection Checklist',
        content: [
          'Collect and verify these documents before handing records over to your accountant or entering them into your software:',
        ],
        checklist: [
          'Bank Statements: Download official PDF and Excel statements for all current accounts, overdrafts, and credit cards.',
          'Sales Invoices: Chronologically sorted copies of all tax invoices, export bills, or delivery challans issued to customers.',
          'Purchase Vouchers: Supplier tax invoices with clear GSTIN numbers, matching purchase orders, and transport receipts.',
          'Operational Expenses: Receipts for office rent, utility bills, software subscriptions, insurance, and professional fees.',
          'Cash Expense Vouchers: Signed petty cash vouchers for local expenses with corresponding receipts attached.',
          'Payroll Records: Monthly attendance summaries, salary disbursement registers, and statutory payment challans.',
        ],
      },
      {
        heading: 'Best Practices for Clean Ledgers',
        content: [
          'Segregate Personal and Business Spends: Using a business account for personal household expenses creates reconciliation friction and complicates tax assessments.',
          'Track Cash Carefully: Unaccounted cash drawings or unexplained cash deposits are the most common cause of scrutiny notices. Always document cash sources.',
          'Verify Opening Balances: Ensure opening ledger balances match the prior fiscal year’s audited trial balance before posting new entries.',
        ],
      },
    ],
  },
  {
    id: 'documents-before-tax-consultation',
    title: 'Documents to Organize Before an Initial Tax Consultation',
    summary:
      'Ensure your initial consultation is productive by gathering the core financial statements, tax portal downloads, and business identifiers in advance.',
    category: 'Taxation',
    readTime: '5 min read',
    lastUpdated: 'October 2026',
    keyTakeaways: [
      'Bring previous years’ filed ITR-V acknowledgments and computation sheets.',
      'Download updated Form 26AS, AIS, and TIS statements from the income tax portal.',
      'Prepare approximate turnover and expenditure figures if books are not yet closed.',
      'Identify pending statutory notices or unresolved historical assessments early.',
    ],
    sections: [
      {
        heading: 'Maximizing the Value of Your Consultation',
        content: [
          'An initial consultation with a financial consultant or accountant is most productive when built around concrete factual records. Rather than spending valuable time locating basic identification numbers or bank statements, having a structured file ready enables the professional to focus on strategic planning and compliance analysis immediately.',
        ],
      },
      {
        heading: 'Recommended Consultation Preparation Dossier',
        content: [
          'Gather as many of the following records as apply to your entity structure:',
        ],
        checklist: [
          'Entity Identifiers: PAN card copy, GST registration certificate, and Udyam/MSME certificate.',
          'Constitutional Documents: Partnership deed, LLP agreement, or Certificate of Incorporation with MOA/AOA.',
          'Prior Tax Filings: Copies of Income Tax Returns (ITR-V and computation sheets) for the past 2 assessment years.',
          'Portal Data: Recent Form 26AS (tax credit statement) and Annual Information Statement (AIS) download.',
          'GST Returns: Filed copies of GSTR-1 and GSTR-3B for the current financial year to date.',
          'Banking Records: Bank statements for the last 6 to 12 months for all active operational accounts.',
          'Fixed Asset & Loan Schedules: Sanction letters for current loans, EMI amortization schedules, and major asset purchase invoices.',
        ],
      },
      {
        heading: 'Note on Preliminary Discussions',
        content: [
          'If your bookkeeping has fallen behind by several months, do not hesitate to share the situation transparently. Experienced accountants regularly assist firms with bookkeeping backlog clearance and prior-year reconciliation.',
        ],
      },
    ],
  },
  {
    id: 'monthly-financial-review-checklist',
    title: 'Monthly Financial Review Checklist for Business Owners',
    summary:
      'A structured 30-minute monthly routine to review your Profit & Loss statement, balance sheet changes, and operational margins.',
    category: 'Financial Management',
    readTime: '7 min read',
    lastUpdated: 'October 2026',
    keyTakeaways: [
      'Do not rely solely on your bank balance to gauge business health.',
      'Monitor aged accounts receivable to identify overdue payments before they become bad debts.',
      'Review gross profit margins every month to catch unmanaged supplier price increases.',
      'Set aside dedicated tax reserves each month for GST and advance tax liabilities.',
    ],
    sections: [
      {
        heading: 'The Importance of a Monthly Financial Pulse Check',
        content: [
          'Many business owners make commercial commitments based entirely on the balance shown in their mobile banking app. However, that bank balance often includes money owed to suppliers, customer advances, and unpaid GST or TDS liabilities. A formal monthly review provides true clarity on operating performance.',
        ],
      },
      {
        heading: 'Four-Step Monthly Review Routine',
        content: [
          'Dedicate 30 to 45 minutes at the close of each month to review these key parameters with your management team or accountant:',
        ],
        checklist: [
          '1. Revenue & Gross Margin Review: Compare actual billings against previous months. Did your cost of goods sold increase as a percentage of sales?',
          '2. Aged Receivables (Debtor Aging): Review invoices outstanding past 30, 60, and 90 days. Initiate structured payment follow-ups on older balances.',
          '3. Fixed Overhead Control: Check rent, salaries, utilities, and discretionary operational costs against your monthly budget.',
          '4. Statutory Tax Reserve Check: Confirm that adequate funds are segregated in an auxiliary account for upcoming GSTR-3B payments and advance tax installments.',
        ],
      },
      {
        heading: 'Red Flags to Watch For',
        content: [
          'Divergence between growing sales and shrinking bank balances (often indicating working capital trapped in slow receivables or unsold inventory).',
          'Recurring short-term overdraft reliance to cover routine payroll or rent.',
          'Accumulation of unverified credit card transactions or missing expense vouchers.',
        ],
      },
    ],
  },
  {
    id: 'understanding-income-expenses-cashflow',
    title: 'Understanding Income, Expenses, and Cash Flow: A Small Business Guide',
    summary:
      'Demystifying the critical distinction between accounting profit and real bank cash flow to prevent common working capital traps.',
    category: 'Financial Management',
    readTime: '8 min read',
    lastUpdated: 'October 2026',
    keyTakeaways: [
      'Profit reflects revenue earned minus expenses incurred, regardless of when cash is collected.',
      'Cash flow measures actual rupees entering and exiting your bank account.',
      'A profitable enterprise can still face liquidity crunches if customer receivables take too long to collect.',
      'Accrual accounting gives accurate economic visibility; cash flow management ensures day-to-day survival.',
    ],
    sections: [
      {
        heading: 'Why Profit Does Not Equal Cash',
        content: [
          'One of the most frequent dilemmas small business owners face is: "My accountant says our company made a healthy profit this quarter, so why is our bank balance so low?"',
          'The answer lies in the difference between accrual accounting (which measures economic activity when invoices are issued) and cash flow (which tracks money moving through your bank accounts). If you deliver ₹10,00,000 worth of goods on 60-day credit terms, your Profit & Loss records that income immediately, but your bank receives ₹0 until the customer pays.',
        ],
      },
      {
        heading: 'The Three Streams of Cash Flow',
        content: [
          'A healthy business balances three distinct cash flow activities:',
          '1. Operating Cash Flow: Money generated directly from core business sales minus operational costs (salaries, inventory, rent).',
          '2. Investing Cash Flow: Cash spent on long-term assets such as machinery, computer equipment, or office expansion.',
          '3. Financing Cash Flow: Funds borrowed from banks or capital contributed by promoters, offset by loan repayments and owner drawings.',
        ],
      },
      {
        heading: 'Practical Strategies to Protect Cash Flow',
        content: [
          'Shorten Customer Payment Terms: Encourage prompt payments with transparent 15-day or 30-day payment cycles and structured reminder notices.',
          'Negotiate Balanced Supplier Credit: Match vendor payment terms with your customer realization cycles to avoid financing the gap out of pocket.',
          'Maintain an Operating Buffer: Strive to retain two to three months of baseline fixed operating overhead in an accessible liquid account.',
        ],
      },
    ],
  },
  {
    id: 'preparing-business-compliance-deadlines',
    title: 'Preparing for Common Business Compliance Deadlines',
    summary:
      'An overview of recurring statutory compliance cycles, periodic return filings, and proactive preparation strategies for commercial enterprises.',
    category: 'Compliance',
    readTime: '6 min read',
    lastUpdated: 'October 2026',
    keyTakeaways: [
      'Compliance schedules recur in monthly, quarterly, and annual rhythms.',
      'GST returns follow regular monthly cycles for outward sales (GSTR-1) and tax summaries (GSTR-3B).',
      'TDS payments are due on the 7th of each following month, with quarterly returns (24Q/26Q) following.',
      'Advance tax is payable in four structured quarterly installments for non-presumptive taxpayers.',
    ],
    sections: [
      {
        heading: 'Navigating the Compliance Rhythm',
        content: [
          'Statutory compliance in India operates on a structured timeline established by the Central Board of Direct Taxes (CBDT), Central Board of Indirect Taxes and Customs (CBIC), and the Ministry of Corporate Affairs (MCA). Staying ahead of these recurring milestones protects businesses from substantial daily late fees and interest penalties.',
        ],
      },
      {
        heading: 'Typical Compliance Rhythms (Illustrative Overview)',
        content: [
          'While specific filing rules vary based on turnover, composition schemes, and entity registration, these cycles represent the common framework:',
        ],
        checklist: [
          'Monthly GST Returns: Typically GSTR-1 (outward supplies) followed by GSTR-3B (tax computation & summary payment).',
          'Monthly TDS Deposit: Tax deducted at source during any month must generally be deposited via Challan 281 by the 7th of the following month.',
          'Quarterly TDS Returns: Form 24Q (salary TDS) and Form 26Q (non-salary TDS) filed following the close of each financial quarter.',
          'Quarterly Advance Tax: Installments due in June, September, December, and March for taxpayers with estimated tax liability exceeding threshold limits.',
          'Annual Corporate & Tax Filings: Annual ITR filings, tax audit reports where turnover thresholds apply, and annual MCA returns (AOC-4 & MGT-7) for companies.',
        ],
      },
      {
        heading: 'Statutory Disclaimer & Professional Verification',
        content: [
          'Statutory cutoffs, applicability thresholds, late fee caps, and filing extensions are periodically updated by government notifications and budget amendments. Deadlines also vary between normal and QRMP (Quarterly Return Monthly Payment) schemes.',
          'Always verify current specific filing requirements and applicable dates for your exact entity type and financial year with a qualified chartered accountant or tax professional.',
        ],
      },
    ],
  },
];
