import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutDashboard, Phone, Clock } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Packages', path: '/packages' },
    { label: 'Resources', path: '/resources' },
    { label: 'Calculators', path: '/calculators' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Client Portal', path: '/portal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border-subtle shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-surface border-b border-border-subtle/80 text-xs text-charcoal-muted hidden md:block py-1.5">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-forest" />
                <span>Desk: +91 866 247 8890</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>Mon–Fri 9:00 AM – 6:00 PM IST</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-charcoal-muted">Vijayawada Practice Office</span>
              <span className="text-border-subtle">|</span>
              <Link
                to="/portal"
                className="inline-flex items-center gap-1 text-forest font-semibold hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded px-1 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3 sm:py-3.5">
        <Container>
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <BrandLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-button transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                      isActive
                        ? 'text-forest bg-sage/50 font-semibold'
                        : 'text-charcoal hover:text-forest-dark hover:bg-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden xl:flex items-center gap-3">
              <Link
                to="/portal"
                className="text-xs font-semibold text-forest bg-sage/40 hover:bg-sage/70 px-3 py-2 rounded-button border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest flex items-center gap-1.5"
                title="Access client portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </Link>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>

            {/* Mobile / Tablet Menu Button (lg and below) */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                to="/portal"
                className="text-xs font-medium text-forest bg-sage/60 px-2.5 py-1.5 rounded-button border border-sage-dark/40"
              >
                Portal
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal rounded-button border border-border-subtle hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border-subtle bg-white px-4 pt-3 pb-6 shadow-lg">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-base font-medium rounded-button transition-colors ${
                    isActive
                      ? 'text-forest bg-sage/50 font-semibold'
                      : 'text-charcoal hover:bg-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-border-subtle mt-2 space-y-2">
              <Link
                to="/portal"
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest bg-sage/30 rounded-button border border-border-subtle"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Client Portal
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>

            <div className="pt-3 text-xs text-charcoal-muted flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-forest" />
                <span>Desk: +91 866 247 8890</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>Hours: Mon–Fri 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
