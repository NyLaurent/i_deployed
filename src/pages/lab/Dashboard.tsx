"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  Stethoscope,
  Calendar,
  Pill,
  FileText,
  AlertCircle,
  TrendingUp,
  UserCheck,
  ClipboardList,
  Clock,
  Heart,
  Thermometer,
  Gauge,
  Weight,
  ChevronRight,
  Bell,
  MessageSquare,
  Download,
  Microscope,
  TestTube,
  Beaker,
  Syringe,
  Droplet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for the dashboard
const pendingTests = [
  {
    id: "T001",
    patientName: "Emma Thompson",
    testType: "Blood Test",
    requestedBy: "Dr. Sarah Johnson",
    priority: "High",
    status: "Pending",
    dueDate: "2024-02-20",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "T002",
    patientName: "Michael Chen",
    testType: "Urine Analysis",
    requestedBy: "Dr. Robert Williams",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-02-21",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "T003",
    patientName: "Sophia Rodriguez",
    testType: "X-Ray",
    requestedBy: "Dr. James Wilson",
    priority: "Low",
    status: "Scheduled",
    dueDate: "2024-02-19",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  },
];

const recentResults = [
  {
    id: "R001",
    patientName: "Emma Thompson",
    testType: "Blood Test",
    result: "Normal",
    date: "2024-02-15",
    status: "Completed",
  },
  {
    id: "R002",
    patientName: "Michael Chen",
    testType: "Urine Analysis",
    result: "Abnormal",
    date: "2024-02-14",
    status: "Completed",
  },
  {
    id: "R003",
    patientName: "Sophia Rodriguez",
    testType: "X-Ray",
    result: "Normal",
    date: "2024-02-13",
    status: "Completed",
  },
];

const equipmentStatus = [
  {
    name: "Blood Analyzer",
    status: "Operational",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-03-15",
    icon: <TestTube className="h-4 w-4 text-green-500" />,
  },
  {
    name: "X-Ray Machine",
    status: "Maintenance Required",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    icon: <Microscope className="h-4 w-4 text-yellow-500" />,
  },
  {
    name: "Centrifuge",
    status: "Operational",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-03-20",
    icon: <Beaker className="h-4 w-4 text-green-500" />,
  },
  {
    name: "Microscope",
    status: "Operational",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-03-25",
    icon: <Microscope className="h-4 w-4 text-green-500" />,
  },
];

const alerts = [
  {
    type: "Equipment",
    severity: "high",
    message: "X-Ray Machine requires maintenance",
    time: "1 hour ago",
  },
  {
    type: "Test",
    severity: "medium",
    message: "Urgent blood test results ready for review",
    time: "2 hours ago",
  },
  {
    type: "Inventory",
    severity: "low",
    message: "Low stock of test tubes",
    time: "3 hours ago",
  },
];

export default function LabDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lab Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to the laboratory management system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Tests
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-xs text-muted-foreground">+5 new today</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <p className="text-xs text-muted-foreground">2 pending review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Equipment Status
            </CardTitle>
            <Microscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <p className="text-xs text-muted-foreground">1 needs attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">Stock level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="alerts">
            <div className="flex items-center space-x-2">
              <span>Alerts</span>
              <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Test Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Test Types
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <TestTube className="h-4 w-4 text-red-500" />
                              <span className="text-sm">Blood Tests</span>
                            </div>
                            <span className="font-medium">45%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Droplet className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Urine Tests</span>
                            </div>
                            <span className="font-medium">30%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Microscope className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">Microscopy</span>
                            </div>
                            <span className="font-medium">15%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Syringe className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Other Tests</span>
                            </div>
                            <span className="font-medium">10%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Today's Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Morning Tests</span>
                            </div>
                            <Badge variant="outline">8:00 AM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <TestTube className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Blood Analysis</span>
                            </div>
                            <Badge variant="outline">10:00 AM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Microscope className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">Microscopy</span>
                            </div>
                            <Badge variant="outline">2:00 PM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">Report Review</span>
                            </div>
                            <Badge variant="outline">4:00 PM</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1">
                        {result.result === "Normal" ? (
                          <TestTube className="h-4 w-4 text-green-500" />
                        ) : (
                          <TestTube className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {result.testType} - {result.patientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Result: {result.result}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={test.avatar}
                              alt={test.patientName}
                            />
                            <AvatarFallback>
                              {test.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{test.patientName}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {test.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{test.testType}</TableCell>
                      <TableCell>{test.requestedBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            test.priority === "High"
                              ? "destructive"
                              : test.priority === "Medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {test.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{test.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            test.status === "Pending"
                              ? "secondary"
                              : test.status === "In Progress"
                              ? "default"
                              : "outline"
                          }
                        >
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentStatus.map((equipment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {equipment.icon}
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last Maintenance: {equipment.lastMaintenance}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={
                          equipment.status === "Operational"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {equipment.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Next: {equipment.nextMaintenance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 rounded-lg border p-4"
                  >
                    <AlertCircle
                      className={`h-5 w-5 ${
                        alert.severity === "high"
                          ? "text-red-500"
                          : alert.severity === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {alert.type} Alert
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
