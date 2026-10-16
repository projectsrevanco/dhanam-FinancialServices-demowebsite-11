import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, AlertCircle } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16">
      <Container size="sm">
        <Card className="p-8 sm:p-12 text-center bg-white border border-border-subtle shadow-md">
          <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center text-forest mx-auto mb-4 border border-sage-dark/60">
            <AlertCircle className="w-7 h-7" />
          </div>

          <Badge variant="neutral" size="sm" className="mb-3">
            Error 404
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-heading">
            Page Not Found
          </h1>

          <p className="mt-3 text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
            The page you requested could not be located. It may have been moved, renamed, or you may have followed an outdated link.
          </p>

          <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-3">
            <Button
              to="/"
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Home Page
            </Button>

            <Button
              to="/portal"
              variant="secondary"
              size="md"
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Access Client Portal
            </Button>
          </div>

          <div className="mt-6 text-xs text-charcoal-muted">
            <span>Looking for our services? </span>
            <Link to="/services" className="text-forest font-semibold hover:underline">
              View Services Catalog
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};
