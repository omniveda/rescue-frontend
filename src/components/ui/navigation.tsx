import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Package, 
  Phone,
  BarChart3,
  Settings
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const navItems = [
    { icon: Shield, label: 'Dashboard', active: true },
    { icon: AlertTriangle, label: 'Incidents' },
    { icon: Users, label: 'People Tracking' },
    { icon: Package, label: 'Resources' },
    { icon: Phone, label: 'Support' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "default" : "ghost"}
          className={cn(
            "justify-start gap-3 h-12",
            item.active && "bg-primary text-primary-foreground shadow-soft"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default Navigation;