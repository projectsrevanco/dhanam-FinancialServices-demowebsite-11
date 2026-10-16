import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Receipt,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  FolderLock,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { SafeImage } from '../../components/common/SafeImage';

export const Home: React.FC = () => {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sample data for Section 6: Monthly Income vs Expenses preview
  const sampleCashflowData = [
    { month: 'May', income: 420000, expenses: 310000 },
    { month: 'Jun', income: 480000, expenses: 340000 },
    { month: 'Jul', income: 510000, expenses: 360000 },
    { month: 'Aug', income: 590000, expenses: 395000 },
    { month: 'Sep', income: 640000, expenses: 410000 },
    { month: 'Oct', income: 680000, expenses: 430000 },
  ];

  // Section 3: Six service cards
  const services = [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      description:
        'Daily ledger entries, bank reconciliations, vendor ledger tracking, and structured charts of accounts to keep your books audit-ready year-round.',
      icon: Receipt,
      link: '/services',
    },
    {
      id: 'gst-tax-filing',
      title: 'GST & Tax Filing Support',
      description:
        'Timely preparation of monthly GSTR-1 & GSTR-3B filings, automated ITC 2B reconciliations, and individual and corporate annual tax returns.',
      icon: FileSpreadsheet,
      link: '/services',
    },
    {
      id: 'business-compliance',
      title: 'Business Compliance',
      description:
        'Statutory compliance tracking including annual ROC filings, director KYC, TDS returns (24Q & 26Q), and mandatory register maintenance.',
      icon: ShieldCheck,
      link: '/services',
    },
    {
      id: 'financial-consulting',
      title: 'Financial Consulting',
      description:
        'Pragmatic financial advice covering working capital cycles, cash flow forecasting, capital structuring, and strategic cost rationalization.',
      icon: TrendingUp,
      link: '/services',
    },
    {
      id: 'financial-reporting',
      title: 'Monthly Financial Reporting',
      description:
        'Clear Profit & Loss statements, balance sheets, aged receivables summaries, and executive dashboards explained in plain language without jargon.',
      icon: BarChart3,
      link: '/services',
    },
    {
      id: 'document-management',
      title: 'Document Management',
      description:
        'Organized digital repository for vouchers, invoices, challans, and filed return acknowledgments with secure archiving and rapid retrieval.',
      icon: FolderLock,
      link: '/services',
    },
  ];

  // Section 4: How It Works Steps
  const steps = [
    {
      number: '01',
      title: 'Share your requirements',
      description:
        'Schedule a consultation to outline your business structure, ongoing transaction volume, and immediate compliance or filing needs.',
    },
    {
      number: '02',
      title: 'Organize your financial documents',
      description:
        'Provide bank statements, sales and purchase invoices, and previous tax records through our structured checklist or secure repository.',
    },
    {
      number: '03',
      title: 'Review records and filing requirements with an accountant',
      description:
        'A dedicated accountant reviews reconciliations, validates eligible input tax credit, and discusses tax computations before transmission.',
    },
    {
      number: '04',
      title: 'Receive reports and track upcoming deadlines',
      description:
        'Get timely financial statements, official filing acknowledgments (ARNs/ITR-V), and clear calendar reminders for future cutoffs.',
    },
  ];

  // Section 5: Business Packages
  const packages = [
    {
      name: 'Essential',
      tagline: 'Ideal for sole proprietors, freelancers, and small traders.',
      sampleFee: 'Starting from ₹2,500 / month',
      features: [
        'Quarterly Advance Tax planning & estimation',
        'Monthly GSTR-1 and GSTR-3B return filings',
        'Basic bookkeeping (up to 75 entries/month)',
        'Annual ITR preparation & acknowledgment',
        'Scheduled email & phone support',
      ],
      popular: false,
    },
    {
      name: 'Growth',
      tagline: 'Designed for expanding partnerships, LLPs, and growing enterprises.',
      sampleFee: 'Starting from ₹6,500 / month',
      features: [
        'Bi-weekly bank & credit reconciliations',
        'GSTR-2B Input Tax Credit reconciliation',
        'Quarterly TDS 26Q & 24Q return filings',
        'Monthly Profit & Loss and Balance Sheet review',
        'Payroll support for up to 15 team members',
        'Direct consultation with senior accountant',
      ],
      popular: true,
    },
    {
      name: 'Complete',
      tagline: 'Comprehensive compliance and advisory for incorporated entities.',
      sampleFee: 'Starting from ₹12,000 / month',
      features: [
        'Full cloud accounting ledger management',
        'Comprehensive monthly financial reporting pack',
        'Annual ROC documentation (AOC-4, MGT-7)',
        'Statutory audit coordination & documentation',
        'Advance cash flow & working capital advisory',
        'Priority accountant desk & compliance alerts',
      ],
      popular: false,
    },
  ];

  // Section 7: FAQs
  const faqs = [
    {
      q: 'What specific accounting and tax services does Dhanam Financial Services provide?',
      a: 'We offer comprehensive end-to-end accounting support, including day-to-day bookkeeping, bank reconciliations, GST returns (GSTR-1, 3B, 9), Income Tax Returns (ITR-1 through ITR-6), TDS compliance, monthly management reporting, and corporate structuring guidance for businesses across Andhra Pradesh.',
    },
    {
      q: 'Which documents do I need to prepare before our initial consultation?',
      a: 'For an initial assessment, having your basic PAN/GST details, recent bank statements for the relevant fiscal quarters, prior year ITR copies, and approximate transaction volumes is helpful. If you are forming a new firm, identity and address proofs of promoters or partners will suffice.',
    },
    {
      q: 'How do I book an initial consultation or request an accounting review?',
      a: 'You can book an appointment using our online booking form on the Contact page, by calling our Vijayawada office at +91 866 247 8890, or by messaging our practice WhatsApp line. We will schedule a dedicated 30-minute discussion with an accountant.',
    },
    {
      q: 'How is ongoing monthly bookkeeping managed for small businesses?',
      a: 'We establish a systematic document schedule. At the close of each week or month, you share digital invoices and bank statements. Our team categorizes transactions, reconciles accounts, calculates GST liabilities, and delivers monthly financial summaries before statutory filing deadlines.',
    },
    {
      q: 'How can clients get in touch with our team for urgent queries?',
      a: 'Retained clients have direct access to their assigned accountant via email and dedicated phone lines during office hours (Monday to Friday, 9:00 AM to 6:00 PM; Saturday 9:00 AM to 1:00 PM). Urgent filing notifications are coordinated in advance.',
    },
    {
      q: 'Is the information provided on this website considered formal tax or legal advice?',
      a: 'No. The information published on this website is for educational and general informational purposes only. Specific tax liabilities, legal structures, and filing requirements depend on individual business facts and should always be reviewed during a personalized professional engagement.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* =========================================================================
          SECTION 1 — HERO
          ========================================================================= */}
      <section aria-labelledby="hero-heading" className="pt-2 sm:pt-4">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Badge variant="sage" size="md">
                  Independent Financial Practice
                </Badge>
                <span className="text-xs text-charcoal-muted font-medium">
                  Vijayawada & Amaravati Region
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-[1.16]"
              >
                Your Business Finances, <br className="hidden sm:inline" />
                <span className="text-forest">Clearer and Simpler.</span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-2xl">
                Reliable accounting, structured bookkeeping, accurate tax filing, proactive compliance support, and practical financial consulting. We help entrepreneurs and professionals focus on growth with complete peace of mind.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book a Consultation
                </Button>

                <Button
                  to="/services"
                  variant="secondary"
                  size="lg"
                >
                  Explore Our Services
                </Button>
              </div>

              {/* Practical highlights */}
              <div className="pt-6 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-charcoal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Accurate double-entry bookkeeping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>GST & Income Tax deadline tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Plain-language monthly reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Strict client data confidentiality</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Consultation Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="overflow-hidden rounded-card border border-border-subtle shadow-md bg-white">
                  <SafeImage
                    src="/images/financial_consultation_hero.jpg"
                    alt="Accountant consulting with a small-business owner over revenue reports and financial statements"
                    className="w-full h-auto aspect-[4/3] object-cover"
                    priority={true}
                    fallbackText="Professional accountant consultation session"
                  />
                  <div className="p-4 bg-white border-t border-border-subtle flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-charcoal">Personalized Advisory Sessions</p>
                      <p className="text-charcoal-muted text-[11px]">Structured ledger reviews & compliance guidance</p>
                    </div>
                    <Badge variant="sage" size="sm">MG Road, Vijayawada</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2 — TRUST AND CLARITY
          ========================================================================= */}
      <section className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="trust-heading">
        <Container>
          <SectionHeading
            kicker="PRACTICAL CLARITY"
            title="Practical discipline that keeps your business organized"
            description="We focus on operational consistency, meticulous documentation, and timely statutory filing. Here is how our disciplined practice benefits your daily operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-4">
                  <Receipt className="w-5 h-5" />
                </div>
                <CardTitle>Organized Records</CardTitle>
                <CardDescription className="leading-relaxed">
                  Every sales invoice, purchase voucher, bank transaction, and expense receipt is systematically reconciled. Clean ledgers eliminate year-end panic and ensure audit readiness at all times.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-charcoal-muted space-y-2 border-t border-border-subtle/80 pt-3">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Monthly bank & credit reconciliations</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Vendor ledger balancing & payment tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <CardTitle>Clearer Financial Reporting</CardTitle>
                <CardDescription className="leading-relaxed">
                  Understand exactly where your revenue comes from and where operating costs flow. We prepare understandable monthly summaries that help you make grounded commercial decisions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-charcoal-muted space-y-2 border-t border-border-subtle/80 pt-3">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Monthly Profit & Loss and Balance Sheets</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Operating cash flow position previews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <CardTitle>Deadline Awareness</CardTitle>
                <CardDescription className="leading-relaxed">
                  Regulatory deadlines for GST, TDS, advance tax, and annual corporate filings are monitored ahead of time. Advance notices protect your firm from late fees and interest penalties.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-charcoal-muted space-y-2 border-t border-border-subtle/80 pt-3">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Statutory cutoff calendar tracking</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>Advance reminders before filing windows close</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — SERVICES
          ========================================================================= */}
      <section id="services" aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            kicker="CORE PRACTICE AREAS"
            title="Comprehensive Services Tailored to Small & Growing Businesses"
            description="Explore our core accounting and advisory services. Each engagement is handled by qualified accounting professionals committed to accuracy and confidentiality."
            action={
              <Button to="/services" variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                All Service Details
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} interactive className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base">{service.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5 transition-colors"
                    >
                      <span>Explore service details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — HOW IT WORKS
          ========================================================================= */}
      <section className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="how-it-works-heading">
        <Container>
          <SectionHeading
            kicker="FOUR-STEP WORKFLOW"
            title="How We Work With Your Business"
            description="A clear, organized four-step process that eliminates confusion and keeps your books consistent from the first consultation to monthly delivery."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Steps list */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="p-5 rounded-card bg-surface border border-border-subtle flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-forest bg-sage px-2 py-0.5 rounded">
                      Step {step.number}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-charcoal tracking-tight font-heading">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-charcoal-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accompanying real workflow photograph */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-card border border-border-subtle shadow-md bg-white">
                <SafeImage
                  src="/images/financial_records_review.jpg"
                  alt="Accountant reviewing structured GST records and tax audit documents with a pen and calculator in an organized office"
                  className="w-full h-auto aspect-[4/3] object-cover"
                  fallbackText="Organized tax and financial document review"
                />
                <div className="p-4 bg-white border-t border-border-subtle text-xs text-charcoal-muted">
                  <p className="font-semibold text-charcoal">Step-by-Step Verification</p>
                  <p className="text-[11px] mt-0.5">Every voucher and ledger entry is verified before tax transmission.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 — BUSINESS PACKAGES
          ========================================================================= */}
      <section id="packages" aria-labelledby="packages-heading">
        <Container>
          <SectionHeading
            kicker="SERVICE TIERS"
            title="Business Support Packages"
            description="Structured packages designed for different stages of business growth. Clearly defined deliverables with transparent quarterly reviews."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <Card
                key={idx}
                className={`flex flex-col justify-between ${
                  pkg.popular ? 'border-forest ring-1 ring-forest relative shadow-md' : ''
                }`}
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-charcoal">{pkg.name}</h3>
                      {pkg.popular && <Badge variant="forest">Popular Retainer</Badge>}
                    </div>
                    <CardDescription>{pkg.tagline}</CardDescription>

                    <div className="mt-4 pt-3 border-t border-border-subtle">
                      <span className="text-xs font-semibold text-forest block">
                        {pkg.sampleFee}
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        Standard retainer tier • Custom quote upon review
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2.5 text-xs text-charcoal">
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-border-subtle">
                  <Button
                    to={`/contact?package=${pkg.name.toLowerCase()}`}
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
            <p className="text-xs text-charcoal-muted">
              Note: Retainer fees are tailored according to your annual turnover, transaction frequency, and entity structure.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 — DASHBOARD PREVIEW
          ========================================================================= */}
      <section className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="dashboard-preview-heading">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Badge variant="sage" size="sm">
                  Client & Accountant Portal
                </Badge>
              </div>
              <h2 id="dashboard-preview-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
                Always Stay Informed on Your Tax & Cash Status
              </h2>
              <p className="mt-2 text-sm text-charcoal-muted max-w-2xl">
                Our clients and accountants collaborate through a clear management console to monitor cashflow trends, upcoming tax deadlines, and document reconciliation health in real time.
              </p>
            </div>

            <Button
              to="/portal"
              variant="primary"
              size="md"
              leftIcon={<ExternalLink className="w-4 h-4" />}
            >
              Access Client Portal
            </Button>
          </div>

          {/* Management Portal Component */}
          <Card className="border border-border-subtle bg-surface p-4 sm:p-6 shadow-md">
            {/* Dashboard top header */}
            <div className="bg-white p-4 rounded-card border border-border-subtle flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-button bg-forest text-white font-bold text-xs flex items-center justify-center">
                  DF
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal text-sm">
                    Client: Sri Balaji Trading & Co.
                  </h3>
                  <p className="text-xs text-charcoal-muted font-mono">
                    GSTIN: 37AABCS1234K1Z2 • FY 2025–26
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  Q2 Books Reconciled
                </Badge>
                <Link
                  to="/portal/dashboard"
                  className="text-xs font-semibold text-forest hover:underline inline-flex items-center gap-1"
                >
                  <span>Switch to Accountant View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Dashboard KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-card bg-white border border-border-subtle">
                <span className="text-xs text-charcoal-muted block">Q2 Net Revenue</span>
                <span className="text-xl font-bold text-charcoal font-heading">₹28,40,000</span>
                <span className="text-[11px] text-forest block mt-1">+12.4% vs previous quarter</span>
              </div>

              <div className="p-4 rounded-card bg-white border border-border-subtle">
                <span className="text-xs text-charcoal-muted block">Operating Expenses</span>
                <span className="text-xl font-bold text-charcoal font-heading">₹18,95,000</span>
                <span className="text-[11px] text-charcoal-muted block mt-1">Direct & indirect overheads</span>
              </div>

              <div className="p-4 rounded-card bg-white border border-border-subtle">
                <span className="text-xs text-charcoal-muted block">Input Tax Credit (2B)</span>
                <span className="text-xl font-bold text-charcoal font-heading">₹1,84,200</span>
                <span className="text-[11px] text-forest block mt-1">100% matched with e-invoices</span>
              </div>

              <div className="p-4 rounded-card bg-white border border-border-subtle">
                <span className="text-xs text-charcoal-muted block">Next Statutory Cutoff</span>
                <span className="text-xl font-bold text-status-error font-heading">20 Oct 2026</span>
                <span className="text-[11px] text-charcoal-muted block mt-1">GSTR-3B Monthly Return</span>
              </div>
            </div>

            {/* Visualization & Deadline Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Monthly Income vs Expenses Chart */}
              <div className="lg:col-span-7 bg-white p-5 rounded-card border border-border-subtle">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Monthly Income vs. Operating Expenses</h4>
                    <p className="text-xs text-charcoal-muted">Trend for the last 6 months (May – Oct 2026)</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#245C45]" />
                      <span>Income</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#BFCBC3]" />
                      <span>Expenses</span>
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sampleCashflowData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      barGap={6}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#DFE5E0" vertical={false} />
                      <XAxis dataKey="month" stroke="#66736B" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#66736B"
                        fontSize={10}
                        tickLine={false}
                        tickFormatter={(v) => `₹${v / 1000}k`}
                      />
                      <Tooltip
                        formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#DFE5E0',
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="income" fill="#245C45" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#BFCBC3" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Document Status & Statutory Deadlines */}
              <div className="lg:col-span-5 bg-white p-5 rounded-card border border-border-subtle flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-charcoal mb-1">
                    Document Reconciliation Status
                  </h4>
                  <p className="text-xs text-charcoal-muted mb-4">
                    Current audit and voucher verification index
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-surface border border-border-subtle">
                      <span className="font-medium text-charcoal">September Bank Statements</span>
                      <Badge variant="success" size="sm">Reconciled</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-surface border border-border-subtle">
                      <span className="font-medium text-charcoal">Vendor Purchase Invoices</span>
                      <span className="text-charcoal-muted font-mono font-medium">92 / 95 Verified</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-surface border border-border-subtle">
                      <span className="font-medium text-charcoal">Form 26AS / AIS Matching</span>
                      <Badge variant="sage" size="sm">Completed</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-surface border border-border-subtle">
                      <span className="font-medium text-charcoal">GSTR-3B Challan 281 Payment</span>
                      <Badge variant="error" size="sm">Challan Generated</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-muted">
                    Integrated financial reporting & compliance monitoring
                  </span>
                  <Link
                    to="/portal"
                    className="text-xs font-semibold text-forest hover:text-forest-dark inline-flex items-center gap-1"
                  >
                    <span>Explore Client Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7 — FAQ
          ========================================================================= */}
      <section id="faq" aria-labelledby="faq-heading">
        <Container size="md">
          <SectionHeading
            kicker="FREQUENTLY ASKED QUESTIONS"
            title="Clear Answers to Common Questions"
            description="Find direct answers regarding our accounting solutions, documentation requirements, and initial consultation scheduling."
            align="center"
          />

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-card border border-border-subtle bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-charcoal">
                      {faq.q}
                    </span>
                    <span className="text-charcoal-muted shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-forest" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-border-subtle/60 mt-1">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legal / Regulatory Disclaimer */}
          <div className="mt-8 p-4 rounded-card bg-surface border border-border-subtle flex items-start gap-3 text-xs text-charcoal-muted">
            <AlertCircle className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-charcoal block">General Information Disclaimer</strong>
              The information presented on this website is for general educational and informational purposes only. It does not constitute formal individualized chartered accountancy, legal, or statutory tax advice. Professional guidance requires tailored examination of specific books of accounts and factual circumstances.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 — FINAL CTA
          ========================================================================= */}
      <section aria-labelledby="final-cta-heading">
        <Container>
          <div className="p-8 sm:p-12 rounded-card bg-white border border-border-subtle shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <Badge variant="sage" size="md">
                  Book an Initial Consultation
                </Badge>
                <h2
                  id="final-cta-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight font-heading"
                >
                  Ready for Clearer Books and Confident Decisions?
                </h2>
                <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
                  Schedule a structured 30-minute review with an accountant to discuss your bookkeeping backlog, upcoming GST returns, or annual tax planning.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book a Consultation
                  </Button>
                  <Button
                    to="/services"
                    variant="secondary"
                    size="lg"
                  >
                    View Services Catalog
                  </Button>
                </div>
              </div>

              {/* Office Details Card */}
              <div className="lg:col-span-4 bg-surface p-5 rounded-card border border-border-subtle space-y-3 text-xs text-charcoal">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-charcoal text-xs uppercase tracking-wider">
                    Office Information
                  </h3>
                  <Badge variant="sage" size="sm">Vijayawada</Badge>
                </div>

                <div className="space-y-2.5 text-charcoal-muted">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <span>MG Road, Vijayawada, AP 520010</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-forest shrink-0" />
                    <span className="font-medium text-charcoal">+91 866 247 8890</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-forest shrink-0" />
                    <span>contact@dhanamfinancial.com</span>
                  </div>
                  <div className="flex items-center gap-2.5 pt-1 border-t border-border-subtle">
                    <Clock className="w-4 h-4 text-forest shrink-0" />
                    <span>Mon–Fri: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
