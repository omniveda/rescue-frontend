import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  DollarSign, 
  CreditCard, 
  Receipt, 
  Users,
  Package,
  Home,
  Stethoscope
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DonationPortal = () => {
  const { toast } = useToast();
  const [donationType, setDonationType] = useState('monetary');
  const [formData, setFormData] = useState({
    amount: '',
    frequency: 'one-time',
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    anonymous: false,
    designation: '',
    message: '',
    paymentMethod: 'credit-card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donation Submitted",
      description: "Thank you for your generous donation. You will receive a receipt confirmation shortly.",
      variant: "default",
    });
  };

  const donationCategories = [
    {
      id: 'emergency-relief',
      title: 'Emergency Relief Fund',
      description: 'Immediate response and rescue operations',
      icon: Heart,
      urgency: 'Critical Need'
    },
    {
      id: 'medical-supplies',
      title: 'Medical Supplies',
      description: 'First aid, medications, and medical equipment',
      icon: Stethoscope,
      urgency: 'High Priority'
    },
    {
      id: 'shelter-housing',
      title: 'Shelter & Housing',
      description: 'Temporary and permanent housing solutions',
      icon: Home,
      urgency: 'Immediate Need'
    },
    {
      id: 'food-water',
      title: 'Food & Water',
      description: 'Essential nutrition and clean water supplies',
      icon: Package,
      urgency: 'Critical Need'
    }
  ];

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/10 to-success/10">
        <CardContent className="p-8 text-center">
          <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Support Disaster Relief Efforts</h1>
          <p className="text-lg text-muted-foreground">
            Your donation directly supports emergency response, rescue operations, and recovery efforts.
          </p>
        </CardContent>
      </Card>

      {/* Donation Categories */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Where Your Donation Goes</CardTitle>
          <p className="text-muted-foreground">
            Choose a specific area to support or contribute to the general emergency fund.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donationCategories.map((category) => (
              <div 
                key={category.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.designation === category.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData({...formData, designation: category.id})}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{category.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <span className="text-xs px-2 py-1 bg-emergency/10 text-emergency rounded-full">
                      {category.urgency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Donation Form */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-success" />
            Make a Donation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donation Amount */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Donation Amount *</Label>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount.toString() ? "default" : "outline"}
                    className="h-12"
                    onClick={() => setFormData({...formData, amount: amount.toString()})}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="pl-10"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="space-y-2">
                <Label htmlFor="frequency">Donation Frequency</Label>
                <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time Donation</SelectItem>
                    <SelectItem value="monthly">Monthly Recurring</SelectItem>
                    <SelectItem value="quarterly">Quarterly Recurring</SelectItem>
                    <SelectItem value="annually">Annual Recurring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Donor Information */}
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Donor Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donorName">Full Name *</Label>
                  <Input
                    id="donorName"
                    placeholder="Your full name"
                    value={formData.donorName}
                    onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorEmail">Email Address *</Label>
                  <Input
                    id="donorEmail"
                    type="email"
                    placeholder="Your email address"
                    value={formData.donorEmail}
                    onChange={(e) => setFormData({...formData, donorEmail: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="donorPhone">Phone Number (Optional)</Label>
                <Input
                  id="donorPhone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.donorPhone}
                  onChange={(e) => setFormData({...formData, donorPhone: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="anonymous"
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => setFormData({...formData, anonymous: checked as boolean})}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Payment Method</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.paymentMethod === 'credit-card' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setFormData({...formData, paymentMethod: 'credit-card'})}
                >
                  <CreditCard className="h-6 w-6 text-primary mb-2" />
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-muted-foreground">Visa, MasterCard, American Express</div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.paymentMethod === 'bank-transfer' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setFormData({...formData, paymentMethod: 'bank-transfer'})}
                >
                  <Receipt className="h-6 w-6 text-primary mb-2" />
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm text-muted-foreground">Direct bank transfer</div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                >
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-muted-foreground">PayPal account</div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Leave a message of support or dedication..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Tax Information:</strong> Your donation is tax-deductible to the extent allowed by law. 
                  You will receive a receipt for your records within 24 hours.
                </p>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold bg-success hover:bg-success/90">
                <Heart className="mr-2 h-5 w-5" />
                Donate ${formData.amount || '0'}
                {formData.frequency !== 'one-time' && ` ${formData.frequency}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Impact Information */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-primary mb-2">$25</div>
              <div className="text-sm text-muted-foreground">Provides emergency meals for 5 people</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-success mb-2">$100</div>
              <div className="text-sm text-muted-foreground">Supplies basic medical kit for rescue team</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-warning mb-2">$250</div>
              <div className="text-sm text-muted-foreground">Provides temporary shelter for a family</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationPortal;