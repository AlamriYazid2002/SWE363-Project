import { createContext, useContext, useState } from "react";

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("login");
  const [userRole, setUserRole] = useState(null);
  const [popup, setPopup] = useState({ type: null, title: null, message: null });

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
    setCurrentPage("login");
  };

  const showSuccessPopup = (title, message) => {
    setPopup({ type: "success", title, message });
  };

  const showErrorPopup = (title, message) => {
    setPopup({ type: "error", title, message });
  };

  const closePopup = () => {
    setPopup({ type: null, title: null, message: null });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        userRole,
        popup,
        navigateTo,
        login,
        logout,
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
