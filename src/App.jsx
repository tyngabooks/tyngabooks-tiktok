import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from "date-fns";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarPosts, setCalendarPosts] = useState({});
  const [modalPost, setModalPost] = useState({ title: "", caption: "", comment: "", hashtags: "" });
  const today = new Date();

  const getMonthMatrix = () => {
    const start = startOfWeek(startOfMonth(today), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(today), { weekStartsOn: 0 });
    const matrix = [];
    let day = start;
    while (day <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      matrix.push(week);
    }
    return matrix;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setModalPost({ title: "", caption: "", comment: "", hashtags: "" });
  };

  const handleSave = () => {
    const key = format(selectedDate, "yyyy-MM-dd");
    const updated = calendarPosts[key] ? [...calendarPosts[key], modalPost] : [modalPost];
    setCalendarPosts({ ...calendarPosts, [key]: updated });
    setSelectedDate(null);
  };

  const monthMatrix = getMonthMatrix();

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold">🎯 TikTok Command Center</h1>
      <p className="text-sm text-muted-foreground">👋 Add multiple TikTok posts per day. Click a date to get started!</p>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-sm text-muted-foreground">{d}</div>
        ))}
        {monthMatrix.map((week, i) =>
          week.map((day, j) => {
            const key = format(day, "yyyy-MM-dd");
            return (
              <div
                key={`${i}-${j}`}
                className={`border rounded p-1 text-left cursor-pointer hover:bg-gray-200 ${!isSameMonth(day, today) ? "opacity-50" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="text-xs font-bold">{format(day, "d")}</div>
                {calendarPosts[key] && calendarPosts[key].map((post, idx) => (
                  <div key={idx} className="text-xs mt-1 text-gray-800">• {post.title}</div>
                ))}
              </div>
            );
          })
        )}
      </div>

      {selectedDate && (
        <div className="border p-4 rounded grid gap-2 bg-white shadow-md">
          <h2 className="font-bold">Add post for {format(selectedDate, "MMMM d, yyyy")}</h2>
          <label>Video Title</label>
          <input className="border p-1" value={modalPost.title} onChange={(e) => setModalPost({ ...modalPost, title: e.target.value })} />
          <label>Caption</label>
          <textarea className="border p-1" value={modalPost.caption} onChange={(e) => setModalPost({ ...modalPost, caption: e.target.value })} rows={2} />
          <label>First Comment</label>
          <textarea className="border p-1" value={modalPost.comment} onChange={(e) => setModalPost({ ...modalPost, comment: e.target.value })} rows={2} />
          <label>Hashtags</label>
          <textarea className="border p-1" value={modalPost.hashtags} onChange={(e) => setModalPost({ ...modalPost, hashtags: e.target.value })} rows={2} />
          <div className="flex gap-2 mt-2">
            <button className="bg-black text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
            <button className="border px-3 py-1 rounded" onClick={() => setSelectedDate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
