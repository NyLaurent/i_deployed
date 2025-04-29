"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserRound,
  Phone,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Patient {
  id: string
  name: string
  phone: string
  description: string
  avatar?: string
  status?: "active" | "pending" | "inactive"
  lastVisit?: string
  nextAppointment?: string
  tags?: string[]
}

const SAMPLE_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Manzi Seka Prince",
    phone: "+191 08293661",
    description: "Recently diagnosed with hypertension. Prescribed medication and recommended lifestyle changes.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastVisit: "2023-06-15",
    nextAppointment: "2023-07-10",
    tags: ["Hypertension", "Regular Check-up"],
  },
  {
    id: "2",
    name: "Hirwa Shema Terry",
    phone: "+191 08293661",
    description: "Recovering from minor surgery. Follow-up appointment scheduled for wound check.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastVisit: "2023-06-12",
    nextAppointment: "2023-06-26",
    tags: ["Post-Surgery", "Follow-up"],
  },
  {
    id: "3",
    name: "Watsi IBM",
    phone: "+191 08293661",
    description: "Prenatal care patient in second trimester. All tests normal so far.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastVisit: "2023-06-08",
    nextAppointment: "2023-07-06",
    tags: ["Prenatal", "Second Trimester"],
  },
  {
    id: "4",
    name: "Jane Doe",
    phone: "+191 08293661",
    description: "Chronic asthma patient. Recent exacerbation due to seasonal allergies.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    lastVisit: "2023-05-30",
    nextAppointment: "2023-06-30",
    tags: ["Asthma", "Allergies"],
  },
  {
    id: "5",
    name: "Blackman",
    phone: "+191 08293661",
    description: "Annual physical examination. No significant findings. Recommended routine blood work.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    lastVisit: "2023-04-15",
    tags: ["Annual Physical", "Routine"],
  },
  {
    id: "6",
    name: "Sarah Johnson",
    phone: "+191 08293661",
    description: "Diabetes management. Blood sugar levels have improved with current medication regimen.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastVisit: "2023-06-10",
    nextAppointment: "2023-07-15",
    tags: ["Diabetes", "Chronic Care"],
  },
  {
    id: "7",
    name: "Michael Chen",
    phone: "+191 08293661",
    description: "Physical therapy for shoulder injury. Showing good progress with exercises.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastVisit: "2023-06-14",
    nextAppointment: "2023-06-28",
    tags: ["Physical Therapy", "Injury"],
  },
]

const TrackEntries = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const patientsPerPage = 5

  // Filter patients based on search query and active tab
  const filteredPatients = SAMPLE_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && patient.status === "active"
    if (activeTab === "pending") return matchesSearch && patient.status === "pending"
    if (activeTab === "inactive") return matchesSearch && patient.status === "inactive"

    return matchesSearch
  })

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (!sortField) return 0

    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }

    if (sortField === "lastVisit") {
      if (!a.lastVisit) return 1
      if (!b.lastVisit) return -1
      return sortDirection === "asc"
        ? new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime()
        : new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    }

    return 0
  })

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = sortedPatients.slice(indexOfFirstPatient, indexOfLastPatient)
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage)

  const togglePatientSelection = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
    )
  }

  const toggleAllPatients = () => {
    if (selectedPatients.length === currentPatients.length) {
      setSelectedPatients([])
    } else {
      setSelectedPatients(currentPatients.map((patient) => patient.id))
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200">
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200">
            Pending
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 hover:bg-slate-200">
            Inactive
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-lg">
                  <UserRound className="h-6 w-6 text-primary" />
                </span>
                Outpatient Tracking
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Manage and track outpatient records, appointments, and patient information
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1 bg-white/80 dark:bg-slate-800/80">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Patient</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>{filteredPatients.length} patients found</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-[300px]"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="recent">Recent Visits</SelectItem>
                    <SelectItem value="upcoming">Upcoming Appointments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  All Patients
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="inactive"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedPatients.length === currentPatients.length && currentPatients.length > 0}
                        onCheckedChange={toggleAllPatients}
                        aria-label="Select all patients"
                      />
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                        onClick={() => handleSort("name")}
                      >
                        Patient
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                        onClick={() => handleSort("lastVisit")}
                      >
                        Last Visit
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Next Appointment</TableHead>
                    <TableHead className="hidden lg:table-cell">Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2 opacity-20" />
                          <p className="text-lg font-medium">No patients found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPatients.map((patient) => (
                      <TableRow key={patient.id} className="group hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedPatients.includes(patient.id)}
                            onCheckedChange={() => togglePatientSelection(patient.id)}
                            aria-label={`Select ${patient.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-3 w-3 mr-1" />
                                {patient.phone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(patient.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{formatDate(patient.lastVisit)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {patient.nextAppointment ? (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{formatDate(patient.nextAppointment)}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {patient.tags?.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-primary/5 border-primary/20">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Send message</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Medical History</DropdownMenuItem>
                                <DropdownMenuItem>Add Notes</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstPatient + 1}-{Math.min(indexOfLastPatient, filteredPatients.length)} of{" "}
              {filteredPatients.length} patients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {selectedPatients.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border p-4 flex items-center gap-4 z-10">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="font-medium">{selectedPatients.length} patients selected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button>
              <Button size="sm">Schedule</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackEntries

