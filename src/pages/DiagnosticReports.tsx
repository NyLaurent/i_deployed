"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Calendar, FileText, Filter, Search, User, Pill, ChevronRight, Clock, Download, Share2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DiagnosticReports = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) {
    return null
  }

  // Sample data for demonstration
  const reports = [
    {
      id: "REP-1001",
      date: "2024-12-27",
      group: "Today",
      condition: "Diabetes Mellitus Type 2",
      status: "Active",
      doctor: "Dr. John Smith",
      specialty: "Endocrinologist",
      medication: "Metformin 500mg",
      dosage: "Twice daily",
      notes: "Blood sugar levels stable. Continue current medication regimen.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "REP-1002",
      date: "2024-12-27",
      group: "Today",
      condition: "Hypertension",
      status: "Cured",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      medication: "Lisinopril 10mg",
      dosage: "Once daily",
      notes: "Blood pressure normalized. No further medication required.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "REP-1003",
      date: "2024-12-27",
      group: "Today",
      condition: "Respiratory Infection",
      status: "Inactive",
      doctor: "Dr. Michael Chen",
      specialty: "Pulmonologist",
      medication: "Azithromycin 250mg",
      dosage: "Once daily for 5 days",
      notes: "Symptoms persisting. Consider alternative treatment.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "REP-1004",
      date: "2024-12-26",
      group: "Yesterday",
      condition: "Arthritis",
      status: "Active",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Rheumatologist",
      medication: "Ibuprofen 400mg",
      dosage: "As needed for pain",
      notes: "Joint pain continues. Physical therapy recommended.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "REP-1005",
      date: "2024-12-25",
      group: "Earlier",
      condition: "Migraine",
      status: "Active",
      doctor: "Dr. David Wilson",
      specialty: "Neurologist",
      medication: "Sumatriptan 50mg",
      dosage: "As needed for migraine attacks",
      notes: "Frequency of migraines reduced. Continue current treatment.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter reports based on search term and active filter
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.medication.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeFilter === "all") return matchesSearch
    return matchesSearch && report.status.toLowerCase() === activeFilter.toLowerCase()
  })

  // Group reports by day
  const groupedReports = filteredReports.reduce((acc, report) => {
    if (!acc[report.group]) {
      acc[report.group] = []
    }
    acc[report.group].push(report)
    return acc
  }, {})

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
      case "Cured":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200"
      case "Inactive":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  }

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
      case "Cured":
        return <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
      case "Inactive":
        return <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500 mr-2" />
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "dd MMM yyyy")
  }

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </span>
                  Diagnostic Reports
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  View and manage your diagnostic test results, medical history, and treatment plans in one place
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export reports</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share with doctor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <Tabs defaultValue="reports" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList className="mb-4 md:mb-0">
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setActiveFilter("all")}
                        className={activeFilter === "all" ? "bg-accent" : ""}
                      >
                        All Reports
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setActiveFilter("active")}
                        className={activeFilter === "active" ? "bg-accent" : ""}
                      >
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setActiveFilter("cured")}
                        className={activeFilter === "cured" ? "bg-accent" : ""}
                      >
                        Cured
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setActiveFilter("inactive")}
                        className={activeFilter === "inactive" ? "bg-accent" : ""}
                      >
                        Inactive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="reports" className="mt-0">
                <div className="space-y-6">
                  {Object.keys(groupedReports).length > 0 ? (
                    Object.keys(groupedReports).map((group) => (
                      <Card key={group} className="overflow-hidden border-none shadow-sm">
                        <CardHeader className="bg-muted/50 py-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <CardTitle className="text-base font-medium">{group}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {groupedReports[group].map((report) => (
                              <div key={report.id} className="group p-4 md:p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex items-start gap-4">
                                    <Avatar className="hidden md:flex h-12 w-12 border">
                                      <AvatarImage src={report.avatar} alt={report.doctor} />
                                      <AvatarFallback>
                                        {report.doctor
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{report.condition}</h3>
                                        <Badge
                                          variant="outline"
                                          className={`${getStatusColor(report.status)} flex items-center`}
                                        >
                                          {getStatusIcon(report.status)}
                                          {report.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center text-muted-foreground">
                                        <User className="h-3.5 w-3.5 mr-1.5" />
                                        <span className="font-medium text-sm">{report.doctor}</span>
                                        <span className="mx-1.5 text-xs">•</span>
                                        <span className="text-xs">{report.specialty}</span>
                                      </div>
                                      <div className="flex items-center text-muted-foreground">
                                        <Pill className="h-3.5 w-3.5 mr-1.5" />
                                        <span className="font-medium text-sm">{report.medication}</span>
                                        <span className="mx-1.5 text-xs">•</span>
                                        <span className="text-xs">{report.dosage}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0">
                                    <div className="text-right">
                                      <div className="text-xs text-muted-foreground">{formatDate(report.date)}</div>
                                      <div className="text-xs text-muted-foreground">Report #{report.id}</div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      View Details
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="mt-3 pl-0 md:pl-16">
                                  <p className="text-sm text-muted-foreground">{report.notes}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No reports found</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-md">
                          We couldn't find any diagnostic reports matching your search criteria. Try adjusting your
                          filters or search terms.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="medications">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Pill className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Medications Tab</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      This tab would display your current medications, dosage information, and prescription history.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Appointments Tab</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      This tab would display your upcoming and past appointments with healthcare providers.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest health-related activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Appointment scheduled</p>
                      <p className="text-sm text-muted-foreground">
                        You have a new appointment with Dr. Smith on January 15, 2025
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
              <CardDescription>Your current health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blood Pressure</span>
                  <span className="text-sm">120/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blood Sugar</span>
                  <span className="text-sm">95 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Heart Rate</span>
                  <span className="text-sm">72 bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-sm">165 lbs</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View Full Health Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default DiagnosticReports

