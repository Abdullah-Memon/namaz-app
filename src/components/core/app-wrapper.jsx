import React, { useEffect, useState } from "react";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { getLayoutDirection } from "../../utils/language";
import { initializeTheme } from "../../utils/toggle-theme";
import Footer from "./footer";

const AppWrapper = ({ children, sessionValues, activeTab, onTabChange }) => {
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
    <div 
      className="min-h-screen pb-20 over-flow-x-hidden" 
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Header sessionValues={sessionValues} />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default AppWrapper;
