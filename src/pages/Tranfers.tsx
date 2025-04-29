import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Building2,
  User,
  FileText,
  Download,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Transfers = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for transfers
  const transfers = [
    {
      id: 1,
      patientName: "John Doe",
      fromFacility: "City General Hospital",
      toFacility: "Regional Medical Center",
      transferDate: "2024-03-15",
      transferTime: "10:30 AM",
      status: "completed",
      reason: "Specialized care required",
      notes: "Patient stable during transfer",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      fromFacility: "Community Clinic",
      toFacility: "City General Hospital",
      transferDate: "2024-03-14",
      transferTime: "02:15 PM",
      status: "scheduled",
      reason: "Emergency care needed",
      notes: "Waiting for ambulance",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      fromFacility: "Regional Medical Center",
      toFacility: "Specialty Hospital",
      transferDate: "2024-03-13",
      transferTime: "09:00 AM",
      status: "in-progress",
      reason: "Specialized treatment",
      notes: "Transfer in progress",
    },
  ];

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "in-progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Patient Transfers
            </h1>
            <p className="text-muted-foreground">
              Manage and track patient transfers between facilities
            </p>
          </div>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Transfer
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Transfer Records</CardTitle>
            <CardDescription>
              View and manage all patient transfer records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transfers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Transfers</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Scheduled</DropdownMenuItem>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Transfers Table */}
            <div className="mt-6 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>From Facility</TableHead>
                    <TableHead>To Facility</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">
                        {transfer.patientName}
                      </TableCell>
                      <TableCell>{transfer.fromFacility}</TableCell>
                      <TableCell>{transfer.toFacility}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(transfer.transferDate)}
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {transfer.transferTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            transfer.status
                          )}`}
                        >
                          {transfer.status.charAt(0).toUpperCase() +
                            transfer.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Transfers;
