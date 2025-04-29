"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Plus,
  FileText,
  Calendar,
  AlertCircle,
  Download,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  Trash2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicalRecord {
  id: number
  date: string
  facility: string
  type: string
  severity?: string
  status?: string
  relation?: string
  dosage?: string
  duration?: string
  result?: string
  reason?: string
}

interface MedicalRecordProps {
  title: string
  records: MedicalRecord[]
  totalRecords: Record<string, { count: number; severity?: string }>
  onBack: () => void
}

export default function MedicalRecordContent({ title, records, totalRecords, onBack }: MedicalRecordProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter records based on search query
  const filteredRecords = records.filter(
    (record) =>
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Determine the appropriate icon and color based on record type or severity
  const getRecordStatusInfo = (record: MedicalRecord) => {
    // Default values
    let icon = FileText
    let color = "text-blue-600"
    let bgColor = "bg-blue-100"

    if (record.severity) {
      switch (record.severity.toLowerCase()) {
        case "severe":
          icon = AlertCircle
          color = "text-red-600"
          bgColor = "bg-red-100"
          break
        case "moderate":
          icon = AlertCircle
          color = "text-orange-600"
          bgColor = "bg-orange-100"
          break
        case "mild":
          icon = AlertCircle
          color = "text-yellow-600"
          bgColor = "bg-yellow-100"
          break
        default:
          break
      }
    } else if (record.status) {
      switch (record.status.toLowerCase()) {
        case "completed":
        case "active":
          color = "text-green-600"
          bgColor = "bg-green-100"
          break
        case "pending":
        case "in progress":
        case "enrolled":
          color = "text-blue-600"
          bgColor = "bg-blue-100"
          break
        default:
          break
      }
    } else if (record.relation) {
      color = "text-purple-600"
      bgColor = "bg-purple-100"
    } else if (record.dosage) {
      color = "text-emerald-600"
      bgColor = "bg-emerald-100"
    } else if (record.duration) {
      icon = Clock
      color = "text-amber-600"
      bgColor = "bg-amber-100"
    } else if (record.result) {
      color = "text-indigo-600"
      bgColor = "bg-indigo-100"
    } else if (record.reason) {
      color = "text-rose-600"
      bgColor = "bg-rose-100"
    }

    return { icon: icon, color, bgColor }
  }

  // Get appropriate badge color based on status/severity
  const getBadgeClass = (record: MedicalRecord) => {
    if (record.severity) {
      switch (record.severity.toLowerCase()) {
        case "severe":
          return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200"
        case "moderate":
          return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200"
        case "mild":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200"
        default:
          return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200"
      }
    }

    if (record.status) {
      switch (record.status.toLowerCase()) {
        case "active":
        case "completed":
          return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200"
        case "pending":
        case "in progress":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200"
        default:
          return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300 border-slate-200"
      }
    }

    return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300 border-slate-200"
  }

  // Get the appropriate content to display based on record type
  const getRecordContent = (record: MedicalRecord) => {
    if (record.severity) {
      return (
        <p className="text-sm">
          Severity: <span className="font-medium">{record.severity}</span>
        </p>
      )
    }

    if (record.relation) {
      return (
        <p className="text-sm">
          Relation: <span className="font-medium">{record.relation}</span>
        </p>
      )
    }

    if (record.status) {
      return (
        <p className="text-sm">
          Status: <span className="font-medium">{record.status}</span>
        </p>
      )
    }

    if (record.dosage) {
      return (
        <p className="text-sm">
          Dosage: <span className="font-medium">{record.dosage}</span>
        </p>
      )
    }

    if (record.duration) {
      return (
        <p className="text-sm">
          Duration: <span className="font-medium">{record.duration}</span>
        </p>
      )
    }

    if (record.result) {
      return (
        <p className="text-sm">
          Result: <span className="font-medium">{record.result}</span>
        </p>
      )
    }

    if (record.reason) {
      return (
        <p className="text-sm">
          Reason: <span className="font-medium">{record.reason}</span>
        </p>
      )
    }

    return null
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-light-blue bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">Manage and view your {title.toLowerCase()} records</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="pl-10 pr-4 py-2 w-full rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-medical-blue focus:ring-medical-blue/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  >
                    <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter records</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className="rounded-full shadow-lg bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-1">
                <TabsTrigger value="all" className="rounded-md">
                  All
                </TabsTrigger>
                <TabsTrigger value="recent" className="rounded-md">
                  Recent
                </TabsTrigger>
                <TabsTrigger value="critical" className="rounded-md">
                  Critical
                </TabsTrigger>
                <TabsTrigger value="archived" className="hidden md:block rounded-md">
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
              <Select defaultValue="date">
                <SelectTrigger className="w-[180px] h-9 rounded-lg border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest first)</SelectItem>
                  <SelectItem value="dateOld">Date (Oldest first)</SelectItem>
                  <SelectItem value="type">Type (A-Z)</SelectItem>
                  <SelectItem value="facility">Facility (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No records found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery
                  ? `No ${title.toLowerCase()} matching "${searchQuery}"`
                  : `You don't have any ${title.toLowerCase()} records yet.`}
              </p>
              <Button className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" /> Add Your First Record
              </Button>
            </div>
          ) : (
            filteredRecords.map((record) => {
              const { icon: StatusIcon, color, bgColor } = getRecordStatusInfo(record)

              return (
                <Card
                  key={record.id}
                  className="overflow-hidden border-slate-200 dark:border-slate-700 transition-all hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                      {/* Status Icon */}
                      <div className="hidden md:flex items-center justify-center p-6 md:col-span-1">
                        <div className={`p-2 rounded-full ${bgColor} ${color}`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:col-span-9 border-r border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-start gap-4">
                          <div className={`md:hidden p-2 rounded-full ${bgColor} ${color}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{record.type}</h3>
                              <Badge variant="outline" className={`${getBadgeClass(record)}`}>
                                {record.severity || record.status || "Active"}
                              </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                {record.date}
                              </div>
                              <div className="hidden sm:block">•</div>
                              <div>{record.facility}</div>
                            </div>
                            <div className="mt-2 text-slate-600 dark:text-slate-300">{getRecordContent(record)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-4 md:p-6 md:col-span-2 flex justify-end md:justify-center">
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                  <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                  <Download className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit record</DropdownMenuItem>
                              <DropdownMenuItem>Share with doctor</DropdownMenuItem>
                              <DropdownMenuItem>Print record</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Total Records Card */}
          <Card className="md:col-span-2 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Records Summary</h2>
              <div className="space-y-4">
                {Object.entries(totalRecords).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-12 items-center">
                    <div className="col-span-5 sm:col-span-4">
                      <p className="text-sm font-medium">{key}</p>
                    </div>

                    <div className="col-span-5 sm:col-span-6">
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-medical-blue to-medical-light-blue h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(100, (value.count / Object.entries(totalRecords).reduce((acc, [_, val]) => acc + val.count, 0)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="text-sm font-semibold">{value.count}</span>
                      {value.severity && (
                        <Badge
                          variant="outline"
                          className={
                            value.severity.toLowerCase() === "severe"
                              ? "ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200"
                              : "ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200"
                          }
                        >
                          {value.severity}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue">
                  <Plus className="h-4 w-4 mr-2" /> Add New Record
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" /> Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" /> Export Records
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Clean Old Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

