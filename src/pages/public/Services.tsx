import React from 'react';
import {
  Receipt,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  FolderLock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Users,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SafeImage } from '../../components/common/SafeImage';

export const Services: React.FC = () => {
  const serviceList = [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting and Bookkeeping',
      shortTitle: 'Bookkeeping',
      icon: Receipt,
      kicker: 'FOUNDATIONAL LEDGERS',
      tagline: 'Systematic transaction recording and reconciliation to keep your financial records current and audit-ready.',
      image: '/images/financial_records_review.jpg',
      imageAlt: 'Accountant reviewing organized financial records and double-entry ledger accounts with a calculator and files',
      imageCaption: 'Organized Ledger Records & Vouchers',
      whatItCovers: [
        'Recording day-to-day sales, purchases, bank payments, and receipts in double-entry ledgers.',
        'Periodic bank, credit card, and digital payment gateway reconciliations.',
        'Vendor and customer ledger reconciliation, credit tracking, and invoice matching.',
        'Fixed asset register maintenance, depreciation scheduling, and journal vouchers.',
        'Chart of accounts customization tailored to your specific business model.',
      ],
      whoBenefits: [
        'Proprietorships and retail traders needing orderly transaction history.',
        'Growing partnerships and LLPs seeking structured ledger controls.',
        'Small businesses transitioning from manual spreadsheets to structured accounting.',
      ],
      typicalDocuments: [
        'Monthly bank account and loan statements (PDF / Excel).',
        'Sales bills, tax invoices, and customer receipt logs.',
        'Vendor purchase bills, transport receipts, and utility bills.',
        'Previous year audited balance sheet and opening trial balance.',
      ],
      engagementProcess:
        'We begin by reviewing past account balances, establish a periodic voucher collection schedule, record transactions with appropriate tax tagging, and deliver updated monthly ledger summaries.',
      serviceQueryKey: 'monthly-accounts',
    },
    {
      id: 'gst-tax-filing',
      title: 'GST and Tax Filing Support',
      shortTitle: 'GST & Tax',
      icon: FileSpreadsheet,
      kicker: 'STATUTORY TAXATION',
      tagline: 'Disciplined preparation, reconciliation, and filing support for direct and indirect taxes ahead of statutory cutoffs.',
      image: '/images/tax_documents_desk.jpg',
      imageAlt: 'Professional accountant reviewing tax documents, GST computation sheets, and return records at a desk',
      imageCaption: 'Tax Document Review & Filing Desk',
      whatItCovers: [
        'Monthly or quarterly GSTR-1 outward supply summaries and GSTR-3B tax payment returns.',
        'Input Tax Credit (ITC) verification against supplier filings via GSTR-2B matching.',
        'Advance tax estimation and quarterly calculation worksheets for businesses and professionals.',
        'Annual GST return (GSTR-9) preparation and GSTR-9C reconciliation assistance.',
        'Preparation and submission of annual Income Tax Returns (ITR-1 through ITR-6).',
      ],
      whoBenefits: [
        'GST-registered businesses seeking to prevent ITC mismatches and notice risks.',
        'Professionals and consultancies qualifying for presumptive tax schemes (Section 44ADA).',
        'Trading and distribution entities managing high invoice counts and multi-slab rates.',
      ],
      typicalDocuments: [
        'Sales invoice registers containing GSTINs, HSN/SAC codes, and tax rates.',
        'Purchase registers and supplier tax invoices.',
        'Challan receipts and electronic cash/credit ledger statements.',
        'Annual Form 26AS, AIS, and TIS statements from the income tax portal.',
      ],
      engagementProcess:
        'You supply sales and purchase registers by the designated cutoff. Our team performs ITC 2B cross-verification, drafts tax summaries for client approval, and files returns on the GST/Income Tax portal.',
      serviceQueryKey: 'tax-filing',
    },
    {
      id: 'business-compliance',
      title: 'Business Compliance',
      shortTitle: 'Compliance',
      icon: ShieldCheck,
      kicker: 'REGULATORY OVERSIGHT',
      tagline: 'Coordinated tracking of ongoing regulatory filings, statutory registrations, and commercial documentation.',
      image: '/images/business_compliance_illustration.svg',
      imageAlt: 'Professional reviewing business documentation, statutory register binders, and compliance checklists',
      imageCaption: 'Statutory Register Oversight & Checklist',
      whatItCovers: [
        'Comprehensive compliance calendar tracking for national and state regulatory cutoffs.',
        'Quarterly TDS/TCS returns (Form 24Q for salaries, Form 26Q for contractor/rent payments).',
        'Ministry of Corporate Affairs (MCA) annual compliance documentation for LLPs and Companies.',
        'Director identification verification (DIR-3 KYC) and annual statutory register maintenance.',
        'MSME / Udyam registration, partnership deed amendments, and professional tax filings.',
      ],
      whoBenefits: [
        'Incorporated private limited companies, OPCs, and limited liability partnerships.',
        'Employers deducting TDS on salaries and professional contractor fees.',
        'New ventures establishing formal statutory governance and licensing.',
      ],
      typicalDocuments: [
        'Entity incorporation certificates, MOA/AOA, or registered partnership deeds.',
        'Director / partner PAN, Aadhaar, and digital signature certificates (DSC).',
        'TDS deduction registers, challan 281 receipts, and salary disbursement sheets.',
        'Board meeting resolutions and statutory register ledgers.',
      ],
      engagementProcess:
        'We audit your current filing status, document required milestones on a shared timeline, gather documentation ahead of statutory cutoffs, and prepare filings for authorized signatory sign-off.',
      serviceQueryKey: 'business-compliance',
    },
    {
      id: 'financial-consulting',
      title: 'Financial Consulting',
      shortTitle: 'Consulting',
      icon: TrendingUp,
      kicker: 'STRATEGIC ADVISORY',
      tagline: 'Objective, grounded financial guidance to evaluate cash flow patterns, capital structure, and business expansion.',
      image: '/images/financial_consulting_illustration.svg',
      imageAlt: 'Consultant discussing business financial performance, cash flow projections, and operating metrics',
      imageCaption: 'Strategic Performance & Advisory Review',
      whatItCovers: [
        'Working capital review and operating cash cycle optimization analysis.',
        'Cost analysis, overhead benchmarking, and gross margin trend evaluations.',
        'Financial feasibility assessments for capital expenditures or new business lines.',
        'Budget preparation, variance analysis, and cash flow forecasting worksheets.',
        'Guidance on loan documentation and financial dossier preparation for commercial banks.',
      ],
      whoBenefits: [
        'Established business owners evaluating capital investments or expansion.',
        'Family-owned enterprises seeking to formalize budgeting and expense tracking.',
        'Entrepreneurs applying for working capital limits or term loans.',
      ],
      typicalDocuments: [
        'Past two to three years of balance sheets and profit & loss statements.',
        'Current working capital sanction letters and borrowing schedules.',
        'Operational sales forecasts and projected cost budgets.',
        'Major vendor and customer commercial contracts.',
      ],
      engagementProcess:
        'We conduct an in-depth financial review session to evaluate historical trends, model realistic scenarios, and deliver practical recommendations accompanied by structured financial summaries.',
      serviceQueryKey: 'financial-consulting',
    },
    {
      id: 'financial-reporting',
      title: 'Monthly Financial Reports',
      shortTitle: 'Reporting',
      icon: BarChart3,
      kicker: 'MANAGEMENT ACCOUNTS',
      tagline: 'Actionable financial reports that convert raw ledger data into clear insights for leadership review.',
      image: '/images/financial_reporting_illustration.svg',
      imageAlt: 'Executive monthly financial reports with comparative balance sheet and receivables analysis',
      imageCaption: 'Comparative P&L & Receivables Aging',
      whatItCovers: [
        'Monthly Profit & Loss statements with comparative prior-month and prior-year benchmarks.',
        'Balance sheets reflecting current assets, liabilities, and owners equity position.',
        'Aged receivables and payables reports highlighting delayed customer payments.',
        'Cash position reports detailing operating bank inflows and outflow distributions.',
        'Executive summaries presenting core performance ratios in plain, practical language.',
      ],
      whoBenefits: [
        'Business owners who want clearer visibility than raw bank balances provide.',
        'Partners needing transparent, structured records for profit allocation.',
        'Managers responsible for monitoring departmental operating expenditures.',
      ],
      typicalDocuments: [
        'Reconciled monthly ledger balances.',
        'Physical inventory valuation sheets (where applicable).',
        'Outstanding customer and vendor aging schedules.',
      ],
      engagementProcess:
        'Once monthly bookkeeping and reconciliations close, we prepare standardized reporting decks, highlight significant variances, and walk through findings during a scheduled monthly review call.',
      serviceQueryKey: 'financial-reporting',
    },
    {
      id: 'document-management',
      title: 'Document Collection and Organization',
      shortTitle: 'Documents',
      icon: FolderLock,
      kicker: 'INFORMATION ARCHITECTURE',
      tagline: 'Structured document gathering, indexing, and digital retention to prevent misplaced records and audit gaps.',
      image: '/images/document_vault_illustration.svg',
      imageAlt: 'Structured digital document repository with indexed ledgers, tax invoices, and filing receipts',
      imageCaption: 'Structured Digital Document Vault',
      whatItCovers: [
        'Standardized document checklists customized to your entity type and tax obligations.',
        'Secure digital folder structuring for vouchers, receipts, agreements, and challans.',
        'Systematic naming conventions and chronological archiving of bank statements.',
        'Centralized digital access to historical ITR acknowledgments, GST returns, and tax challans.',
        'Assistance in establishing office filing routines for physical vouchers and bills.',
      ],
      whoBenefits: [
        'Firms dealing with scattered invoices, receipts, and missing bank statement months.',
        'Growing businesses requiring systematic audit trails for statutory and internal reviews.',
        'Enterprises preparing for corporate due diligence or banking evaluations.',
      ],
      typicalDocuments: [
        'Physical and digital bills, vouchers, counterfoils, and payment proofs.',
        'Registration certificates, contracts, lease deeds, and insurance policies.',
        'Prior statutory filing returns, assessment orders, and correspondence.',
      ],
      engagementProcess:
        'We establish an orderly folder taxonomy, provide standard document upload checklists, index documents chronologically, and maintain indexed digital records accessible whenever needed.',
      serviceQueryKey: 'document-management',
    },
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Header & Overview */}
      <section aria-labelledby="services-intro-heading">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="sage" size="md">
              Practice Overview
            </Badge>

            <h1
              id="services-intro-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight font-heading leading-tight"
            >
              Structured Services for <br className="hidden sm:inline" />
              <span className="text-forest">Every Financial Stage</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              We provide practical accounting, statutory tax filing support, compliance coordination, and management reporting. Each engagement is designed to establish clarity, maintain compliance, and reduce administrative stress for regional business owners.
            </p>

            {/* In-page quick jump navigation */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-muted mr-1">Quick Jump:</span>
              {serviceList.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-2.5 py-1 text-xs font-medium rounded-button bg-white border border-border-subtle text-charcoal hover:text-forest hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  {s.shortTitle}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Detailed Service Sections */}
      <section className="space-y-12">
        <Container>
          <div className="space-y-12">
            {serviceList.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 p-6 sm:p-8 lg:p-10 rounded-card bg-white border border-border-subtle shadow-sm transition-all"
                >
                  {/* Service Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-border-subtle">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-button bg-sage flex items-center justify-center text-forest shrink-0 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-forest block">
                          {service.kicker}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading mt-0.5">
                          {service.title}
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-charcoal-muted max-w-2xl">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Button
                        to={`/contact?service=${service.serviceQueryKey}`}
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Request Consultation
                      </Button>
                    </div>
                  </div>

                  {/* Responsive Grid Layout: Left 8-cols (Information Breakdown) & Right 4-cols (Visual Asset & Flow) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                    {/* Left Column: 3-column breakdown of deliverables */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                      {/* Col 1: What It Covers */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                          What It Covers
                        </h3>
                        <ul className="space-y-2 text-charcoal-muted leading-relaxed">
                          {service.whatItCovers.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <span className="w-1 h-1 rounded-full bg-forest shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: Who May Benefit */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-forest" />
                          Who May Benefit
                        </h3>
                        <ul className="space-y-2 text-charcoal-muted leading-relaxed">
                          {service.whoBenefits.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <span className="w-1 h-1 rounded-full bg-forest shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Typical Documents */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-forest" />
                          Typical Documents
                        </h3>
                        <ul className="space-y-2 text-charcoal-muted leading-relaxed">
                          {service.typicalDocuments.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <span className="w-1 h-1 rounded-full bg-forest shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Matched Visual Asset Preview + Engagement Flow */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-5">
                      <div className="rounded-card overflow-hidden border border-border-subtle bg-surface-subtle shadow-xs">
                        <SafeImage
                          src={service.image}
                          alt={service.imageAlt}
                          className="w-full h-auto aspect-[4/3] object-cover"
                          loading="lazy"
                        />
                        <div className="p-3 bg-white border-t border-border-subtle flex items-center justify-between text-xs text-charcoal-muted">
                          <span className="font-semibold text-charcoal text-[11px]">{service.imageCaption}</span>
                          <span className="text-[10px] text-forest font-semibold uppercase tracking-wider">Verified</span>
                        </div>
                      </div>

                      {/* Engagement Flow */}
                      <div className="p-4 rounded-button bg-surface border border-border-subtle flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-forest" />
                            Engagement Flow
                          </h3>
                          <p className="mt-2 text-xs text-charcoal-muted leading-relaxed">
                            {service.engagementProcess}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-border-subtle/60 text-[11px] text-charcoal-muted">
                          <span className="text-forest font-semibold">Scope: </span>
                          Confirmed upon initial records review.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Important Regulatory Notice & Disclaimer */}
      <section aria-labelledby="disclaimer-heading">
        <Container>
          <div className="p-6 rounded-card bg-surface border border-border-subtle flex items-start gap-3.5 text-xs text-charcoal-muted">
            <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 id="disclaimer-heading" className="font-bold text-charcoal text-sm">
                Important Compliance & Scope Clarification
              </h3>
              <p className="leading-relaxed">
                The service scopes outlined above represent general accounting, bookkeeping, and statutory preparation support. Exact documentation requirements, reporting frequency, and compliance deadlines depend strictly upon each client’s entity structure, annual turnover, and statutory rules.
              </p>
              <p className="leading-relaxed">
                Dhanam Financial Services assists clients in preparing and verifying accurate records; we do not promise guaranteed tax savings, guaranteed compliance clearance, or automatic government filing approvals without client verification and signature.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Consultation CTA */}
      <section aria-labelledby="services-cta-heading">
        <Container>
          <div className="p-8 sm:p-12 rounded-card bg-white border border-border-subtle shadow-md">
            <div className="max-w-2xl space-y-4">
              <Badge variant="sage" size="md">Need Assistance Deciding?</Badge>
              <h2 id="services-cta-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
                Schedule a Tailored Service Consultation
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Our accountants can review your recent bank statements and existing accounts to recommend the right combination of bookkeeping, GST filing, and management reports.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Book a Consultation
                </Button>
                <Button to="/packages" variant="secondary" size="md">
                  View Illustrative Packages
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
