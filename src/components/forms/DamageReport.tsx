import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, MapPin, Camera, Send, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DamageReport = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    damageType: '',
    propertyType: '',
    location: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    estimatedValue: '',
    damageDescription: '',
    causeOfDamage: '',
    insuranceInfo: '',
    emergencyRepairs: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Damage Report Submitted",
      description: "Your damage report has been submitted for assessment and processing.",
      variant: "default",
    });
  };

  const damageTypes = [
    'Structural Damage',
    'Water Damage',
    'Fire Damage',
    'Wind Damage',
    'Flood Damage',
    'Vehicle Damage',
    'Personal Property',
    'Business Property',
    'Agricultural Loss',
    'Infrastructure'
  ];

  const propertyTypes = [
    'Residential Home',
    'Apartment/Condo',
    'Commercial Building',
    'Industrial Facility',
    'Vehicle',
    'Personal Property',
    'Agricultural Property',
    'Public Infrastructure'
  ];

  const damageCauses = [
    'Natural Disaster',
    'Fire',
    'Flood',
    'Storm/Wind',
    'Earthquake',
    'Human-caused',
    'Equipment Failure',
    'Other'
  ];

  return (
    <Card className="border-0 shadow-soft bg-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Home className="h-6 w-6 text-warning" />
          Report Loss & Damage
        </CardTitle>
        <p className="text-muted-foreground">
          Document property damage or losses for assessment, insurance, and recovery assistance.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Damage Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Damage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="damageType">Type of Damage *</Label>
                <Select value={formData.damageType} onValueChange={(value) => setFormData({...formData, damageType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select damage type" />
                  </SelectTrigger>
                  <SelectContent>
                    {damageTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="location">Property Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Full address of damaged property"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Owner Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Property Owner Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Full name"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Phone Number *</Label>
                <Input
                  id="ownerPhone"
                  type="tel"
                  placeholder="Contact phone number"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="ownerEmail">Email Address</Label>
              <Input
                id="ownerEmail"
                type="email"
                placeholder="Email address"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
              />
            </div>
          </div>

          {/* Damage Details */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Damage Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="damageDescription">Detailed Description of Damage *</Label>
                <Textarea
                  id="damageDescription"
                  placeholder="Describe the extent of damage, affected areas, structural issues..."
                  value={formData.damageDescription}
                  onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="causeOfDamage">Cause of Damage *</Label>
                  <Select value={formData.causeOfDamage} onValueChange={(value) => setFormData({...formData, causeOfDamage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cause" />
                    </SelectTrigger>
                    <SelectContent>
                      {damageCauses.map((cause) => (
                        <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value of Damage</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="estimatedValue"
                      type="number"
                      placeholder="0.00"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyRepairs">Emergency Repairs Needed</Label>
                <Textarea
                  id="emergencyRepairs"
                  placeholder="Describe any immediate repairs needed to prevent further damage..."
                  value={formData.emergencyRepairs}
                  onChange={(e) => setFormData({...formData, emergencyRepairs: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Insurance Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceInfo">Insurance Coverage Details</Label>
              <Textarea
                id="insuranceInfo"
                placeholder="Insurance company, policy number, coverage type, deductible..."
                value={formData.insuranceInfo}
                onChange={(e) => setFormData({...formData, insuranceInfo: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          {/* Photo Documentation */}
          <div className="space-y-2">
            <Label htmlFor="photos">Damage Photos & Documentation *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload photos showing damage from multiple angles, before/after if available
              </p>
              <Button variant="outline" type="button">
                Upload Photos & Documents
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any other relevant information, special circumstances, or requests..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> This report will be used for damage assessment, 
                insurance claims, and determining eligibility for disaster assistance programs. 
                Please provide accurate and complete information.
              </p>
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold bg-warning hover:bg-warning/90">
              <Send className="mr-2 h-5 w-5" />
              Submit Damage Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DamageReport;