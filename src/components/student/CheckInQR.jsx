import { Header } from "../Header";
import { Calendar, MapPin, Clock, CheckCircle, QrCode } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function CheckInQR() {
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
              <h3 className="text-xl mb-1">AI & Machine Learning Workshop</h3>
              <p className="text-gray-600">Organized by Tech Society</p>
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
                <p>May 15, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p>2:00 PM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-kfupm-green mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p>Building 5, Room 301</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
          <div className="mb-6">
            <QrIcon className="mx-auto text-kfupm-green mb-2" size={32} />
            <h3 className="mb-2">Your Check-in QR Code</h3>
            <p className="text-sm text-gray-600">Present this code at the event entrance</p>
          </div>

          {/* QR Code Display */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 inline-block mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-kfupm-green to-kfupm-green-dark flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Simple QR code pattern representation */}
                <rect width="200" height="200" fill="white"/>
                {[...Array(8)].map((_, i) => (
                  <g key={i}>
                    {[...Array(8)].map((_, j) => (
                      <rect
                        key={`${i}-${j}`}
                        x={10 + i * 23}
                        y={10 + j * 23}
                        width="20"
                        height="20"
                        fill={(i + j) % 2 === 0 ? "black" : "white"}
                      />
                    ))}
                  </g>
                ))}
              </svg>
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
                <p className="font-mono">REG-2025-05-001</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Download QR Code
            </Button>
            <Button variant="outline" className="flex-1">
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
          <Button variant="outline" className="flex-1">
            View Event Details
          </Button>
          <Button variant="outline" className="flex-1 text-red-600 border-red-300 hover:bg-red-50">
            Cancel Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
