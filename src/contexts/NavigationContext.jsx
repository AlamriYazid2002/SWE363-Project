import { createContext, useContext, useState } from "react";

const DEFAULT_FAVORITE_EVENT_IDS = [4];

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("login");
  const [userRole, setUserRole] = useState(null);
  const [popup, setPopup] = useState({ type: null, title: null, message: null, actionLabel: null });
  const [activeEvent, setActiveEvent] = useState(null);
  const [eventOverrides, setEventOverrides] = useState({});
  const [createdEvents, setCreatedEvents] = useState([]);
  const [favoriteEventIds, setFavoriteEventIds] = useState(DEFAULT_FAVORITE_EVENT_IDS);
  const [cancelledRegistrations, setCancelledRegistrations] = useState([]);
  const [shouldHighlightShare, setShouldHighlightShare] = useState(false);

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
    setCreatedEvents([]);
    setCurrentPage("login");
  };

  const setEventOverride = (title, data) => {
    setEventOverrides((prev) => ({
      ...prev,
      [title]: data,
    }));
  };

  const addCreatedEvent = (event) => {
    setCreatedEvents((prev) => [...prev, event]);
  };

  const updateCreatedEvent = (id, updates) => {
    setCreatedEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt))
    );
  };

  const removeCreatedEvent = (id) => {
    setCreatedEvents((prev) => prev.filter((evt) => evt.id !== id));
  };

  const toggleFavoriteEvent = (eventId) => {
    setFavoriteEventIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };
  const cancelRegistration = (eventId) => {
    setCancelledRegistrations((prev) =>
      prev.includes(eventId) ? prev : [...prev, eventId]
    );
  };

  const requestShareHighlight = () => setShouldHighlightShare(true);
  const clearShareHighlight = () => setShouldHighlightShare(false);

  const showSuccessPopup = (title, message) => {
    setPopup({ type: "success", title, message });
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
        createdEvents,
        favoriteEventIds,
        cancelledRegistrations,
        shouldHighlightShare,
        navigateTo,
        login,
        logout,
        setActiveEvent,
        setEventOverride,
        addCreatedEvent,
        updateCreatedEvent,
        removeCreatedEvent,
        toggleFavoriteEvent,
        cancelRegistration,
        requestShareHighlight,
        clearShareHighlight,
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
