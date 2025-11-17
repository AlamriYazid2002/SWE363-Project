import { createContext, useContext, useState } from "react";

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("login");
  const [userRole, setUserRole] = useState(null);
  const [popup, setPopup] = useState({ type: null, title: null, message: null, actionLabel: null });
  const [activeEvent, setActiveEvent] = useState(null);
  const [eventOverrides, setEventOverrides] = useState({});

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const login = (role) => {
    setUserRole(role);
    if (role === "admin") {
      setCurrentPage("admin-dashboard");
    } else if (role === "organizer") {
      setCurrentPage("organizer-dashboard");
    } else if (role === "student") {
      setCurrentPage("student-dashboard");
    }
  };

  const logout = () => {
    setUserRole(null);
    setActiveEvent(null);
    setEventOverrides({});
    setCurrentPage("login");
  };

  const setEventOverride = (title, data) => {
    setEventOverrides((prev) => ({
      ...prev,
      [title]: data,
    }));
  };

  const showSuccessPopup = (title, message, actionLabel = null) => {
    setPopup({ type: "success", title, message, actionLabel });
  };

  const showErrorPopup = (title, message, actionLabel = null) => {
    setPopup({ type: "error", title, message, actionLabel });
  };

  const closePopup = () => {
    setPopup({ type: null, title: null, message: null, actionLabel: null });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        userRole,
        popup,
        activeEvent,
        eventOverrides,
        navigateTo,
        login,
        logout,
        setActiveEvent,
        setEventOverride,
        showSuccessPopup,
        showErrorPopup,
        closePopup,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
