"use client"

import { useState } from "react"
import {
  AlertCircle,
  Calendar,
  ClipboardList,
  Download,
  FileText,
  Filter,
  Heart,
  Info,
  Pill,
  Plus,
  Search,
  Share2,
  Stethoscope,
  Truck,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type MedicalRecordType = "condition" | "procedure" | "allergy" | "appointment" | "transfer"

interface TimelineItem {
  id: number
  type: MedicalRecordType
  title: string
  date: string
  provider: string
  icon: any
}

const MedicalHistory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Sample medical history data
  const conditions = [
    {
      id: 1,
      title: "Hypertension",
      diagnosed: "2020-05-15",
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      hospital: "City Hospital",
      management: "Well controlled with medication",
      status: "Ongoing",
      severity: "Moderate",
      medications: ["Lisinopril 10mg", "Hydrochlorothiazide 12.5mg"],
      lastChecked: "2023-11-10",
      notes:
        "Blood pressure has been stable for the past 6 months. Continue current medication regimen and monitor regularly.",
      icon: Heart,
    },
    {
      id: 2,
      title: "Type 2 Diabetes",
      diagnosed: "2019-08-22",
      doctor: "Dr. Johnson",
      specialty: "Endocrinologist",
      hospital: "General Health Clinic",
      management: "Managing through diet and medication",
      status: "Ongoing",
      severity: "Moderate",
      medications: ["Metformin 500mg", "Glipizide 5mg"],
      lastChecked: "2023-12-05",
      notes: "HbA1c levels have improved with current treatment plan. Continue monitoring blood glucose levels daily.",
      icon: Pill,
    },
    {
      id: 3,
      title: "Asthma",
      diagnosed: "2015-03-10",
      doctor: "Dr. Williams",
      specialty: "Pulmonologist",
      hospital: "Respiratory Care Center",
      management: "Controlled with inhalers",
      status: "Ongoing",
      severity: "Mild",
      medications: ["Albuterol inhaler", "Fluticasone inhaler"],
      lastChecked: "2023-10-18",
      notes: "Symptoms well controlled. Use rescue inhaler as needed during physical activity or exposure to triggers.",
      icon: Stethoscope,
    },
  ]

  const procedures = [
    {
      id: 1,
      title: "Appendectomy",
      date: "2020-03-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Surgeon",
      hospital: "Memorial Hospital",
      type: "Surgical",
      duration: "45 minutes",
      anesthesia: "General",
      recovery: "2 weeks",
      notes: "Successful procedure with no complications. Follow-up appointment scheduled for two weeks post-surgery.",
      documents: ["Surgical Report", "Discharge Summary"],
      icon: FileText,
    },
    {
      id: 2,
      title: "Colonoscopy",
      date: "2022-06-22",
      doctor: "Dr. Michael Chen",
      specialty: "Gastroenterologist",
      hospital: "Digestive Health Center",
      type: "Diagnostic",
      duration: "30 minutes",
      anesthesia: "Conscious sedation",
      recovery: "1 day",
      notes: "Routine screening colonoscopy. No polyps or abnormalities detected. Recommended follow-up in 5 years.",
      documents: ["Procedure Report", "Pathology Report"],
      icon: FileText,
    },
  ]

  const allergies = [
    {
      id: 1,
      allergen: "Penicillin",
      severity: "Moderate",
      reaction: "Rash, hives",
      diagnosed: "2015-09-12",
      doctor: "Dr. Roberts",
      hospital: "Allergy & Immunology Clinic",
      notes: "Avoid all penicillin-based antibiotics. Alternative antibiotics should be prescribed when needed.",
      lastReaction: "2015-09-10",
      icon: AlertCircle,
    },
    {
      id: 2,
      allergen: "Peanuts",
      severity: "Severe",
      reaction: "Anaphylaxis, difficulty breathing",
      diagnosed: "2010-05-18",
      doctor: "Dr. Garcia",
      hospital: "Children's Hospital",
      notes:
        "Carries EpiPen at all times. Avoid all products containing peanuts or processed in facilities with peanuts.",
      lastReaction: "2010-05-15",
      icon: AlertCircle,
    },
  ]

  const appointments = [
    {
      id: 1,
      date: "2023-06-10",
      time: "10:30 AM",
      doctor: "Dr. Williams",
      specialty: "Cardiology",
      department: "Cardiology",
      hospital: "Heart & Vascular Institute",
      reason: "Annual checkup",
      status: "Completed",
      followUp: "Schedule next appointment in 6 months",
      notes: "Blood pressure readings were normal. Continue current medication regimen.",
      icon: Calendar,
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "2:00 PM",
      doctor: "Dr. Johnson",
      specialty: "Endocrinology",
      department: "Endocrinology",
      hospital: "Diabetes Care Center",
      reason: "Diabetes management",
      status: "Scheduled",
      followUp: "N/A",
      notes: "Bring blood glucose logs and list of current medications.",
      icon: Calendar,
    },
  ]

  const transfers = [
    {
      id: 1,
      date: "2021-08-05",
      from: "City Hospital",
      fromDepartment: "Emergency Room",
      to: "Specialized Care Center",
      toDepartment: "Cardiology Unit",
      reason: "Specialized cardiac treatment",
      doctor: "Dr. Anderson",
      transportMethod: "Ambulance",
      status: "Completed",
      notes: "Patient transferred for specialized cardiac care following acute myocardial infarction.",
      documents: ["Transfer Summary", "Medical Records"],
      icon: Truck,
    },
    {
      id: 2,
      date: "2022-11-12",
      from: "General Health Clinic",
      fromDepartment: "Outpatient Care",
      to: "University Medical Center",
      toDepartment: "Neurology Department",
      reason: "Advanced diagnostic testing",
      doctor: "Dr. Patel",
      transportMethod: "Patient transport",
      status: "Completed",
      notes: "Patient transferred for specialized neurological evaluation and MRI studies.",
      documents: ["Referral Letter", "Test Results"],
      icon: Truck,
    },
  ]

  // Filter data based on search term and active filter
  const filterData = (data) => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (activeFilter === "all") return matchesSearch
      if (activeFilter === "recent") {
        const itemDate = item.date || item.diagnosed || item.lastChecked
        if (!itemDate) return false
        const date = new Date(itemDate)
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        return matchesSearch && date >= threeMonthsAgo
      }
      return matchesSearch
    })
  }

  const filteredConditions = filterData(conditions)
  const filteredProcedures = filterData(procedures)
  const filteredAllergies = filterData(allergies)
  const filteredAppointments = filterData(appointments)
  const filteredTransfers = filterData(transfers)

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "ongoing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "scheduled":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Get severity badge styling
  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case "mild":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "severe":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </span>
                  Medical History
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  View and manage your complete medical history, including conditions, procedures, allergies, and more
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
                      <p>Export medical history</p>
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
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <Tabs defaultValue="conditions" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList className="mb-4 md:mb-0 bg-muted/60 p-1">
                  <TabsTrigger
                    value="conditions"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Conditions
                  </TabsTrigger>
                  <TabsTrigger
                    value="procedures"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Procedures
                  </TabsTrigger>
                  <TabsTrigger
                    value="allergies"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Allergies
                  </TabsTrigger>
                  <TabsTrigger
                    value="appointments"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointments
                  </TabsTrigger>
                  <TabsTrigger
                    value="transfers"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Transfers
                  </TabsTrigger>
                </TabsList>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
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
                        All Records
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setActiveFilter("recent")}
                        className={activeFilter === "recent" ? "bg-accent" : ""}
                      >
                        Recent (Last 3 Months)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="conditions" className="mt-0 space-y-6">
                {filteredConditions.length > 0 ? (
                  filteredConditions.map((condition) => (
                    <Card
                      key={condition.id}
                      className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-primary/5 p-6 flex items-center justify-center md:w-20">
                            <condition.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">{condition.title}</h3>
                                  <Badge variant="outline" className={`${getStatusBadge(condition.status)}`}>
                                    {condition.status}
                                  </Badge>
                                  <Badge variant="outline" className={`${getSeverityBadge(condition.severity)}`}>
                                    {condition.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Diagnosed on {formatDate(condition.diagnosed)} • Last checked{" "}
                                  {formatDate(condition.lastChecked)}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Healthcare Provider</h4>
                                <p className="text-sm text-muted-foreground">
                                  {condition.doctor} • {condition.specialty}
                                </p>
                                <p className="text-sm text-muted-foreground">{condition.hospital}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Management</h4>
                                <p className="text-sm text-muted-foreground">{condition.management}</p>
                              </div>
                            </div>

                            {condition.medications && condition.medications.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-1">Medications</h4>
                                <div className="flex flex-wrap gap-2">
                                  {condition.medications.map((med, index) => (
                                    <Badge key={index} variant="secondary" className="bg-muted">
                                      <Pill className="h-3 w-3 mr-1" />
                                      {med}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {condition.notes && (
                              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                                <p className="text-sm text-muted-foreground">{condition.notes}</p>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <condition.icon className="h-5 w-5" />
                                      {condition.title}
                                    </DialogTitle>
                                    <DialogDescription>Complete details about this condition</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-sm font-medium mb-1">Status</h4>
                                        <Badge variant="outline" className={`${getStatusBadge(condition.status)}`}>
                                          {condition.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium mb-1">Severity</h4>
                                        <Badge variant="outline" className={`${getSeverityBadge(condition.severity)}`}>
                                          {condition.severity}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Diagnosed</h4>
                                      <p className="text-sm">{formatDate(condition.diagnosed)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Healthcare Provider</h4>
                                      <p className="text-sm">
                                        {condition.doctor} ({condition.specialty})
                                      </p>
                                      <p className="text-sm text-muted-foreground">{condition.hospital}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Management</h4>
                                      <p className="text-sm">{condition.management}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Medications</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {condition.medications.map((med, index) => (
                                          <Badge key={index} variant="secondary">
                                            <Pill className="h-3 w-3 mr-1" />
                                            {med}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Notes</h4>
                                      <p className="text-sm">{condition.notes}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button>Update Record</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Heart className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No conditions found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        We couldn't find any conditions matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="procedures" className="mt-0 space-y-6">
                {filteredProcedures.length > 0 ? (
                  filteredProcedures.map((procedure) => (
                    <Card
                      key={procedure.id}
                      className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-primary/5 p-6 flex items-center justify-center md:w-20">
                            <procedure.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">{procedure.title}</h3>
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                    {procedure.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Performed on {formatDate(procedure.date)} • Duration: {procedure.duration}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Healthcare Provider</h4>
                                <p className="text-sm text-muted-foreground">
                                  {procedure.doctor} • {procedure.specialty}
                                </p>
                                <p className="text-sm text-muted-foreground">{procedure.hospital}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Details</h4>
                                <p className="text-sm text-muted-foreground">Anesthesia: {procedure.anesthesia}</p>
                                <p className="text-sm text-muted-foreground">Recovery: {procedure.recovery}</p>
                              </div>
                            </div>

                            {procedure.documents && procedure.documents.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-1">Documents</h4>
                                <div className="flex flex-wrap gap-2">
                                  {procedure.documents.map((doc, index) => (
                                    <Badge key={index} variant="secondary" className="bg-muted">
                                      <FileText className="h-3 w-3 mr-1" />
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {procedure.notes && (
                              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                                <p className="text-sm text-muted-foreground">{procedure.notes}</p>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <procedure.icon className="h-5 w-5" />
                                      {procedure.title}
                                    </DialogTitle>
                                    <DialogDescription>Complete details about this procedure</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">{/* Procedure details would go here */}</div>
                                </DialogContent>
                              </Dialog>
                              <Button>Update Record</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Stethoscope className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No procedures found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        We couldn't find any procedures matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="allergies" className="mt-0 space-y-6">
                {filteredAllergies.length > 0 ? (
                  filteredAllergies.map((allergy) => (
                    <Card
                      key={allergy.id}
                      className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-red-50 p-6 flex items-center justify-center md:w-20">
                            <allergy.icon className="h-8 w-8 text-red-500" />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">{allergy.allergen}</h3>
                                  <Badge variant="outline" className={`${getSeverityBadge(allergy.severity)}`}>
                                    {allergy.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Diagnosed on {formatDate(allergy.diagnosed)} • Last reaction:{" "}
                                  {formatDate(allergy.lastReaction)}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Healthcare Provider</h4>
                                <p className="text-sm text-muted-foreground">{allergy.doctor}</p>
                                <p className="text-sm text-muted-foreground">{allergy.hospital}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Reaction</h4>
                                <p className="text-sm text-muted-foreground">{allergy.reaction}</p>
                              </div>
                            </div>

                            {allergy.notes && (
                              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                                <p className="text-sm text-muted-foreground">{allergy.notes}</p>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <allergy.icon className="h-5 w-5" />
                                      {allergy.allergen}
                                    </DialogTitle>
                                    <DialogDescription>Complete details about this allergy</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">{/* Allergy details would go here */}</div>
                                </DialogContent>
                              </Dialog>
                              <Button>Update Record</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <AlertCircle className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No allergies found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        We couldn't find any allergies matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="appointments" className="mt-0 space-y-6">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-primary/5 p-6 flex items-center justify-center md:w-20">
                            <appointment.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">{appointment.reason}</h3>
                                  <Badge variant="outline" className={`${getStatusBadge(appointment.status)}`}>
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(appointment.date)} at {appointment.time}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Healthcare Provider</h4>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.doctor} • {appointment.specialty}
                                </p>
                                <p className="text-sm text-muted-foreground">{appointment.hospital}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Department</h4>
                                <p className="text-sm text-muted-foreground">{appointment.department}</p>
                                {appointment.followUp && (
                                  <p className="text-sm text-muted-foreground">Follow-up: {appointment.followUp}</p>
                                )}
                              </div>
                            </div>

                            {appointment.notes && (
                              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <appointment.icon className="h-5 w-5" />
                                      Appointment: {formatDate(appointment.date)}
                                    </DialogTitle>
                                    <DialogDescription>Complete details about this appointment</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">{/* Appointment details would go here */}</div>
                                </DialogContent>
                              </Dialog>
                              <Button>{appointment.status === "Scheduled" ? "Reschedule" : "Book Follow-up"}</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No appointments found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        We couldn't find any appointments matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="transfers" className="mt-0 space-y-6">
                {filteredTransfers.length > 0 ? (
                  filteredTransfers.map((transfer) => (
                    <Card
                      key={transfer.id}
                      className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-primary/5 p-6 flex items-center justify-center md:w-20">
                            <transfer.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">Transfer Record</h3>
                                  <Badge variant="outline" className={`${getStatusBadge(transfer.status)}`}>
                                    {transfer.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(transfer.date)} • {transfer.transportMethod}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">From</h4>
                                <p className="text-sm text-muted-foreground">{transfer.from}</p>
                                <p className="text-sm text-muted-foreground">{transfer.fromDepartment}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">To</h4>
                                <p className="text-sm text-muted-foreground">{transfer.to}</p>
                                <p className="text-sm text-muted-foreground">{transfer.toDepartment}</p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-1">Reason</h4>
                              <p className="text-sm text-muted-foreground">{transfer.reason}</p>
                              <p className="text-sm text-muted-foreground">Attending Physician: {transfer.doctor}</p>
                            </div>

                            {transfer.documents && transfer.documents.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-1">Documents</h4>
                                <div className="flex flex-wrap gap-2">
                                  {transfer.documents.map((doc, index) => (
                                    <Badge key={index} variant="secondary" className="bg-muted">
                                      <FileText className="h-3 w-3 mr-1" />
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {transfer.notes && (
                              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                                <p className="text-sm text-muted-foreground">{transfer.notes}</p>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <transfer.icon className="h-5 w-5" />
                                      Transfer: {formatDate(transfer.date)}
                                    </DialogTitle>
                                    <DialogDescription>Complete details about this transfer</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">{/* Transfer details would go here */}</div>
                                </DialogContent>
                              </Dialog>
                              <Button>Request Records</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Truck className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No transfers found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        We couldn't find any transfers matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Health Timeline</CardTitle>
              <CardDescription>Overview of your medical history over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-muted">
                {[...conditions, ...procedures, ...allergies, ...appointments, ...transfers]
                  .sort((a, b) => {
                    const dateA = new Date(a.date || a.diagnosed || a.lastChecked)
                    const dateB = new Date(b.date || b.diagnosed || b.lastChecked)
                    return dateB - dateA
                  })
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary"></div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">
                            {item.title || item.condition || item.allergen || item.reason || "Transfer Record"}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.date || item.diagnosed || item.lastChecked)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.doctor || item.hospital || item.from || "Medical event"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Medical Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Healthcare Provider
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-2" />
                  Privacy Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MedicalHistory

