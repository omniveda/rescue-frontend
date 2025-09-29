import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Package,
  Truck,
  MapPin,
  BarChart3,
  Plus,
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  Check,
  XCircle,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Warehouse,
  ShoppingCart,
  Route,
  Users
} from 'lucide-react';

const ResourceManagerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const resourceStats = [
    {
      title: 'Total Inventory',
      value: '2,847',
      icon: Package,
      color: 'text-primary',
      change: '+12% from last week'
    },
    {
      title: 'In Transit',
      value: '156',
      icon: Truck,
      color: 'text-warning',
      change: '23 deliveries active'
    },
    {
      title: 'Distribution Points',
      value: '23',
      icon: MapPin,
      color: 'text-success',
      change: 'All operational'
    },
    {
      title: 'Efficiency Rate',
      value: '94%',
      icon: BarChart3,
      color: 'text-primary',
      change: '+2% from last month'
    }
  ];

  const inventory = [
    {
      id: 'RES-001',
      name: 'Emergency Food Rations',
      category: 'Food',
      quantity: 1500,
      unit: 'packs',
      location: 'Central Warehouse',
      status: 'Available',
      lastUpdated: '2024-01-15 10:30',
      minThreshold: 200,
      supplier: 'Global Aid Corp'
    },
    {
      id: 'RES-002',
      name: 'Medical Supplies',
      category: 'Medical',
      quantity: 850,
      unit: 'kits',
      location: 'Medical Center',
      status: 'Low Stock',
      lastUpdated: '2024-01-15 09:15',
      minThreshold: 100,
      supplier: 'MedSupply Inc'
    },
    {
      id: 'RES-003',
      name: 'Water Purification Tablets',
      category: 'Water',
      quantity: 3200,
      unit: 'tablets',
      location: 'Central Warehouse',
      status: 'Available',
      lastUpdated: '2024-01-15 08:45',
      minThreshold: 500,
      supplier: 'PureWater Ltd'
    },
    {
      id: 'RES-004',
      name: 'Blankets',
      category: 'Shelter',
      quantity: 75,
      unit: 'pieces',
      location: 'Distribution Center A',
      status: 'Critical',
      lastUpdated: '2024-01-15 11:20',
      minThreshold: 150,
      supplier: 'Comfort Supplies'
    }
  ];

  const resourceRequests = [
    {
      id: 'REQ-001',
      requester: 'Emergency Shelter A',
      resource: 'Emergency Food Rations',
      quantity: 200,
      unit: 'packs',
      priority: 'High',
      status: 'Approved',
      requestedAt: '2024-01-15 08:00',
      approvedAt: '2024-01-15 08:30',
      deliveryLocation: 'Downtown Shelter'
    },
    {
      id: 'REQ-002',
      requester: 'Medical Team Alpha',
      resource: 'Medical Supplies',
      quantity: 50,
      unit: 'kits',
      priority: 'Critical',
      status: 'In Transit',
      requestedAt: '2024-01-14 16:30',
      approvedAt: '2024-01-14 17:00',
      deliveryLocation: 'Field Hospital'
    },
    {
      id: 'REQ-003',
      requester: 'Community Center B',
      resource: 'Water Purification Tablets',
      quantity: 500,
      unit: 'tablets',
      priority: 'Medium',
      status: 'Pending',
      requestedAt: '2024-01-15 10:15',
      approvedAt: null,
      deliveryLocation: 'West Side Community Center'
    }
  ];

  const deliveryLogs = [
    {
      id: 'DEL-001',
      requestId: 'REQ-001',
      resource: 'Emergency Food Rations',
      quantity: 200,
      unit: 'packs',
      destination: 'Downtown Shelter',
      driver: 'John Smith',
      vehicle: 'Truck-001',
      status: 'Delivered',
      departureTime: '2024-01-15 09:00',
      arrivalTime: '2024-01-15 10:30',
      notes: 'Delivered successfully, signed by shelter manager'
    },
    {
      id: 'DEL-002',
      requestId: 'REQ-002',
      resource: 'Medical Supplies',
      quantity: 50,
      unit: 'kits',
      destination: 'Field Hospital',
      driver: 'Sarah Johnson',
      vehicle: 'Van-003',
      status: 'In Transit',
      departureTime: '2024-01-15 11:00',
      arrivalTime: null,
      notes: 'ETA 30 minutes'
    },
    {
      id: 'DEL-003',
      requestId: 'REQ-003',
      resource: 'Water Purification Tablets',
      quantity: 500,
      unit: 'tablets',
      destination: 'West Side Community Center',
      driver: 'Mike Rodriguez',
      vehicle: 'Truck-002',
      status: 'Scheduled',
      departureTime: '2024-01-15 14:00',
      arrivalTime: null,
      notes: 'Scheduled for afternoon delivery'
    }
  ];

  const distributionPoints = [
    {
      id: 'DP-001',
      name: 'Central Warehouse',
      location: 'Downtown District',
      type: 'Warehouse',
      capacity: 5000,
      currentLoad: 2847,
      status: 'Operational',
      contact: 'warehouse@psewa.org',
      lastRestocked: '2024-01-14'
    },
    {
      id: 'DP-002',
      name: 'Distribution Center A',
      location: 'North District',
      type: 'Distribution',
      capacity: 2000,
      currentLoad: 1456,
      status: 'Operational',
      contact: 'dist-a@psewa.org',
      lastRestocked: '2024-01-13'
    },
    {
      id: 'DP-003',
      name: 'Medical Center',
      location: 'East District',
      type: 'Medical',
      capacity: 1500,
      currentLoad: 892,
      status: 'Low Capacity',
      contact: 'medical@psewa.org',
      lastRestocked: '2024-01-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'operational':
      case 'delivered':
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'low stock':
      case 'in transit':
      case 'scheduled':
        return 'bg-warning text-warning-foreground';
      case 'critical':
      case 'out of stock':
        return 'bg-danger text-danger-foreground';
      case 'pending':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-danger text-danger-foreground';
      case 'high':
        return 'bg-emergency text-emergency-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food':
        return 'bg-orange-100 text-orange-800';
      case 'medical':
        return 'bg-red-100 text-red-800';
      case 'water':
        return 'bg-blue-100 text-blue-800';
      case 'shelter':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredRequests = resourceRequests.filter(request => {
    const matchesSearch = request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredDeliveries = deliveryLogs.filter(delivery => {
    const matchesSearch = delivery.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || delivery.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Resource Manager Dashboard</h1>
          <p className="text-muted-foreground">Maintain inventory and manage resource requests and deliveries</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {resourceStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('inventory')}>
                    <Plus className="h-5 w-5" />
                    <span className="text-sm">Add Inventory</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('requests')}>
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-sm">Review Requests</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('deliveries')}>
                    <Truck className="h-5 w-5" />
                    <span className="text-sm">Track Deliveries</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Low Stock Alerts */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Inventory Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-danger/10 rounded-lg">
                      <XCircle className="h-5 w-5 text-danger" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Blankets - Critical Stock</p>
                        <p className="text-xs text-muted-foreground">Only 75 units remaining</p>
                      </div>
                      <Badge className="bg-danger text-danger-foreground">Critical</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Medical Supplies - Low Stock</p>
                        <p className="text-xs text-muted-foreground">850 units remaining</p>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">Low</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Food Rations - Good Stock</p>
                        <p className="text-xs text-muted-foreground">1500 units available</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">Good</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Distribution Points Overview */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Distribution Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {distributionPoints.map((point) => (
                    <div key={point.id} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{point.name}</h4>
                          <p className="text-sm text-muted-foreground">{point.location}</p>
                        </div>
                        <Badge className={getStatusColor(point.status)}>
                          {point.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Capacity:</span>
                          <span>{point.currentLoad}/{point.capacity}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(point.currentLoad / point.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">Last restocked: {point.lastRestocked}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Resource Inventory</CardTitle>
                <div className="flex gap-4 mt-2">
                  <Input
                    placeholder="Search inventory by name, category, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="low stock">Low Stock</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredInventory.map((item) => (
                  <div key={item.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{item.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          <span>•</span>
                          <span>{item.location}</span>
                          <span>•</span>
                          <span>Last updated: {item.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{item.quantity} {item.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Min Threshold</p>
                        <p className="font-medium">{item.minThreshold} {item.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supplier</p>
                        <p className="font-medium">{item.supplier}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Update Stock
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Resource Requests</CardTitle>
                <div className="flex gap-4 mt-2">
                  <Input
                    placeholder="Search requests by requester or resource..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{request.resource}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Requested by: {request.requester}</span>
                          <span>•</span>
                          <span>{request.quantity} {request.unit}</span>
                          <span>•</span>
                          <span>Requested: {request.requestedAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Delivery Location</p>
                      <p className="font-medium">{request.deliveryLocation}</p>
                      {request.approvedAt && (
                        <p className="text-xs text-muted-foreground mt-1">Approved: {request.approvedAt}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {request.status === 'Pending' && (
                        <>
                          <Button size="sm" className="bg-success">
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="bg-danger text-danger-foreground">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <Button size="sm" variant="outline">
                          <Truck className="h-4 w-4 mr-2" />
                          Schedule Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deliveries Tab */}
          <TabsContent value="deliveries">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Delivery Logs</CardTitle>
                <div className="flex gap-4 mt-2">
                  <Input
                    placeholder="Search deliveries by destination, driver, or resource..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{delivery.resource}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Destination: {delivery.destination}</span>
                          <span>•</span>
                          <span>Driver: {delivery.driver}</span>
                          <span>•</span>
                          <span>Vehicle: {delivery.vehicle}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{delivery.quantity} {delivery.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-medium">{delivery.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-medium">{delivery.arrivalTime || 'Pending'}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="font-medium">{delivery.notes}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Route className="h-4 w-4 mr-2" />
                        Track Route
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Log
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceManagerPage;
