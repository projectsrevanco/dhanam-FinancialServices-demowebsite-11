import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resourcesData } from '../../data/resourcesData';

const BASE_TITLE = 'Dhanam Financial Services';
const DEFAULT_TITLE = 'Dhanam Financial Services — Clear Finances. Confident Decisions.';
const DEFAULT_DESCRIPTION =
  'Independent financial consultancy providing strategic business accounting, tax preparation, GST compliance, and cash flow advisory.';

const ROUTE_CONFIG: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Dhanam Financial Services — Clear Finances. Confident Decisions.',
    description:
      'Independent financial consultancy providing reliable accounting, structured bookkeeping, tax preparation, and compliance guidance for regional enterprises.',
  },
  '/about': {
    title: 'About Our Practice — Dhanam Financial Services',
    description:
      'Learn about our disciplined financial consultancy, client confidentiality standards, and structured accounting methodology in Vijayawada.',
  },
  '/services': {
    title: 'Accounting & Tax Advisory Services — Dhanam Financial Services',
    description:
      'Comprehensive accounting, bookkeeping, GST filing, corporate compliance, and monthly financial reporting tailored for growing SMEs.',
  },
  '/packages': {
    title: 'Business Support Packages — Dhanam Financial Services',
    description:
      'Structured illustrative service tiers: Essential Support, Growth Support, and Complete Coordination for modern businesses.',
  },
  '/pricing': {
    title: 'Business Support Packages — Dhanam Financial Services',
    description:
      'Structured illustrative service tiers: Essential Support, Growth Support, and Complete Coordination for modern businesses.',
  },
  '/resources': {
    title: 'Educational Resources & Checklists — Dhanam Financial Services',
    description:
      'Practical guides, bookkeeping checklists, and statutory compliance primers designed for small-business owners and entrepreneurs.',
  },
  '/calculators': {
    title: 'Tax & Compliance Calculators — Dhanam Financial Services',
    description:
      'Interactive income tax estimators and financial calculators for preliminary business and personal fiscal planning.',
  },
  '/contact': {
    title: 'Schedule a Consultation — Dhanam Financial Services',
    description:
      'Request a tailored financial consultation with our accounting team. Review bank statements and discuss bookkeeping requirements.',
  },
  '/portal': {
    title: 'Accountant & Client Portal — Dhanam Financial Services',
    description:
      'Online client and practice portal for document vaults, statutory compliance calendars, and account management.',
  },
  '/portal/dashboard': {
    title: 'Practice Overview — Dhanam Accountant Portal',
    description:
      'Accountant and client management console displaying KPI overviews, cash flow metrics, and statutory filing schedules.',
  },
  '/portal/clients': {
    title: 'Client Portfolio Directory — Dhanam Accountant Portal',
    description:
      'Searchable directory of retained business clients, compliance scores, service packages, and ledger statuses.',
  },
  '/portal/documents': {
    title: 'Document Vault & Audit Records — Dhanam Accountant Portal',
    description:
      'Centralized document repository with verified bank statements, sales registers, and filing acknowledgments.',
  },
  '/portal/deadlines': {
    title: 'Statutory Compliance Calendar — Dhanam Accountant Portal',
    description:
      'Comprehensive calendar tracking GST (GSTR-1, 3B), quarterly TDS, and advance tax statutory cutoffs.',
  },
  '/portal/bookkeeping': {
    title: 'Bookkeeping Ledger & Reconciliations — Dhanam Accountant Portal',
    description:
      'Double-entry journal records, debit/credit ledger tracking, and bank reconciliation balances.',
  },
  '/portal/reports': {
    title: 'Management Accounts & Reports — Dhanam Accountant Portal',
    description:
      'Comparative Profit & Loss statements, balance sheets, and aged debtor reports in plain language.',
  },
  '/portal/settings': {
    title: 'Practice Profile & System Settings — Dhanam Accountant Portal',
    description:
      'Configure practice details, reporting periods, currency formats, and display preferences.',
  },
};

/**
 * DocumentTitleHandler:
 * - Updates page <title> and meta description dynamically on route changes
 * - Restores window scroll position to top
 * - Announces route changes for assistive technology
 */
export const DocumentTitleHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll window to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESCRIPTION;

    // Check exact match
    if (ROUTE_CONFIG[location.pathname]) {
      title = ROUTE_CONFIG[location.pathname].title;
      description = ROUTE_CONFIG[location.pathname].description;
    } else if (location.pathname.startsWith('/resources/')) {
      const resourceId = location.pathname.replace('/resources/', '');
      const resource = resourcesData.find((r) => r.id === resourceId);
      if (resource) {
        title = `${resource.title} — ${BASE_TITLE}`;
        description = resource.summary;
      } else {
        title = `Educational Guide — ${BASE_TITLE}`;
      }
    } else {
      title = `Page Not Found — ${BASE_TITLE}`;
      description = 'The requested page could not be located.';
    }

    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [location.pathname]);

  return null;
};
