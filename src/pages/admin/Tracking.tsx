import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  Download,
  Search,
  SlidersHorizontal,
  UserCheck,
  UserX,
} from "lucide-react";

// Sample data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    patients: 45,
    rating: 4.8,
    status: "Active",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    patients: 38,
    rating: 4.9,
    status: "Active",
    lastActive: "5 minutes ago",
  },
  // Add more doctors...
];

const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    doctor: "Dr. Sarah Johnson",
    condition: "Stable",
    lastVisit: "2024-03-15",
    nextAppointment: "2024-04-01",
  },
  {
    id: 2,
    name: "Emma Wilson",
    age: 32,
    doctor: "Dr. Michael Chen",
    condition: "Under Treatment",
    lastVisit: "2024-03-18",
    nextAppointment: "2024-03-25",
  },
  // Add more patients...
];

const labs = [
  {
    id: 1,
    name: "Central Medical Lab",
    testsToday: 28,
    pendingResults: 5,
    status: "Operational",
    efficiency: "98%",
  },
  {
    id: 2,
    name: "LifeCare Diagnostics",
    testsToday: 35,
    pendingResults: 8,
    status: "Operational",
    efficiency: "95%",
  },
  // Add more labs...
];

export default function Tracking() {
  const [activeTab, setActiveTab] = useState("doctors");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Tracking Dashboard
        </h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Doctors Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">
                          {doctor.name}
                        </TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell>
                          <span className="text-yellow-500">★</span>{" "}
                          {doctor.rating}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doctor.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doctor.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Patients Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Assigned Doctor</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.doctor}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              patient.condition === "Stable"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {patient.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.nextAppointment}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Labs Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lab Name</TableHead>
                      <TableHead>Tests Today</TableHead>
                      <TableHead>Pending Results</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labs.map((lab) => (
                      <TableRow key={lab.id}>
                        <TableCell className="font-medium">
                          {lab.name}
                        </TableCell>
                        <TableCell>{lab.testsToday}</TableCell>
                        <TableCell>{lab.pendingResults}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              lab.status === "Operational"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {lab.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-500">
                            {lab.efficiency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
