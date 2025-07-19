import React from 'https://esm.sh/react'
import ReactDOM from 'https://esm.sh/react-dom/client'

function App() {
  const today = new Date()
  const month = today.toLocaleString('default', { month: 'long' })
  const year = today.getFullYear()

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const firstDayOfMonth = new Date(year, today.getMonth(), 1).getDay()
  const totalDays = getDaysInMonth(year, today.getMonth())
  const days = []

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(i)
  }

  const rows = []
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7))
  }

  return (
    <>
      <h1>{month} {year} Content Calendar</h1>
      <table>
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} data-today={day === today.getDate()}>
                  {day || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)
