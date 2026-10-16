import React from 'react';
import {
  Check,
  X,
  ArrowRight,
  AlertCircle,
  Building,
  Users,
  Briefcase,
  FileCheck2,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const Pricing: React.FC = () => {
  const packages = [
    {
      id: 'essential',
      name: 'Essential Support',
      tagline: 'Basic record organization and foundational bookkeeping support.',
      intendedCustomer:
        'Sole proprietors, independent professionals, consultants, and small retail or service traders needing organized transactions and clean tax filings.',
      sampleTag: 'Foundational Tier',
      highlights: [
        'Monthly entry of sales and purchase transactions',
        'Single primary bank account reconciliation',
        'Quarterly advance tax computation review',
        'Monthly GSTR-1 and GSTR-3B filing assistance',
        'Annual ITR filing preparation support',
        'Email and scheduled phone query support',
      ],
      notIncluded: [
        'Detailed monthly management reporting deck',
        'Payroll processing and salary slips',
        'TDS return filing (24Q / 26Q)',
        'Annual ROC documentation (AOC-4, MGT-7)',
      ],
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth Support',
      tagline: 'Ongoing bookkeeping, periodic financial reports, and statutory deadline tracking.',
      intendedCustomer:
        'Expanding partnerships, commercial firms, emerging LLPs, and regional businesses with multi-account operations and regular monthly filings.',
      sampleTag: 'Most Popular',
      highlights: [
        'Bi-weekly double-entry ledger balancing',
        'Up to 3 bank, credit, and gateway reconciliations',
        'GSTR-2B Input Tax Credit (ITC) reconciliation',
        'Quarterly TDS 26Q (vendor/rent) return filing',
        'Monthly Profit & Loss and Balance Sheet review',
        'Statutory deadline tracking with advance notifications',
        'Payroll support for up to 15 team members',
        'Direct consultation check-ins with an accountant',
      ],
      notIncluded: [
        'Statutory ROC compliance filing coordination',
        'Comprehensive audit file preparation for external auditors',
      ],
      popular: true,
    },
    {
      id: 'complete',
      name: 'Complete Coordination',
      tagline: 'Broader accounting coordination, comprehensive compliance tracking, and periodic financial reviews.',
      intendedCustomer:
        'Incorporated private limited companies, multi-partner LLPs, and enterprises requiring integrated accounting and audit readiness.',
      sampleTag: 'Enterprise Scope',
      highlights: [
        'Full cloud accounting ledger management',
        'Unlimited bank and vendor ledger reconciliations',
        'Complete GST compliance, ITC reconciliation & GSTR-9 prep',
        'Comprehensive monthly management accounts & cash flow summary',
        'Quarterly TDS returns (24Q salaries + 26Q commercial payments)',
        'Annual ROC documentation (AOC-4, MGT-7, DIR-3 KYC)',
        'Statutory and tax audit dossier coordination',
        'Priority review desk with senior financial consultant',
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  const comparisonRows = [
    {
      feature: 'Transaction Recording & Bookkeeping',
      essential: 'Up to 75 entries/mo',
      growth: 'Up to 250 entries/mo',
      complete: 'High-volume ledger management',
    },
    {
      feature: 'Bank & Payment Gateway Reconciliations',
      essential: '1 Account',
      growth: 'Up to 3 Accounts',
      complete: 'Multi-account & Gateway',
    },
    {
      feature: 'GST Filing (GSTR-1 & 3B)',
      essential: 'Included',
      growth: 'Included with ITC 2B Check',
      complete: 'Full Reconciliation & GSTR-9',
    },
    {
      feature: 'Monthly Management Reports (P&L, Balance Sheet)',
      essential: 'Quarterly Overview',
      growth: 'Monthly Reporting Pack',
      complete: 'Comprehensive Executive Deck',
    },
    {
      feature: 'Statutory Deadline Calendar Tracking',
      essential: 'Standard Alerts',
      growth: 'Proactive Reminders',
      complete: 'Priority Calendar Desk',
    },
    {
      feature: 'TDS & TCS Returns (Form 26Q / 24Q)',
      essential: 'Optional Add-on',
      growth: 'Form 26Q Included',
      complete: 'Form 24Q & 26Q Included',
    },
    {
      feature: 'Payroll & Salary Slip Preparation',
      essential: 'Not Included',
      growth: 'Up to 15 Employees',
      complete: 'Up to 40 Employees',
    },
    {
      feature: 'ROC Annual Compliance (AOC-4 / MGT-7)',
      essential: 'Not Included',
      growth: 'Not Included',
      complete: 'Included',
    },
    {
      feature: 'External Audit Coordination & Dossier Prep',
      essential: 'Basic Trial Balance',
      growth: 'Standard Audit Schedules',
      complete: 'Complete Working Paper Pack',
    },
  ];

  const scopingFactors = [
    {
      title: 'Monthly Transaction Volume',
      desc: 'The total number of bank transactions, purchase vouchers, and customer sales invoices processed each month.',
      icon: Briefcase,
    },
    {
      title: 'Entity Structure & Registrations',
      desc: 'Whether your business is a sole proprietorship, partnership deed, LLP, or private limited company with MCA obligations.',
      icon: Building,
    },
    {
      title: 'Reconciliation Complexity',
      desc: 'The number of active current accounts, credit cards, payment gateways, and branch locations.',
      icon: FileCheck2,
    },
    {
      title: 'Reporting & Payroll Frequency',
      desc: 'Whether your leadership requires bi-weekly versus monthly management accounts, and employee headcount for payroll.',
      icon: Users,
    },
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Header */}
      <section aria-labelledby="packages-intro-heading">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="sage" size="md">
              Engagement Models
            </Badge>

            <h1
              id="packages-intro-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight font-heading leading-tight"
            >
              Structured Packages for <br className="hidden sm:inline" />
              <span className="text-forest">Consistent Financial Support</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              We offer three structured packages to suit distinct operational requirements. Final scope and customized fees are established following a practical review of your books and transaction volumes.
            </p>

            <div className="pt-2">
              <a
                href="#comparison-matrix"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5"
              >
                <span>Jump to detailed package feature matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Package Cards */}
      <section aria-labelledby="package-cards-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`flex flex-col justify-between ${
                  pkg.popular ? 'border-forest ring-1 ring-forest shadow-md relative' : ''
                }`}
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-charcoal">{pkg.name}</span>
                      <Badge variant={pkg.popular ? 'forest' : 'sage'} size="sm">
                        {pkg.sampleTag}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-1">
                      {pkg.tagline}
                    </CardDescription>

                    <div className="mt-4 pt-3 border-t border-border-subtle bg-surface/50 p-3 rounded-button text-xs">
                      <strong className="text-charcoal block mb-0.5">Intended Client:</strong>
                      <span className="text-charcoal-muted leading-relaxed">{pkg.intendedCustomer}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2.5">
                        Key Deliverables Included:
                      </span>
                      <ul className="space-y-2 text-xs text-charcoal">
                        {pkg.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.notIncluded.length > 0 && (
                      <div className="pt-3 border-t border-border-subtle/80">
                        <span className="text-xs font-semibold text-charcoal-muted block mb-2">
                          Not typically included in this tier:
                        </span>
                        <ul className="space-y-1.5 text-xs text-charcoal-muted">
                          {pkg.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <X className="w-3.5 h-3.5 text-charcoal-muted/60 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-border-subtle">
                  <Button
                    to={`/contact?package=${pkg.id}`}
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-center"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request a Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-charcoal-muted max-w-2xl mx-auto">
              Package descriptions represent standard engagement scopes. Final engagement scope, frequency, and retainers require review of your business accounts and formal agreement.
            </p>
          </div>
        </Container>
      </section>

      {/* 3. Detailed Comparison Matrix */}
      <section id="comparison-matrix" className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="matrix-heading">
        <Container>
          <SectionHeading
            kicker="FEATURE COMPARISON"
            title="Side-by-Side Scope Matrix"
            description="Review how deliverables compare across our three support packages to select the model that fits your operational needs."
          />

          <div className="overflow-x-auto rounded-card border border-border-subtle shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface border-b border-border-subtle text-charcoal">
                  <th className="py-3.5 px-4 sm:px-6 font-bold w-2/5">Deliverable / Capability</th>
                  <th className="py-3.5 px-4 font-bold text-center w-1/5">Essential</th>
                  <th className="py-3.5 px-4 font-bold text-center w-1/5 bg-sage/30 text-forest">Growth</th>
                  <th className="py-3.5 px-4 sm:px-6 font-bold text-center w-1/5">Complete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-charcoal">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-center text-charcoal-muted">
                      {row.essential}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-forest bg-sage/10">
                      {row.growth}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center text-charcoal">
                      {row.complete}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 4. How We Scope Quotes */}
      <section aria-labelledby="scoping-heading">
        <Container>
          <SectionHeading
            kicker="TRANSPARENT ENGAGEMENT"
            title="How Engagement Scopes and Fees Are Determined"
            description="Rather than applying rigid flat pricing that fails to reflect actual effort, we evaluate four key operational variables during our discovery review."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopingFactors.map((factor, idx) => {
              const Icon = factor.icon;
              return (
                <Card key={idx} className="p-5">
                  <div className="w-9 h-9 rounded-button bg-sage flex items-center justify-center text-forest mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-charcoal text-sm font-heading">{factor.title}</h3>
                  <p className="mt-2 text-xs text-charcoal-muted leading-relaxed">
                    {factor.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Scope & Disclaimer Notice */}
      <section aria-labelledby="package-disclaimer-heading">
        <Container>
          <div className="p-6 rounded-card bg-surface border border-border-subtle flex items-start gap-3.5 text-xs text-charcoal-muted">
            <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 id="package-disclaimer-heading" className="font-bold text-charcoal text-sm">
                Engagement Terms & Scope Confirmation
              </h3>
              <p className="leading-relaxed">
                The package specifications described on this page serve as standard service tier guidelines and do not constitute a binding commercial quote or service guarantee.
              </p>
              <p className="leading-relaxed">
                Actual scope of engagement, responsibilities, reporting frequencies, and retainers require direct review of your current books and formal execution of an engagement letter. We do not provide guaranteed tax savings or automated statutory filings.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Quote Request CTA */}
      <section aria-labelledby="quote-cta-heading">
        <Container>
          <div className="p-8 sm:p-12 rounded-card bg-white border border-border-subtle shadow-md">
            <div className="max-w-2xl space-y-4">
              <Badge variant="sage" size="md">Custom Scope Discussion</Badge>
              <h2 id="quote-cta-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
                Ready to Structure Your Accounting Scope?
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Reach out to schedule an initial review. We will evaluate your monthly transactions, discuss compliance requirements, and propose a transparent scope of work.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request a Quote
                </Button>
                <Button to="/services" variant="secondary" size="md">
                  Review All Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
