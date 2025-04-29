"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import {
  Edit,
  ChevronRight,
  Calendar,
  FileText,
  Pill,
  Activity,
  Heart,
  Clipboard,
  Share2,
  Download,
  QrCode,
  User,
  Phone,
  Mail,
  Droplet,
  MapPin,
  AlertTriangle,
  Clock,
  ArrowRight,
  MoreHorizontal,
  Shield,
  Stethoscope,
  Bookmark,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Profile = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [showQrCode, setShowQrCode] = useState(false)

  // Sample patient data
  const patientData = {
    id: "127847381H3",
    name: "Jane Doe",
    dateOfBirth: "1990/12/20",
    age: 33,
    gender: "Female",
    bloodType: "A+",
    height: "165 cm",
    weight: "62 kg",
    address: "123 Health Street, Medical City",
    phone: "(555) 123-4567",
    email: "jane.doe@example.com",
    emergencyContact: "John Doe (Husband) - (555) 987-6543",
    insurance: "HealthPlus Insurance",
    policyNumber: "HP-12345678",
    primaryPhysician: "Dr. Sarah Johnson",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Asthma", "Hypertension"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    completeness: 85,
  }

  // Sample medical history data
  const medicalHistory = [
    {
      id: 1,
      date: "Monday, 27 March 2023",
      facility: "Healthy Family Center",
      type: "Diagnoses",
      details: "Annual check-up with comprehensive health assessment",
      icon: Stethoscope,
      color: "blue",
    },
    {
      id: 2,
      date: "Monday, 27 March 2023",
      facility: "Healthy Family Center",
      type: "Allergies",
      details: "Allergy panel testing and documentation",
      icon: AlertTriangle,
      color: "amber",
    },
    {
      id: 3,
      date: "Monday, 27 March 2023",
      facility: "Healthy Family Center",
      type: "Lab Tests",
      details: "Complete blood count, metabolic panel, lipid profile",
      icon: FileText,
      color: "indigo",
    },
    {
      id: 4,
      date: "Friday, 10 February 2023",
      facility: "City Medical Center",
      type: "Medications",
      details: "Prescription renewal and medication review",
      icon: Pill,
      color: "green",
    },
    {
      id: 5,
      date: "Tuesday, 15 November 2022",
      facility: "Wellness Clinic",
      type: "Vaccinations",
      details: "Seasonal flu vaccination",
      icon: Shield,
      color: "purple",
    },
  ]

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      date: "Thursday, 15 June 2023",
      time: "10:30 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "Primary Care",
      facility: "Healthy Family Center",
      type: "Follow-up",
      status: "confirmed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      date: "Monday, 3 July 2023",
      time: "2:15 PM",
      doctor: "Dr. Michael Chen",
      specialty: "Pulmonology",
      facility: "Respiratory Care Center",
      type: "Asthma Management",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Sample health metrics
  const healthMetrics = [
    {
      id: 1,
      name: "Blood Pressure",
      value: "122/78 mmHg",
      date: "May 5, 2023",
      status: "normal",
      icon: Heart,
      trend: "stable",
      change: "0%",
    },
    {
      id: 2,
      name: "Heart Rate",
      value: "72 bpm",
      date: "May 5, 2023",
      status: "normal",
      icon: Activity,
      trend: "decreasing",
      change: "-3%",
    },
    {
      id: 3,
      name: "Blood Glucose",
      value: "95 mg/dL",
      date: "May 4, 2023",
      status: "normal",
      icon: Clipboard,
      trend: "increasing",
      change: "+2%",
    },
    {
      id: 4,
      name: "Cholesterol",
      value: "185 mg/dL",
      date: "Apr 20, 2023",
      status: "normal",
      icon: FileText,
      trend: "stable",
      change: "0%",
    },
  ]

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "warning":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "critical":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
    }
  }

  // Function to get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
        return <div className="text-emerald-500 text-xs">↑ {trend}</div>
      case "decreasing":
        return <div className="text-rose-500 text-xs">↓ {trend}</div>
      case "stable":
      default:
        return <div className="text-slate-500 text-xs">→ {trend}</div>
    }
  }

  // Function to get appointment status badge
  const getAppointmentStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200">
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 hover:bg-slate-200">
            {status}
          </Badge>
        )
    }
  }

  return (
    <main className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
                <AvatarImage src={patientData.avatar} alt={patientData.name} />
                <AvatarFallback className="text-3xl bg-primary text-white">
                  {patientData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{patientData.name}</h1>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Patient</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                    {patientData.gender}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                    {patientData.age} years
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80 flex items-center gap-1">
                    <Droplet className="h-3 w-3 text-rose-500" />
                    {patientData.bloodType}
                  </Badge>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">ID: {patientData.id}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-1 bg-white/80 dark:bg-slate-800/80">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Show QR Code</span>
              </Button>
              <Button variant="outline" className="gap-1 bg-white/80 dark:bg-slate-800/80">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Data</span>
              </Button>
              <Button className="gap-1">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completeness */}
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">Profile Completeness</h3>
                <p className="text-sm text-muted-foreground">
                  Complete your profile to get the most out of our services
                </p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span>{patientData.completeness}% Complete</span>
                  <span>3 items left</span>
                </div>
                <Progress value={patientData.completeness} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white dark:bg-slate-800 p-1 shadow-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Medical History
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Documents
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="md:col-span-2 border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="font-medium">{patientData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">
                          {patientData.dateOfBirth} ({patientData.age} years)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Gender</p>
                        <p className="font-medium">{patientData.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                        <p className="font-medium">{patientData.bloodType}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{patientData.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{patientData.phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{patientData.address}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                        <p className="font-medium">{patientData.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QR Code */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Patient ID
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border mb-4 w-full max-w-[200px]">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${patientData.id}`}
                      alt="Patient QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Scan this code at your next appointment
                  </p>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Health Metrics */}
              <Card className="md:col-span-2 border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Health Metrics
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {healthMetrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${getStatusColor(metric.status)}`}>
                            {React.createElement(metric.icon, {
                              className: "h-5 w-5",
                            })}
                          </div>
                          <div>
                            <p className="font-medium">{metric.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">{metric.date}</p>
                              {getTrendIcon(metric.trend)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{metric.value}</p>
                          <p className="text-xs text-muted-foreground">{metric.change} from last</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medical Alerts */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Medical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Allergies</p>
                      <div className="flex flex-wrap gap-2">
                        {patientData.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800"
                          >
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-2">
                        {patientData.chronicConditions.map((condition, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                          >
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Insurance</p>
                      <div className="text-sm">
                        <p>{patientData.insurance}</p>
                        <p className="text-muted-foreground">Policy: {patientData.policyNumber}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Medical History
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {medicalHistory.map((record) => (
                      <div
                        key={record.id}
                        className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`p-3 rounded-full bg-${record.color}-100 text-${record.color}-700 dark:bg-${record.color}-900/30 dark:text-${record.color}-400 self-start`}
                        >
                          {React.createElement(record.icon, {
                            className: "h-5 w-5",
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{record.type}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {record.facility}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{record.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                                View Details <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{record.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <Button variant="outline" className="gap-1">
                    Load More <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Upcoming Appointments
                      </CardTitle>
                      <Button className="gap-1">
                        Schedule New <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={appointment.avatar} alt={appointment.doctor} />
                              <AvatarFallback>
                                {appointment.doctor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{appointment.type}</h3>
                                {getAppointmentStatusBadge(appointment.status)}
                              </div>
                              <p className="font-medium">{appointment.doctor}</p>
                              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="md:ml-auto flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-primary">
                                <Calendar className="h-4 w-4" />
                                <p className="font-medium">{appointment.date}</p>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <p>{appointment.time}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">{appointment.facility}</p>
                            </div>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                      <Bookmark className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Save to calendar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem>Cancel</DropdownMenuItem>
                                  <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <Button size="sm">Check In</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Previous Appointments</Button>
                    <Button variant="outline" className="gap-1">
                      View All <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Appointment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">Completed</Badge>
                        <p className="text-sm text-muted-foreground">May 10, 2023</p>
                      </div>
                      <p className="font-medium">Annual Physical Examination</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">Completed</Badge>
                        <p className="text-sm text-muted-foreground">Apr 15, 2023</p>
                      </div>
                      <p className="font-medium">Dental Checkup</p>
                      <p className="text-sm text-muted-foreground">Dr. Robert Williams</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200">
                          Cancelled
                        </Badge>
                        <p className="text-sm text-muted-foreground">Mar 22, 2023</p>
                      </div>
                      <p className="font-medium">Eye Examination</p>
                      <p className="text-sm text-muted-foreground">Dr. Lisa Chen</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <Button variant="outline" className="w-full gap-1">
                    View Complete History <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Medical Documents
                  </CardTitle>
                  <Button variant="outline">Upload Document</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No documents yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Upload your medical documents, test results, and prescriptions to keep them organized and
                    accessible.
                  </p>
                  <Button className="mt-6">Upload Your First Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Patient QR Code</DialogTitle>
          </DialogHeader>
          <div className="p-6 flex flex-col items-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${patientData.id}`}
              alt="Patient QR Code"
              className="w-full max-w-[300px] h-auto mb-4"
            />
            <p className="text-center mb-4">ID: {patientData.id}</p>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="w-full gap-1">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default Profile

function Plus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

