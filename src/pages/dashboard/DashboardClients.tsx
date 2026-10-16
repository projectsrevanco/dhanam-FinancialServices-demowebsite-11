import React, { useState } from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormFields';
import { Search, Plus, ExternalLink } from 'lucide-react';

export const DashboardClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 'CL-101',
      name: 'Venkata Cotton Ginning Mills LLP',
      pan: 'AABCV1234F',
      gstin: '37AABCV1234F1Z8',
      contact: 'P. Venkata Rao',
      phone: '+91 94401 23456',
      type: 'LLP',
      retainer: '₹6,500/mo',
      status: 'Active',
      complianceScore: '98%',
    },
    {
      id: 'CL-102',
      name: 'Amaravati Health Diagnostics Pvt Ltd',
      pan: 'AAACA4567M',
      gstin: '37AAACA4567M1Z2',
      contact: 'Dr. S. K. Murthy',
      phone: '+91 98480 34567',
      type: 'Pvt Ltd',
      retainer: '₹12,000/mo',
      status: 'Active',
      complianceScore: '100%',
    },
    {
      id: 'CL-103',
      name: 'Sri Sai Logistics & Warehousing',
      pan: 'ABCFS9981K',
      gstin: '37ABCFS9981K1Z4',
      contact: 'G. Nageswara Rao',
      phone: '+91 99890 45678',
      type: 'Proprietorship',
      retainer: '₹3,500/mo',
      status: 'Notice Received',
      complianceScore: '85%',
    },
    {
      id: 'CL-104',
      name: 'Prakasam Agro Exports Pvt Ltd',
      pan: 'AADCP7721L',
      gstin: '37AADCP7721L1Z9',
      contact: 'K. Subrahmanyam',
      phone: '+91 94412 56789',
      type: 'Pvt Ltd',
      retainer: '₹14,000/mo',
      status: 'Active',
      complianceScore: '95%',
    },
    {
      id: 'CL-105',
      name: 'Krishna Dental & Orthodontic Clinic',
      pan: 'AJIPK3342E',
      gstin: '37AJIPK3342E1Z5',
      contact: 'Dr. Radhika K.',
      phone: '+91 98499 67890',
      type: 'Professional',
      retainer: '₹2,500/mo',
      status: 'Active',
      complianceScore: '100%',
    },
  ];

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-heading">
            Client Portfolio & Ledgers
          </h2>
          <p className="text-sm text-charcoal-muted">
            Directory of 48 retained corporate and proprietary entities.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add New Client File
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search by Firm, GSTIN or PAN..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-xs text-charcoal-muted">
            Displaying {filtered.length} matched records
          </span>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y border-border-subtle bg-surface text-charcoal-muted uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Client Entity</th>
                <th className="py-2.5 px-3">Tax Identifiers</th>
                <th className="py-2.5 px-3">Primary Contact</th>
                <th className="py-2.5 px-3">Structure</th>
                <th className="py-2.5 px-3">Retainer</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/80">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-surface/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-charcoal block">{client.name}</span>
                    <span className="text-[11px] text-charcoal-muted font-mono">{client.id}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-mono text-[11px] text-charcoal">GST: {client.gstin}</div>
                    <div className="font-mono text-[10px] text-charcoal-muted">PAN: {client.pan}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-charcoal font-medium">{client.contact}</div>
                    <div className="text-charcoal-muted text-[11px]">{client.phone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="neutral" size="sm">{client.type}</Badge>
                  </td>
                  <td className="py-3 px-3 font-semibold text-forest">{client.retainer}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={client.status === 'Active' ? 'success' : 'error'}
                      size="sm"
                    >
                      {client.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                      Ledger
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
