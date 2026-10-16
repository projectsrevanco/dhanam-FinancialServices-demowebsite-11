import React from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';

export const DashboardInvoicing: React.FC = () => {
  const invoices = [
    {
      invNo: 'DHN/26-27/041',
      client: 'Venkata Cotton Ginning Mills LLP',
      date: '01 Oct 2026',
      service: 'Monthly Accounting & GST Retainer',
      amount: '₹6,500',
      gst: '₹1,170',
      total: '₹7,670',
      status: 'Paid',
    },
    {
      invNo: 'DHN/26-27/042',
      client: 'Amaravati Health Diagnostics Pvt Ltd',
      date: '01 Oct 2026',
      service: 'Corporate Retainer & TDS Audit',
      amount: '₹12,000',
      gst: '₹2,160',
      total: '₹14,160',
      status: 'Paid',
    },
    {
      invNo: 'DHN/26-27/043',
      client: 'Sri Sai Logistics & Warehousing',
      date: '05 Oct 2026',
      service: 'GSTR-3B Filing & Bookkeeping',
      amount: '₹3,500',
      gst: '₹630',
      total: '₹4,130',
      status: 'Pending',
    },
    {
      invNo: 'DHN/26-27/044',
      client: 'Prakasam Agro Exports Pvt Ltd',
      date: '05 Oct 2026',
      service: 'Statutory ROC Compliance Filing Fee',
      amount: '₹14,000',
      gst: '₹2,520',
      total: '₹16,520',
      status: 'Pending',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Invoicing & Retainer Billing
          </h2>
          <p className="text-sm text-charcoal-muted">
            Manage professional fees, GST e-invoices, and retainer receipts.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Generate Fee Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quarter 3 Issued Invoices (FY 2025–26)</CardTitle>
          <p className="text-xs text-charcoal-muted">All invoices raised with 18% SAC 998231 (Accounting and Tax Advisory Services)</p>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Invoice #</th>
                <th className="py-2.5 px-3">Client Entity</th>
                <th className="py-2.5 px-3">Billing Head</th>
                <th className="py-2.5 px-3">Base Fee</th>
                <th className="py-2.5 px-3">Total (Incl GST)</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/80">
              {invoices.map((inv) => (
                <tr key={inv.invNo} className="hover:bg-surface/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-charcoal">{inv.invNo}</td>
                  <td className="py-3 px-3 font-semibold text-charcoal">{inv.client}</td>
                  <td className="py-3 px-3 text-charcoal-muted">{inv.service}</td>
                  <td className="py-3 px-3 font-mono text-charcoal">{inv.amount}</td>
                  <td className="py-3 px-3 font-mono font-bold text-forest">{inv.total}</td>
                  <td className="py-3 px-3">
                    <Badge variant={inv.status === 'Paid' ? 'success' : 'error'} size="sm">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" leftIcon={<Download className="w-3 h-3" />}>
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
