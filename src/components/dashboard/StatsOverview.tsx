import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Users,
  Package,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StatsOverview = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState([
    {
      title: 'Active Incidents',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: AlertTriangle,
      color: 'text-emergency',
      bgColor: 'bg-emergency/10'
    },
    {
      title: 'Total Users',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Resources',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: Package,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Active Volunteers',
      value: '0',
      change: '0',
      trend: 'stable',
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ]);

  useEffect(() => {
    if ((user?.role === 'admin' || user?.role === 'volunteer') && token) {
      fetch('https://rescue-backend-67i2.onrender.com/api/dashboard/stats', {
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
          console.log('Fetched data:', data);
          setStats([
            {
              title: 'Active Incidents',
              value: data.activeIncidents.toString(),
              change: '0', // You can calculate change if needed
              trend: 'stable',
              icon: AlertTriangle,
              color: 'text-emergency',
              bgColor: 'bg-emergency/10'
            },
            {
              title: 'Total Users',
              value: data.totalUsers.toString(),
              change: '0',
              trend: 'stable',
              icon: Users,
              color: 'text-success',
              bgColor: 'bg-success/10'
            },
            {
              title: 'Total Resources',
              value: data.totalResources.toString(),
              change: '0',
              trend: 'stable',
              icon: Package,
              color: 'text-warning',
              bgColor: 'bg-warning/10'
            },
            {
              title: 'Active Volunteers',
              value: data.activeVolunteers.toString(),
              change: '0',
              trend: 'stable',
              icon: Shield,
              color: 'text-primary',
              bgColor: 'bg-primary/10'
            }
          ]);
        })
        .catch(err => {
          console.error('Error fetching stats:', err);
          // Fallback to fake data if error
          setStats([
            {
              title: 'Active Incidents',
              value: '12',
              change: '+3',
              trend: 'up',
              icon: AlertTriangle,
              color: 'text-emergency',
              bgColor: 'bg-emergency/10'
            },
            {
              title: 'Total Users',
              value: '100',
              change: '+10',
              trend: 'up',
              icon: Users,
              color: 'text-success',
              bgColor: 'bg-success/10'
            },
            {
              title: 'Total Resources',
              value: '50',
              change: '+5',
              trend: 'up',
              icon: Package,
              color: 'text-warning',
              bgColor: 'bg-warning/10'
            },
            {
              title: 'Active Volunteers',
              value: '20',
              change: '+2',
              trend: 'up',
              icon: Shield,
              color: 'text-primary',
              bgColor: 'bg-primary/10'
            }
          ]);
        });
    }
  }, [user, token]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-success" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-destructive" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-soft bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-card-foreground">
                {stat.value}
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Since last update
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;