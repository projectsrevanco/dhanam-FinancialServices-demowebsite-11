import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Receipt,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { resourcesData } from '../../data/resourcesData';

export const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const resource = resourcesData.find((r) => r.id === id);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const otherGuides = resourcesData.filter((r) => r.id !== resource.id).slice(0, 2);

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="md">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border-subtle text-xs">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-charcoal hover:text-forest font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded p-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Resources</span>
          </Link>

          <div className="flex items-center gap-3 text-charcoal-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-forest" />
              {resource.readTime}
            </span>
            <span>•</span>
            <span>Updated: {resource.lastUpdated}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pt-2">
          {(() => {
            const getCategoryIcon = (category: string) => {
              switch (category) {
                case 'Bookkeeping':
                  return Receipt;
                case 'Taxation':
                  return FileSpreadsheet;
                case 'Financial Management':
                  return TrendingUp;
                case 'Compliance':
                  return ShieldCheck;
                default:
                  return FileText;
              }
            };
            const CategoryIcon = getCategoryIcon(resource.category);

            return (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-button bg-sage flex items-center justify-center text-forest">
                  <CategoryIcon className="w-4 h-4" />
                </div>
                <Badge variant="sage" size="md">
                  {resource.category}
                </Badge>
              </div>
            );
          })()}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight font-heading leading-tight">
            {resource.title}
          </h1>

          <p className="text-base text-charcoal-muted leading-relaxed">
            {resource.summary}
          </p>

          {/* Key Takeaways Callout Card */}
          <div className="p-5 rounded-card bg-surface border border-border-subtle space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Core Takeaways for Business Owners
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal">
              {resource.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-2" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Article Long-form Body */}
        <article className="space-y-10 pt-4 text-charcoal">
          {resource.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal tracking-tight font-heading">
                {section.heading}
              </h2>

              <div className="space-y-3 text-sm text-charcoal-muted leading-relaxed">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.checklist && section.checklist.length > 0 && (
                <div className="p-5 rounded-card bg-white border border-border-subtle shadow-xs space-y-3 mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                    Actionable Checklist Items
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm text-charcoal">
                    {section.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Educational Content Disclaimer */}
        <div className="p-5 rounded-card bg-surface border border-border-subtle flex items-start gap-3.5 text-xs text-charcoal-muted">
          <AlertCircle className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-charcoal block">General Educational Content Disclaimer</strong>
            <p className="leading-relaxed">
              This guide is prepared for informational and educational purposes only. Specific tax applicability, deductions, and filing rules vary across entity classifications, turnover thresholds, and fiscal years. Please consult with a qualified chartered accountant or tax advisor to review your exact business books and regulatory obligations.
            </p>
          </div>
        </div>

        {/* Related Guides & CTA */}
        <div className="pt-8 border-t border-border-subtle space-y-8">
          <div>
            <h3 className="text-base font-bold text-charcoal mb-4">
              Related Educational Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherGuides.map((item) => (
                <Card key={item.id} interactive className="p-4 flex flex-col justify-between">
                  <div>
                    <Badge variant="sage" size="sm" className="mb-2">
                      {item.category}
                    </Badge>
                    <h4 className="font-semibold text-charcoal text-sm leading-snug">
                      <Link to={`/resources/${item.id}`} className="hover:text-forest transition-colors">
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-charcoal-muted">{item.readTime}</span>
                    <Link
                      to={`/resources/${item.id}`}
                      className="text-forest font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Box */}
          <div className="p-6 sm:p-8 rounded-card bg-white border border-border-subtle shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-charcoal text-base">
                Have specific questions about your accounts?
              </h3>
              <p className="text-xs text-charcoal-muted mt-1 max-w-md">
                Schedule a consultation to discuss your bookkeeping, upcoming GST returns, or compliance filing schedule.
              </p>
            </div>
            <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Book a Consultation
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
