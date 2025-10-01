import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logo from "@/assets/punjab_sewa_logo.jpg";
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
  const { user } = useAuth();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
    { path: '/missing', label: 'Missing Persons', icon: Users },
    { path: '/damage', label: 'Damage Report', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/volunteer', label: 'Volunteer', icon: Users },
    { path: '/support', label: 'Support', icon: Heart },
    { path: '/donate', label: 'Donate', icon: DollarSign },
    { path: '/login', label: 'Login', icon: LogIn },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin', icon: Shield },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
  ];

  const volunteerNavItems = [
    { path: '/volunteer', label: 'Volunteer Dashboard', icon: Users },
    // { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
    { path: '/missing', label: 'Missing Persons', icon: Users },
    { path: '/damage', label: 'Damage Report', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/support', label: 'Support', icon: Heart },
    { path: '/donate', label: 'Donate', icon: DollarSign },
  ];

  const citizenNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
    { path: '/missing', label: 'Missing Persons', icon: Users },
    { path: '/damage', label: 'Damage Report', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/support', label: 'Support', icon: Heart },
    { path: '/donate', label: 'Donate', icon: DollarSign },
  ];

  const counselorNavItems = [
    { path: '/counselor', label: 'Counselor Dashboard', icon: Heart },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/support', label: 'Support Requests', icon: Heart },
  ];

  const donorNavItems = [
    { path: '/donor', label: 'Donor Dashboard', icon: DollarSign },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/donate', label: 'Make Donation', icon: DollarSign },
  ];

  const auditorNavItems = [
    { path: '/auditor', label: 'System Audit', icon: Shield },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
  ];

  const incidentManagerNavItems = [
    { path: '/incident-manager', label: 'Incident Management', icon: AlertTriangle },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/report', label: 'Report Incident', icon: AlertTriangle },
  ];

  const resourceManagerNavItems = [
    { path: '/resource-manager', label: 'Resource Management', icon: Package },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/resources', label: 'Request Resources', icon: Package },
  ];

  const shelterManagerNavItems = [
    { path: '/shelter-manager', label: 'Shelter Management', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
  ];

  const communicationOfficerNavItems = [
    { path: '/communication-officer', label: 'Communication Hub', icon: Users },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
  ];

  // Determine navigation items based on user role
  const getNavItems = () => {
    if (!isAuthenticated) return publicNavItems;

    switch (user?.role) {
      case 'admin':
        return adminNavItems;
      case 'volunteer':
        return volunteerNavItems;
      case 'citizen':
        return citizenNavItems;
      case 'mental_health_counselor':
        return counselorNavItems;
      case 'donor':
        return donorNavItems;
      case 'system_auditor':
        return auditorNavItems;
      case 'incident_manager':
        return incidentManagerNavItems;
      case 'logistics_coordinator':
        return resourceManagerNavItems;
      case 'shelter_manager':
        return shelterManagerNavItems;
      case 'communication_officer':
        return communicationOfficerNavItems;
      default:
        return citizenNavItems; // Default to citizen navigation
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-[#ebeadf] border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="" className='h-10 w-12' />
            <span className="font-bold text-lg">Punjab Sewa</span>
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
