import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../Header";
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Share2,
  Clock,
  Building,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useNavigation } from "../../contexts/NavigationContext";
const SHARE_FLASH_STYLE_ID = "share-flash-style";

const sanitizeDash = (value = "") => value.replace(/[-–—]/g, "-");

const toICSDate = (dateObj) => {
  const pad = (num) => num.toString().padStart(2, "0");
  return (
    dateObj.getUTCFullYear().toString() +
    pad(dateObj.getUTCMonth() + 1) +
    pad(dateObj.getUTCDate()) +
    "T" +
    pad(dateObj.getUTCHours()) +
    pad(dateObj.getUTCMinutes()) +
    pad(dateObj.getUTCSeconds()) +
    "Z"
  );
};

export function EventDetailsStudent() {
  const {
    navigateTo,
    showSuccessPopup,
    activeEvent,
    setActiveEvent,
    favoriteEventIds,
    toggleFavoriteEvent,
    showErrorPopup,
    shouldHighlightShare,
    clearShareHighlight,
  } = useNavigation();
  const event = useMemo(() => activeEvent, [activeEvent]);
  const isFavorite = favoriteEventIds.includes(event.id);
  const capacity = Math.max(1, event.capacity || 1);
  const registrationPercent = Math.min(
    100,
    Math.round(((event.registered || 0) / capacity) * 100)
  );
  const shareSectionRef = useRef(null);
  const highlightTimeoutRef = useRef(null);
  const [shareHighlighted, setShareHighlighted] = useState(false);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!activeEvent) return;
    if (typeof document !== "undefined" && !document.getElementById(SHARE_FLASH_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = SHARE_FLASH_STYLE_ID;
      style.textContent = `
        @keyframes shareFlashPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45);
            background-color: #ffffff;
          }
          40% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.15);
            background-color: #ecfdf5;
          }
          70% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.35);
            background-color: #f0fdf4;
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            background-color: #ffffff;
          }
        }
        .share-flash-highlight {
          animation: shareFlashPulse 1.3s ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, [activeEvent, setActiveEvent]);

  useEffect(() => {
    if (shouldHighlightShare) {
      triggerShareHighlight();
      clearShareHighlight();
    }
  }, [shouldHighlightShare, clearShareHighlight]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userRole="student" />
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => navigateTo("student-dashboard")}>
            <ArrowLeft size={18} />
            Back to Events
          </Button>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-gray-600">
            No event selected.
          </div>
        </div>
      </div>
    );
  }

  const eventTitle = event.title;
  const eventOrganizer = event.organizer || "Organizer";
  const eventUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://kfupm-events.example.com/events/${event.id}`;

  const handleRegister = () => {
    showSuccessPopup(
      "Registration Successful!",
      `You have successfully registered for "${event.title}". Check your email for confirmation.`
    );
  };

  const parseEventDateTimes = () => {
    const [rawStart, rawEnd] = sanitizeDash(event.time).split("-").map((part) => part?.trim());
    if (!rawStart) return {};
    const startDate = new Date(`${event.date} ${rawStart}`);
    const endDate = rawEnd ? new Date(`${event.date} ${rawEnd}`) : null;
    return { startDate, endDate };
  };

  const handleAddToCalendar = () => {
    try {
      const { startDate, endDate } = parseEventDateTimes();
      if (!startDate || isNaN(startDate)) {
        showErrorPopup("Cannot add event", "Invalid start time for this event.");
        return;
      }
      const finalEnd = endDate && !isNaN(endDate) ? endDate : new Date(startDate.getTime() + 60 * 60 * 1000);

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//KFUPM Events//Student Portal//EN",
        "BEGIN:VEVENT",
        `UID:event-${event.id}@kfupm-events`,
        `DTSTAMP:${toICSDate(new Date())}`,
        `DTSTART:${toICSDate(startDate)}`,
        `DTEND:${toICSDate(finalEnd)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.organizer} event at KFUPM`,
        `LOCATION:${event.venue}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.title.replace(/\s+/g, "-")}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showSuccessPopup("Calendar Downloaded", "Open the downloaded file to add it to your calendar.");
    } catch (error) {
      console.error(error);
      showErrorPopup("Cannot add event", "Something went wrong while generating the calendar file.");
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavoriteEvent(event.id);
  };

  const triggerShareHighlight = () => {
    if (shareSectionRef.current) {
      shareSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setShareHighlighted(true);
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
      highlightTimeoutRef.current = setTimeout(() => setShareHighlighted(false), 1300);
    }
  };

  const handleShare = async (platform) => {
    const baseMessage = `${eventTitle} by ${eventOrganizer}`;
    try {
      if (platform === "whatsapp") {
        const waUrl = `https://wa.me/?text=${encodeURIComponent(`${baseMessage} - ${eventUrl}`)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (platform === "twitter") {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          baseMessage
        )}&url=${encodeURIComponent(eventUrl)}`;
        window.open(tweetUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (platform === "copy") {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(eventUrl);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = eventUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }
        showSuccessPopup("Link Copied", "Event link copied to your clipboard.");
      }
    } catch (error) {
      console.error(error);
      showErrorPopup(
        "Unable to share",
        "Something went wrong while sharing this event. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigateTo("student-dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Events
        </Button>

        {/* Event Image */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
          <div className="relative h-80 bg-gray-200">
            <img 
              src={event.image || event.posterUrl || "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=1200&h=600&fit=crop"} 
              alt="Event" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl mb-2">{event.title}</h2>
                  <p className="text-gray-600">Organized by {event.organizer}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavoriteToggle}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      size={20}
                      className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={triggerShareHighlight}
                    aria-label="Jump to share options"
                  >
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline">{event.category || "Event"}</Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle size={14} className="mr-1" />
                  Spots Available
                </Badge>
              </div>

              <Separator className="my-6" />

              <h3 className="mb-3">About This Event</h3>
              <p className="text-gray-700 mb-4">
                Join us for an exciting hands-on workshop covering the fundamentals of Artificial Intelligence and Machine Learning. This workshop is designed for students with basic programming knowledge who want to explore the world of AI and ML.
              </p>
              <p className="text-gray-700 mb-4">
                Topics covered include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Introduction to AI and Machine Learning concepts</li>
                <li>Python libraries for ML (NumPy, Pandas, Scikit-learn)</li>
                <li>Supervised and Unsupervised Learning</li>
                <li>Building your first ML model</li>
                <li>Practical applications and case studies</li>
              </ul>
              <p className="text-gray-700">
                Participants will receive a certificate of attendance and access to workshop materials and resources.
              </p>

              <Separator className="my-6" />

              <h3 className="mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Basic programming knowledge (Python preferred)</li>
                <li>Bring your own laptop</li>
                <li>Install Python 3.8+ before the workshop</li>
              </ul>
            </div>

            {/* Speaker Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="mb-4">Featured Speaker</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users size={24} className="text-gray-600" />
                </div>
                <div>
                  <h4>Dr. Ahmed Al-Harbi</h4>
                  <p className="text-sm text-gray-600 mb-2">Associate Professor, Computer Science</p>
                  <p className="text-sm text-gray-700">
                    Specialist in Machine Learning and Data Science with 10+ years of experience. Published researcher in AI applications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p>{event.date}</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p>{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p>
                      {event.registered ?? 0} / {event.capacity ?? 0} registered
                    </p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-kfupm-green h-2 rounded-full"
                        style={{ width: `${registrationPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Registration Deadline</p>
                    <p>May 14, 2025 at 11:59 PM</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <Button className="w-full bg-kfupm-green hover:bg-kfupm-green-dark text-white mb-3" onClick={handleRegister}>
                Register for Event
              </Button>
              <Button variant="outline" className="w-full" onClick={handleAddToCalendar}>
                Add to Calendar
              </Button>
            </div>

            {/* Organizer Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="mb-3">Organizer</h4>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-kfupm-green-light rounded-full flex items-center justify-center">
                  <Building size={20} className="text-kfupm-green" />
                </div>
                <div>
                  <p>Tech Society</p>
                  <p className="text-sm text-gray-500">Student Organization</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                KFUPM's premier technology club promoting innovation and technical skills among students.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigateTo("student-dashboard")}
              >
                View More Events
              </Button>
            </div>

            {/* Share Event */}
            <div
              ref={shareSectionRef}
              className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition duration-300 ${
                shareHighlighted ? "ring-4 ring-kfupm-green/70 share-flash-highlight" : ""
              }`}
            >
              <h4 className="mb-3">Share Event</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleShare("whatsapp")}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleShare("twitter")}
                >
                  Twitter (X)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleShare("copy")}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
