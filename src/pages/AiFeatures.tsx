"use client"

import React, { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts"
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Heart,
  Info,
  LineChartIcon,
  MessageSquare,
  Plus,
  Search,
  Send,
  Share2,
  TrendingUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const AiFeatures = () => {
  const [measurementValue, setMeasurementValue] = useState("")
  const [measurementType, setMeasurementType] = useState("heart-rate")
  const [activeTab, setActiveTab] = useState("line")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [readings, setReadings] = useState([
    { id: 1, time: "6:14:58 PM", value: 72, date: "2023-03-21T18:14:58", notes: "At rest" },
    { id: 2, time: "6:15:01 PM", value: 75, date: "2023-03-21T18:15:01", notes: "After standing" },
    { id: 3, time: "6:15:04 PM", value: 79, date: "2023-03-21T18:15:04", notes: "Light activity" },
    { id: 4, time: "6:15:07 PM", value: 74, date: "2023-03-21T18:15:07", notes: "Sitting down" },
    { id: 5, time: "6:15:09 PM", value: 76, date: "2023-03-21T18:15:09", notes: "Reading" },
    { id: 6, time: "6:15:12 PM", value: 73, date: "2023-03-21T18:15:12", notes: "Relaxed" },
    { id: 7, time: "6:15:15 PM", value: 77, date: "2023-03-21T18:15:15", notes: "Watching TV" },
    { id: 8, time: "6:15:18 PM", value: 80, date: "2023-03-21T18:15:18", notes: "After climbing stairs" },
  ])
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: "Hello! I can provide information about various health conditions. What would you like to know about?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [messageInput, setMessageInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedReading, setSelectedReading] = useState(null)

  const measurementTypes = {
    "heart-rate": {
      label: "Heart Rate",
      unit: "bpm",
      icon: Heart,
      color: "#ef4444",
      normalRange: "60-100",
      chartColor: "#ef4444",
    },
    "blood-pressure": {
      label: "Blood Pressure",
      unit: "mmHg",
      icon: Activity,
      color: "#3b82f6",
      normalRange: "90/60-120/80",
      chartColor: "#3b82f6",
    },
    "blood-glucose": {
      label: "Blood Glucose",
      unit: "mg/dL",
      icon: TrendingUp,
      color: "#10b981",
      normalRange: "70-99",
      chartColor: "#10b981",
    },
  }

  const currentType = measurementTypes[measurementType]

  const handleAddMeasurement = () => {
    if (measurementValue) {
      const now = new Date()
      const time = now.toLocaleTimeString("en-US")
      setReadings([
        ...readings,
        {
          id: readings.length + 1,
          time,
          value: Number.parseInt(measurementValue),
          date: now.toISOString(),
          notes: "New measurement",
        },
      ])
      setMeasurementValue("")
    }
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "user",
        content: messageInput,
        timestamp: new Date().toISOString(),
      }

      setMessages([...messages, userMessage])
      setMessageInput("")
      setIsTyping(true)

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          content: getAIResponse(messageInput),
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      }, 1500)
    }
  }

  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("diabetes")) {
      return "Diabetes is a chronic condition that affects how your body turns food into energy. There are three main types: Type 1, Type 2, and gestational diabetes. Symptoms may include increased thirst, frequent urination, hunger, fatigue, and blurred vision. Regular monitoring of blood glucose levels is important for management."
    } else if (lowerQuery.includes("heart") || lowerQuery.includes("cardiac")) {
      return "Heart disease refers to several types of heart conditions. The most common is coronary artery disease, which can lead to heart attack. Symptoms may include chest pain, shortness of breath, and fatigue. Risk factors include high blood pressure, high cholesterol, smoking, and family history."
    } else if (lowerQuery.includes("cough") || lowerQuery.includes("cold")) {
      return "Coughs can be caused by various conditions including the common cold, flu, allergies, or more serious conditions like pneumonia. If a cough persists for more than two weeks, is accompanied by fever, or produces discolored mucus, it's advisable to consult a healthcare professional."
    } else if (lowerQuery.includes("cancer")) {
      return "Cancer is a disease in which some of the body's cells grow uncontrollably and spread to other parts of the body. There are many types of cancer, and early detection is key to successful treatment. Regular screenings and awareness of warning signs are important preventive measures."
    } else {
      return "I don't have specific information about that condition. For accurate medical advice, please consult with a healthcare professional."
    }
  }

  const getValueTrend = () => {
    if (readings.length < 2) return null

    const lastValue = readings[readings.length - 1].value
    const previousValue = readings[readings.length - 2].value

    if (lastValue > previousValue) {
      return { direction: "up", difference: lastValue - previousValue }
    } else if (lastValue < previousValue) {
      return { direction: "down", difference: previousValue - lastValue }
    } else {
      return { direction: "same", difference: 0 }
    }
  }

  const trend = getValueTrend()

  const getTrendColor = () => {
    if (!trend) return "text-gray-500"

    if (measurementType === "heart-rate") {
      if (trend.direction === "up" && readings[readings.length - 1].value > 100) return "text-red-500"
      if (trend.direction === "down" && readings[readings.length - 1].value < 60) return "text-red-500"
    }

    return trend.direction === "up"
      ? "text-emerald-500"
      : trend.direction === "down"
        ? "text-blue-500"
        : "text-gray-500"
  }

  const formatChartData = () => {
    return readings.map((reading, index) => ({
      name: reading.time.split(" ")[0],
      value: reading.value,
      time: reading.time,
      pv: index % 2 === 0 ? reading.value + 5 : reading.value - 5, // For area chart variation
      uv: reading.value, // For additional data series
    }))
  }

  const chartData = formatChartData()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-gray-700">{`${currentType.label}: ${payload[0].value} ${currentType.unit}`}</p>
        </div>
      )
    }
    return null
  }

  const messageEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Filter readings based on search term and active filter
  const filteredReadings = readings.filter((reading) => {
    const matchesSearch =
      reading.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.value.toString().includes(searchTerm)

    if (activeFilter === "all") return matchesSearch
    if (activeFilter === "high") {
      if (measurementType === "heart-rate") {
        return matchesSearch && reading.value > 100
      }
      return matchesSearch
    }
    if (activeFilter === "low") {
      if (measurementType === "heart-rate") {
        return matchesSearch && reading.value < 60
      }
      return matchesSearch
    }
    if (activeFilter === "normal") {
      if (measurementType === "heart-rate") {
        return matchesSearch && reading.value >= 60 && reading.value <= 100
      }
      return matchesSearch
    }
    return matchesSearch
  })

  return (
    <TooltipProvider>
      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <span className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="h-6 w-6 text-primary" />
                    </span>
                    Health Monitoring
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Track your vital signs, analyze trends, and get AI-powered health insights
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
                        <p>Export health data</p>
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
              <Tabs defaultValue="vitals" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <TabsList className="mb-4 md:mb-0 bg-muted/60 p-1">
                    <TabsTrigger
                      value="vitals"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Vital Signs
                    </TabsTrigger>
                    <TabsTrigger
                      value="assistant"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Health Assistant
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Measurement History
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex flex-col md:flex-row gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-1">
                          <currentType.icon className="h-4 w-4 mr-1" style={{ color: currentType.color }} />
                          {currentType.label}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setMeasurementType("heart-rate")}>
                          <Heart className="h-4 w-4 mr-2 text-red-500" />
                          Heart Rate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMeasurementType("blood-pressure")}>
                          <Activity className="h-4 w-4 mr-2 text-blue-500" />
                          Blood Pressure
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setMeasurementType("blood-glucose")}>
                          <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                          Blood Glucose
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <TabsContent value="vitals" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-none shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                              <currentType.icon className="h-5 w-5" style={{ color: currentType.color }} />
                              {currentType.label} Monitoring
                            </CardTitle>
                            <CardDescription>
                              Track and visualize your {currentType.label.toLowerCase()} measurements
                            </CardDescription>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Normal range:{" "}
                            <span className="font-medium">
                              {currentType.normalRange} {currentType.unit}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <Tabs defaultValue="line" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="mb-4 w-fit">
                              <TabsTrigger value="line" className="flex items-center gap-1">
                                <LineChartIcon className="h-4 w-4" />
                                Line
                              </TabsTrigger>
                              <TabsTrigger value="area" className="flex items-center gap-1">
                                <Activity className="h-4 w-4" />
                                Area
                              </TabsTrigger>
                              <TabsTrigger value="bar" className="flex items-center gap-1">
                                <BarChart2 className="h-4 w-4" />
                                Bar
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="line" className="mt-0">
                              <div className="h-[300px] w-full bg-white rounded-lg p-4 border border-gray-100">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                      dataKey="name"
                                      stroke="#888888"
                                      fontSize={12}
                                      tickLine={false}
                                      axisLine={false}
                                    />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke={currentType.chartColor}
                                      strokeWidth={2}
                                      dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                                      activeDot={{ r: 6, strokeWidth: 0, fill: currentType.chartColor }}
                                    />
                                    {measurementType === "heart-rate" && (
                                      <>
                                        <ReferenceLine y={60} stroke="#d1d5db" strokeDasharray="3 3" />
                                        <ReferenceLine y={100} stroke="#d1d5db" strokeDasharray="3 3" />
                                      </>
                                    )}
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>

                            <TabsContent value="area" className="mt-0">
                              <div className="h-[300px] w-full bg-white rounded-lg p-4 border border-gray-100">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                      dataKey="name"
                                      stroke="#888888"
                                      fontSize={12}
                                      tickLine={false}
                                      axisLine={false}
                                    />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke={currentType.chartColor}
                                      fill={`${currentType.chartColor}20`}
                                      strokeWidth={2}
                                    />
                                    {measurementType === "heart-rate" && (
                                      <>
                                        <ReferenceLine y={60} stroke="#d1d5db" strokeDasharray="3 3" />
                                        <ReferenceLine y={100} stroke="#d1d5db" strokeDasharray="3 3" />
                                      </>
                                    )}
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>

                            <TabsContent value="bar" className="mt-0">
                              <div className="h-[300px] w-full bg-white rounded-lg p-4 border border-gray-100">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                      dataKey="name"
                                      stroke="#888888"
                                      fontSize={12}
                                      tickLine={false}
                                      axisLine={false}
                                    />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="value" fill={currentType.chartColor} radius={[4, 4, 0, 0]} />
                                    {measurementType === "heart-rate" && (
                                      <>
                                        <ReferenceLine y={60} stroke="#d1d5db" strokeDasharray="3 3" />
                                        <ReferenceLine y={100} stroke="#d1d5db" strokeDasharray="3 3" />
                                      </>
                                    )}
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">
                              Latest Readings
                            </h3>
                            <div className="flex items-center gap-2">
                              {trend && (
                                <div className={`flex items-center ${getTrendColor()}`}>
                                  {trend.direction === "up" ? (
                                    <ArrowUp className="h-4 w-4" />
                                  ) : trend.direction === "down" ? (
                                    <ArrowDown className="h-4 w-4" />
                                  ) : null}
                                  <span className="text-sm font-medium">
                                    {trend.difference} {currentType.unit}
                                  </span>
                                </div>
                              )}
                              <Badge variant="outline" className="font-normal">
                                <Clock className="h-3 w-3 mr-1" />
                                Last updated: {readings[readings.length - 1]?.time}
                              </Badge>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-4 bg-gray-100 p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <div>Time</div>
                              <div>Value</div>
                              <div>Status</div>
                              <div className="text-right">Actions</div>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-[200px] overflow-y-auto">
                              {readings
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((reading) => {
                                  let status = "Normal"
                                  let statusColor = "bg-emerald-100 text-emerald-800"

                                  if (measurementType === "heart-rate") {
                                    if (reading.value < 60) {
                                      status = "Low"
                                      statusColor = "bg-blue-100 text-blue-800"
                                    } else if (reading.value > 100) {
                                      status = "High"
                                      statusColor = "bg-red-100 text-red-800"
                                    }
                                  }

                                  return (
                                    <div key={reading.id} className="grid grid-cols-4 p-3 text-sm hover:bg-gray-50">
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 text-gray-400 mr-2" />
                                        {reading.time}
                                      </div>
                                      <div className="font-medium">
                                        {reading.value} {currentType.unit}
                                      </div>
                                      <div>
                                        <Badge className={statusColor}>{status}</Badge>
                                      </div>
                                      <div className="text-right">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 gap-1"
                                          onClick={() => setSelectedReading(reading)}
                                        >
                                          View
                                          <ChevronRight className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">Add Measurement</CardTitle>
                        <CardDescription>Record your {currentType.label.toLowerCase()} measurements</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor="measurement" className="text-sm font-medium">
                                {currentType.label} Value
                              </label>
                              <span className="text-xs text-muted-foreground">Unit: {currentType.unit}</span>
                            </div>
                            <div className="relative">
                              <Input
                                id="measurement"
                                type="number"
                                placeholder={`Enter ${currentType.label.toLowerCase()} value`}
                                value={measurementValue}
                                onChange={(e) => setMeasurementValue(e.target.value)}
                                className="pr-12"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                {currentType.unit}
                              </div>
                            </div>
                          </div>

                          <Button className="w-full" onClick={handleAddMeasurement} disabled={!measurementValue}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Measurement
                          </Button>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                          <h3 className="font-semibold mb-4">Health Insights</h3>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                              <div className="flex items-start gap-2">
                                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-blue-700">Measurement Trends</h4>
                                  <p className="text-sm text-blue-600">
                                    Your {currentType.label.toLowerCase()} has been relatively stable over the past 24
                                    hours.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                              <div className="flex items-start gap-2">
                                <Activity className="h-5 w-5 text-emerald-500 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-emerald-700">Healthy Range</h4>
                                  <p className="text-sm text-emerald-600">
                                    Most of your readings are within the normal range of {currentType.normalRange}{" "}
                                    {currentType.unit}.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="assistant" className="mt-0">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Health Assistant
                      </CardTitle>
                      <CardDescription>Ask questions about health conditions and get AI-powered advice</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-col h-[500px]">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          <AnimatePresence>
                            {messages.map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                                >
                                  <Avatar className={message.sender === "user" ? "bg-primary" : "bg-muted"}>
                                    <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
                                  </Avatar>
                                  <div
                                    className={`rounded-lg p-3 ${
                                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                    }`}
                                  >
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                      {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}

                            {isTyping && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                              >
                                <div className="flex gap-2 max-w-[80%]">
                                  <Avatar className="bg-muted">
                                    <AvatarFallback>AI</AvatarFallback>
                                  </Avatar>
                                  <div className="rounded-lg p-3 bg-muted">
                                    <div className="flex space-x-1">
                                      <div
                                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                      ></div>
                                      <div
                                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                      ></div>
                                      <div
                                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                            <div ref={messageEndRef} />
                          </AnimatePresence>
                        </div>

                        <div className="p-4 border-t">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Ask about diabetes, heart disease, cough, or cancer..."
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault()
                                  handleSendMessage()
                                }
                              }}
                            />
                            <Button size="icon" onClick={handleSendMessage} disabled={!messageInput.trim() || isTyping}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            <AlertCircle className="h-3 w-3 inline mr-1" />
                            For educational purposes only. Consult a healthcare professional for medical advice.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Measurement History
                          </CardTitle>
                          <CardDescription>View and filter your complete measurement history</CardDescription>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Search measurements..."
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
                                All Readings
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setActiveFilter("high")}
                                className={activeFilter === "high" ? "bg-accent" : ""}
                              >
                                High Readings
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setActiveFilter("normal")}
                                className={activeFilter === "normal" ? "bg-accent" : ""}
                              >
                                Normal Readings
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setActiveFilter("low")}
                                className={activeFilter === "low" ? "bg-accent" : ""}
                              >
                                Low Readings
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filteredReadings.length > 0 ? (
                        <div className="space-y-4">
                          {filteredReadings.map((reading) => {
                            let status = "Normal"
                            let statusColor = "bg-emerald-100 text-emerald-800"

                            if (measurementType === "heart-rate") {
                              if (reading.value < 60) {
                                status = "Low"
                                statusColor = "bg-blue-100 text-blue-800"
                              } else if (reading.value > 100) {
                                status = "High"
                                statusColor = "bg-red-100 text-red-800"
                              }
                            }

                            return (
                              <Card
                                key={reading.id}
                                className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow"
                              >
                                <CardContent className="p-0">
                                  <div className="flex flex-col md:flex-row">
                                    <div className="bg-primary/5 p-6 flex items-center justify-center md:w-20">
                                      <currentType.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="p-6 flex-1">
                                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                          <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-semibold">{currentType.label} Reading</h3>
                                            <Badge variant="outline" className={statusColor}>
                                              {status}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground">Recorded on {reading.time}</p>
                                        </div>
                                        <div className="text-3xl font-bold" style={{ color: currentType.color }}>
                                          {reading.value}{" "}
                                          <span className="text-base font-normal text-gray-500">
                                            {currentType.unit}
                                          </span>
                                        </div>
                                      </div>

                                      {reading.notes && (
                                        <div className="bg-muted/30 p-3 rounded-md border border-muted mb-4">
                                          <p className="text-sm text-muted-foreground">{reading.notes}</p>
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
                                                <currentType.icon className="h-5 w-5" />
                                                {currentType.label} Reading Details
                                              </DialogTitle>
                                              <DialogDescription>
                                                Complete details about this measurement
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                              <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                  <h4 className="text-sm font-medium mb-1">Reading Value</h4>
                                                  <p
                                                    className="text-2xl font-bold"
                                                    style={{ color: currentType.color }}
                                                  >
                                                    {reading.value}{" "}
                                                    <span className="text-sm font-normal text-gray-500">
                                                      {currentType.unit}
                                                    </span>
                                                  </p>
                                                </div>
                                                <div>
                                                  <h4 className="text-sm font-medium mb-1">Status</h4>
                                                  <Badge className={statusColor}>{status}</Badge>
                                                </div>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium mb-1">Time Recorded</h4>
                                                <p className="text-sm">{reading.time}</p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium mb-1">Notes</h4>
                                                <p className="text-sm">{reading.notes || "No notes recorded"}</p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium mb-1">Normal Range</h4>
                                                <p className="text-sm">
                                                  {currentType.normalRange} {currentType.unit}
                                                </p>
                                              </div>
                                            </div>
                                          </DialogContent>
                                        </Dialog>
                                        <Button>Update Reading</Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      ) : (
                        <Card className="border-dashed">
                          <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="rounded-full bg-muted p-3 mb-4">
                              <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">No readings found</h3>
                            <p className="text-sm text-muted-foreground text-center max-w-md">
                              We couldn't find any readings matching your search criteria. Try adjusting your filters or
                              search terms.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {selectedReading && (
            <Dialog open={!!selectedReading} onOpenChange={() => setSelectedReading(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <currentType.icon className="h-5 w-5" />
                    {currentType.label} Reading Details
                  </DialogTitle>
                  <DialogDescription>Complete details about this measurement</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Reading Value</h4>
                      <p className="text-2xl font-bold" style={{ color: currentType.color }}>
                        {selectedReading.value}{" "}
                        <span className="text-sm font-normal text-gray-500">{currentType.unit}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Status</h4>
                      <Badge
                        className={
                          selectedReading.value < 60
                            ? "bg-blue-100 text-blue-800"
                            : selectedReading.value > 100
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                        }
                      >
                        {selectedReading.value < 60 ? "Low" : selectedReading.value > 100 ? "High" : "Normal"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Time Recorded</h4>
                    <p className="text-sm">{selectedReading.time}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                    <p className="text-sm">{selectedReading.notes || "No notes recorded"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Normal Range</h4>
                    <p className="text-sm">
                      {currentType.normalRange} {currentType.unit}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default AiFeatures

