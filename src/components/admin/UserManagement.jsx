import { useEffect, useMemo, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useNavigation } from "../../contexts/NavigationContext";
import api from "../../lib/apiClient";

export function UserManagement() {
  const { showSuccessPopup } = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/users");
        const list = data || [];
        const normalized = list.map((u) => ({
          id: u.userId || u._id,
          name: u.name,
          email: u.email,
          role: u.role === "organizer" ? "Organizer" : u.role === "admin" ? "Admin" : "Student",
          status: "Active", // no status field in backend; default active
          joinDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
        }));
        setUsers(normalized);
      } catch (err) {
        showSuccessPopup("Load users", "Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [showSuccessPopup]);

  const validateForm = (form) => {
    if (!form) return {};
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (form.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!form.role) newErrors.role = "Role is required.";
    if (!form.status) newErrors.status = "Status is required.";
    return newErrors;
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const updateUser = (id, updater) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updater } : user))
    );
  };

  const handleApprove = (user) => {
    updateUser(user.id, { status: "Active" });
    showSuccessPopup("User Approved", `${user.name} is now active as an ${user.role}.`);
  };

  const handleSuspend = (user) => {
    updateUser(user.id, { status: "Suspended" });
    showSuccessPopup("User Suspended", `${user.name} has been suspended.`);
  };

  const handleDelete = (user) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    showSuccessPopup("User Removed", `${user.name} was removed from the system.`, "Back to Users");
  };

  const startEdit = (user) => {
    const form = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    setEditUser(user);
    setEditForm(form);
    setErrors(validateForm(form));
  };

  const saveEdit = () => {
    if (!editUser || !editForm) return;
    const validation = validateForm(editForm);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    updateUser(editUser.id, editForm);
    showSuccessPopup("User Updated", `${editForm.name}'s profile was saved.`);
    setEditUser(null);
    setEditForm(null);
    setErrors({});
  };

  const roleOptions = ["All", "Student", "Organizer"];
  const statusOptions = ["All", "Active"];

  const statusBadgeClasses = (status) => {
    if (status === "Active") return "bg-green-100 text-green-800 border-green-200";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-3xl mb-2">User Management</h2>
          <p className="text-gray-600">Manage users, approve organizers, and handle permissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl">{loading ? "…" : users.length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Students</p>
            <p className="text-2xl">{loading ? "…" : users.filter((u) => u.role === "Student").length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Organizers</p>
            <p className="text-2xl">{loading ? "…" : users.filter((u) => u.role === "Organizer").length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
            <p className="text-2xl text-yellow-600">0</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10 bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={18} />
                    Role: {roleFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {roleOptions.map((role) => (
                    <DropdownMenuItem key={role} onClick={() => setRoleFilter(role)}>
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={18} />
                    Status: {statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {statusOptions.map((status) => (
                    <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => {
                setRoleFilter("All");
                setStatusFilter("All");
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {loading ? "Loading users..." : `Showing ${filteredUsers.length} of ${users.length} users`}
          </p>
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
              {filteredUsers.map((user) => (
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
                    <Badge className={statusBadgeClasses(user.status)}>
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
                        <DropdownMenuItem onClick={() => startEdit(user)}>
                          <Edit size={16} className="mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        {user.status === "Pending" && (
                          <DropdownMenuItem onClick={() => handleApprove(user)}>
                            <UserCheck size={16} className="mr-2" />
                            Approve User
                          </DropdownMenuItem>
                        )}
                        {user.status === "Active" && (
                          <DropdownMenuItem onClick={() => handleSuspend(user)}>
                            <UserX size={16} className="mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user)}>
                          <Trash2 size={16} className="mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No users match your search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={!!editUser}
        onOpenChange={(open) => {
          if (!open) {
            setEditUser(null);
            setEditForm(null);
            setErrors({});
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update profile details and permissions.</DialogDescription>
          </DialogHeader>
          {editForm && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editForm.name}
                  onChange={(e) => {
                    const next = { ...editForm, name: e.target.value };
                    setEditForm(next);
                    setErrors(validateForm(next));
                  }}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={editForm.email}
                  onChange={(e) => {
                    const next = { ...editForm, email: e.target.value };
                    setEditForm(next);
                    setErrors(validateForm(next));
                  }}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={editForm.role}
                    onChange={(e) => {
                      const next = { ...editForm, role: e.target.value };
                      setEditForm(next);
                      setErrors(validateForm(next));
                    }}
                  >
                    {roleOptions.filter((role) => role !== "All").map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={editForm.status}
                    onChange={(e) => {
                      const next = { ...editForm, status: e.target.value };
                      setEditForm(next);
                      setErrors(validateForm(next));
                    }}
                  >
                    {statusOptions.filter((status) => status !== "All").map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditUser(null);
                setEditForm(null);
                setErrors({});
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-kfupm-green text-white"
              onClick={saveEdit}
              disabled={Object.keys(errors).length > 0 || !editForm}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
