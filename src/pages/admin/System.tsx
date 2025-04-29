import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertCircle,
  Database,
  Download,
  HardDrive,
  LineChart,
  CircuitBoard,
  Server,
  Cpu,
  RefreshCw,
} from "lucide-react";

// Sample data - replace with actual monitoring data
const serverStatus = {
  cpu: 45,
  memory: 68,
  disk: 52,
  uptime: "99.9%",
  lastRestart: "15 days ago",
  activeConnections: 256,
};

const recentAlerts = [
  {
    id: 1,
    type: "Warning",
    message: "High CPU usage detected",
    timestamp: "10 minutes ago",
    status: "Active",
  },
  {
    id: 2,
    type: "Info",
    message: "System backup completed",
    timestamp: "1 hour ago",
    status: "Resolved",
  },
  // Add more alerts...
];

const services = [
  {
    id: 1,
    name: "Authentication Service",
    status: "Operational",
    uptime: "99.9%",
    responseTime: "45ms",
  },
  {
    id: 2,
    name: "Database Service",
    status: "Operational",
    uptime: "99.8%",
    responseTime: "120ms",
  },
  // Add more services...
];

export default function System() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Health</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStatus.cpu}%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${serverStatus.cpu}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <CircuitBoard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStatus.memory}%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${serverStatus.memory}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStatus.disk}%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${serverStatus.disk}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Connections
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serverStatus.activeConnections}
            </div>
            <p className="text-xs text-muted-foreground">
              System Uptime: {serverStatus.uptime}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Services Status */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Services Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Response Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          service.status === "Operational"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.uptime}</TableCell>
                    <TableCell>{service.responseTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <AlertCircle
                    className={`h-8 w-8 ${
                      alert.type === "Warning"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alert.timestamp}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.status === "Active" ? "destructive" : "secondary"
                    }
                  >
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
