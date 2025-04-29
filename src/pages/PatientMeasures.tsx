import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Weight,
  Ruler,
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  FileText,
  Download,
  BarChart2,
  LineChart,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const PatientMeasures = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Sample data for patient measurements
  const measurements = [
    {
      id: 1,
      type: "Blood Pressure",
      value: "122/78",
      unit: "mmHg",
      date: "2024-12-28",
      time: "08:30 AM",
      status: "normal",
      notes: "Morning reading, after breakfast",
      icon: Heart,
      color: "text-red-500",
      trend: "stable",
      change: "0%",
    },
    {
      id: 2,
      type: "Heart Rate",
      value: "72",
      unit: "bpm",
      date: "2024-12-28",
      time: "08:30 AM",
      status: "normal",
      notes: "Resting heart rate",
      icon: Activity,
      color: "text-blue-500",
      trend: "decreasing",
      change: "-3%",
    },
    {
      id: 3,
      type: "Blood Glucose",
      value: "95",
      unit: "mg/dL",
      date: "2024-12-28",
      time: "07:15 AM",
      status: "normal",
      notes: "Fasting blood sugar",
      icon: Droplet,
      color: "text-purple-500",
      trend: "stable",
      change: "0%",
    },
    {
      id: 4,
      type: "Temperature",
      value: "98.6",
      unit: "°F",
      date: "2024-12-27",
      time: "06:00 PM",
      status: "normal",
      notes: "Evening temperature",
      icon: Thermometer,
      color: "text-orange-500",
      trend: "stable",
      change: "0%",
    },
    {
      id: 5,
      type: "Weight",
      value: "165",
      unit: "lbs",
      date: "2024-12-27",
      time: "07:00 AM",
      status: "normal",
      notes: "Morning weight",
      icon: Weight,
      color: "text-green-500",
      trend: "decreasing",
      change: "-1%",
    },
    {
      id: 6,
      type: "Blood Pressure",
      value: "124/80",
      unit: "mmHg",
      date: "2024-12-26",
      time: "09:15 PM",
      status: "normal",
      notes: "Evening reading, before bed",
      icon: Heart,
      color: "text-red-500",
      trend: "increasing",
      change: "+2%",
    },
    {
      id: 7,
      type: "Blood Glucose",
      value: "145",
      unit: "mg/dL",
      date: "2024-12-26",
      time: "01:30 PM",
      status: "elevated",
      notes: "After lunch reading",
      icon: Droplet,
      color: "text-purple-500",
      trend: "increasing",
      change: "+5%",
    },
  ];

  // Group measurements by date
  const groupedMeasurements = measurements.reduce((groups, measurement) => {
    const date = measurement.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(measurement);
    return groups;
  }, {} as Record<string, typeof measurements>);

  // Filter measurements based on search term and active tab
  const filteredMeasurements = Object.entries(groupedMeasurements)
    .map(([date, items]) => ({
      date,
      items: items.filter(
        (item) =>
          (activeTab === "all" || item.type.toLowerCase() === activeTab) &&
          (item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    }))
    .filter((group) => group.items.length > 0);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "elevated":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "high":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      case "low":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  // Function to get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
        return <ArrowUp className="h-4 w-4 text-rose-500" />;
      case "decreasing":
        return <ArrowDown className="h-4 w-4 text-emerald-500" />;
      case "stable":
      default:
        return <div className="h-4 w-4 border-t border-slate-300"></div>;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE, dd MMMM yyyy");
  };

  // Sample data for charts
  const bloodPressureData = [
    { date: "Mon", systolic: 120, diastolic: 80 },
    { date: "Tue", systolic: 122, diastolic: 78 },
    { date: "Wed", systolic: 119, diastolic: 79 },
    { date: "Thu", systolic: 121, diastolic: 81 },
    { date: "Fri", systolic: 124, diastolic: 80 },
    { date: "Sat", systolic: 122, diastolic: 78 },
    { date: "Sun", systolic: 120, diastolic: 76 },
  ];

  const glucoseData = [
    { date: "Mon", fasting: 95, afterMeal: 145 },
    { date: "Tue", fasting: 92, afterMeal: 140 },
    { date: "Wed", fasting: 94, afterMeal: 150 },
    { date: "Thu", fasting: 90, afterMeal: 138 },
    { date: "Fri", fasting: 95, afterMeal: 142 },
    { date: "Sat", fasting: 93, afterMeal: 135 },
    { date: "Sun", fasting: 91, afterMeal: 130 },
  ];

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
                    <Activity className="h-6 w-6 text-primary" />
                  </span>
                  Patient Measurements
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Track and monitor your health metrics over time, including
                  blood pressure, heart rate, blood glucose, and more
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="gap-1 bg-white/80 dark:bg-slate-800/80"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Measurement</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Search and filters */}
          <div className="p-4 md:p-6 border-t border-b bg-slate-50 dark:bg-slate-800/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search measurements..."
                  className="pl-9 bg-white dark:bg-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-1 bg-white/80 dark:bg-slate-800/80"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Measurements</DropdownMenuItem>
                    <DropdownMenuItem>Blood Pressure</DropdownMenuItem>
                    <DropdownMenuItem>Heart Rate</DropdownMenuItem>
                    <DropdownMenuItem>Blood Glucose</DropdownMenuItem>
                    <DropdownMenuItem>Temperature</DropdownMenuItem>
                    <DropdownMenuItem>Weight</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-1 bg-white/80 dark:bg-slate-800/80"
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:inline">Timeframe</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setSelectedTimeframe("week")}
                    >
                      Last Week
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedTimeframe("month")}
                    >
                      Last Month
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedTimeframe("quarter")}
                    >
                      Last 3 Months
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedTimeframe("year")}
                    >
                      Last Year
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedTimeframe("all")}
                    >
                      All Time
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
            <TabsTrigger value="list" className="rounded-md">
              <FileText className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="charts" className="rounded-md">
              <LineChart className="h-4 w-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="summary" className="rounded-md">
              <BarChart2 className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
          </TabsList>

          {/* List View Tab */}
          <TabsContent value="list" className="space-y-6">
            {/* Measurement type tabs */}
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-6 bg-white dark:bg-slate-800 rounded-lg p-1 border">
                <TabsTrigger value="all" className="rounded-md">
                  All
                </TabsTrigger>
                <TabsTrigger value="blood pressure" className="rounded-md">
                  Blood Pressure
                </TabsTrigger>
                <TabsTrigger value="heart rate" className="rounded-md">
                  Heart Rate
                </TabsTrigger>
                <TabsTrigger value="blood glucose" className="rounded-md">
                  Blood Glucose
                </TabsTrigger>
                <TabsTrigger value="temperature" className="rounded-md">
                  Temperature
                </TabsTrigger>
                <TabsTrigger value="weight" className="rounded-md">
                  Weight
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Measurements list */}
            <div className="space-y-6">
              {filteredMeasurements.length > 0 ? (
                filteredMeasurements.map(({ date, items }) => (
                  <div key={date} className="space-y-3">
                    <h3 className="font-medium text-lg">{formatDate(date)}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((measurement) => (
                        <Card
                          key={measurement.id}
                          className="overflow-hidden hover:shadow-md transition-all"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`p-2 rounded-lg bg-${measurement.color.split("-")[1]}-100 dark:bg-${measurement.color.split("-")[1]}-900/30`}
                                >
                                  <measurement.icon
                                    className={`h-5 w-5 ${measurement.color}`}
                                  />
                                </div>
                                <div>
                                  <CardTitle className="text-base">
                                    {measurement.type}
                                  </CardTitle>
                                  <CardDescription>
                                    {measurement.time}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge
                                className={getStatusColor(measurement.status)}
                              >
                                {measurement.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-2xl font-bold">
                                  {measurement.value}{" "}
                                  <span className="text-sm font-normal text-muted-foreground">
                                    {measurement.unit}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                  {getTrendIcon(measurement.trend)}
                                  <span>
                                    {measurement.change} from previous
                                  </span>
                                </div>
                              </div>
                            </div>
                            {measurement.notes && (
                              <div className="mt-3 text-sm text-muted-foreground">
                                <span className="font-medium">Notes:</span>{" "}
                                {measurement.notes}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Activity className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No measurements found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    No measurements match your current search criteria. Try
                    adjusting your filters or add a new measurement.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Measurement
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure Trends</CardTitle>
                  <CardDescription>
                    Systolic and diastolic readings over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Chart would go here - using placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Blood pressure chart visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blood Glucose Trends</CardTitle>
                  <CardDescription>
                    Fasting and post-meal readings over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Chart would go here - using placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Blood glucose chart visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate Trends</CardTitle>
                  <CardDescription>
                    Resting heart rate over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Chart would go here - using placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Heart rate chart visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weight Trends</CardTitle>
                  <CardDescription>
                    Weight measurements over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Chart would go here - using placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Weight chart visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure</CardTitle>
                  <CardDescription>
                    Latest readings and averages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Latest Reading
                    </div>
                    <div className="text-2xl font-bold">
                      122/78{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        mmHg
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Measured on Dec 28, 2024 at 08:30 AM
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">
                      7-Day Average
                    </div>
                    <div className="text-xl">
                      121/79{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        mmHg
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">Status</div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Normal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blood Glucose</CardTitle>
                  <CardDescription>
                    Latest readings and averages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Latest Reading
                    </div>
                    <div className="text-2xl font-bold">
                      95{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        mg/dL
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Measured on Dec 28, 2024 at 07:15 AM
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">
                      7-Day Average
                    </div>
                    <div className="text-xl">
                      <div>
                        Fasting: 93{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          mg/dL
                        </span>
                      </div>
                      <div>
                        After Meal: 140{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          mg/dL
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">Status</div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Normal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate</CardTitle>
                  <CardDescription>
                    Latest readings and averages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Latest Reading
                    </div>
                    <div className="text-2xl font-bold">
                      72{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        bpm
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Measured on Dec 28, 2024 at 08:30 AM
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">
                      7-Day Average
                    </div>
                    <div className="text-xl">
                      74{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        bpm
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">Status</div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Normal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weight</CardTitle>
                  <CardDescription>Latest readings and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Latest Reading
                    </div>
                    <div className="text-2xl font-bold">
                      165{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        lbs
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Measured on Dec 27, 2024 at 07:00 AM
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">
                      30-Day Change
                    </div>
                    <div className="text-xl flex items-center">
                      <ArrowDown className="h-4 w-4 text-emerald-500 mr-1" />
                      <span>
                        2{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          lbs
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">BMI</div>
                    <div className="text-xl">
                      24.2{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        (Normal)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temperature</CardTitle>
                  <CardDescription>Latest readings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Latest Reading
                    </div>
                    <div className="text-2xl font-bold">
                      98.6{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        °F
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Measured on Dec 27, 2024 at 06:00 PM
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-1">Status</div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Normal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Measurement Summary</CardTitle>
                  <CardDescription>
                    Overview of all tracked metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Total Measurements
                      </span>
                      <span className="text-sm">{measurements.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Measurement Types
                      </span>
                      <span className="text-sm">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Last Measured</span>
                      <span className="text-sm">Dec 28, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default PatientMeasures;
