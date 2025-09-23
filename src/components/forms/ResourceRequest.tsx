import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, MapPin, Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ResourceRequest = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    resourceType: '',
    category: '',
    quantity: '',
    urgency: '',
    deliveryLocation: '',
    contactName: '',
    contactPhone: '',
    organization: '',
    peopleAffected: '',
    specificItems: '',
    justification: '',
    alternativeContact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://rescue-backend-67i2.onrender.com//api/resource-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          peopleAffected: parseInt(formData.peopleAffected) || 0
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Resource Request Submitted",
          description: "Your resource request has been submitted and will be prioritized based on urgency and availability.",
          variant: "default",
        });
        // Reset form
        setFormData({
          resourceType: '',
          category: '',
          quantity: '',
          urgency: '',
          deliveryLocation: '',
          contactName: '',
          contactPhone: '',
          organization: '',
          peopleAffected: '',
          specificItems: '',
          justification: '',
          alternativeContact: ''
        });
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Failed to submit resource request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to connect to the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resourceTypes = [
    'Food & Water',
    'Medical Supplies',
    'Shelter Materials',
    'Clothing & Bedding',
    'Tools & Equipment',
    'Communication Equipment',
    'Transportation',
    'Fuel & Generators',
    'Emergency Lighting',
    'First Aid Supplies'
  ];

  const categoryOptions = [
    'Essential Supplies',
    'Medical Emergency',
    'Shelter & Housing',
    'Search & Rescue Equipment',
    'Communication Tools',
    'Transportation Needs',
    'Special Needs Support'
  ];

  const urgencyLevels = [
    'Critical - Life threatening',
    'High - Within 4 hours',
    'Medium - Within 24 hours',
    'Low - Within 48 hours'
  ];

  return (
    <Card className="border-0 shadow-soft bg-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Package className="h-6 w-6 text-success" />
          Request Resources
        </CardTitle>
        <p className="text-muted-foreground">
          Submit a request for essential resources, supplies, or equipment needed for emergency response.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Details */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Resource Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resourceType">Resource Type *</Label>
                <Select value={formData.resourceType} onValueChange={(value) => setFormData({...formData, resourceType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity/Amount *</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 50 units, 100 liters, 20 people"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="specificItems">Specific Items Needed</Label>
              <Textarea
                id="specificItems"
                placeholder="List specific items, brands, quantities, specifications..."
                value={formData.specificItems}
                onChange={(e) => setFormData({...formData, specificItems: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          {/* Delivery & Contact Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Delivery & Contact Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deliveryLocation"
                    placeholder="Detailed delivery address or coordinates"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Primary Contact Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="Full name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Primary Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization/Agency</Label>
                  <Input
                    id="organization"
                    placeholder="Organization name"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternativeContact">Alternative Contact</Label>
                  <Input
                    id="alternativeContact"
                    type="tel"
                    placeholder="Backup contact number"
                    value={formData.alternativeContact}
                    onChange={(e) => setFormData({...formData, alternativeContact: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Justification */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Impact & Justification</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="peopleAffected">Number of People Affected *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="peopleAffected"
                    type="number"
                    placeholder="Number of individuals impacted"
                    value={formData.peopleAffected}
                    onChange={(e) => setFormData({...formData, peopleAffected: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Request Justification *</Label>
                <Textarea
                  id="justification"
                  placeholder="Explain why these resources are needed, current situation, and how they will be used..."
                  value={formData.justification}
                  onChange={(e) => setFormData({...formData, justification: e.target.value})}
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> All resource requests are reviewed and prioritized based on urgency, 
                availability, and operational capacity. You will receive updates on your request status 
                via phone and email.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-success hover:bg-success/90 disabled:opacity-50"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Resource Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResourceRequest;