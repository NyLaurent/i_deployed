import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  Pill,
  FileText,
  Activity,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

const Reminder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Sample reminder data
  const reminders = [
    {
      id: 1,
      title: "Take Blood Pressure Medication",
      description: "Take 1 tablet of Lisinopril with water",
      type: "medication",
      time: "08:00 AM",
      date: "Daily",
      priority: "high",
      isActive: true,
    },
    {
      id: 2,
      title: "Cardiology Appointment",
      description: "Follow-up with Dr. Sarah Johnson",
      type: "appointment",
      time: "10:30 AM",
      date: "May 15, 2024",
      priority: "medium",
      isActive: true,
    },
    {
      id: 3,
      title: "Blood Glucose Check",
      description: "Check and record blood glucose levels",
      type: "health",
      time: "07:00 AM & 07:00 PM",
      date: "Daily",
      priority: "high",
      isActive: true,
    },
    {
      id: 4,
      title: "Take Vitamin Supplements",
      description: "Take multivitamin and vitamin D",
      type: "medication",
      time: "09:00 AM",
      date: "Daily",
      priority: "low",
      isActive: true,
    },
    {
      id: 5,
      title: "Lab Test",
      description: "Complete blood count and lipid panel",
      type: "appointment",
      time: "11:00 AM",
      date: "May 20, 2024",
      priority: "medium",
      isActive: true,
    },
    {
      id: 6,
      title: "Physical Therapy Session",
      description: "Session with therapist for knee rehabilitation",
      type: "appointment",
      time: "02:00 PM",
      date: "Weekly - Thursdays",
      priority: "medium",
      isActive: false,
    },
  ];

  // Filter reminders based on search query and active tab
  const filteredReminders = reminders.filter(
    (reminder) =>
      (reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" || reminder.type === activeTab)
  );

  // Get counts for each type
  const reminderCounts = {
    all: reminders.length,
    medication: reminders.filter((r) => r.type === "medication").length,
    appointment: reminders.filter((r) => r.type === "appointment").length,
    health: reminders.filter((r) => r.type === "health").length,
  };

  // Get priority icon and color
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="default">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "medication":
        return <Pill className="h-5 w-5 text-purple-600" />;
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "health":
        return <Activity className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSAxMDAgMTAwKSIgc3Ryb2tlPSIjMDA3MmZmMDUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIC8+PHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIC8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgLz48L2c+PC9zdmc+')] bg-repeat opacity-50 dark:opacity-10"></div>

      {/* Animated circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-sky-400 dark:bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="flex-1 p-6 relative z-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <span className="bg-primary/10 p-2 rounded-lg">
                      <Bell className="h-6 w-6 text-primary" />
                    </span>
                    Reminders
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Manage your medication schedules, appointment reminders, and
                    health check-ups
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
                    <span className="hidden sm:inline">Add Reminder</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Reminders
                    </p>
                    <h3 className="text-2xl font-bold">{reminderCounts.all}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Medications</p>
                    <h3 className="text-2xl font-bold">
                      {reminderCounts.medication}
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Pill className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Appointments
                    </p>
                    <h3 className="text-2xl font-bold">
                      {reminderCounts.appointment}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Health Checks
                    </p>
                    <h3 className="text-2xl font-bold">
                      {reminderCounts.health}
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reminders..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 bg-white dark:bg-slate-800 rounded-lg p-1 border">
                <TabsTrigger value="all" className="rounded-md">
                  All
                </TabsTrigger>
                <TabsTrigger value="medication" className="rounded-md">
                  Medications
                </TabsTrigger>
                <TabsTrigger value="appointment" className="rounded-md">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="health" className="rounded-md">
                  Health Checks
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {filteredReminders.length > 0 ? (
              filteredReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className={`glass-card overflow-hidden transition-all ${
                    !reminder.isActive ? "opacity-60" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            {getTypeIcon(reminder.type)}
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-lg">
                                {reminder.title}
                              </h3>
                              <Switch checked={reminder.isActive} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {reminder.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {reminder.time}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {reminder.date}
                              </div>
                              {getPriorityBadge(reminder.priority)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col justify-end p-4 bg-slate-50 dark:bg-slate-800/50 border-t md:border-t-0 md:border-l">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No reminders found
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {searchQuery
                      ? `No reminders match your search for "${searchQuery}"`
                      : "You don't have any reminders in this category yet."}
                  </p>
                  <Button className="mt-6">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Reminder
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reminder;
