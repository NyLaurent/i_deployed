"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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
  MapPin,
  AlertTriangle,
  Clock,
  ArrowRight,
  MoreHorizontal,
  Shield,
  Stethoscope,
  Bookmark,
  ChevronDown,
  Award,
  Star,
  Users,
  Building,
  GraduationCap,
  MessageSquare,
  Video,
  Briefcase,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DoctorProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showQrCode, setShowQrCode] = useState(false);

  // Sample doctor data
  const doctorData = {
    id: "DR78923451",
    name: "Dr. Gemimah Marie",
    title: "MD, FACS",
    specialty: "Cardiology",
    subspecialty: "Interventional Cardiology",
    gender: "Female",
    languages: ["English", "Spanish", "French"],
    experience: "15 years",
    address: "456 Medical Center Blvd, Healthcare City",
    phone: "(555) 987-6543",
    email: "dr.johnson@medicalcenter.com",
    hospital: "City Medical Center",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2008" },
      {
        degree: "Residency",
        institution: "Johns Hopkins Hospital",
        year: "2012",
      },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2014" },
    ],
    certifications: [
      "American Board of Internal Medicine",
      "American College of Cardiology",
    ],
    rating: 4.9,
    reviewCount: 247,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop",
    completeness: 92,
    acceptingNewPatients: true,
    insuranceAccepted: ["HealthPlus", "MediCare", "BlueCross", "Aetna"],
  };

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      date: "Thursday, 15 June 2023",
      time: "10:30 AM",
      patient: "Jane Doe",
      age: 33,
      reason: "Follow-up Consultation",
      type: "In-person",
      status: "confirmed",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      date: "Thursday, 15 June 2023",
      time: "11:45 AM",
      patient: "Michael Smith",
      age: 58,
      reason: "Cardiac Evaluation",
      type: "In-person",
      status: "confirmed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      date: "Thursday, 15 June 2023",
      time: "2:15 PM",
      patient: "Emily Johnson",
      age: 42,
      reason: "Medication Review",
      type: "Telemedicine",
      status: "confirmed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Sample patient statistics
  const patientStats = [
    {
      id: 1,
      name: "Total Patients",
      value: "1,247",
      change: "+12%",
      trend: "increasing",
      icon: Users,
    },
    {
      id: 2,
      name: "Appointments This Week",
      value: "32",
      change: "+3",
      trend: "stable",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Average Rating",
      value: "4.9/5",
      change: "+0.2",
      trend: "increasing",
      icon: Star,
    },
    {
      id: 4,
      name: "Response Time",
      value: "2h",
      change: "-15%",
      trend: "decreasing",
      icon: Clock,
    },
  ];

  // Sample recent procedures
  const recentProcedures = [
    {
      id: 1,
      date: "Monday, 12 June 2023",
      procedure: "Cardiac Catheterization",
      patient: "Robert Williams",
      outcome: "Successful",
      notes: "Minimal stenosis detected, medical management recommended",
      icon: Heart,
      color: "blue",
    },
    {
      id: 2,
      date: "Friday, 9 June 2023",
      procedure: "Echocardiogram",
      patient: "Susan Miller",
      outcome: "Completed",
      notes: "Normal cardiac function, mild mitral regurgitation",
      icon: Activity,
      color: "green",
    },
    {
      id: 3,
      date: "Wednesday, 7 June 2023",
      procedure: "Stress Test",
      patient: "James Thompson",
      outcome: "Completed",
      notes: "Negative for ischemia, good exercise tolerance",
      icon: Activity,
      color: "indigo",
    },
  ];

  // Sample research and publications
  const publications = [
    {
      id: 1,
      title: "Advances in Interventional Cardiology Techniques",
      journal: "Journal of Cardiology",
      year: "2022",
      citation: "Johnson S, et al. J Cardiol. 2022;45(3):178-185",
      link: "#",
    },
    {
      id: 2,
      title: "Long-term Outcomes of Stent Placement in Elderly Patients",
      journal: "American Heart Journal",
      year: "2021",
      citation: "Johnson S, Miller R, et al. Am Heart J. 2021;82(2):95-103",
      link: "#",
    },
    {
      id: 3,
      title: "Risk Factors for Cardiovascular Disease in Women",
      journal: "Circulation",
      year: "2020",
      citation:
        "Williams T, Johnson S, et al. Circulation. 2020;142(8):745-753",
      link: "#",
    },
  ];

  // Function to get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
        return <div className="text-emerald-500 text-xs">↑ {trend}</div>;
      case "decreasing":
        return <div className="text-rose-500 text-xs">↓ {trend}</div>;
      case "stable":
      default:
        return <div className="text-slate-500 text-xs">→ {trend}</div>;
    }
  };

  // Function to get appointment status badge
  const getAppointmentStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 hover:bg-slate-200">
            {status}
          </Badge>
        );
    }
  };

  // Function to get appointment type badge
  const getAppointmentTypeBadge = (type) => {
    switch (type) {
      case "In-person":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
          >
            <User className="h-3 w-3 mr-1" /> {type}
          </Badge>
        );
      case "Telemedicine":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
          >
            <Video className="h-3 w-3 mr-1" /> {type}
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

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

  return (
    <main className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
                <AvatarImage src={doctorData.avatar} alt={doctorData.name} />
                <AvatarFallback className="text-3xl bg-blue-600 text-white">
                  {doctorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{doctorData.name}</h1>
                  <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 border-none">
                    <Stethoscope className="h-3 w-3 mr-1" /> Doctor
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="bg-white/80 dark:bg-slate-800/80"
                  >
                    {doctorData.specialty}
                  </Badge>
                  {doctorData.subspecialty && (
                    <Badge
                      variant="outline"
                      className="bg-white/80 dark:bg-slate-800/80"
                    >
                      {doctorData.subspecialty}
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="bg-white/80 dark:bg-slate-800/80 flex items-center gap-1"
                  >
                    <Briefcase className="h-3 w-3 text-blue-500" />
                    {doctorData.experience}
                  </Badge>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  ID: {doctorData.id}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="gap-1 bg-white/80 dark:bg-slate-800/80"
                onClick={() => setShowQrCode(true)}
              >
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Show QR Code</span>
              </Button>
              <Button
                variant="outline"
                className="gap-1 bg-white/80 dark:bg-slate-800/80"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Data</span>
              </Button>
              <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
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
                  Complete your profile to enhance your online presence
                </p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span>{doctorData.completeness}% Complete</span>
                  <span>2 items left</span>
                </div>
                <Progress value={doctorData.completeness} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white dark:bg-slate-800 p-1 shadow-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-primary-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-primary-foreground"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="patients"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-primary-foreground"
              >
                Patients
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-primary-foreground"
              >
                Research
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Professional Information */}
              <Card className="md:col-span-2 border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name & Title
                        </p>
                        <p className="font-medium">
                          {doctorData.name}, {doctorData.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Specialty
                        </p>
                        <p className="font-medium">{doctorData.specialty}</p>
                      </div>
                      {doctorData.subspecialty && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Subspecialty
                          </p>
                          <p className="font-medium">
                            {doctorData.subspecialty}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Experience
                        </p>
                        <p className="font-medium">{doctorData.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {doctorData.languages.map((language, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-white dark:bg-slate-800"
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{doctorData.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{doctorData.phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Primary Practice
                        </p>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{doctorData.hospital}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Address
                        </p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{doctorData.address}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Accepting New Patients
                        </p>
                        <p className="font-medium text-emerald-600">
                          {doctorData.acceptingNewPatients ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QR Code */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-blue-600" />
                    Doctor ID
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border mb-4 w-full max-w-[200px]">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${doctorData.id}`}
                      alt="Doctor QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Share this code with patients for easy check-in
                  </p>
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1"
                    >
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Statistics */}
              <Card className="md:col-span-2 border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Practice Statistics
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-blue-600"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {patientStats.map((stat) => (
                      <div
                        key={stat.id}
                        className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {React.createElement(stat.icon, {
                              className: "h-5 w-5",
                            })}
                          </div>
                          <div>
                            <p className="font-medium">{stat.name}</p>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(stat.trend)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">
                            {stat.change} from last period
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education & Certifications */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Education & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Education</p>
                      <div className="space-y-3">
                        {doctorData.education.map((edu, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-muted-foreground">
                                {edu.institution}
                              </p>
                            </div>
                            <Badge variant="outline">{edu.year}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Board Certifications</p>
                      <div className="space-y-2">
                        {doctorData.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <p>{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Insurance Accepted</p>
                      <div className="flex flex-wrap gap-2">
                        {doctorData.insuranceAccepted.map(
                          (insurance, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                            >
                              {insurance}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
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
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Today's Appointments
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" /> Calendar View
                        </Button>
                        <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4" /> Add Appointment
                        </Button>
                      </div>
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
                              <AvatarImage
                                src={appointment.avatar}
                                alt={appointment.patient}
                              />
                              <AvatarFallback>
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">
                                  {appointment.patient}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {appointment.age} years
                                </Badge>
                              </div>
                              <p className="font-medium">
                                {appointment.reason}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {getAppointmentTypeBadge(appointment.type)}
                                {getAppointmentStatusBadge(appointment.status)}
                              </div>
                            </div>
                          </div>
                          <div className="md:ml-auto flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-blue-600">
                                <Clock className="h-4 w-4" />
                                <p className="font-medium">
                                  {appointment.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View patient record</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Send message</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default DoctorProfile;
