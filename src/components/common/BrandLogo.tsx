import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showTagline = true,
  size = 'md',
  to = '/',
  className = '',
}) => {
  const markSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Simple vector geometric brand mark */}
      <div
        className={`${markSizes[size]} rounded-button bg-forest flex items-center justify-center shrink-0 shadow-sm border border-forest-dark/40`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          {/* Stylized structural pillars forming a clean 'D' / ledger glyph */}
          <rect x="7" y="6" width="4" height="20" rx="1.5" fill="white" />
          <path
            d="M13 7.5C13 6.67 13.67 6 14.5 6H20C23.87 6 27 9.13 27 13V13C27 16.87 23.87 20 20 20H13V7.5Z"
            fill="#E3EFE7"
          />
          <path
            d="M13 18H19.5C22.54 18 25 20.46 25 23.5V23.5C25 24.88 23.88 26 22.5 26H14.5C13.67 26 13 25.33 13 24.5V18Z"
            fill="white"
            fillOpacity="0.85"
          />
          <circle cx="20" cy="13" r="2" fill="#245C45" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className={`font-bold tracking-tight text-charcoal font-heading ${textSizes[size]}`}>
          Dhanam <span className="font-medium text-forest">Financial</span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-charcoal-muted tracking-tight mt-1">
            Clear Finances. Confident Decisions.
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-label="Dhanam Financial Services — Home"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-button p-0.5 inline-flex"
      >
        {content}
      </Link>
    );
  }

  return content;
};
