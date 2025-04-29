import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: "Dr. Sarah Johnson",
    action: "Added new patient record",
    timestamp: "2 minutes ago",
    avatar: "/avatars/doctor-1.png",
  },
  {
    id: 2,
    user: "Dr. Michael Chen",
    action: "Updated prescription",
    timestamp: "15 minutes ago",
    avatar: "/avatars/doctor-2.png",
  },
  {
    id: 3,
    user: "Admin",
    action: "System maintenance completed",
    timestamp: "1 hour ago",
    avatar: "/avatars/admin.png",
  },
  {
    id: 4,
    user: "Dr. Emily Brown",
    action: "Scheduled new appointment",
    timestamp: "2 hours ago",
    avatar: "/avatars/doctor-3.png",
  },
  {
    id: 5,
    user: "System",
    action: "Backup completed",
    timestamp: "3 hours ago",
    avatar: "/avatars/system.png",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback>{activity.user[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.timestamp}
          </div>
        </div>
      ))}
    </div>
  );
}
