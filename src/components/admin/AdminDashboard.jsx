import { useMemo, useState } from "react";
import { Header } from "../Header";
import { StatCard } from "../StatCard";
import { Calendar, Users, TrendingUp, Clock, Activity, Filter, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigation } from "../../contexts/NavigationContext";

const eventData = [
  { month: "Jan", events: 24, attendance: 82 },
  { month: "Feb", events: 19, attendance: 78 },
  { month: "Mar", events: 31, attendance: 88 },
  { month: "Apr", events: 27, attendance: 84 },
  { month: "May", events: 35, attendance: 91 },
];

const categoryData = [
  { name: "Academic", value: 32, color: "#0D7B3F" },
  { name: "Sports", value: 22, color: "#10B981" },
  { name: "Cultural", value: 18, color: "#34D399" },
  { name: "Tech", value: 20, color: "#059669" },
  { name: "Other", value: 8, color: "#6EE7B7" },
];

const activityFeed = [
  { id: 1, action: "New event submitted", user: "Ahmed A.", time: "10m ago", status: "pending" },
  { id: 2, action: "Event approved", user: "Admin", time: "1h ago", status: "approved" },
  { id: 3, action: "User registered", user: "Sara K.", time: "2h ago", status: "info" },
  { id: 4, action: "Event completed", user: "IEEE Chapter", time: "Yesterday", status: "completed" },
];

export function AdminDashboard() {
  const { navigateTo } = useNavigation();
  const [timeframe, setTimeframe] = useState("semester");
  const [trendFocus, setTrendFocus] = useState("both");
  const [activityFilter, setActivityFilter] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [acknowledgedIds, setAcknowledgedIds] = useState([]);

  const chartData = useMemo(() => {
    if (timeframe === "recent") {
      return eventData.slice(-3);
    }
    return eventData;
  }, [timeframe]);

  const filteredActivity = useMemo(() => {
    return activityFeed.filter((item) => activityFilter === "all" || item.status === activityFilter);
  }, [activityFilter]);

  const showEventsLine = trendFocus === "both" || trendFocus === "events";
  const showAttendanceLine = trendFocus === "both" || trendFocus === "attendance";

  const handleAcknowledge = (activity) => {
    if (!acknowledgedIds.includes(activity.id)) {
      setAcknowledgedIds((prev) => [...prev, activity.id]);
    }
    setSelectedActivity(null);
  };

  const activityStatusBadge = (status) => {
    if (status === "pending") return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    if (status === "approved") return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
    if (status === "completed") return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
    return <Badge variant="outline">Info</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Monitor and manage all events and users</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigateTo("admin-pending")}
              className="gap-2"
            >
              <Filter size={16} />
              Pending Events
            </Button>
            <Button
              onClick={() => navigateTo("admin-users")}
              className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2"
            >
              <Sparkles size={16} />
              Manage Users
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => navigateTo("admin-dashboard")} className="cursor-pointer">
            <StatCard title="Total Events" value="156" subtitle="42 this month" icon={Calendar} />
          </div>
          <div onClick={() => navigateTo("admin-pending")} className="cursor-pointer">
            <StatCard title="Pending Approval" value="8" subtitle="Awaiting review" icon={Clock} />
          </div>
          <div onClick={() => navigateTo("admin-users")} className="cursor-pointer">
            <StatCard title="Total Users" value="2,847" subtitle="452 organizers" icon={Users} />
          </div>
          <StatCard title="Avg Attendance" value="87%" subtitle="+5% from last month" icon={TrendingUp} />
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-wrap gap-3 items-center justify-between">
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="semester">Semester to date</TabsTrigger>
              <TabsTrigger value="recent">Last 3 months</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button
              variant={trendFocus === "both" ? "default" : "outline"}
              className={trendFocus === "both" ? "bg-kfupm-green text-white" : ""}
              onClick={() => setTrendFocus("both")}
            >
              Events + Attendance
            </Button>
            <Button
              variant={trendFocus === "events" ? "default" : "outline"}
              className={trendFocus === "events" ? "bg-kfupm-green text-white" : ""}
              onClick={() => setTrendFocus("events")}
            >
              Events only
            </Button>
            <Button
              variant={trendFocus === "attendance" ? "default" : "outline"}
              className={trendFocus === "attendance" ? "bg-kfupm-green text-white" : ""}
              onClick={() => setTrendFocus("attendance")}
            >
              Attendance only
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="mb-2">Events & Attendance Trend</h3>
            <p className="text-sm text-gray-600 mb-4">
              Showing {timeframe === "recent" ? "last 3 months" : "semester to date"} with{" "}
              {trendFocus === "both" ? "both metrics highlighted." : `${trendFocus} highlighted.`}
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {showEventsLine && <Line type="monotone" dataKey="events" stroke="#0D7B3F" strokeWidth={2} />}
                {showAttendanceLine && (
                  <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3>Events by Category</h3>
              <Button size="sm" variant="outline" onClick={() => setTrendFocus("both")}>
                Reset Focus
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(d) => `${d.name}: ${d.value}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0D7B3F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Activity size={18} />
              <h3>Recent Activity</h3>
            </div>
            <div className="flex gap-2">
              <Tabs value={activityFilter} onValueChange={setActivityFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm" onClick={() => navigateTo("admin-pending")}>
                View All
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 px-2 rounded-md"
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "pending"
                        ? "bg-yellow-500"
                        : activity.status === "approved"
                        ? "bg-green-500"
                        : activity.status === "completed"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <div>
                    <p className="flex items-center gap-2">
                      {activity.action}
                      {acknowledgedIds.includes(activity.id) && (
                        <Badge variant="outline" className="text-xs">Acknowledged</Badge>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activityStatusBadge(activity.status)}
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedActivity?.action}</DialogTitle>
            <DialogDescription>{selectedActivity?.user} • {selectedActivity?.time}</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-3 text-sm text-gray-700">
              <p>Status: {selectedActivity.status}</p>
              <p>
                This is a quick preview of the item. You can jump to the relevant page or simply mark it as
                acknowledged to keep your queue tidy.
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedActivity(null)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => navigateTo("admin-users")}>
              Go to Users
            </Button>
            <Button className="bg-kfupm-green text-white" onClick={() => selectedActivity && handleAcknowledge(selectedActivity)}>
              Mark as Reviewed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
