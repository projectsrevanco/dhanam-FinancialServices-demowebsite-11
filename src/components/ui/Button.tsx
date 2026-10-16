import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export type ButtonProps = CommonProps &
  (
    | ({ to: string; disabled?: boolean; onClick?: () => void } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ to?: undefined; disabled?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    leftIcon,
    rightIcon,
    disabled = false,
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 select-none active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-forest text-white hover:bg-forest-dark active:bg-[#123626] border border-transparent shadow-sm',
    secondary:
      'bg-white text-charcoal border border-border-subtle hover:bg-surface hover:border-border-strong active:bg-sage/40 shadow-sm',
    subtle:
      'bg-sage text-forest-dark border border-transparent hover:bg-sage-dark active:bg-[#BED6C7]',
    ghost:
      'bg-transparent text-charcoal hover:bg-surface-subtle active:bg-sage/20 border border-transparent',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ('to' in props && props.to) {
    const { to, onClick, ...restAnchorProps } = props as {
      to: string;
      onClick?: () => void;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <Link
        to={to}
        className={combinedClasses}
        aria-disabled={disabled}
        onClick={onClick}
        {...restAnchorProps}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  const { to: _to, ...restButtonProps } = props as {
    to?: undefined;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      {...restButtonProps}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
