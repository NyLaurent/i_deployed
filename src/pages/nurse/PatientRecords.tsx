 "use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample patient records data
const patientRecords = [
  {
    id: "PR001",
    patientId: "P001",
    patientName: "John Doe",
    age: 45,
    gender: "Male",
    lastVisit: "2024-02-15",
    nextAppointment: "2024-03-15",
    primaryCondition: "Hypertension",
    status: "Active",
    records: {
      medicalHistory: [
        {
          date: "2024-02-15",
          condition: "Hypertension",
          notes: "Blood pressure elevated, prescribed medication",
          doctor: "Dr. Sarah Johnson",
        },
        {
          date: "2024-01-15",
          condition: "Regular Checkup",
          notes: "All vitals normal",
          doctor: "Dr. Sarah Johnson",
        },
      ],
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          startDate: "2024-01-15",
          endDate: "2024-03-15",
        },
      ],
      vitalSigns: [
        {
          date: "2024-02-15",
          bloodPressure: "140/90",
          heartRate: "75",
          temperature: "37.0",
          weight: "75kg",
        },
      ],
    },
  },
  {
    id: "PR002",
    patientId: "P002",
    patientName: "Jane Smith",
    age: 32,
    gender: "Female",
    lastVisit: "2024-02-14",
    nextAppointment: "2024-03-14",
    primaryCondition: "Diabetes Type 2",
    status: "Active",
    records: {
      medicalHistory: [
        {
          date: "2024-02-14",
          condition: "Diabetes Type 2",
          notes: "Blood sugar levels stable",
          doctor: "Dr. Robert Williams",
        },
      ],
      medications: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          startDate: "2024-01-20",
          endDate: "2024-04-20",
        },
      ],
      vitalSigns: [
        {
          date: "2024-02-14",
          bloodPressure: "120/80",
          heartRate: "68",
          temperature: "36.8",
          weight: "62kg",
        },
      ],
    },
  },
  {
    id: "PR003",
    patientId: "P003",
    patientName: "Robert Johnson",
    age: 58,
    gender: "Male",
    lastVisit: "2024-02-13",
    nextAppointment: "2024-02-20",
    primaryCondition: "Heart Disease",
    status: "Critical",
    records: {
      medicalHistory: [
        {
          date: "2024-02-13",
          condition: "Heart Disease",
          notes: "Post-surgery recovery",
          doctor: "Dr. James Wilson",
        },
      ],
      medications: [
        {
          name: "Atorvastatin",
          dosage: "20mg",
          frequency: "Once daily",
          startDate: "2024-02-01",
          endDate: "2024-05-01",
        },
      ],
      vitalSigns: [
        {
          date: "2024-02-13",
          bloodPressure: "135/90",
          heartRate: "85",
          temperature: "38.1",
          weight: "82kg",
        },
      ],
    },
  },
];

export default function PatientRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter records based on search query and selected filter
  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || record.status.toLowerCase() === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patient Records</h2>
          <p className="text-muted-foreground">
            Access and manage patient medical records
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Records
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Records
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Patients
            </CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Critical Cases
            </CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Recent Updates
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Records List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Medical Records</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical-history">Medical History</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="vital-signs">Vital Signs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Primary Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.patientName}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.primaryCondition}</TableCell>
                      <TableCell>{record.lastVisit}</TableCell>
                      <TableCell>{record.nextAppointment}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Critical"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Download Record
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Stethoscope className="h-4 w-4 mr-2" />
                              Update Medical History
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pill className="h-4 w-4 mr-2" />
                              Update Medications
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              Update Vital Signs
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="medical-history">
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {record.patientName} - Medical History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead>Doctor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {record.records.medicalHistory.map((history, index) => (
                            <TableRow key={index}>
                              <TableCell>{history.date}</TableCell>
                              <TableCell>{history.condition}</TableCell>
                              <TableCell>{history.notes}</TableCell>
                              <TableCell>{history.doctor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medications">
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {record.patientName} - Medications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Medication</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {record.records.medications.map((med, index) => (
                            <TableRow key={index}>
                              <TableCell>{med.name}</TableCell>
                              <TableCell>{med.dosage}</TableCell>
                              <TableCell>{med.frequency}</TableCell>
                              <TableCell>{med.startDate}</TableCell>
                              <TableCell>{med.endDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="vital-signs">
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {record.patientName} - Vital Signs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Blood Pressure</TableHead>
                            <TableHead>Heart Rate</TableHead>
                            <TableHead>Temperature</TableHead>
                            <TableHead>Weight</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {record.records.vitalSigns.map((vitals, index) => (
                            <TableRow key={index}>
                              <TableCell>{vitals.date}</TableCell>
                              <TableCell>{vitals.bloodPressure}</TableCell>
                              <TableCell>{vitals.heartRate}</TableCell>
                              <TableCell>{vitals.temperature}°C</TableCell>
                              <TableCell>{vitals.weight}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}