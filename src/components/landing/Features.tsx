import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Users, 
  Package, 
  Shield, 
  MessageSquare, 
  BarChart3,
  Heart,
  MapPin,
  Phone
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Incident Reporting',
      description: 'Real-time incident reporting with location tracking, media uploads, and automated verification processes.',
      color: 'text-emergency'
    },
    {
      icon: Users,
      title: 'People Tracking',
      description: 'Comprehensive missing person reports, reunification services, and family communication systems.',
      color: 'text-primary'
    },
    {
      icon: Package,
      title: 'Resource Management',
      description: 'Intelligent resource allocation, supply chain coordination, and real-time inventory tracking.',
      color: 'text-success'
    },
    {
      icon: Shield,
      title: 'Volunteer Coordination',
      description: 'Streamlined volunteer registration, task assignment, and skill-based deployment systems.',
      color: 'text-primary'
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'Secure messaging, alert broadcasting, and misinformation control for effective coordination.',
      color: 'text-warning'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Advanced analytics, trend visualization, and data-driven decision support tools.',
      color: 'text-primary'
    },
    {
      icon: Heart,
      title: 'Mental Health Support',
      description: 'Integrated mental health resources, support request systems, and professional helplines.',
      color: 'text-emergency'
    },
    {
      icon: MapPin,
      title: 'GIS Integration',
      description: 'Advanced mapping, geofencing, evacuation route planning, and spatial analysis capabilities.',
      color: 'text-success'
    },
    {
      icon: Phone,
      title: '24/7 Emergency Line',
      description: 'Round-the-clock emergency hotline with multilingual support and priority routing.',
      color: 'text-warning'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Comprehensive Crisis Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrated modules working together to provide complete disaster response capabilities 
            from initial incident to full recovery coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-strong transition-all duration-300 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;