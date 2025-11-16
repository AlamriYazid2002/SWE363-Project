import { Header } from "../Header";
import { Calendar, MapPin, Users, Heart, Share2, Clock, Building, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useNavigation } from "../../contexts/NavigationContext";

export function EventDetailsStudent() {
  const { navigateTo, showSuccessPopup } = useNavigation();

  const handleRegister = () => {
    showSuccessPopup(
      "Registration Successful!",
      "You have successfully registered for this event. Check your email for confirmation."
    );
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
              src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=1200&h=600&fit=crop" 
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
                  <h2 className="text-3xl mb-2">AI & Machine Learning Workshop</h2>
                  <p className="text-gray-600">Organized by Tech Society</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline">Technology</Badge>
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
                    <p>May 15, 2025</p>
                    <p className="text-sm">2:00 PM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p>Building 5, Room 301</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="text-kfupm-green mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p>45 / 100 registered</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-kfupm-green h-2 rounded-full" style={{ width: "45%" }} />
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
              <Button variant="outline" className="w-full">
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
              <Button variant="outline" size="sm" className="w-full">
                View More Events
              </Button>
            </div>

            {/* Share Event */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="mb-3">Share Event</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
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