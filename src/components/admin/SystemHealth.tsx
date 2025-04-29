import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const systemMetrics = [
  {
    name: "CPU Usage",
    value: 45,
    status: "Normal",
  },
  {
    name: "Memory Usage",
    value: 60,
    status: "Warning",
  },
  {
    name: "Disk Space",
    value: 75,
    status: "Warning",
  },
  {
    name: "Network Load",
    value: 30,
    status: "Normal",
  },
];

const systemStatus = [
  {
    name: "Database",
    status: "Operational",
    lastChecked: "1 minute ago",
  },
  {
    name: "API Services",
    status: "Operational",
    lastChecked: "1 minute ago",
  },
  {
    name: "Authentication",
    status: "Operational",
    lastChecked: "1 minute ago",
  },
  {
    name: "File Storage",
    status: "Operational",
    lastChecked: "1 minute ago",
  },
];

export function SystemHealth() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>System Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemMetrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <Badge
                  variant={
                    metric.status === "Normal"
                      ? "default"
                      : metric.status === "Warning"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {metric.status}
                </Badge>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((status) => (
              <div
                key={status.name}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{status.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Last checked: {status.lastChecked}
                  </p>
                </div>
                <Badge
                  variant={
                    status.status === "Operational" ? "default" : "destructive"
                  }
                >
                  {status.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
