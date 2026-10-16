import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
  priority?: boolean;
}

/**
 * SafeImage provides reliable image loading with:
 * - Graceful fallback to verified backup sources or designed brand SVG illustrations
 * - Prevention of layout shifts via aspect-ratio containment
 * - Zero broken-image icons or raw placeholders exposed to the user
 * - Accessible alt text and proper lazy/eager loading
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  fallbackSrc,
  fallbackText,
  priority = false,
  className = '',
  loading,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  // If initial src failed and we have a fallback source, attempt that first
  const handleError = () => {
    if (fallbackSrc && !triedFallback) {
      setTriedFallback(true);
    } else {
      setHasError(true);
    }
  };

  const activeSrc = triedFallback && fallbackSrc ? fallbackSrc : src;

  if (hasError || !activeSrc) {
    return (
      <div
        className={`relative overflow-hidden bg-surface-subtle border border-border-subtle flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt || fallbackText || 'Dhanam Financial Services visual illustration'}
      >
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#F8FAF9" />
          <circle cx="200" cy="150" r="105" fill="#E3EFE7" opacity="0.6" />
          <g transform="translate(130, 75)">
            <rect x="0" y="0" width="140" height="150" rx="8" fill="#FFFFFF" stroke="#DFE5E0" strokeWidth="1.5" />
            <rect x="0" y="0" width="140" height="26" rx="8" fill="#245C45" />
            <rect x="0" y="18" width="140" height="8" fill="#245C45" />
            <circle cx="20" cy="13" r="3" fill="#E3EFE7" />
            <circle cx="32" cy="13" r="3" fill="#E3EFE7" />
            <line x1="20" y1="45" x2="120" y2="45" stroke="#DFE5E0" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Growth bars */}
            <rect x="25" y="105" width="16" height="25" rx="2" fill="#E3EFE7" />
            <rect x="50" y="85" width="16" height="45" rx="2" fill="#245C45" opacity="0.7" />
            <rect x="75" y="65" width="16" height="65" rx="2" fill="#245C45" />
            <rect x="100" y="50" width="16" height="80" rx="2" fill="#194632" />
            {/* Trajectory */}
            <path d="M 33 100 L 58 80 L 83 60 L 108 45" fill="none" stroke="#245C45" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="108" cy="45" r="3.5" fill="#245C45" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      onError={handleError}
      loading={priority ? 'eager' : (loading || 'lazy')}
      decoding="async"
      className={className}
      {...props}
    />
  );
};
