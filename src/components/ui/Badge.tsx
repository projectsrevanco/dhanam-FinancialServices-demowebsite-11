import React from 'react';

export type BadgeVariant = 'sage' | 'neutral' | 'success' | 'error' | 'forest';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sage',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    sage: 'bg-sage text-forest-dark border-sage-dark/60',
    neutral: 'bg-surface-subtle text-charcoal-muted border-border-subtle',
    success: 'bg-status-success-bg text-status-success border-[#C2E4CD]',
    error: 'bg-status-error-bg text-status-error border-[#F5C7C3]',
    forest: 'bg-forest text-white border-forest',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-badge border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
