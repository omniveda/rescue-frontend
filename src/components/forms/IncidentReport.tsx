import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, MapPin, Camera, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const IncidentReport = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://rescue-backend-67i2.onrender.com/api/incident-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Incident Report Submitted",
          description: "Your incident report has been received and is being processed by our emergency response team.",
          variant: "default",
        });
        // Reset form
        setFormData({
          type: '',
          severity: '',
          location: '',
          description: '',
          contactName: '',
          contactPhone: ''
        });
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Failed to submit incident report. Please try again.",
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

  const incidentTypes = [
    'Fire',
    'Flood',
    'Earthquake',
    'Building Collapse',
    'Medical Emergency',
    'Traffic Accident',
    'Power Outage',
    'Gas Leak',
    'Other'
  ];

  const severityLevels = [
    'Low - Minor incident',
    'Medium - Moderate incident',
    'High - Serious incident',
    'Critical - Life threatening'
  ];

  return (
    <Card className="border-0 shadow-soft bg-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <AlertTriangle className="h-6 w-6 text-emergency" />
          Report Incident
        </CardTitle>
        <p className="text-muted-foreground">
          Provide details about the emergency or incident requiring immediate attention.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Incident Type */}
          <div className="space-y-2">
            <Label htmlFor="incident-type">Incident Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                {incidentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level *</Label>
            <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity level" />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Enter location or address"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the incident..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your Name *</Label>
              <Input
                id="contact-name"
                placeholder="Full name"
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number *</Label>
              <Input
                id="contact-phone"
                placeholder="Phone number"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label htmlFor="media">Photos/Videos (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload photos or videos to help responders assess the situation
              </p>
              <Button variant="outline" type="button">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-lg font-semibold bg-emergency hover:bg-emergency/90">
            <Send className="mr-2 h-5 w-5" />
            Submit Incident Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentReport;