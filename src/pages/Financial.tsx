import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  CreditCard,
  DollarSign,
  FileText,
  Filter,
  Calendar,
  Download,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Clock,
  Receipt,
  Wallet,
  Building,
  Shield,
  AlertCircle,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { StatCard } from "@/components/StatCard";

const Financial = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Sample financial data
  const financialSummary = {
    totalBilled: 2850.75,
    totalPaid: 2150.5,
    outOfPocket: 350.25,
    pendingClaims: 700.25,
    insuranceCoverage: 1800.25,
    deductibleMet: 750,
    deductibleTotal: 1500,
    lastPayment: {
      amount: 125.5,
      date: "2024-05-15",
      method: "Credit Card",
    },
  };

  // Sample billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "2024-05-15",
      description: "Annual Physical Examination",
      total: 350.0,
      insurance: 280.0,
      patient: 70.0,
      status: "paid",
      provider: "Dr. Sarah Johnson",
    },
    {
      id: "INV-002",
      date: "2024-05-02",
      description: "Blood Work Panel",
      total: 225.5,
      insurance: 180.4,
      patient: 45.1,
      status: "paid",
      provider: "City Medical Lab",
    },
    {
      id: "INV-003",
      date: "2024-04-18",
      description: "Cardiology Consultation",
      total: 475.25,
      insurance: 380.2,
      patient: 95.05,
      status: "paid",
      provider: "Dr. Michael Chen",
    },
    {
      id: "INV-004",
      date: "2024-04-10",
      description: "MRI Scan - Lower Back",
      total: 1200.0,
      insurance: 960.0,
      patient: 240.0,
      status: "pending",
      provider: "Advanced Imaging Center",
    },
    {
      id: "INV-005",
      date: "2024-03-25",
      description: "Prescription Refill",
      total: 85.75,
      insurance: 60.0,
      patient: 25.75,
      status: "paid",
      provider: "MediPharm",
    },
    {
      id: "INV-006",
      date: "2024-03-12",
      description: "Physical Therapy Session",
      total: 150.0,
      insurance: 120.0,
      patient: 30.0,
      status: "pending",
      provider: "RehabWorks",
    },
  ];

  // Sample insurance claims
  const insuranceClaims = [
    {
      id: "CLM-001",
      date: "2024-05-15",
      service: "Annual Physical Examination",
      amount: 350.0,
      status: "approved",
      paidAmount: 280.0,
      policyNumber: "POL-12345",
    },
    {
      id: "CLM-002",
      date: "2024-05-02",
      service: "Blood Work Panel",
      amount: 225.5,
      status: "approved",
      paidAmount: 180.4,
      policyNumber: "POL-12345",
    },
    {
      id: "CLM-003",
      date: "2024-04-18",
      service: "Cardiology Consultation",
      amount: 475.25,
      status: "approved",
      paidAmount: 380.2,
      policyNumber: "POL-12345",
    },
    {
      id: "CLM-004",
      date: "2024-04-10",
      service: "MRI Scan - Lower Back",
      amount: 1200.0,
      status: "pending",
      paidAmount: 0,
      policyNumber: "POL-12345",
    },
    {
      id: "CLM-005",
      date: "2024-03-12",
      service: "Physical Therapy Session",
      amount: 150.0,
      status: "pending",
      paidAmount: 0,
      policyNumber: "POL-12345",
    },
  ];

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Bank Account",
      last4: "9876",
      name: "Checking Account",
      isDefault: false,
    },
  ];

  // Sample expense breakdown data for pie chart
  const expenseBreakdown = [
    { name: "Doctor Visits", value: 1250, color: "#3b82f6" },
    { name: "Lab Tests", value: 750, color: "#10b981" },
    { name: "Prescriptions", value: 350, color: "#8b5cf6" },
    { name: "Imaging", value: 1200, color: "#f59e0b" },
    { name: "Physical Therapy", value: 300, color: "#ef4444" },
  ];

  // Sample monthly spending data for bar chart
  const monthlySpending = [
    { month: "Jan", amount: 450 },
    { month: "Feb", amount: 380 },
    { month: "Mar", amount: 520 },
    { month: "Apr", amount: 650 },
    { month: "May", amount: 850 },
  ];

  // Sample insurance coverage data
  const insuranceCoverage = {
    provider: "Blue Cross Blue Shield",
    policyNumber: "POL-12345",
    groupNumber: "GRP-67890",
    coverageType: "PPO",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-12-31",
    primaryInsured: "John Doe",
    deductible: {
      individual: 1500,
      family: 3000,
      met: 750,
    },
    outOfPocketMax: {
      individual: 5000,
      family: 10000,
      met: 1250,
    },
    copays: {
      primaryCare: 25,
      specialist: 40,
      urgentCare: 50,
      emergency: 250,
    },
  };

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
            Overdue
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Approved
          </Badge>
        );
      case "denied":
        return (
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
            Denied
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            {status}
          </Badge>
        );
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border shadow-sm rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-primary">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </span>
                  Financial Management
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Track your healthcare expenses, insurance claims, and manage
                  your billing information
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="gap-1 bg-white/80 dark:bg-slate-800/80"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                <Button className="gap-1">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-b">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Billed</p>
                  <h3 className="text-2xl font-bold">
                    ${financialSummary.totalBilled.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Out of Pocket</p>
                  <h3 className="text-2xl font-bold">
                    ${financialSummary.outOfPocket.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Insurance Coverage
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${financialSummary.insuranceCoverage.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Claims
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${financialSummary.pendingClaims.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-1">
                <Receipt className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
              <TabsTrigger
                value="insurance"
                className="flex items-center gap-1"
              >
                <Shield className="h-4 w-4" />
                <span>Insurance</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span>Payment</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full md:w-[200px] bg-white dark:bg-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    {selectedTimeframe === "week"
                      ? "This Week"
                      : selectedTimeframe === "month"
                        ? "This Month"
                        : "This Year"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setSelectedTimeframe("week")}
                  >
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedTimeframe("month")}
                  >
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedTimeframe("year")}
                  >
                    This Year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Expense Breakdown */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of your healthcare expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => `$${value.toFixed(2)}`}
                        />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {expenseBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Deductible Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Deductible Progress</CardTitle>
                  <CardDescription>
                    Track your progress towards meeting your annual deductible
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Individual Deductible</span>
                      <span className="font-medium">
                        ${insuranceCoverage.deductible.met} of $
                        {insuranceCoverage.deductible.individual}
                      </span>
                    </div>
                    <Progress
                      value={
                        (insuranceCoverage.deductible.met /
                          insuranceCoverage.deductible.individual) *
                        100
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {(
                        (insuranceCoverage.deductible.met /
                          insuranceCoverage.deductible.individual) *
                        100
                      ).toFixed(0)}
                      % of your annual deductible has been met
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Out-of-Pocket Maximum</span>
                      <span className="font-medium">
                        ${insuranceCoverage.outOfPocketMax.met} of $
                        {insuranceCoverage.outOfPocketMax.individual}
                      </span>
                    </div>
                    <Progress
                      value={
                        (insuranceCoverage.outOfPocketMax.met /
                          insuranceCoverage.outOfPocketMax.individual) *
                        100
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {(
                        (insuranceCoverage.outOfPocketMax.met /
                          insuranceCoverage.outOfPocketMax.individual) *
                        100
                      ).toFixed(0)}
                      % of your out-of-pocket maximum has been met
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      Insurance Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Provider</span>
                        <span>{insuranceCoverage.provider}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Policy Number
                        </span>
                        <span>{insuranceCoverage.policyNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Coverage Type
                        </span>
                        <span>{insuranceCoverage.coverageType}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Spending Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Healthcare Spending</CardTitle>
                <CardDescription>
                  Track your healthcare expenses over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySpending}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="amount"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your most recent healthcare expenses and payments
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>${transaction.total.toFixed(2)}</TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View and manage your healthcare bills and invoices
                  </CardDescription>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Make Payment
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Insurance</TableHead>
                      <TableHead>Your Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">{bill.id}</TableCell>
                        <TableCell>
                          {new Date(bill.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{bill.description}</TableCell>
                        <TableCell>{bill.provider}</TableCell>
                        <TableCell>${bill.total.toFixed(2)}</TableCell>
                        <TableCell>${bill.insurance.toFixed(2)}</TableCell>
                        <TableCell>${bill.patient.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              {bill.status === "pending" && (
                                <DropdownMenuItem>Pay Now</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>
                    Overview of your healthcare payments and expenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <StatCard
                        title="Total Paid"
                        value={`$${financialSummary.totalPaid.toFixed(2)}`}
                        description="Year to date"
                        icon={DollarSign}
                        trend="increasing"
                        trendValue="+15%"
                      />
                      <StatCard
                        title="Out of Pocket"
                        value={`$${financialSummary.outOfPocket.toFixed(2)}`}
                        description="Year to date"
                        icon={Wallet}
                        trend="stable"
                        trendValue="0%"
                      />
                      <StatCard
                        title="Insurance Covered"
                        value={`$${financialSummary.insuranceCoverage.toFixed(2)}`}
                        description="Year to date"
                        icon={Shield}
                        trend="increasing"
                        trendValue="+12%"
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-4">
                        Payment Distribution
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Payment Method
                          </span>
                          <span>Credit Card</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Last 4 Digits
                          </span>
                          <span>4242</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expiry</span>
                          <span>05/25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            {/* Insurance content */}
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            {/* Payment content */}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Financial;
