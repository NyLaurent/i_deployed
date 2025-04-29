"use client"

import { useEffect, useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, TrendingUp, Droplets, Scale } from "lucide-react"

// Sample data for different vitals
const getVitalData = (type: string) => {
  const baseData = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
  ]

  switch (type) {
    case "heart-rate":
      return baseData.map((entry) => ({
        ...entry,
        value: Math.floor(Math.random() * 20) + 60, // 60 - 80 bpm
      }))
    case "blood-pressure":
      return baseData.map((entry) => ({
        ...entry,
        systolic: Math.floor(Math.random() * 30) + 110, // 110 - 140 mmHg
        diastolic: Math.floor(Math.random() * 20) + 70, // 70 - 90 mmHg
      }))
    case "glucose":
      return baseData.map((entry) => ({
        ...entry,
        value: Math.floor(Math.random() * 40) + 80, // 80 - 120 mg/dL
      }))
    case "weight":
      return baseData.map((entry, index) => ({
        ...entry,
        value: 70 + Math.sin(index * 0.5) * 2, // Slight variations around 70 kg
      }))
    default:
      return baseData
  }
}

interface VitalChartProps {
  className?: string
}

export const VitalChart = ({ className }: VitalChartProps) => {
  const [vitalType, setVitalType] = useState("heart-rate")
  const [data, setData] = useState(getVitalData(vitalType))
  const [animate, setAnimate] = useState(false)

  // Update data when vital type changes
  useEffect(() => {
    setData(getVitalData(vitalType))
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [vitalType])

  const getChartConfig = () => {
    switch (vitalType) {
      case "heart-rate":
        return {
          title: "Heart Rate",
          unit: "bpm",
          color: "#f43f5e",
          gradientStart: "rgba(244, 63, 94, 0.2)",
          gradientEnd: "rgba(244, 63, 94, 0)",
          dataKey: "value",
          icon: Activity,
        }
      case "blood-pressure":
        return {
          title: "Blood Pressure",
          unit: "mmHg",
          color1: "#0ea5e9",
          color2: "#6366f1",
          gradientStart1: "rgba(14, 165, 233, 0.2)",
          gradientEnd1: "rgba(14, 165, 233, 0)",
          gradientStart2: "rgba(99, 102, 241, 0.2)",
          gradientEnd2: "rgba(99, 102, 241, 0)",
          dataKey1: "systolic",
          dataKey2: "diastolic",
          icon: TrendingUp,
        }
      case "glucose":
        return {
          title: "Blood Glucose",
          unit: "mg/dL",
          color: "#10b981",
          gradientStart: "rgba(16, 185, 129, 0.2)",
          gradientEnd: "rgba(16, 185, 129, 0)",
          dataKey: "value",
          icon: Droplets,
        }
      case "weight":
        return {
          title: "Weight",
          unit: "kg",
          color: "#8b5cf6",
          gradientStart: "rgba(139, 92, 246, 0.2)",
          gradientEnd: "rgba(139, 92, 246, 0)",
          dataKey: "value",
          icon: Scale,
        }
      default:
        return {
          title: "Vital Signs",
          unit: "",
          color: "#6366f1",
          gradientStart: "rgba(99, 102, 241, 0.2)",
          gradientEnd: "rgba(99, 102, 241, 0)",
          dataKey: "value",
          icon: Activity,
        }
    }
  }

  const config = getChartConfig()
  const Icon = config.icon

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
        <div className="flex items-center">
          <div className="p-2 mr-3 rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-md font-semibold">{config.title}</CardTitle>
        </div>
        <Select value={vitalType} onValueChange={setVitalType}>
          <SelectTrigger className="w-36 h-8 text-xs border-primary/20">
            <SelectValue placeholder="Select vital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="heart-rate">Heart Rate</SelectItem>
            <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
            <SelectItem value="glucose">Glucose</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-1 pt-4">
        <div className={`h-[280px] transition-opacity duration-300 ${animate ? "opacity-0" : "opacity-100"}`}>
          <ResponsiveContainer width="100%" height="100%">
            {vitalType === "blood-pressure" ? (
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSystolic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color1} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={config.color1} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDiastolic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color2} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={config.color2} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value} ${config.unit}`,
                    name === "systolic" ? "Systolic" : "Diastolic",
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic"
                  stroke={config.color1}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSystolic)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic"
                  stroke={config.color2}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorDiastolic)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                  formatter={(value: number) => [`${value} ${config.unit}`, config.title]}
                />
                <Area
                  type="monotone"
                  dataKey={config.dataKey}
                  name={config.title}
                  stroke={config.color}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

