import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { getLayoutDirection } from "../../utils/language";
import { initializeTheme } from "../../utils/toggle-theme";

const AppWrapper = ({ children }) => {
  useEffect(() => {
    const currentDirection = getLayoutDirection();
    document.documentElement.dir = currentDirection;
    
    // Initialize theme on app load
    initializeTheme();
  }, []);

  // Listen for sessionStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newDirection = getLayoutDirection();
      document.documentElement.dir = newDirection;
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for internal storage changes
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function (key, value) {
      if (key === "layoutDirection") {
        const newDirection = value;
        document.documentElement.dir = newDirection;
      }
      originalSetItem.call(this, key, value);
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      sessionStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default AppWrapper;
