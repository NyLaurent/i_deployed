import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Pill,
  Microscope,
  Stethoscope,
  Truck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const OrderTest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState("all");

  // Sample data for orders
  const orders = [
    {
      id: "ORD-2023-1001",
      patientName: "John Smith",
      patientId: "P-10045",
      type: "Medication",
      item: "Lisinopril 10mg",
      requestedBy: "Dr. Sarah Johnson",
      requestDate: "2023-10-15T09:30:00",
      status: "completed",
      priority: "normal",
      icon: Pill,
    },
    {
      id: "ORD-2023-1002",
      patientName: "Emily Davis",
      patientId: "P-10046",
      type: "Lab Test",
      item: "Complete Blood Count (CBC)",
      requestedBy: "Dr. Michael Chen",
      requestDate: "2023-10-16T14:15:00",
      status: "pending",
      priority: "urgent",
      icon: Microscope,
    },
    {
      id: "ORD-2023-1003",
      patientName: "Robert Johnson",
      patientId: "P-10047",
      type: "Imaging",
      item: "Chest X-Ray",
      requestedBy: "Dr. Lisa Wong",
      requestDate: "2023-10-16T11:45:00",
      status: "in-progress",
      priority: "high",
      icon: FileText,
    },
    {
      id: "ORD-2023-1004",
      patientName: "Maria Garcia",
      patientId: "P-10048",
      type: "Medication",
      item: "Metformin 500mg",
      requestedBy: "Dr. James Wilson",
      requestDate: "2023-10-17T10:00:00",
      status: "completed",
      priority: "normal",
      icon: Pill,
    },
    {
      id: "ORD-2023-1005",
      patientName: "David Brown",
      patientId: "P-10049",
      type: "Consultation",
      item: "Cardiology Consultation",
      requestedBy: "Dr. Sarah Johnson",
      requestDate: "2023-10-18T13:30:00",
      status: "scheduled",
      priority: "normal",
      icon: Stethoscope,
    },
    {
      id: "ORD-2023-1006",
      patientName: "Jennifer Wilson",
      patientId: "P-10050",
      type: "Supply",
      item: "Diabetic Testing Supplies",
      requestedBy: "Dr. Michael Chen",
      requestDate: "2023-10-19T15:45:00",
      status: "shipped",
      priority: "normal",
      icon: Truck,
    },
    {
      id: "ORD-2023-1007",
      patientName: "Thomas Martinez",
      patientId: "P-10051",
      type: "Lab Test",
      item: "Lipid Panel",
      requestedBy: "Dr. Lisa Wong",
      requestDate: "2023-10-20T09:15:00",
      status: "cancelled",
      priority: "normal",
      icon: Microscope,
    },
    {
      id: "ORD-2023-1008",
      patientName: "Sarah Johnson",
      patientId: "P-10052",
      type: "Imaging",
      item: "MRI - Lower Back",
      requestedBy: "Dr. James Wilson",
      requestDate: "2023-10-21T11:00:00",
      status: "pending",
      priority: "urgent",
      icon: FileText,
    },
  ];

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.item.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Order type filter
    const matchesType =
      orderTypeFilter === "all" ||
      order.type.toLowerCase() === orderTypeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Scheduled
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-700 border-indigo-200"
          >
            Shipped
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "normal":
        return <Badge variant="outline">Normal</Badge>;
      case "low":
        return (
          <Badge variant="outline" className="text-slate-500">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        {/* <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Order Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </span>
                  Order Management
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Track, manage, and process medication orders, lab tests, and
                  medical supplies
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
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Order</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Management Interface */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="bg-white dark:bg-slate-800 p-1 shadow-sm">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="medication">Medications</TabsTrigger>
              <TabsTrigger value="lab">Lab Tests</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="supplies">Supplies</TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-[250px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Order List</CardTitle>
                    <CardDescription>
                      {filteredOrders.length} orders found
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {order.patientName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {order.patientId}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <order.icon className="h-4 w-4 text-primary" />
                                <span>{order.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>{order.item}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>{formatDate(order.requestDate)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatTime(order.requestDate)}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getPriorityBadge(order.priority)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Update Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Edit Order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-6 text-muted-foreground"
                          >
                            No orders found matching your criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pending Orders
                      </p>
                      <h3 className="text-2xl font-bold">
                        {
                          orders.filter((order) => order.status === "pending")
                            .length
                        }
                      </h3>
                    </div>
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        In Progress
                      </p>
                      <h3 className="text-2xl font-bold">
                        {
                          orders.filter(
                            (order) => order.status === "in-progress"
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <h3 className="text-2xl font-bold">
                        {
                          orders.filter((order) => order.status === "completed")
                            .length
                        }
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Cancelled</p>
                      <h3 className="text-2xl font-bold">
                        {
                          orders.filter((order) => order.status === "cancelled")
                            .length
                        }
                      </h3>
                    </div>
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but filtered by type */}
          <TabsContent value="medication" className="space-y-6">
            {/* Similar content but filtered for medications */}
          </TabsContent>

          <TabsContent value="lab" className="space-y-6">
            {/* Similar content but filtered for lab tests */}
          </TabsContent>

          <TabsContent value="imaging" className="space-y-6">
            {/* Similar content but filtered for imaging */}
          </TabsContent>

          <TabsContent value="supplies" className="space-y-6">
            {/* Similar content but filtered for supplies */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderTest;
