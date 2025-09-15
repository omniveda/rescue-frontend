import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Phone, MessageCircle, Calendar, Users, Clock, AlertTriangle } from 'lucide-react';

const MentalHealthSupport = () => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const emergencyContacts = [
    {
      name: 'Crisis Helpline',
      number: '1-800-273-8255',
      description: '24/7 National Suicide Prevention Lifeline',
      availability: '24/7',
      languages: ['English', 'Spanish']
    },
    {
      name: 'Disaster Mental Health',
      number: '1-800-985-5990',
      description: 'SAMHSA Disaster Distress Helpline',
      availability: '24/7',
      languages: ['English', 'Spanish', 'Multiple']
    },
    {
      name: 'Local Crisis Center',
      number: '(555) 123-4567',
      description: 'Regional crisis intervention services',
      availability: '24/7',
      languages: ['English']
    }
  ];

  const supportServices = [
    {
      title: 'Individual Counseling',
      description: 'One-on-one sessions with licensed therapists',
      duration: '45-60 minutes',
      availability: 'Same day - 48 hours',
      method: 'In-person or Video call'
    },
    {
      title: 'Group Support Sessions',
      description: 'Peer support groups for disaster survivors',
      duration: '90 minutes',
      availability: 'Daily at 2 PM & 7 PM',
      method: 'Community Center or Online'
    },
    {
      title: 'Family Counseling',
      description: 'Support for families dealing with trauma',
      duration: '60-90 minutes',
      availability: 'Within 24 hours',
      method: 'In-person preferred'
    },
    {
      title: 'Child Psychology Services',
      description: 'Specialized support for children and teens',
      duration: '30-45 minutes',
      availability: 'Priority scheduling',
      method: 'Child-friendly environment'
    }
  ];

  const handleRequestSupport = () => {
    setRequestSubmitted(true);
    // Here you would typically send the request to your backend
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Emergency Alert */}
      <Card className="border-emergency bg-emergency/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-emergency mt-1" />
            <div>
              <h3 className="font-semibold text-emergency mb-2">If you're having thoughts of self-harm</h3>
              <p className="text-sm mb-4">
                Please reach out immediately. You are not alone, and help is available 24/7.
              </p>
              <div className="flex gap-3">
                <Button size="sm" className="bg-emergency hover:bg-emergency/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Crisis Line: 988
                </Button>
                <Button size="sm" variant="outline" className="border-emergency text-emergency">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Crisis Text: Text HOME to 741741
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Support */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-emergency" />
              Request Mental Health Support
            </CardTitle>
            <p className="text-muted-foreground">
              Professional mental health services available for disaster survivors and their families.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!requestSubmitted ? (
              <>
                <div className="space-y-3">
                  <Button 
                    onClick={handleRequestSupport}
                    className="w-full h-12 text-lg bg-success hover:bg-success/90"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Request Immediate Support
                  </Button>
                  <Button variant="outline" className="w-full h-10">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Schedule for Later
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What to expect:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Initial screening within 2 hours</li>
                    <li>• Professional counselor assignment</li>
                    <li>• Follow-up care plan</li>
                    <li>• All services are confidential and free</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
                <Heart className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-success mb-2">Support Request Submitted</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A mental health professional will contact you within 2 hours at the number you provided.
                </p>
                <p className="text-xs text-muted-foreground">
                  Reference Number: MH-2024-001234
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              Emergency Mental Health Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-background">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{contact.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {contact.availability}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Languages: </span>
                    <span>{contact.languages.join(', ')}</span>
                  </div>
                  <Button size="sm" className="bg-primary">
                    <Phone className="h-3 w-3 mr-1" />
                    {contact.number}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Available Services */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Available Mental Health Services
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive mental health support services available during and after the emergency.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportServices.map((service, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-background">
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>Duration: {service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>Availability: {service.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3 text-muted-foreground" />
                    <span>Method: {service.method}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Self-Care Resources */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Self-Care Resources</CardTitle>
          <p className="text-muted-foreground">
            Immediate coping strategies and self-care techniques for managing stress and anxiety.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-medium mb-2">Breathing Exercises</h4>
              <p className="text-sm text-muted-foreground">
                Practice deep breathing to reduce anxiety and promote calm.
              </p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg">
              <h4 className="font-medium mb-2">Grounding Techniques</h4>
              <p className="text-sm text-muted-foreground">
                Use 5-4-3-2-1 method to connect with your immediate environment.
              </p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg">
              <h4 className="font-medium mb-2">Stay Connected</h4>
              <p className="text-sm text-muted-foreground">
                Reach out to family, friends, or support groups regularly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthSupport;