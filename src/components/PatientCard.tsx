import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Phone, Mail, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    email: string
    phone: string
    avatar?: string
    dateOfBirth: string
    status: "active" | "inactive" | "critical"
    lastVisit: string
  }
  className?: string
}

export const PatientCard = ({ patient, className }: PatientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border-gray-200 dark:border-gray-700"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md group",
        patient.status === "critical" ? "border-red-200 dark:border-red-900/50" : "",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-14 w-14 border-2 border-white shadow-sm ring-2 ring-primary/10">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white text-lg">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{patient.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-primary/70" />
              DOB: {patient.dateOfBirth}
            </p>
            <Badge variant="outline" className={cn("mt-1", getStatusColor(patient.status))}>
              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center text-sm rounded-md p-2 bg-secondary/50 group-hover:bg-secondary transition-colors">
            <Phone className="mr-2 h-3.5 w-3.5 text-primary" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm rounded-md p-2 bg-secondary/50 group-hover:bg-secondary transition-colors">
            <Mail className="mr-2 h-3.5 w-3.5 text-primary" />
            <span className="truncate">{patient.email}</span>
          </div>
          <div className="flex items-center text-sm rounded-md p-2 bg-secondary/50 group-hover:bg-secondary transition-colors">
            <FileText className="mr-2 h-3.5 w-3.5 text-primary" />
            <span>Last visit: {patient.lastVisit}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
        <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/50 transition-colors">
          View Records
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300 group"
        >
          Schedule
          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

