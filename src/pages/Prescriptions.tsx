import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Search,
  Plus,
  Filter,
  SlidersHorizontal,
  Pill,
  Calendar,
  Clock,
  AlertCircle,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Prescriptions = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Sample prescription data
  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-12-15",
      endDate: "2024-06-15",
      prescribedBy: "Dr. Sarah Johnson",
      pharmacy: "HealthPlus Pharmacy",
      status: "Active",
      refillsRemaining: 3,
      lastRefill: "2024-01-15",
      notes: "Take in the morning with food. Monitor blood pressure weekly.",
      priority: "Normal",
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-11-10",
      endDate: "2024-05-10",
      prescribedBy: "Dr. Michael Chen",
      pharmacy: "MediCare Pharmacy",
      status: "Active",
      refillsRemaining: 2,
      lastRefill: "2024-01-10",
      notes: "Take with meals to reduce gastrointestinal side effects.",
      priority: "Normal",
    },
    {
      id: 3,
      medication: "Albuterol Inhaler",
      dosage: "90mcg",
      frequency: "As needed",
      startDate: "2023-10-05",
      endDate: "2024-04-05",
      prescribedBy: "Dr. Emily Williams",
      pharmacy: "QuickCare Pharmacy",
      status: "Active",
      refillsRemaining: 5,
      lastRefill: "2023-12-05",
      notes:
        "Use for shortness of breath or wheezing. Do not exceed 4 doses in 24 hours.",
      priority: "High",
    },
    {
      id: 4,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      startDate: "2023-12-20",
      endDate: "2023-12-30",
      prescribedBy: "Dr. James Wilson",
      pharmacy: "Community Pharmacy",
      status: "Completed",
      refillsRemaining: 0,
      lastRefill: "2023-12-20",
      notes: "Complete full course of antibiotics even if symptoms improve.",
      priority: "High",
    },
    {
      id: 5,
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      startDate: "2023-09-15",
      endDate: "2024-03-15",
      prescribedBy: "Dr. Sarah Johnson",
      pharmacy: "HealthPlus Pharmacy",
      status: "Active",
      refillsRemaining: 1,
      lastRefill: "2023-12-15",
      notes:
        "Take in the evening. Avoid grapefruit juice while on this medication.",
      priority: "Normal",
    },
    {
      id: 6,
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed for pain",
      startDate: "2023-11-25",
      endDate: "2024-02-25",
      prescribedBy: "Dr. Robert Brown",
      pharmacy: "QuickCare Pharmacy",
      status: "Active",
      refillsRemaining: 2,
      lastRefill: "2023-12-25",
      notes: "Take with food. Do not exceed 1200mg in 24 hours.",
      priority: "Low",
    },
  ];

  // Filter prescriptions based on search query and active tab
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    // Search filter
    const matchesSearch =
      prescription.medication
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      prescription.prescribedBy
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      prescription.pharmacy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.notes.toLowerCase().includes(searchQuery.toLowerCase());

    // Tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && prescription.status === "Active";
    if (activeTab === "completed")
      return matchesSearch && prescription.status === "Completed";
    if (activeTab === "high-priority")
      return matchesSearch && prescription.priority === "High";

    return matchesSearch;
  });

  // Sort prescriptions
  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
    if (sortBy === "dateOld") {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
    if (sortBy === "medication") {
      return a.medication.localeCompare(b.medication);
    }
    if (sortBy === "doctor") {
      return a.prescribedBy.localeCompare(b.prescribedBy);
    }
    return 0;
  });

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Completed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "Expired":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Normal":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Low":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  // Summary statistics
  const activePrescriptions = prescriptions.filter(
    (p) => p.status === "Active"
  ).length;
  const completedPrescriptions = prescriptions.filter(
    (p) => p.status === "Completed"
  ).length;
  const highPriorityPrescriptions = prescriptions.filter(
    (p) => p.priority === "High"
  ).length;
  const needsRefillPrescriptions = prescriptions.filter(
    (p) => p.status === "Active" && p.refillsRemaining <= 1
  ).length;

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <Pill className="h-6 w-6 text-primary" />
                  </span>
                  Prescriptions
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Manage your medications, track refills, and view prescription
                  history
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search prescriptions..."
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      >
                        <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter prescriptions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button className="rounded-full shadow-lg bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prescription
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-b">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <h3 className="text-2xl font-bold">{activePrescriptions}</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Pill className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold">
                    {completedPrescriptions}
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
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <h3 className="text-2xl font-bold">
                    {highPriorityPrescriptions}
                  </h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Refill</p>
                  <h3 className="text-2xl font-bold">
                    {needsRefillPrescriptions}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Prescriptions List */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border shadow-sm p-6">
            {/* Tabs and Filters */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-1">
                  <TabsTrigger value="all" className="rounded-md">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="rounded-md">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="rounded-md">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="high-priority" className="rounded-md">
                    High Priority
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center space-x-2">
                <Select defaultValue="date" onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-9 rounded-lg border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest first)</SelectItem>
                    <SelectItem value="dateOld">Date (Oldest first)</SelectItem>
                    <SelectItem value="medication">Medication (A-Z)</SelectItem>
                    <SelectItem value="doctor">Doctor (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Prescriptions Cards */}
            <div className="space-y-4">
              {sortedPrescriptions.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                    <Pill className="h-7 w-7 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No prescriptions found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery
                      ? `No prescriptions matching "${searchQuery}"`
                      : "You don't have any prescriptions yet."}
                  </p>
                  <Button className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" /> Add Your First
                    Prescription
                  </Button>
                </div>
              ) : (
                sortedPrescriptions.map((prescription) => (
                  <Card
                    key={prescription.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold">
                                {prescription.medication}
                              </h3>
                              <Badge
                                className={`ml-2 ${getStatusBadge(prescription.status)}`}
                              >
                                {prescription.status}
                              </Badge>
                              <Badge
                                className={`ml-2 ${getPriorityBadge(prescription.priority)}`}
                              >
                                {prescription.priority}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Request Refill
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Prescription
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Dosage
                              </p>
                              <p className="font-medium">
                                {prescription.dosage}, {prescription.frequency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Prescribed By
                              </p>
                              <p className="font-medium">
                                {prescription.prescribedBy}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Duration
                              </p>
                              <p className="font-medium">
                                {formatDate(prescription.startDate)} -{" "}
                                {formatDate(prescription.endDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Pharmacy
                              </p>
                              <p className="font-medium">
                                {prescription.pharmacy}
                              </p>
                            </div>
                          </div>

                          {prescription.notes && (
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground">
                                Notes
                              </p>
                              <p className="text-sm mt-1">
                                {prescription.notes}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Refills Remaining
                              </p>
                              <p className="font-medium">
                                {prescription.refillsRemaining}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Last Refill
                              </p>
                              <p className="font-medium">
                                {formatDate(prescription.lastRefill)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              {prescription.status === "Active" && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300"
                                >
                                  Request Refill
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue">
                    <Plus className="h-4 w-4 mr-2" /> Add New Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" /> Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" /> Export Prescriptions
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Archive Old
                    Prescriptions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Refills */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Refills</h2>
                <div className="space-y-4">
                  {prescriptions
                    .filter(
                      (p) => p.status === "Active" && p.refillsRemaining > 0
                    )
                    .slice(0, 3)
                    .map((prescription) => (
                      <div
                        key={prescription.id}
                        className="flex items-start space-x-3 pb-3 border-b last:border-0"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {prescription.medication}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {prescription.refillsRemaining} refills remaining
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-7"
                        >
                          Refill
                        </Button>
                      </div>
                    ))}
                  {prescriptions.filter(
                    (p) => p.status === "Active" && p.refillsRemaining > 0
                  ).length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No upcoming refills
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medication Schedule */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Morning</p>
                        <p className="text-xs text-muted-foreground">8:00 AM</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">2 medications</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Afternoon</p>
                        <p className="text-xs text-muted-foreground">1:00 PM</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">1 medication</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Evening</p>
                        <p className="text-xs text-muted-foreground">8:00 PM</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">3 medications</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" /> View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prescriptions;
