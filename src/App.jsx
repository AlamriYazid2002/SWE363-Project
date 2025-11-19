import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";

// Auth Components
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";

// Admin Components
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { PendingEvents } from "./components/admin/PendingEvents";
import { UserManagement } from "./components/admin/UserManagement";

// Organizer Components
import { OrganizerDashboard } from "./components/organizer/OrganizerDashboard";
import { CreateEvent } from "./components/organizer/CreateEvent";
import { EventDetails } from "./components/organizer/EventDetails";

// Student Components
import { StudentDashboard } from "./components/student/StudentDashboard";
import { EventDetailsStudent } from "./components/student/EventDetailsStudent";
import { MyEvents } from "./components/student/MyEvents";
import { CheckInQR } from "./components/student/CheckInQR";
import { FeedbackForm } from "./components/student/FeedbackForm";

// Popup Components
import { SuccessPopup } from "./components/popups/SuccessPopup";
import { ErrorPopup } from "./components/popups/ErrorPopup";

function AppContent() {
  const { currentPage, popup } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      // Auth Pages
      case "login":
        return <Login />;
      case "signup":
        return <SignUp />;
      
      // Admin Pages
      case "admin-dashboard":
        return <AdminDashboard />;
      case "admin-pending":
        return <PendingEvents />;
      case "admin-users":
        return <UserManagement />;
      
      // Organizer Pages
      case "organizer-dashboard":
        return <OrganizerDashboard />;
      case "organizer-create":
        return <CreateEvent />;
      case "organizer-event-details":
        return <EventDetails />;
      
      // Student Pages
      case "student-dashboard":
        return <StudentDashboard />;
      case "student-event-details":
        return <EventDetailsStudent />;
      case "student-my-events":
        return <MyEvents />;
      case "student-checkin":
        return <CheckInQR />;
      case "student-feedback":
        return <FeedbackForm />;
      
      default:
        return <Login />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      
      {/* Popup Overlays */}
      {popup.type === "success" && (
        <SuccessPopup title={popup.title} message={popup.message} actionLabel={popup.actionLabel} />
      )}
      {popup.type === "error" && (
        <ErrorPopup title={popup.title} message={popup.message} actionLabel={popup.actionLabel} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
