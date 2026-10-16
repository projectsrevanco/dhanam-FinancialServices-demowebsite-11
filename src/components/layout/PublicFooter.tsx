import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { Container } from '../ui/Container';

export const PublicFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'GST Advisory & Return Filing', path: '/services#gst-tax-filing' },
    { label: 'Income Tax Preparation & Returns', path: '/services#gst-tax-filing' },
    { label: 'Bookkeeping & Monthly Accounts', path: '/services#accounting-bookkeeping' },
    { label: 'Statutory & Business Compliance', path: '/services#business-compliance' },
    { label: 'Financial Consulting & Cash Flow', path: '/services#financial-consulting' },
    { label: 'Monthly Financial Reports', path: '/services#financial-reporting' },
  ];

  const quickLinks = [
    { label: 'About Our Practice', path: '/about' },
    { label: 'Educational Guides & Resources', path: '/resources' },
    { label: 'Support Packages', path: '/packages' },
    { label: 'Tax & EMI Calculators', path: '/calculators' },
    { label: 'Schedule Consultation', path: '/contact' },
    { label: 'Client Portal', path: '/portal' },
  ];

  return (
    <footer className="bg-white border-t border-border-subtle mt-auto">
      {/* Upper Content Section */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <BrandLogo size="md" showTagline={false} />
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Clear Finances. Confident Decisions. Independent financial consulting practice providing structured accounting, tax planning, and regulatory compliance for businesses and individuals.
              </p>

              {/* Social Icons */}
              <div className="pt-2 flex items-center gap-3 text-charcoal-muted">
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-button border border-border-subtle flex items-center justify-center hover:text-forest hover:border-forest hover:bg-sage/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                  </svg>
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-button border border-border-subtle flex items-center justify-center hover:text-forest hover:border-forest hover:bg-sage/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  title="Facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-button border border-border-subtle flex items-center justify-center hover:text-forest hover:border-forest hover:bg-sage/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
                Services & Solutions
              </h3>
              <ul className="space-y-2.5 text-sm text-charcoal-muted">
                {services.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="hover:text-forest transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Navigation & Tools */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-charcoal-muted">
                {quickLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="hover:text-forest transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
                    >
                      <span>{item.label}</span>
                      {item.path.includes('dashboard') && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-forest" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Business Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  Office & Working Hours
                </h3>
              </div>

              <div className="space-y-3 text-sm text-charcoal-muted">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>
                    Suite 402, Business Towers, MG Road, Vijayawada, AP 520010
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-forest shrink-0" />
                  <span>+91 866 247 8890</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-forest shrink-0" />
                  <span>contact@dhanamfinancial.com</span>
                </div>

                <div className="pt-2 border-t border-border-subtle/80 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-medium text-charcoal">Mon–Fri: 9:00 AM – 6:00 PM</p>
                    <p>Sat: 9:00 AM – 1:00 PM IST</p>
                    <p className="text-charcoal-muted">Sun & Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal / Copyright Strip */}
      <div className="bg-surface py-5 border-t border-border-subtle text-xs text-charcoal-muted">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © {currentYear} Dhanam Financial Services. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="hover:text-charcoal transition-colors">Privacy Notice</span>
              <span>•</span>
              <span className="hover:text-charcoal transition-colors">Terms of Engagement</span>
              <span>•</span>
              <span className="hover:text-charcoal transition-colors">Client Confidentiality</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
