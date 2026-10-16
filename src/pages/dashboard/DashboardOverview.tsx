import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  FileCheck2,
  AlertTriangle,
  Receipt,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {

  const stats = [
    {
      title: 'Active Retainer Clients',
      value: '48',
      change: '+4 this quarter',
      icon: Users,
      variant: 'sage' as const,
    },
    {
      title: 'GST Returns (GSTR-3B Due)',
      value: '6 Pending',
      change: 'Due 20th Oct 2026',
      icon: AlertTriangle,
      variant: 'error' as const,
    },
    {
      title: 'ITR Returns Filed (AY 26-27)',
      value: '142',
      change: '88% of target roster',
      icon: FileCheck2,
      variant: 'success' as const,
    },
    {
      title: 'Quarterly Invoiced Retainers',
      value: '₹3,48,000',
      change: '₹42,000 pending receipt',
      icon: Receipt,
      variant: 'neutral' as const,
    },
  ];

  const upcomingDeadlines = [
    {
      date: '20 Oct 2026',
      title: 'GSTR-3B Monthly Return',
      category: 'GST Compliance',
      clientsAffected: '18 Firms',
      status: 'Urgent',
    },
    {
      date: '31 Oct 2026',
      title: 'TDS Return Form 26Q (Q2)',
      category: 'Direct Tax',
      clientsAffected: '24 Entities',
      status: 'In Progress',
    },
    {
      date: '15 Dec 2026',
      title: 'Advance Tax Installment 3',
      category: 'Income Tax',
      clientsAffected: '48 Clients',
      status: 'Scheduled',
    },
  ];

  const recentFilings = [
    {
      client: 'Venkata Cotton Ginning Mills LLP',
      gstin: '37AABCV1234F1Z8',
      service: 'GSTR-1 (September)',
      arn: 'AA3709260019284',
      date: '12 Oct 2026',
      status: 'Filed & Verified',
    },
    {
      client: 'Amaravati Health Diagnostics',
      gstin: '37AAACA4567M1Z2',
      service: 'TDS Q2 Challan 281',
      arn: 'BSR40192839',
      date: '10 Oct 2026',
      status: 'Payment Reconciled',
    },
    {
      client: 'Sri Sai Logistics & Warehousing',
      gstin: '37ABCFS9981K1Z4',
      service: 'GSTR-3B (September)',
      arn: 'Pending ITC 2B Check',
      date: 'Due in 7 days',
      status: 'Pending Verification',
    },
    {
      client: 'Prakasam Agro Exports Pvt Ltd',
      gstin: '37AADCP7721L1Z9',
      service: 'AOC-4 Financial Filing',
      arn: 'SRN: W991827364',
      date: '08 Oct 2026',
      status: 'Filed & Verified',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Chartered Accountant Overview
          </h2>
          <p className="text-sm text-charcoal-muted">
            Managing client ledger reconciliations, tax deadlines, and statutory filings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter Firm Slabs
          </Button>
          <Button variant="primary" size="sm">
            Record New Return
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-charcoal-muted truncate">
                  {stat.title}
                </span>
                <div
                  className={`w-8 h-8 rounded-button flex items-center justify-center shrink-0 ${
                    stat.variant === 'error'
                      ? 'bg-status-error-bg text-status-error'
                      : stat.variant === 'success'
                      ? 'bg-status-success-bg text-status-success'
                      : 'bg-sage text-forest'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-bold text-charcoal tracking-tight font-heading">
                {stat.value}
              </div>

              <p className="mt-1 text-xs text-charcoal-muted flex items-center gap-1">
                {stat.change}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Statutory Timelines & Recent Filings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Filings Ledger */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Statutory Filings</CardTitle>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Live verification status across GST, Direct Tax & MCA portals.
                </p>
              </div>
              <Badge variant="sage" size="sm">Live Feed</Badge>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-4">Client / Entity</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Ack / ARN</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/80">
                  {recentFilings.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface/60 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-charcoal block">{item.client}</span>
                        <span className="text-[11px] font-mono text-charcoal-muted">{item.gstin}</span>
                      </td>
                      <td className="py-3 px-3 text-charcoal">{item.service}</td>
                      <td className="py-3 px-3 font-mono text-charcoal-muted">{item.arn}</td>
                      <td className="py-3 px-3 text-charcoal-muted">{item.date}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={
                            item.status.includes('Filed') || item.status.includes('Reconciled')
                              ? 'success'
                              : 'error'
                          }
                          size="sm"
                        >
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border-subtle flex items-center justify-between text-xs text-charcoal-muted">
              <span>Showing 4 of 48 active client compliance records</span>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Full Filing Ledger
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Statutory Deadlines */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Statutory Deadlines</CardTitle>
                <Clock className="w-4 h-4 text-forest" />
              </div>
              <p className="text-xs text-charcoal-muted">Statutory compliance calendar for October 2026.</p>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {upcomingDeadlines.map((dl, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-button border border-border-subtle bg-surface/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-charcoal">{dl.title}</span>
                    <Badge
                      variant={dl.status === 'Urgent' ? 'error' : 'sage'}
                      size="sm"
                    >
                      {dl.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-forest" />
                      {dl.date}
                    </span>
                    <span>{dl.clientsAffected}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-sage/40 border-sage-dark/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-dark mb-1">
              Internal Verification Notice
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              CBDT utility update v1.4 active. Please confirm JSON hash matching before transmitting Form 3CD audit reports.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
