import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Download, RefreshCw } from 'lucide-react';

export const DashboardCompliance: React.FC = () => {
  const [tab, setTab] = useState<'gst' | 'tds' | 'itr'>('gst');

  const gstFilings = [
    {
      entity: 'Venkata Cotton Ginning Mills LLP',
      gstin: '37AABCV1234F1Z8',
      form: 'GSTR-3B (Sep 2026)',
      dueDate: '20 Oct 2026',
      taxPayable: '₹1,24,500',
      status: 'Ready to Transmit',
    },
    {
      entity: 'Amaravati Health Diagnostics',
      gstin: '37AAACA4567M1Z2',
      form: 'GSTR-3B (Sep 2026)',
      dueDate: '20 Oct 2026',
      taxPayable: '₹48,200',
      status: 'ITC Reconciliation Pending',
    },
    {
      entity: 'Sri Sai Logistics & Warehousing',
      gstin: '37ABCFS9981K1Z4',
      form: 'GSTR-3B (Sep 2026)',
      dueDate: '20 Oct 2026',
      taxPayable: '₹84,000',
      status: 'Client Approval Awaited',
    },
    {
      entity: 'Prakasam Agro Exports Pvt Ltd',
      gstin: '37AADCP7721L1Z9',
      form: 'GSTR-3B (Sep 2026)',
      dueDate: '20 Oct 2026',
      taxPayable: '₹3,12,000',
      status: 'Filed & ARN Generated',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Tax & Statutory Compliance Hub
          </h2>
          <p className="text-sm text-charcoal-muted">
            Track monthly returns, advance tax milestones, and reconciliation health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Sync Portal Status
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Summary Sheet
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
        <button
          onClick={() => setTab('gst')}
          className={`px-4 py-2 text-sm font-semibold rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
            tab === 'gst'
              ? 'bg-forest text-white'
              : 'text-charcoal hover:bg-surface'
          }`}
        >
          GST Returns (GSTR-1 & 3B)
        </button>
        <button
          onClick={() => setTab('tds')}
          className={`px-4 py-2 text-sm font-semibold rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
            tab === 'tds'
              ? 'bg-forest text-white'
              : 'text-charcoal hover:bg-surface'
          }`}
        >
          TDS & TCS (Form 26Q / 24Q)
        </button>
        <button
          onClick={() => setTab('itr')}
          className={`px-4 py-2 text-sm font-semibold rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
            tab === 'itr'
              ? 'bg-forest text-white'
              : 'text-charcoal hover:bg-surface'
          }`}
        >
          Income Tax (AY 2026–27)
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">GSTR-3B September 2026 Filing Queue</CardTitle>
          <p className="text-xs text-charcoal-muted">Statutory cut-off: 20th October 2026 (No extension notified)</p>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-3">Return</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3">Tax Liability</th>
                <th className="py-2.5 px-4">Compliance Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/80">
              {gstFilings.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-charcoal block">{item.entity}</span>
                    <span className="text-[11px] font-mono text-charcoal-muted">{item.gstin}</span>
                  </td>
                  <td className="py-3 px-3 text-charcoal font-medium">{item.form}</td>
                  <td className="py-3 px-3 font-mono text-charcoal-muted">{item.dueDate}</td>
                  <td className="py-3 px-3 font-semibold text-charcoal">{item.taxPayable}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        item.status.includes('Filed')
                          ? 'success'
                          : item.status.includes('Ready')
                          ? 'sage'
                          : 'error'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="secondary" size="sm">
                      Open Verification
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
