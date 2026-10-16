import React from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  FileSpreadsheet,
  MessageSquare,
  BookOpen,
  Target,
  Sparkles,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SafeImage } from '../../components/common/SafeImage';

export const About: React.FC = () => {
  const approaches = [
    {
      title: 'Organized Bookkeeping',
      description:
        'We believe that sound financial decisions begin with tidy, systematic records. Transactions are reconciled through disciplined double-entry routines rather than hurried year-end reconciliations.',
      icon: BookOpen,
    },
    {
      title: 'Proactive Compliance Support',
      description:
        'Statutory requirements for GST, TDS, advance tax, and annual filings are structured along a predictable compliance calendar to avoid last-minute portal rush and late filing fees.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Financial Clarity',
      description:
        'Financial reports should be actionable, not overwhelming. We present income summaries, operational cost patterns, and cash flow positions in clear, plain language that business owners can immediately act upon.',
      icon: Sparkles,
    },
    {
      title: 'Direct Client Communication',
      description:
        'We prioritize open communication, structured monthly check-ins, and prompt responses to questions regarding invoice classifications or tax changes affecting regional commerce.',
      icon: MessageSquare,
    },
  ];

  const values = [
    {
      name: 'Integrity & Objectivity',
      description:
        'We adhere strictly to professional standards, applying unbiased accounting rules and regulatory norms to all client filings.',
    },
    {
      name: 'Methodical Accuracy',
      description:
        'Every ledger entry, tax computation, and bank reconciliation is cross-verified to maintain audit readiness and minimize filing revisions.',
    },
    {
      name: 'Accessible Explanations',
      description:
        'We translate complex tax notifications and technical ledger entries into practical business terms so clients always understand their position.',
    },
    {
      name: 'Client Confidentiality',
      description:
        'Financial statements, bank details, and business vouchers are managed under strict data segregation and secure handling protocols.',
    },
  ];

  const serviceProcess = [
    {
      step: '01',
      title: 'Assessment & Intake',
      desc: 'We review your existing accounts, active tax registrations, past filings, and business workflows to understand your immediate and ongoing needs.',
    },
    {
      step: '02',
      title: 'Document & Ledger Setup',
      desc: 'We establish structured channels for monthly voucher collection, reconcile historical opening balances, and organize your chart of accounts.',
    },
    {
      step: '03',
      title: 'Regular Accounting & Review',
      desc: 'Our team enters transactions, performs bank reconciliations, checks tax liabilities, and conducts scheduled periodic reviews.',
    },
    {
      step: '04',
      title: 'Statutory Filing & Reporting',
      desc: 'We compile monthly management reports, prepare statutory tax filings ahead of cutoffs, and provide documented acknowledgments.',
    },
  ];

  const pillars = [
    {
      title: 'Accurate Records',
      description:
        'Precise ledgers and verified vouchers prevent costly recalculations during assessments, support credit and loan applications with banks, and provide business owners with dependable insight into real operating margins.',
      icon: ShieldCheck,
    },
    {
      title: 'Timely Preparation',
      description:
        'Submitting tax filings, advance tax payments, and statutory declarations well before statutory cutoff dates prevents interest penalties, preserves input tax credits, and avoids system congestion.',
      icon: Clock,
    },
    {
      title: 'Confidentiality & Privacy',
      description:
        'Financial figures, client contracts, and bank balances are treated with absolute discretion. Access is restricted exclusively to the professionals directly assigned to your accounts.',
      icon: Lock,
    },
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Header & Introduction */}
      <section aria-labelledby="about-intro-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="sage" size="md">
                About Dhanam Financial Services
              </Badge>

              <h1
                id="about-intro-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight font-heading leading-tight"
              >
                Clear Finances. <br className="hidden sm:inline" />
                <span className="text-forest">Confident Decisions.</span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
                Dhanam Financial Services is an independent financial consultancy and accounting practice based in Vijayawada, Andhra Pradesh. We assist proprietary concerns, growing partnerships, LLPs, and incorporated businesses with reliable bookkeeping, timely tax preparation, and disciplined financial reporting.
              </p>

              <p className="text-sm text-charcoal-muted leading-relaxed">
                We believe that entrepreneurs make the best strategic decisions when their books are accurate, their compliance calendar is monitored, and their financial reports are straightforward and easy to understand.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Book a Consultation
                </Button>
                <Button to="/services" variant="secondary" size="md">
                  Explore Services
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-card overflow-hidden border border-border-subtle shadow-md bg-white">
                <SafeImage
                  src="/images/accounting_office_about.jpg"
                  alt="Accounting and financial consultancy professionals working in an organized modern office with financial ledgers and workstations"
                  className="w-full h-auto aspect-[4/3] object-cover"
                  priority={true}
                  fallbackText="Dhanam Financial Services advisory office"
                />
                <div className="p-4 bg-white border-t border-border-subtle text-xs text-charcoal-muted">
                  <p className="font-semibold text-charcoal">Methodical Accountancy & Consultation</p>
                  <p className="text-[11px] mt-0.5">Assisting regional enterprises with structured bookkeeping and compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Our Approach */}
      <section className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="approach-heading">
        <Container>
          <SectionHeading
            kicker="OUR APPROACH"
            title="How We Deliver Clarity and Dependability"
            description="Our practice is built around structured operational habits that eliminate ambiguity and simplify day-to-day business finances."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Mission & Core Values */}
      <section aria-labelledby="mission-heading">
        <Container>
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-forest block mb-2">
              PURPOSE & PRINCIPLES
            </span>
            <h2 id="mission-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
              Our Mission and Guiding Values
            </h2>
            <p className="mt-3 text-sm text-charcoal-muted leading-relaxed">
              Our mission is to help business owners achieve complete peace of mind through disciplined accounting, transparent communication, and timely statutory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <Card key={idx} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-button bg-sage flex items-center justify-center text-forest mb-3">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-charcoal text-sm font-heading">{val.name}</h3>
                  <p className="mt-2 text-xs text-charcoal-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Service Process */}
      <section className="bg-white py-14 sm:py-20 border-y border-border-subtle" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            kicker="HOW ENGAGEMENTS WORK"
            title="A Systematic Service Process"
            description="From onboarding to periodic reporting, we follow a consistent path that keeps your accounts up to date and your team informed."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceProcess.map((proc) => (
              <div
                key={proc.step}
                className="p-5 rounded-card bg-surface border border-border-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-forest bg-sage px-2 py-0.5 rounded">
                    Phase {proc.step}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-charcoal font-heading">
                    {proc.title}
                  </h3>
                  <p className="mt-2 text-xs text-charcoal-muted leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Pillars of Practice: Accuracy, Timeliness, Confidentiality */}
      <section aria-labelledby="pillars-heading">
        <Container>
          <SectionHeading
            kicker="FOUNDATIONAL PILLARS"
            title="Why Accurate Records, Timely Preparation, and Privacy Matter"
            description="Our practice is rooted in three non-negotiable principles that protect your enterprise from compliance pitfalls and operational friction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} className="p-6">
                  <div className="w-10 h-10 rounded-button bg-sage flex items-center justify-center text-forest mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{pillar.title}</CardTitle>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. Consultation CTA */}
      <section aria-labelledby="about-cta-heading">
        <Container>
          <div className="p-8 sm:p-12 rounded-card bg-white border border-border-subtle shadow-md">
            <div className="max-w-2xl space-y-4">
              <Badge variant="sage" size="md">Schedule a Discussion</Badge>
              <h2 id="about-cta-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
                Discuss Your Accounting and Compliance Needs
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Connect with our team to discuss your current bookkeeping setup, resolve pending reconciliations, or structure ongoing monthly financial reporting.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Book a Consultation
                </Button>
                <Button to="/services" variant="secondary" size="md">
                  Review Our Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
