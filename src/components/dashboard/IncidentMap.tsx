import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Users, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const IncidentMap = () => {
  const { user, token } = useAuth();
  const [activeIncidents, setActiveIncidents] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin' && token) {
      fetch('https://rescue-backend-67i2.onrender.com//api/dashboard/incidents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          console.log('Response status:', res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Fetched incidents:', data);
          setActiveIncidents(data.map((incident, index) => ({
            id: incident._id,
            type: incident.type,
            location: incident.location,
            priority: incident.severity,
            status: incident.status,
            responders: incident.assignedTo ? 1 : 0, // Simplified
            affected: 0 // Not available in model
          })));
        })
        .catch(err => {
          console.error('Error fetching incidents:', err);
          // Fallback to fake data if error
          setActiveIncidents([
            {
              id: 'INC-001',
              type: 'Flood',
              location: 'Downtown District',
              priority: 'High',
              status: 'Active',
              responders: 12,
              affected: 45
            },
            {
              id: 'INC-002',
              type: 'Building Collapse',
              location: 'Industrial Zone',
              priority: 'Critical',
              status: 'Responding',
              responders: 8,
              affected: 12
            },
            {
              id: 'INC-003',
              type: 'Fire',
              location: 'Residential Area',
              priority: 'Medium',
              status: 'Contained',
              responders: 6,
              affected: 23
            }
          ]);
        });
    } else {
      // Fallback to fake data for non-admins
      setActiveIncidents([
        {
          id: 'INC-001',
          type: 'Flood',
          location: 'Downtown District',
          priority: 'High',
          status: 'Active',
          responders: 12,
          affected: 45
        },
        {
          id: 'INC-002',
          type: 'Building Collapse',
          location: 'Industrial Zone',
          priority: 'Critical',
          status: 'Responding',
          responders: 8,
          affected: 12
        },
        {
          id: 'INC-003',
          type: 'Fire',
          location: 'Residential Area',
          priority: 'Medium',
          status: 'Contained',
          responders: 6,
          affected: 23
        }
      ]);
    }
  }, [user, token]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-emergency text-emergency-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Map Placeholder */}
      <Card className="border-0 shadow-soft bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Incident Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-success/20"></div>
            <div className="relative z-10 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map showing real-time incidents</p>
            </div>
            
            {/* Mock incident markers */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emergency rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-warning rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>

      {/* Active Incidents List */}
      <Card className="border-0 shadow-soft bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-emergency" />
            Active Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeIncidents.map((incident) => (
            <div key={incident.id} className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{incident.type}</h4>
                  <p className="text-sm text-muted-foreground">{incident.location}</p>
                </div>
                <Badge className={getPriorityColor(incident.priority)}>
                  {incident.priority}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{incident.responders} responders</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{incident.affected} affected</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentMap;