import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const users = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Doctor",
    status: "Active",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Doctor",
    status: "Active",
    lastActive: "15 minutes ago",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Patient",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Doctor",
    status: "Inactive",
    lastActive: "2 days ago",
  },
  {
    id: 5,
    name: "Alice Johnson",
    role: "Patient",
    status: "Active",
    lastActive: "3 hours ago",
  },
];

export function UserStats() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
