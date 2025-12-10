import React, { useState, useEffect } from "react";
import getIslmaicMonthNames, {
  getCurrentIslamicMonth,
} from "../../utils/islamic-month-names.js";
import { getEvents } from "../../utils/events.js";
import Dropdown from "../shared/dropdown.jsx";
import Card from "../shared/card.jsx";
import { getTranslation } from "../../utils/enums.js";

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [monthOptions, setMonthOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all month names and current month on component mount
  useEffect(() => {
    const initializeMonths = async () => {
      setLoading(true);
      try {
        // Get all available months
        const allMonths = getIslmaicMonthNames();
        setMonthOptions(allMonths);

        // Get current Islamic month
        const currentIslamicMonth = await getCurrentIslamicMonth();

        if (currentIslamicMonth) {
          setCurrentMonth(currentIslamicMonth);
          setSelectedMonth(currentIslamicMonth.month);
        } else {
          // Fallback to first month if current month cannot be determined
          setSelectedMonth(1);
        }
      } catch (error) {
        console.error("Error initializing Islamic months:", error);
        setSelectedMonth(1);
      } finally {
        setLoading(false);
      }
    };

    initializeMonths();
  }, []);

  // Listen for language changes and update month options
  useEffect(() => {
    const handleLanguageChange = () => {
      const allMonths = getIslmaicMonthNames();
      setMonthOptions(allMonths);
    };

    // Listen for session storage updates (language changes)
    window.addEventListener("sessionValuesUpdated", handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("sessionValuesUpdated", handleLanguageChange);
    };
  }, []);

  const handleMonthSelect = (selectedValue) => {
    // Extract the month number from the selected option object
    const monthNumber =
      typeof selectedValue === "object" ? selectedValue.value : selectedValue;
    setSelectedMonth(monthNumber);
  };

  if (loading) {
    return (
      <div className="module p-6">
        <p className="text-center text-gray-500">Loading Islamic months...</p>
      </div>
    );
  }

  // Get events for the selected month
  const monthEvents = selectedMonth ? getEvents(selectedMonth) : [];

  return (
    <div className="module p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Islamic Events</h2>

        {/* Month Dropdown */}
        <div className="mb-6">
          <Dropdown
            options={monthOptions}
            preSelectOption={selectedMonth}
            onSelect={handleMonthSelect}
            placeholder="Select Islamic Month"
            label="Islamic Month"
            searchable={true}
          />
        </div>

        {/* Current Month Information */}
        {currentMonth && (
          <Card
            title="Current Islamic Month"
            body={
              <div className="flex flex-col items-center justify-center py-4">
                <p className="text-4xl font-bold text-primary mb-2">
                  {currentMonth.label}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Month {currentMonth.month} of 12
                </p>
                <p className="text-gray-500 text-xs">
                  {currentMonth.gregorianDate}
                </p>
                {currentMonth.hijriDate && (
                  <p className="text-gray-500 text-xs mt-2">
                    {currentMonth.hijriDate}
                  </p>
                )}
              </div>
            }
            className="bg-white"
          />
        )}

        {/* Selected Month Events */}
        {selectedMonth && (
          <div className="mt-6">
            {monthEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthEvents.map((event) => (
                  <Card
                    key={event.id}
                    body={
                      <div className="flex flex-col gap-3">
                        <h4 className="text-3xl font-bold text-gray-800">
                          {event.name}
                        </h4>
                        <p className="text-2xl text-gray-700 leading-relaxed">
                          {event.description}
                        </p>
                        <div>
                          {getTranslation("LabelTexts").celebrateByLabel} :
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                            {event.observed_by}
                          </span>
                        </div>
                      </div>
                    }
                    footer={
                      <div className="grid grid-cols-3 gap-2 flex-wrap">
                        <div>
                          {getTranslation("LabelTexts").dateLabel} :
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {event.islamic_date.startDate.day}
                          </span>
                        </div>
                        <div className="col-span-2">
                          {getTranslation("LabelTexts").eventLabel} :
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                            {event.type}
                          </span>
                        </div>
                        
                      </div>
                    }
                    className="bg-white"
                  />
                ))}
              </div>
            ) : (
              <Card
                body={
                  <div className="text-center text-gray-500 py-4">
                    {getTranslation("Errors").noDataFound}
                  </div>
                }
                className="bg-white"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
