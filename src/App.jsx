import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [newEntry, setNewEntry] = useState('');

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(dateKey);
    setNewEntry(calendarData[dateKey] || '');
  };

  const handleSave = () => {
    setCalendarData({ ...calendarData, [selectedDate]: newEntry });
    setSelectedDate('');
    setNewEntry('');
  };

  return (
    <div className="calendar-app">
      <h1>📅 Tynga's TikTok Calendar</h1>
      <div className="calendar-grid">
        {[...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).keys()].map((val, idx) => {
          if (val === null) return <div key={`blank-${idx}`} className="blank-day" />;
          const day = val + 1;
          const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
          return (
            <div
              key={day}
              className={`calendar-day ${calendarData[dateKey] ? 'has-entry' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <span>{day}</span>
              {calendarData[dateKey] && <p>{calendarData[dateKey]}</p>}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="entry-modal">
          <h3>Add/Edit Entry for {selectedDate}</h3>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Type your TikTok idea..."
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedDate('')}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
