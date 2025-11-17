import { Header } from "../Header";
import { Calendar, MapPin, Users, FileText, Download, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigation } from "../../contexts/NavigationContext";

const registrations = [
  { id: "S12345", name: "Ahmed Ali", email: "s12345@kfupm.edu.sa", registeredDate: "May 02, 2025", checkedIn: true },
  { id: "S12346", name: "Sara Khalid", email: "s12346@kfupm.edu.sa", registeredDate: "May 03, 2025", checkedIn: false },
  { id: "S12347", name: "Faisal Omar", email: "s12347@kfupm.edu.sa", registeredDate: "May 05, 2025", checkedIn: true },
  { id: "S12348", name: "Mona Z.", email: "s12348@kfupm.edu.sa", registeredDate: "May 07, 2025", checkedIn: false },
  { id: "F001",   name: "Dr. Al-Harbi", email: "faculty1@kfupm.edu.sa", registeredDate: "May 08, 2025", checkedIn: false },
];

const feedback = [
  { rating: 5, comment: "Excellent workshop—great hands-on session!", date: "May 16, 2025" },
  { rating: 4, comment: "Very informative, but could use more time for Q&A.", date: "May 16, 2025" },
  { rating: 5, comment: "Loved the demos and examples.", date: "May 17, 2025" },
  { rating: 3, comment: "Content was good, but the venue was too crowded.", date: "May 17, 2025" },
];

const previousAnnouncements = [
  { message: "Reminder: Workshop starts at 2:00 PM sharp. Please arrive 10 minutes early.", date: "May 14, 2025", time: "10:00 AM" },
  { message: "Parking information: Use Parking Lot B near Building 5.", date: "May 13, 2025", time: "3:30 PM" },
];

const files = [
  { name: "Workshop_Agenda.pdf",            size: "182 KB", uploadDate: "May 12, 2025" },
  { name: "AI_Presentation_Slides.pptx",    size: "6.3 MB", uploadDate: "May 15, 2025" },
  { name: "ML_Resources_Guide.pdf",         size: "940 KB", uploadDate: "May 15, 2025" },
  { name: "Event_Poster.png",               size: "1.2 MB", uploadDate: "May 09, 2025" },
];

export function EventDetails() {
  const { activeEvent, navigateTo, setActiveEvent, eventOverrides } = useNavigation();
  const fallbackEvent = {
    title: "AI & Machine Learning Workshop",
    status: "Approved",
    category: "Technology",
    date: "May 15, 2025",
    time: "2:00 PM - 5:00 PM",
    venue: "Building 5, Room 301",
    registrations: 45,
    capacity: 100,
  };
  const overridden = activeEvent && eventOverrides[activeEvent.title]
    ? { ...activeEvent, ...eventOverrides[activeEvent.title] }
    : activeEvent;
  const event = overridden || fallbackEvent;
  const registrationFill =
    event.capacity && event.capacity > 0
      ? Math.min(100, Math.round((event.registrations / event.capacity) * 100))
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="organizer" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Event Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl mb-2">{event.title}</h2>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-200">{event.status}</Badge>
                <Badge variant="outline">{event.category || "Category"}</Badge>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setActiveEvent(event);
                navigateTo("organizer-create");
              }}
            >
              Edit Event
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p>{event.date}</p>
                <p className="text-sm">{event.time || "Time TBD"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p>{event.venue || "Venue TBD"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p>
                  {event.registrations}/{event.capacity} registered
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-2 w-full">
                  <div className="bg-kfupm-green h-2 rounded-full" style={{ width: `${registrationFill}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="mb-6 bg-white border border-gray-200">
            <TabsTrigger value="registrations">Registrations ({registrations.length})</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="feedback">Feedback ({feedback.length})</TabsTrigger>
          </TabsList>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3>Registered Participants</h3>
                <Button variant="outline" className="gap-2">
                  <Download size={16} />
                  Export to CSV
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered Date</TableHead>
                    <TableHead>Check-in Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell>{reg.id}</TableCell>
                      <TableCell>{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.registeredDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            reg.checkedIn
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }
                        >
                          {reg.checkedIn ? "Checked In" : "Not Checked In"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="mb-4">Send Announcement to Participants</h3>
              <p className="text-sm text-gray-600 mb-4">
                This message will be sent to all {registrations.length} registered participants via email and in-app notification.
              </p>
              <Textarea placeholder="Type your announcement message here..." className="mb-4 min-h-32 bg-gray-50" />
              <div className="flex gap-3">
                <Button className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2">
                  <Mail size={16} />
                  Send Announcement
                </Button>
                <Button variant="outline">Preview</Button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="mb-4">Previous Announcements</h4>
                <div className="space-y-4">
                  {previousAnnouncements.map((announcement, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <p className="mb-2">{announcement.message}</p>
                      <p className="text-sm text-gray-500">
                        Sent on {announcement.date} at {announcement.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3>Event Materials & Resources</h3>
                <Button className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2">
                  <FileText size={16} />
                  Upload New File
                </Button>
              </div>

              <div className="space-y-3">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-kfupm-green" size={24} />
                      <div>
                        <p>{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {file.size} • Uploaded {file.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download size={14} />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="mb-8">
                <h3 className="mb-4">Event Feedback Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                    <p className="text-3xl text-kfupm-green">4.25 / 5</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Responses</p>
                    <p className="text-3xl">{feedback.length}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Response Rate</p>
                    <p className="text-3xl">8.9%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4>Student Feedback</h4>
                  <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Export Feedback
                  </Button>
                </div>
                {feedback.map((item, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < item.rating ? "text-yellow-500" : "text-gray-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-gray-700">{item.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
