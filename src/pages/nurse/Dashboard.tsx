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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data for the dashboard
const recentPatients = [
  {
    id: "P001",
    name: "Emma Thompson",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-02-15",
    nextAppointment: "2024-02-20",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 32,
    condition: "Diabetes",
    lastVisit: "2024-02-14",
    nextAppointment: "2024-02-21",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "P003",
    name: "Sophia Rodriguez",
    age: 28,
    condition: "Asthma",
    lastVisit: "2024-02-13",
    nextAppointment: "2024-02-19",
    status: "Critical",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  },
];

const todaySchedule = [
  {
    time: "09:00 AM",
    patient: "Emma Thompson",
    type: "Check-up",
    doctor: "Dr. Sarah Johnson",
    status: "Confirmed",
  },
  {
    time: "10:30 AM",
    patient: "Michael Chen",
    type: "Follow-up",
    doctor: "Dr. Robert Williams",
    status: "Pending",
  },
  {
    time: "02:00 PM",
    patient: "Sophia Rodriguez",
    type: "Emergency",
    doctor: "Dr. James Wilson",
    status: "Confirmed",
  },
];

const recentActivities = [
  {
    type: "Vital Signs",
    patient: "Emma Thompson",
    time: "2 hours ago",
    details: "Recorded blood pressure: 120/80",
    icon: <Activity className="h-4 w-4 text-blue-500" />,
  },
  {
    type: "Medication",
    patient: "Michael Chen",
    time: "3 hours ago",
    details: "Administered insulin dose",
    icon: <Pill className="h-4 w-4 text-green-500" />,
  },
  {
    type: "Check-up",
    patient: "Sophia Rodriguez",
    time: "4 hours ago",
    details: "Completed routine examination",
    icon: <Stethoscope className="h-4 w-4 text-purple-500" />,
  },
];

const alerts = [
  {
    type: "Medication",
    severity: "high",
    message: "Patient P001 missed morning medication",
    time: "1 hour ago",
  },
  {
    type: "Vital Signs",
    severity: "medium",
    message: "Abnormal blood pressure reading for P002",
    time: "2 hours ago",
  },
  {
    type: "Appointment",
    severity: "low",
    message: "Upcoming appointment reminder for P003",
    time: "3 hours ago",
  },
];

export default function NurseDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Nurse Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            View Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <p className="text-xs text-muted-foreground">2 pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Medications Due</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <p className="text-xs text-muted-foreground">3 need attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Vital Signs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">To be recorded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                <CardTitle>Patient Care Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average Vital Signs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span className="text-sm">Heart Rate</span>
                            </div>
                            <span className="font-medium">72 bpm</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Gauge className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Blood Pressure</span>
                            </div>
                            <span className="font-medium">120/80</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Thermometer className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">Temperature</span>
                            </div>
                            <span className="font-medium">37.0°C</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Weight className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Weight</span>
                            </div>
                            <span className="font-medium">70 kg</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Morning Rounds</span>
                            </div>
                            <Badge variant="outline">8:00 AM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Pill className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Medication Distribution</span>
                            </div>
                            <Badge variant="outline">10:00 AM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">Vital Signs Check</span>
                            </div>
                            <Badge variant="outline">2:00 PM</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">Report Submission</span>
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
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1">{activity.icon}</div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.type} - {activity.patient}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.details}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={patient.avatar} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {patient.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>{patient.nextAppointment}</TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.status === "Critical" ? "destructive" : "default"}
                        >
                          {patient.status}
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

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type} with {appointment.doctor}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "Confirmed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {appointment.status}
                    </Badge>
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