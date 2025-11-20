import { useEffect, useMemo } from "react";
import { Header } from "../Header";
import { Calendar, MapPin, Clock, CheckCircle, QrCode } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigation } from "../../contexts/NavigationContext";
import { getStudentEvents } from "../../data/studentEvents";

const defaultEvent = getStudentEvents()[0];

export function CheckInQR() {
  const {
    activeEvent,
    setActiveEvent,
    navigateTo,
    showSuccessPopup,
    showErrorPopup,
    cancelRegistration,
  } = useNavigation();

  const event = activeEvent || defaultEvent;

  useEffect(() => {
    if (!activeEvent) setActiveEvent(defaultEvent);
  }, [activeEvent, setActiveEvent]);

  const qrPayload = useMemo(
    () =>
      JSON.stringify({
        id: event?.id,
        title: event?.title,
        date: event?.date,
        time: event?.time,
        venue: event?.venue,
      }),
    [event]
  );

  const qrCodeUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
        qrPayload
      )}`,
    [qrPayload]
  );

  const [startTime, endTime] = (event?.time || "").split("–").map((part) => part?.trim());

  const handleDownloadQR = () => {
    try {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `${event.title?.replace(/\s+/g, "-") || "event"}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccessPopup("QR Downloaded", "The QR code has been downloaded.");
    } catch (error) {
      console.error(error);
      showErrorPopup("Download failed", "Unable to download the QR code. Please try again.");
    }
  };

  const handleShareQR = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      showSuccessPopup("Link Copied", "QR code link copied to clipboard.");
    } catch (error) {
      console.error(error);
      showErrorPopup("Share failed", "Unable to copy the QR code link.");
    }
  };

  const handleCancelRegistration = () => {
    cancelRegistration(event.id);
    showSuccessPopup(
      "Registration Cancelled",
      `You have cancelled your registration for "${event.title}".`
    );
    navigateTo("student-my-events");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Event Check-in</h2>
          <p className="text-gray-600">Show this QR code to the organizer to check in</p>
        </div>

        {/* Event Info Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl mb-1">{event.title}</h3>
              <p className="text-gray-600">Organized by {event.organizer}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle size={14} className="mr-1" />
              Registered
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{event.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p>
                  {startTime}
                  {endTime ? ` - ${endTime}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p>{event.venue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
          <div className="mb-6">
            <QrCode className="mx-auto text-kfupm-green mb-2" size={32} />
            <h3 className="mb-2">Your Check-in QR Code</h3>
            <p className="text-sm text-gray-600">Present this code at the event entrance</p>
          </div>

          {/* QR Code Display */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 inline-block mb-6">
            <div className="w-64 h-64 bg-white flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="Event QR code"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Student Name</p>
                <p>Ahmed Al-Rashid</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Student ID</p>
                <p>S12345</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">Registration ID</p>
                <p className="font-mono">
                  REG-{event.id?.toString().padStart(4, "0")}-{new Date(event.date).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleDownloadQR}>
              Download QR Code
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShareQR}>
              Share
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="mb-3 text-blue-900">Check-in Instructions</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Arrive at the venue at least 10 minutes before the event starts</li>
            <li>• Present this QR code to the organizer at the check-in desk</li>
            <li>• Make sure your screen brightness is turned up for easy scanning</li>
            <li>• You can also download and print the QR code if needed</li>
            <li>• Keep your student ID with you for verification</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigateTo("student-event-details")}
          >
            View Event Details
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
            onClick={handleCancelRegistration}
          >
            Cancel Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
