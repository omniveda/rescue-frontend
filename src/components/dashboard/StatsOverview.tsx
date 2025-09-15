import React from 'react';
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

const StatsOverview = () => {
  const stats = [
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
      title: 'People Rescued',
      value: '847',
      change: '+156',
      trend: 'up',
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Resources Deployed',
      value: '234',
      change: '0',
      trend: 'stable',
      icon: Package,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Active Volunteers',
      value: '89',
      change: '-12',
      trend: 'down',
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

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