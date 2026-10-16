import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'left',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 sm:mb-12 ${
        action ? 'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4' : ''
      } ${className}`}
    >
      <div className={isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}>
        {kicker && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-forest mb-2">
            {kicker}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
