import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input, Textarea, Select } from '../../components/ui/FormFields';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Tag,
  AlertCircle,
  Shield,
  MessageSquare,
} from 'lucide-react';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  serviceNeeded: string;
  selectedPackage: string;
  preferredContact: string;
  message: string;
  consent: boolean;
}

interface FormErrorsState {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package');
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    businessType: 'proprietorship',
    serviceNeeded: 'monthly-accounts',
    selectedPackage: 'none',
    preferredContact: 'email',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrorsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormDataState | null>(null);

  // Sync query parameters on mount or change
  useEffect(() => {
    if (packageParam) {
      const lower = packageParam.toLowerCase();
      if (['essential', 'growth', 'complete'].includes(lower)) {
        setFormData((prev) => ({
          ...prev,
          selectedPackage: lower,
          serviceNeeded: 'monthly-accounts',
        }));
      }
    } else if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: serviceParam,
      }));
    }
  }, [packageParam, serviceParam]);

  const validateForm = (): boolean => {
    const newErrors: FormErrorsState = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full contact name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Contact name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required so we can reply.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief summary of your accounting or compliance requirements.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your inquiry.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please agree to the privacy and communications policy to submit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Realistic asynchronous local submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });

      // Save to local storage for consultation log
      try {
        const stored = JSON.parse(localStorage.getItem('dhanam_enquiries') || '[]');
        stored.push({
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('dhanam_enquiries', JSON.stringify(stored));
      } catch {
        // localStorage fallback ignored
      }
    }, 600);
  };

  const getPackageBadgeLabel = () => {
    if (formData.selectedPackage === 'essential') return 'Essential Package';
    if (formData.selectedPackage === 'growth') return 'Growth Package';
    if (formData.selectedPackage === 'complete') return 'Complete Package';
    return null;
  };

  const getServiceLabel = (val: string) => {
    const map: Record<string, string> = {
      'monthly-accounts': 'Accounting & Monthly Bookkeeping',
      'tax-filing': 'GST & Income Tax Filing Support',
      'business-compliance': 'Business & Statutory Compliance',
      'financial-consulting': 'Financial Consulting & Cash Flow',
      'financial-reporting': 'Monthly Financial Reporting',
      'document-management': 'Document Organization',
    };
    return map[val] || val;
  };

  const getBusinessLabel = (val: string) => {
    const map: Record<string, string> = {
      proprietorship: 'Sole Proprietorship',
      partnership: 'Partnership / LLP',
      'pvt-ltd': 'Private Limited Company',
      individual: 'Salaried / Professional Practice',
    };
    return map[val] || val;
  };

  return (
    <div className="py-10 sm:py-16 space-y-12 sm:space-y-16">
      <Container>
        <SectionHeading
          kicker="CONSULTATION & INQUIRIES"
          title="Schedule an Accounting Consultation"
          description="Submit your requirements to discuss structured bookkeeping, GST filings, or ongoing financial coordination with our accounting team."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form / Success State */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              <CardHeader className="p-0 pb-6 border-b border-border-subtle">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="sage" size="sm">
                    Consultation Request Form
                  </Badge>
                  {getPackageBadgeLabel() && (
                    <Badge variant="forest" size="sm" icon={<Tag className="w-3 h-3 mr-1" />}>
                      {getPackageBadgeLabel()}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">
                  {submittedData ? 'Inquiry Recorded' : 'Client Consultation Details'}
                </CardTitle>
                <p className="text-xs text-charcoal-muted mt-1">
                  Fields marked with an asterisk (<span className="text-status-error">*</span>) are required.
                </p>
              </CardHeader>

              <CardContent className="p-0 pt-6">
                {submittedData ? (
                  <div className="space-y-6">
                    {/* Success Confirmation Box */}
                    <div className="p-5 rounded-card bg-status-success-bg border border-[#C2E4CD] text-charcoal space-y-2">
                      <div className="flex items-center gap-2 text-status-success font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Consultation Request Recorded</span>
                      </div>
                      <p className="text-xs text-charcoal-muted leading-relaxed">
                        Thank you, <strong className="text-charcoal">{submittedData.name}</strong>. Your consultation details have been received and recorded.
                      </p>
                      <div className="p-3 bg-white/80 rounded border border-[#C2E4CD] text-[11px] text-charcoal space-y-1">
                        <p className="font-semibold text-forest">Confirmation Note:</p>
                        <p className="text-charcoal-muted">
                          Our client coordination team reviews new inquiries within 1 business day. We will reach out via your preferred contact channel.
                        </p>
                      </div>
                    </div>

                    {/* Summary of Submitted Information */}
                    <div className="p-4 rounded-button bg-surface border border-border-subtle text-xs space-y-2.5">
                      <h4 className="font-bold text-charcoal text-xs uppercase tracking-wider">
                        Submitted Inquiry Summary:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-charcoal-muted">
                        <div>
                          <span className="font-semibold text-charcoal block">Contact Name:</span>
                          <span>{submittedData.name}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Email:</span>
                          <span>{submittedData.email}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Phone:</span>
                          <span>{submittedData.phone || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Preferred Method:</span>
                          <span className="capitalize">{submittedData.preferredContact}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Entity Structure:</span>
                          <span>{getBusinessLabel(submittedData.businessType)}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Service Scope:</span>
                          <span>{getServiceLabel(submittedData.serviceNeeded)}</span>
                        </div>
                      </div>
                      {submittedData.selectedPackage !== 'none' && (
                        <div className="pt-2 border-t border-border-subtle/80">
                          <span className="font-semibold text-charcoal block">Selected Package:</span>
                          <span className="capitalize text-forest font-medium">{submittedData.selectedPackage} Package</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-border-subtle/80">
                        <span className="font-semibold text-charcoal block">Inquiry Notes:</span>
                        <p className="text-charcoal-muted italic mt-0.5">"{submittedData.message}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => {
                          setSubmittedData(null);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            businessType: 'proprietorship',
                            serviceNeeded: 'monthly-accounts',
                            selectedPackage: 'none',
                            preferredContact: 'email',
                            message: '',
                            consent: false,
                          });
                        }}
                      >
                        Submit Another Inquiry
                      </Button>
                      <Button to="/packages" variant="ghost" size="md">
                        Review Packages
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Form-level error alert if validation fails */}
                    {Object.keys(errors).length > 0 && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-button bg-status-error-bg border border-[#F5C7C3] flex items-start gap-2.5 text-xs text-status-error"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold">Please correct the highlighted items:</strong>
                          <span>Check the fields below to make sure your name, email, message, and consent are complete.</span>
                        </div>
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        placeholder="e.g. Ramesh Varma"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        error={errors.name}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. ramesh@company.in"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        error={errors.email}
                      />
                    </div>

                    {/* Phone (Optional) & Preferred Contact Method */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        placeholder="e.g. +91 98490 12345"
                        helperText="Provide if you prefer a phone or WhatsApp follow-up."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />

                      <Select
                        label="Preferred Contact Method"
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        options={[
                          { value: 'email', label: 'Email Communication' },
                          { value: 'phone', label: 'Direct Phone Call' },
                          { value: 'whatsapp', label: 'WhatsApp Message' },
                        ]}
                      />
                    </div>

                    {/* Business Entity & Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Business Structure"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        options={[
                          { value: 'proprietorship', label: 'Sole Proprietorship' },
                          { value: 'partnership', label: 'Partnership / LLP' },
                          { value: 'pvt-ltd', label: 'Private Limited Company' },
                          { value: 'individual', label: 'Salaried / Professional Practice' },
                        ]}
                      />

                      <Select
                        label="Primary Service of Interest"
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        options={[
                          { value: 'monthly-accounts', label: 'Accounting & Monthly Bookkeeping' },
                          { value: 'tax-filing', label: 'GST & Income Tax Filing Support' },
                          { value: 'business-compliance', label: 'Business Compliance & Filings' },
                          { value: 'financial-consulting', label: 'Financial Consulting & Cash Flow' },
                          { value: 'financial-reporting', label: 'Monthly Financial Reports' },
                          { value: 'document-management', label: 'Document Organization' },
                        ]}
                      />
                    </div>

                    {/* Package Selector */}
                    <Select
                      label="Package Scope (Optional)"
                      value={formData.selectedPackage}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                      options={[
                        { value: 'none', label: 'Not Sure / Customized Scope' },
                        { value: 'essential', label: 'Essential Package' },
                        { value: 'growth', label: 'Growth Package' },
                        { value: 'complete', label: 'Complete Coordination Package' },
                      ]}
                    />

                    {/* Message */}
                    <Textarea
                      label="Inquiry Details or Accounting Questions"
                      required
                      placeholder="Briefly describe your business, approximate monthly transaction count, software in use, or any upcoming filing deadlines..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      error={errors.message}
                    />

                    {/* Consent Checkbox */}
                    <div className="pt-2">
                      <label htmlFor="privacy-consent-checkbox" className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          id="privacy-consent-checkbox"
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => {
                            setFormData({ ...formData, consent: e.target.checked });
                            if (errors.consent) setErrors({ ...errors, consent: undefined });
                          }}
                          className="w-4 h-4 rounded text-forest focus:ring-forest border-border-subtle mt-0.5"
                        />
                        <span className="text-xs text-charcoal-muted leading-relaxed">
                          I agree to receive communications regarding my consultation request. Submitted details are kept confidential and are not shared with external third parties.<span className="text-status-error ml-1">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1 text-xs text-status-error">{errors.consent}</p>
                      )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-charcoal-muted">
                        Confidential and secure transmission.
                      </span>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Recording Inquiry...' : 'Submit Consultation Request'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Office Contact Details & Privacy Notice */}
          <div className="lg:col-span-5 space-y-6">
            {/* Office Contact Coordinates Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
                <CardTitle className="text-base">Office Contact Details</CardTitle>
                <Badge variant="neutral" size="sm">Head Office</Badge>
              </div>

              <div className="space-y-4 text-xs text-charcoal-muted leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Registered Office Location</strong>
                    <span>Suite 402, Business Towers, Bandar Road (MG Road), Vijayawada, Andhra Pradesh 520010</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Telephone & Desk</strong>
                    <span>Direct: +91 866 247 8890</span>
                    <br />
                    <span>WhatsApp Desk: +91 94401 23456</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Email Address</strong>
                    <span>contact@dhanamfinancial.com</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle flex items-start gap-3">
                  <Clock className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Operating Hours</strong>
                    <span>Monday – Friday: 9:00 AM – 6:00 PM IST</span>
                    <br />
                    <span>Saturday: 9:00 AM – 1:00 PM IST</span>
                    <br />
                    <span>Sunday & Statutory Holidays: Closed</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Privacy & Confidentiality Notice Card */}
            <Card className="p-6 bg-surface border-border-subtle">
              <div className="flex items-center gap-2 text-charcoal font-bold text-xs uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4 text-forest" />
                <span>Confidentiality & Privacy Assurance</span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Information submitted through this form is handled with strict confidentiality by our client advisory team. We do not transmit or sell client records to commercial marketing databases or third-party mailing lists.
              </p>
              <div className="mt-3 pt-3 border-t border-border-subtle text-[11px] text-charcoal-muted">
                <span className="font-semibold text-charcoal">Data Protection: </span>
                All communications are maintained under standard professional non-disclosure practices.
              </div>
            </Card>

            {/* Next Steps Card */}
            <div className="p-5 rounded-card bg-white border border-border-subtle text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-charcoal">
                <MessageSquare className="w-3.5 h-3.5 text-forest" />
                <span>What Happens in Your Consultation?</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                Our consultant reviews your approximate transaction volumes, confirms required statutory filings (GST, TDS, ITR), and provides a formal engagement proposal outlining deliverables and timelines.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
