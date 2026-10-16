import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const describedBy = error
      ? `${inputId}-error`
      : helperText
      ? `${inputId}-helper`
      : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-status-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-charcoal-muted pointer-events-none flex items-center" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={`w-full bg-white text-charcoal text-sm rounded-button border transition-colors duration-150 py-2.5 ${
              leftIcon ? 'pl-9' : 'pl-3.5'
            } ${rightIcon ? 'pr-9' : 'pr-3.5'} ${
              error
                ? 'border-status-error focus-visible:ring-status-error focus-visible:border-status-error'
                : 'border-border-subtle hover:border-border-strong focus-visible:border-forest focus-visible:ring-forest'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:bg-surface disabled:text-charcoal-muted disabled:border-border-subtle disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-charcoal-muted pointer-events-none flex items-center" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="mt-1 text-xs text-status-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-charcoal-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, disabled, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const describedBy = error
      ? `${textareaId}-error`
      : helperText
      ? `${textareaId}-helper`
      : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-status-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full bg-white text-charcoal text-sm rounded-button border transition-colors duration-150 p-3 min-h-[96px] ${
            error
              ? 'border-status-error focus-visible:ring-status-error focus-visible:border-status-error'
              : 'border-border-subtle hover:border-border-strong focus-visible:border-forest focus-visible:ring-forest'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:bg-surface disabled:text-charcoal-muted disabled:border-border-subtle disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} role="alert" className="mt-1 text-xs text-status-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="mt-1 text-xs text-charcoal-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, children, className = '', id, disabled, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const describedBy = error
      ? `${selectId}-error`
      : helperText
      ? `${selectId}-helper`
      : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-status-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full bg-white text-charcoal text-sm rounded-button border transition-colors duration-150 py-2.5 px-3.5 ${
            error
              ? 'border-status-error focus-visible:ring-status-error focus-visible:border-status-error'
              : 'border-border-subtle hover:border-border-strong focus-visible:border-forest focus-visible:ring-forest'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:bg-surface disabled:text-charcoal-muted disabled:border-border-subtle disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p id={`${selectId}-error`} role="alert" className="mt-1 text-xs text-status-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1 text-xs text-charcoal-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
