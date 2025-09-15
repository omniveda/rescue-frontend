import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, Camera, Send, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MissingPersonReport = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    personName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    lastSeenTime: '',
    clothing: '',
    physicalDescription: '',
    medicalConditions: '',
    reporterName: '',
    reporterPhone: '',
    reporterRelation: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Missing Person Report Submitted",
      description: "Your missing person report has been submitted and will be immediately distributed to all response teams.",
      variant: "default",
    });
  };

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const relationOptions = ['Family Member', 'Friend', 'Neighbor', 'Colleague', 'Other'];

  return (
    <Card className="border-0 shadow-soft bg-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="h-6 w-6 text-warning" />
          Report Missing Person
        </CardTitle>
        <p className="text-muted-foreground">
          Report a missing or isolated person to mobilize search and rescue efforts immediately.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Missing Person Details */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Missing Person Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="personName">Full Name *</Label>
                <Input
                  id="personName"
                  placeholder="Enter full name"
                  value={formData.personName}
                  onChange={(e) => setFormData({...formData, personName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  placeholder="e.g., 5'8&quot; or 172cm"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 150 lbs or 68 kg"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Last Seen Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Last Seen Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lastSeenLocation">Last Known Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastSeenLocation"
                    placeholder="Enter detailed location"
                    value={formData.lastSeenLocation}
                    onChange={(e) => setFormData({...formData, lastSeenLocation: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastSeenDate">Last Seen Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastSeenDate"
                      type="date"
                      value={formData.lastSeenDate}
                      onChange={(e) => setFormData({...formData, lastSeenDate: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastSeenTime">Approximate Time</Label>
                  <Input
                    id="lastSeenTime"
                    type="time"
                    value={formData.lastSeenTime}
                    onChange={(e) => setFormData({...formData, lastSeenTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Physical Description */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Physical Description</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing Last Worn</Label>
                <Textarea
                  id="clothing"
                  placeholder="Describe clothing, colors, distinctive items..."
                  value={formData.clothing}
                  onChange={(e) => setFormData({...formData, clothing: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="physicalDescription">Physical Features</Label>
                <Textarea
                  id="physicalDescription"
                  placeholder="Hair color, eye color, scars, tattoos, distinctive features..."
                  value={formData.physicalDescription}
                  onChange={(e) => setFormData({...formData, physicalDescription: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions (Important)</Label>
                <Textarea
                  id="medicalConditions"
                  placeholder="Any medical conditions, medications, mental health concerns..."
                  value={formData.medicalConditions}
                  onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Reporter Information */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Reporter Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">Your Name *</Label>
                <Input
                  id="reporterName"
                  placeholder="Full name"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reporterPhone">Your Phone Number *</Label>
                <Input
                  id="reporterPhone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({...formData, reporterPhone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="reporterRelation">Relationship to Missing Person *</Label>
              <Select value={formData.reporterRelation} onValueChange={(value) => setFormData({...formData, reporterRelation: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationOptions.map((relation) => (
                    <SelectItem key={relation} value={relation}>{relation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photos">Recent Photos of Missing Person</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload recent, clear photos to help with identification
              </p>
              <Button variant="outline" type="button">
                Upload Photos
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any other relevant information that might help in the search..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-lg font-semibold bg-warning hover:bg-warning/90">
            <Send className="mr-2 h-5 w-5" />
            Submit Missing Person Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MissingPersonReport;