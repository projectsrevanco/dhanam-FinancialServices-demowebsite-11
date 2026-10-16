import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  ArrowRight,
  Search,
  AlertCircle,
  FileText,
  Receipt,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import { resourcesData } from '../../data/resourcesData';

export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bookkeeping', 'Taxation', 'Financial Management', 'Compliance'];

  const filteredResources = resourcesData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Header & Introduction */}
      <section aria-labelledby="resources-intro-heading">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="sage" size="md">
              Knowledge & Guides
            </Badge>

            <h1
              id="resources-intro-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight font-heading leading-tight"
            >
              Educational Resources for <br className="hidden sm:inline" />
              <span className="text-forest">Business Financial Clarity</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              Explore practical guides, checklists, and primers prepared to help small-business owners, LLPs, and entrepreneurs organize records, understand cash flow dynamics, and prepare for tax milestones.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                    selectedCategory === cat
                      ? 'bg-forest text-white'
                      : 'bg-white text-charcoal border border-border-subtle hover:bg-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full md:w-72">
              <Input
                placeholder="Search guides & checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-charcoal-muted" />}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Educational Resource Cards Grid */}
      <section aria-labelledby="guides-grid-heading">
        <Container>
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-card bg-white border border-border-subtle">
              <FileText className="w-10 h-10 text-charcoal-muted mx-auto mb-3" />
              <h3 className="text-base font-bold text-charcoal">No Matching Guides Found</h3>
              <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto">
                Try searching with different terms or reset your category filter to browse all educational articles.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear Search & Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
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
                  <Card
                    key={resource.id}
                    interactive
                    className="flex flex-col justify-between"
                  >
                    <div>
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-button bg-sage flex items-center justify-center text-forest shrink-0">
                              <CategoryIcon className="w-3.5 h-3.5" />
                            </div>
                            <Badge variant="sage" size="sm">
                              {resource.category}
                            </Badge>
                          </div>
                          <span className="text-[11px] text-charcoal-muted flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-forest" />
                            {resource.readTime}
                          </span>
                        </div>

                      <CardTitle className="text-base sm:text-lg leading-snug">
                        <Link
                          to={`/resources/${resource.id}`}
                          className="hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
                        >
                          {resource.title}
                        </Link>
                      </CardTitle>

                      <CardDescription className="text-xs leading-relaxed mt-2">
                        {resource.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-2">
                      <div className="p-3 rounded-button bg-surface border border-border-subtle text-xs text-charcoal space-y-1.5">
                        <span className="font-semibold text-charcoal block text-[11px] uppercase tracking-wider text-forest">
                          Key Takeaway:
                        </span>
                        <p className="text-[11px] text-charcoal-muted leading-relaxed line-clamp-2">
                          {resource.keyTakeaways[0]}
                        </p>
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-3 border-t border-border-subtle">
                    <span className="text-[11px] text-charcoal-muted">
                      Updated: {resource.lastUpdated}
                    </span>
                    <Button
                      to={`/resources/${resource.id}`}
                      variant="ghost"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Read Guide
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          )}
        </Container>
      </section>

      {/* 3. General Educational Content Disclaimer */}
      <section aria-labelledby="disclaimer-heading">
        <Container>
          <div className="p-6 rounded-card bg-surface border border-border-subtle flex items-start gap-3.5 text-xs text-charcoal-muted">
            <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 id="disclaimer-heading" className="font-bold text-charcoal text-sm">
                General Educational Guidance Notice
              </h3>
              <p className="leading-relaxed">
                All articles, checklists, and explainers provided in this knowledge section are published strictly for general educational reference. They do not constitute formal legal, taxation, or chartered accounting advice.
              </p>
              <p className="leading-relaxed">
                Filing dates, threshold exemptions, allowable deductions, and statutory compliance requirements vary across financial years, entity constitutions, and regulatory jurisdictions. Always verify current statutory requirements for your specific circumstances with a qualified accounting or tax professional.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Consultation CTA */}
      <section aria-labelledby="resources-cta-heading">
        <Container>
          <div className="p-8 sm:p-12 rounded-card bg-white border border-border-subtle shadow-md">
            <div className="max-w-2xl space-y-4">
              <Badge variant="sage" size="md">Personalized Assistance</Badge>
              <h2 id="resources-cta-heading" className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-heading">
                Need Help Applying These Checklists to Your Business?
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Schedule a consultation to review your current bookkeeping system, identify missing documentation, and establish a customized monthly accounting schedule.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Book a Consultation
                </Button>
                <Button to="/services" variant="secondary" size="md">
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
