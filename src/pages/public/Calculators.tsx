import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/FormFields';
import { Badge } from '../../components/ui/Badge';

export const Calculators: React.FC = () => {
  const [income, setIncome] = useState<number>(1200000);
  const [deductions80C, setDeductions80C] = useState<number>(150000);

  // Simplified demo calculator for illustration
  const calculateNewRegimeTax = (gross: number) => {
    // New regime standard deduction: 75,000 (FY 2024-25/2025-26)
    const taxable = Math.max(0, gross - 75000);
    if (taxable <= 300000) return 0;
    if (taxable <= 700000) return (taxable - 300000) * 0.05;
    if (taxable <= 1000000) return 20000 + (taxable - 700000) * 0.10;
    if (taxable <= 1200000) return 50000 + (taxable - 1000000) * 0.15;
    if (taxable <= 1500000) return 80000 + (taxable - 1200000) * 0.20;
    return 140000 + (taxable - 1500000) * 0.30;
  };

  const newTax = calculateNewRegimeTax(income);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container>
        <SectionHeading
          kicker="FINANCIAL ESTIMATORS"
          title="Interactive Tax & Compliance Estimators"
          description="Evaluate preliminary tax estimates under the current Income Tax slabs. Accurate deductions require a thorough review of Form 16, AIS, and capital records."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="sage" size="sm">FY 2025–26 Tax Estimator</Badge>
                  <span className="text-xs text-charcoal-muted">Quick Estimator</span>
                </div>
                <CardTitle>Income Tax Overview (New Regime)</CardTitle>
                <CardDescription>Adjust your estimated gross annual earnings to preview slab distributions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Gross Annual Income (₹)"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value) || 0)}
                  helperText="Include salary, business profits, interest and rent"
                />

                <Input
                  label="Chapter VI-A Deductions (Old Regime only)"
                  type="number"
                  value={deductions80C}
                  onChange={(e) => setDeductions80C(Number(e.target.value) || 0)}
                  helperText="Section 80C, 80D health insurance (applied in full comparative module)"
                />

                <div className="mt-4 p-4 rounded-button bg-surface border border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-xs text-charcoal-muted block">Estimated Tax (Before Cess)</span>
                    <span className="text-2xl font-bold text-forest">₹{newTax.toLocaleString('en-IN')}</span>
                  </div>
                  <Badge variant="success" className="self-start sm:self-auto">Standard Deduction ₹75,000 factored</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="p-6 rounded-card bg-white border border-border-subtle space-y-4">
              <h3 className="font-semibold text-charcoal text-base">Key Compliance Notice</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                The Indian tax regime allows taxpayers to select between the default New Regime (lower slab rates without exemptions) and the Old Regime (full chapter VI-A and HRA deductions).
              </p>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                For personalized dual-regime optimization, our team evaluates capital gains, 80CCD(1B) NPS contributions, home loan interest (Sec 24), and business presumptive taxation under Section 44AD/44ADA during consultation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
