import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-charcoal">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-white focus:rounded-button focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest font-semibold text-xs transition-transform"
      >
        Skip to main content
      </a>
      <PublicHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
