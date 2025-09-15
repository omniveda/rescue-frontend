import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  AlertTriangle,
  Users,
  Package,
  Heart,
  DollarSign,
  Shield,
  LogIn,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/login', label: 'Login', icon: LogIn },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
    { path: '/missing', label: 'Missing Persons', icon: Users },
    { path: '/damage', label: 'Damage Report', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/volunteer', label: 'Volunteer', icon: Users },
    { path: '/support', label: 'Support', icon: Heart },
    { path: '/donate', label: 'Donate', icon: DollarSign },
  ];

  const authenticatedNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
    { path: '/missing', label: 'Missing Persons', icon: Users },
    { path: '/damage', label: 'Damage Report', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/volunteer', label: 'Volunteer', icon: Users },
    { path: '/support', label: 'Support', icon: Heart },
    { path: '/donate', label: 'Donate', icon: DollarSign },
    { path: '/admin', label: 'Admin', icon: Shield },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">RCN</span>
            </div>
            <span className="font-bold text-lg">RescueConnect Nexus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="flex items-center space-x-2"
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className="w-full justify-start flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.path}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
