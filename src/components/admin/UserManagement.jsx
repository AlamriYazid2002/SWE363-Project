import { Header } from "../Header";
import { Search, Filter, MoreVertical, UserCheck, UserX, Trash2, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const users = [
  { id: "S12345", name: "Ahmed Ali",   email: "s12345@kfupm.edu.sa", role: "Student",  status: "Active",  joinDate: "Sep 10, 2025" },
  { id: "O001",   name: "IEEE Chapter",email: "ieee@kfupm.edu.sa",   role: "Organizer",status: "Pending", joinDate: "Oct 02, 2025" },
  { id: "S12346", name: "Sara Khalid", email: "s12346@kfupm.edu.sa", role: "Student",  status: "Active",  joinDate: "Aug 28, 2025" },
  { id: "O002",   name: "Sports Club", email: "sports@kfupm.edu.sa", role: "Organizer",status: "Active",  joinDate: "Jul 14, 2025" },
  { id: "S12347", name: "Faisal Omar", email: "s12347@kfupm.edu.sa", role: "Student",  status: "Suspended", joinDate: "Jun 03, 2025" },
  { id: "O003",   name: "Tech Society",email: "tech@kfupm.edu.sa",   role: "Organizer",status: "Pending", joinDate: "Nov 22, 2025" },
  { id: "F001",   name: "Dr. Al-Harbi",email: "faculty1@kfupm.edu.sa", role: "Faculty", status: "Active", joinDate: "Jan 15, 2025" },
];

export function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">User Management</h2>
          <p className="text-gray-600">Manage users, approve organizers, and handle permissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl">2,847</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Students</p>
            <p className="text-2xl">2,395</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Organizers</p>
            <p className="text-2xl">452</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
            <p className="text-2xl text-yellow-600">12</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Search by name, email, or ID..." className="pl-10 bg-gray-50" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              Filter by Role
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              Filter by Status
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Organizer"
                          ? "border-kfupm-green text-kfupm-green"
                          : user.role === "Faculty"
                          ? "border-blue-500 text-blue-500"
                          : "border-gray-400 text-gray-600"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "Active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={16} className="mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        {user.status === "Pending" && (
                          <DropdownMenuItem>
                            <UserCheck size={16} className="mr-2" />
                            Approve User
                          </DropdownMenuItem>
                        )}
                        {user.status === "Active" && (
                          <DropdownMenuItem>
                            <UserX size={16} className="mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 size={16} className="mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
