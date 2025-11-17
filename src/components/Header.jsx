import { User, LogOut, LayoutDashboard, Calendar, Users as UsersIcon, FileText } from "lucide-react";
import { useNavigation } from "../contexts/NavigationContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header({ userRole }) {
  const { navigateTo, logout } = useNavigation();

  const getNavigationItems = () => {
    if (userRole === "admin") {
      return [
        { label: "Dashboard",       icon: LayoutDashboard, page: "admin-dashboard" },
        { label: "Pending Events",  icon: Calendar,        page: "admin-pending" },
        { label: "User Management", icon: UsersIcon,       page: "admin-users" },
      ];
    } else if (userRole === "organizer") {
      return [
        { label: "Dashboard",   icon: LayoutDashboard, page: "organizer-dashboard" },
      ];
    } else if (userRole === "student") {
      return [
        { label: "Browse Events", icon: LayoutDashboard, page: "student-dashboard" },
        { label: "My Events",     icon: Calendar,        page: "student-my-events" },
      ];
    }
    return [];
  };

  return (
    <header className="bg-kfupm-green text-white px-6 py-4 flex items-center justify-between">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          if (userRole === "admin") navigateTo("admin-dashboard");
          else if (userRole === "organizer") navigateTo("organizer-dashboard");
          else if (userRole === "student") navigateTo("student-dashboard");
        }}
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <circle cx="25" cy="25" r="23" stroke="#0D7B3F" strokeWidth="2" />
            <text x="25" y="32" textAnchor="middle" fill="#0D7B3F" fontSize="20" fontWeight="bold">
              K
            </text>
          </svg>
        </div>
        <h1 className="text-2xl">KFUPM Event Hub</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Navigation Menu */}
        {userRole && (
          <nav className="hidden md:flex items-center gap-2">
            {getNavigationItems().map((item) => (
              <Button
                key={item.page}
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => navigateTo(item.page)}
              >
                <item.icon size={16} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        )}

        {/* User Menu */}
        {userRole && (
          <>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full capitalize">{userRole}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="User menu"
                >
                  <User size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {getNavigationItems().map((item) => (
                  <DropdownMenuItem key={item.page} onClick={() => navigateTo(item.page)}>
                    <item.icon size={16} className="mr-2" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
