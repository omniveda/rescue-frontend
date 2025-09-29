import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  DollarSign,
  Receipt,
  TrendingUp,
  Heart,
  Plus,
  Download,
  Eye,
  Calendar,
  Target,
  Users,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

const DonorPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const donorStats = [
    {
      title: 'Total Donated',
      value: '$12,450',
      icon: DollarSign,
      color: 'text-success',
      change: '+15% from last month'
    },
    {
      title: 'This Month',
      value: '$2,350',
      icon: TrendingUp,
      color: 'text-primary',
      change: '+8% from last month'
    },
    {
      title: 'Active Donations',
      value: '12',
      icon: Heart,
      color: 'text-primary',
      change: '3 pending confirmation'
    },
    {
      title: 'Impact Score',
      value: '95/100',
      icon: Target,
      color: 'text-warning',
      change: 'Based on 24 donations'
    }
  ];

  const donationHistory = [
    {
      id: 'DON-2024-001',
      date: '2024-01-15',
      amount: '$500',
      type: 'Monetary',
      category: 'Emergency Relief',
      status: 'Completed',
      receipt: 'REC-2024-001',
      impact: 'Helped 50 families with food supplies'
    },
    {
      id: 'DON-2024-002',
      date: '2024-01-12',
      amount: '$1,200',
      type: 'Monetary',
      category: 'Medical Aid',
      status: 'Processing',
      receipt: null,
      impact: 'Supporting medical supplies distribution'
    },
    {
      id: 'DON-2024-003',
      date: '2024-01-08',
      amount: '$300',
      type: 'In-Kind',
      category: 'Clothing',
      status: 'Completed',
      receipt: 'REC-2024-003',
      impact: 'Provided winter clothing for 75 people'
    },
    {
      id: 'DON-2024-004',
      date: '2024-01-05',
      amount: '$750',
      type: 'Monetary',
      category: 'Shelter Support',
      status: 'Completed',
      receipt: 'REC-2024-004',
      impact: 'Contributed to temporary housing for 25 families'
    }
  ];

  const receipts = [
    {
      id: 'REC-2024-001',
      donationId: 'DON-2024-001',
      date: '2024-01-16',
      amount: '$500',
      taxDeductible: true,
      downloadUrl: '#',
      status: 'Available'
    },
    {
      id: 'REC-2024-003',
      donationId: 'DON-2024-003',
      date: '2024-01-09',
      amount: '$300',
      taxDeductible: true,
      downloadUrl: '#',
      status: 'Available'
    },
    {
      id: 'REC-2024-004',
      donationId: 'DON-2024-004',
      date: '2024-01-06',
      amount: '$750',
      taxDeductible: true,
      downloadUrl: '#',
      status: 'Available'
    }
  ];

  const impactReports = [
    {
      id: 'IMP-2024-001',
      period: 'January 2024',
      totalImpact: '$15,000',
      beneficiaries: 320,
      categories: ['Food', 'Medical', 'Shelter'],
      highlights: [
        'Distributed 2,500 food packages',
        'Provided medical aid to 150 patients',
        'Supported 45 families with temporary housing'
      ]
    },
    {
      id: 'IMP-2024-002',
      period: 'December 2023',
      totalImpact: '$18,500',
      beneficiaries: 410,
      categories: ['Emergency Relief', 'Education', 'Reconstruction'],
      highlights: [
        'Emergency relief for 200 families',
        'Educational support for 80 children',
        'Infrastructure reconstruction assistance'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'Processing':
        return 'bg-warning text-warning-foreground';
      case 'Pending':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredDonations = donationHistory.filter(donation => {
    const matchesSearch = donation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || donation.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Donor Dashboard</h1>
          <p className="text-muted-foreground">Make donations, track impact, and manage receipts</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {donorStats.map((stat, index) => (
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
            <TabsTrigger value="donate">Make Donation</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
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
                  <Button className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('donate')}>
                    <Plus className="h-5 w-5" />
                    <span className="text-sm">Make New Donation</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('receipts')}>
                    <Receipt className="h-5 w-5" />
                    <span className="text-sm">View Receipts</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2" onClick={() => setActiveTab('history')}>
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm">Track Donations</span>
                  </Button>
                  <Button variant="outline" className="w-full h-12 flex-col gap-2">
                    <Target className="h-5 w-5" />
                    <span className="text-sm">View Impact</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Donations */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {donationHistory.slice(0, 3).map((donation) => (
                      <div key={donation.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <div className={`p-2 rounded-lg ${donation.status === 'Completed' ? 'bg-success/10' : 'bg-warning/10'}`}>
                          {getStatusIcon(donation.status)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{donation.category}</p>
                          <p className="text-xs text-muted-foreground">{donation.date} • {donation.amount}</p>
                        </div>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Summary */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Your Impact This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">320</div>
                    <p className="text-sm text-muted-foreground">People Helped</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-2">$15,000</div>
                    <p className="text-sm text-muted-foreground">Total Impact Value</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning mb-2">95%</div>
                    <p className="text-sm text-muted-foreground">Funds Efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Make Donation Tab */}
          <TabsContent value="donate">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Make a New Donation
                </CardTitle>
                <p className="text-sm text-muted-foreground">Support disaster relief efforts with your contribution</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="donation-type">Donation Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select donation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monetary">Monetary Donation</SelectItem>
                          <SelectItem value="in-kind">In-Kind Donation</SelectItem>
                          <SelectItem value="volunteer">Volunteer Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount in USD"
                        className="pl-8"
                      />
                      <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency-relief">Emergency Relief</SelectItem>
                          <SelectItem value="medical-aid">Medical Aid</SelectItem>
                          <SelectItem value="food-supplies">Food Supplies</SelectItem>
                          <SelectItem value="shelter-support">Shelter Support</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="reconstruction">Reconstruction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="anonymous">Anonymous Donation</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">Show my name</SelectItem>
                          <SelectItem value="yes">Keep anonymous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="dedication">Dedication (Optional)</Label>
                      <Input
                        id="dedication"
                        placeholder="Dedicate this donation to someone"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal message with your donation..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Complete Donation
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donation History Tab */}
          <TabsContent value="history">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Donation History
                </CardTitle>
                <p className="text-sm text-muted-foreground">Track all your donations and their impact</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search donations by category or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Donations List */}
                <div className="space-y-4">
                  {filteredDonations.map((donation) => (
                    <div key={donation.id} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{donation.category}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{donation.date}</span>
                            <span>•</span>
                            <span>{donation.type}</span>
                            <span>•</span>
                            <span>{donation.amount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(donation.status)}>
                            {donation.status}
                          </Badge>
                          {donation.receipt && (
                            <Badge variant="outline" className="text-success">
                              Receipt Available
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{donation.impact}</p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {donation.receipt && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Target className="h-4 w-4 mr-2" />
                          View Impact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Tax Receipts & Documentation
                </CardTitle>
                <p className="text-sm text-muted-foreground">Download receipts for tax purposes and donation records</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {receipts.map((receipt) => (
                  <div key={receipt.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">Receipt {receipt.id}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{receipt.date}</span>
                          <span>•</span>
                          <span>{receipt.amount}</span>
                          <span>•</span>
                          <span>Donation: {receipt.donationId}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {receipt.taxDeductible && (
                          <Badge className="bg-success text-success-foreground">
                            Tax Deductible
                          </Badge>
                        )}
                        <Badge className="bg-primary text-primary-foreground">
                          {receipt.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Online
                      </Button>
                      <Button size="sm" variant="outline">
                        <Receipt className="h-4 w-4 mr-2" />
                        Email Receipt
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

export default DonorPage;
