import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { AppHeader } from "@/components/AppHeader";
import { StatCard } from "@/components/StatCard";
import { PatientCard } from "@/components/PatientCard";
import { VitalChart } from "@/components/VitalChart";
import { useAuth } from "@/context/AuthContext";
import TrackEntries from "./TrackEntries";
import {
  Activity,
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  User,
  Users,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Bug,
  Microscope,
  FileSearch,
  Pill,
  Thermometer,
  Brain,
  Building2,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AllergiesContent from "./Allergies";
import MedicalRecordTemplate from "./MedicalRecordTemplate";
import MedicalRecordContent from "@/pages/MedicalRecordTemplate";
import {
  getMockRecordsForCategory,
  getMockTotalRecordsForCategory,
} from "@/data/mockMedicalRecords";

// Sample data for patients
const SAMPLE_PATIENTS = [
  {
    id: "1",
    name: "Thomas Anderson",
    email: "thomas@example.com",
    phone: "(123) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    dateOfBirth: "Apr 15, 1985",
    status: "active" as const,
    lastVisit: "May 10, 2023",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(234) 567-8901",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
    dateOfBirth: "Jun 22, 1990",
    status: "inactive" as const,
    lastVisit: "Jan 5, 2023",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "(345) 678-9012",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
    dateOfBirth: "Sep 8, 1978",
    status: "critical" as const,
    lastVisit: "Apr 28, 2023",
  },
];

// Sample data for upcoming appointments
const UPCOMING_APPOINTMENTS = [
  {
    id: "1",
    patientName: "Emma Thompson",
    date: "Today, 2:30 PM",
    type: "Annual Check-up",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "2",
    patientName: "James Wilson",
    date: "Tomorrow, 10:00 AM",
    type: "Follow-up",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "3",
    patientName: "Olivia Martinez",
    date: "May 25, 9:15 AM",
    type: "Consultation",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  },
];

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("main");
  const [showTrackEntries, setShowTrackEntries] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse state
  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail && typeof e.detail.collapsed === "boolean") {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };

    window.addEventListener("sidebarStateChange", handleSidebarChange);
    return () =>
      window.removeEventListener("sidebarStateChange", handleSidebarChange);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const isPatient = user.role === "patient";

  const medicalCategories = [
    {
      icon: Bug,
      title: "Allergies",
      recordCount: "4 records found",
      path: "/allergies",
    },
    {
      icon: Users,
      title: "Family History",
      recordCount: "2 records found",
      path: "/family-history",
    },
    {
      icon: Microscope,
      title: "Lab Tests",
      recordCount: "12 records found",
      path: "/lab-tests",
    },
    {
      icon: FileSearch,
      title: "Diagnosis",
      recordCount: "3 records found",
      path: "/diagnosis",
    },
    {
      icon: Pill,
      title: "Medications",
      recordCount: "4 records found",
      path: "/medications",
    },
    {
      icon: Thermometer,
      title: "Symptoms",
      recordCount: "2 records found",
      path: "/symptoms",
    },
    {
      icon: Brain,
      title: "AI Diagnoses",
      recordCount: "3 records found",
      path: "/ai-diagnoses",
    },
    {
      icon: Building2,
      title: "Emergency Services",
      recordCount: "6 services found",
      path: "/emergency-services",
    },
    {
      icon: Stethoscope,
      title: "Health Programs",
      recordCount: "2 programs found",
      path: "/health-programs",
    },
  ];

  const MedicalCard = ({ icon: Icon, title, recordCount, path }) => {
    return (
      <div
        className="p-6 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group hover:border-primary/30 hover:bg-primary/5"
        onClick={() => setActiveView(path)}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{recordCount}</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="text-xs text-primary">
              View Details <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-20"
        }`}
      >
        {showTrackEntries ? (
          <TrackEntries />
        ) : activeView === "main" ? (
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="mx-auto max-w-6xl space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl border border-primary/10">
                <h1 className="text-2xl font-semibold">
                  Welcome back,{" "}
                  <span className="text-primary">{user.name}</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's your healthcare dashboard for{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Stats Overview */}
              <div
                className={`grid gap-6 ${
                  sidebarCollapsed
                    ? "md:grid-cols-3 lg:grid-cols-5"
                    : "md:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                <StatCard
                  title="Appointments"
                  value="8"
                  description="This month"
                  icon={Calendar}
                  trend="up"
                  trendValue="2 more than last month"
                />
                <StatCard
                  title="Vital Signs"
                  value="Normal"
                  description="Last checked: Yesterday"
                  icon={Activity}
                  trend="neutral"
                  trendValue="Stable readings"
                />
                <StatCard
                  title="Medications"
                  value="4"
                  description="Active prescriptions"
                  icon={Pill}
                  trend="down"
                  trendValue="1 less than last month"
                />
                <StatCard
                  title="Lab Results"
                  value="2"
                  description="Pending review"
                  icon={Microscope}
                  trend="up"
                  trendValue="New results available"
                />
              </div>

              {/* Medical Records - Only for doctors/admins */}
              {!isPatient && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                      <FileSearch className="h-5 w-5 text-primary" />
                    </span>
                    Medical Records
                  </h2>
                  <div
                    className={`grid gap-6 ${
                      sidebarCollapsed
                        ? "md:grid-cols-3 lg:grid-cols-4"
                        : "md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {medicalCategories.map((category, index) => (
                      <MedicalCard
                        key={index}
                        icon={category.icon}
                        title={category.title}
                        recordCount={category.recordCount}
                        path={category.path}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity and Appointments */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="overflow-hidden border-slate-200/70 dark:border-slate-800/70">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-full bg-primary/10 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-md font-semibold">
                          {isPatient
                            ? "Upcoming Appointments"
                            : "Today's Schedule"}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary"
                      >
                        View all
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {UPCOMING_APPOINTMENTS.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={appointment.avatar || "/placeholder.svg"}
                                alt={appointment.patientName}
                                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {appointment.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary border-primary/20"
                            >
                              {appointment.date}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {!isPatient && (
                  <Card className="overflow-hidden border-slate-200/70 dark:border-slate-800/70">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 mr-3 rounded-full bg-primary/10 text-primary">
                            <Activity className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-md font-semibold">
                            Recent Activity
                          </CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary"
                        >
                          View all
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border/50">
                        <div className="flex items-start p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 mr-3">
                            <User className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              New patient registered
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Laura Patel has completed registration
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              10 minutes ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 mr-3">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Medical report submitted
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Blood work results for Michael Chen
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              1 hour ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 mr-3">
                            <Calendar className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Appointment rescheduled
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Thomas Anderson moved to May 28
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              3 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Vital Signs Chart for patients - placed directly after the appointments card */}
                {isPatient && (
                  <Card className="overflow-hidden border-slate-200/70 dark:border-slate-800/70">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 mr-3 rounded-full bg-primary/10 text-primary">
                            <Activity className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-md font-semibold">
                            My Health Metrics
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <VitalChart className="w-full" />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Patient Records (only for doctors/admin) */}
              {!isPatient && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                        <Users className="h-5 w-5 text-primary" />
                      </span>
                      Recent Patients
                    </h2>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add New Patient
                    </Button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {SAMPLE_PATIENTS.map((patient) => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </div>
              )}

              {/* Patient's Medical Records - Simplified view for patients */}
              {isPatient && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                      <FileSearch className="h-5 w-5 text-primary" />
                    </span>
                    My Medical Records
                  </h2>
                  <Card className="p-6">
                    <p className="text-muted-foreground mb-4">
                      View your personal medical records and history
                    </p>
                    <Button
                      onClick={() => navigate("/my-records")}
                      className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300"
                    >
                      View My Records <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </main>
        ) : (
          <MedicalRecordContent
            title={
              medicalCategories.find((cat) => cat.path === activeView)?.title ||
              ""
            }
            records={getMockRecordsForCategory(activeView)}
            totalRecords={getMockTotalRecordsForCategory(activeView)}
            onBack={() => setActiveView("main")}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
