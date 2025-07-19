import React, { useState, useEffect } from "react";
import "./index.css";

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getStartDay = (month, year) => new Date(year, month, 1).getDay();
const getToday = () => new Date().getDate();

const App = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("calendar-notes");
    return saved ? JSON.parse(saved) : {};
  });

  const month = 6; // July (0-indexed)
  const year = 2025;
  const totalDays = daysInMonth(month, year);
  const startDay = getStartDay(month, year);
  const today = getToday();

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handleChange = (day, text) => {
    setNotes((prev) => ({ ...prev, [day]: text }));
  };

  return (
    <div className="container">
      <h1>July 2025 Content Calendar</h1>
      <div className="calendar">
        {[...Array(startDay)].map((_, i) => (
          <div className="empty" key={`empty-${i}`} />
        ))}
        {[...Array(totalDays)].map((_, i) => {
          const day = i + 1;
          return (
            <div className="day" key={day}>
              <div className={`day-number ${day === today ? "today" : ""}`}>{day}</div>
              <textarea
                placeholder="Add note..."
                value={notes[day] || ""}
                onChange={(e) => handleChange(day, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

