import React, { useState } from "react";

function Calendar({ entries }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const getFormattedDate = (d) => {
    const date = new Date(Date.UTC(currentYear, currentMonth, d));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  };

  const initialDateString = getFormattedDate(today.getDate());
  const [selectedDate, setSelectedDate] = useState(initialDateString);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleClick = (day) => {
    setSelectedDate(getFormattedDate(day));
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(`${currentYear}-${String(currentMonth === 0 ? 12 : currentMonth).padStart(2, "0")}-01`);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(`${currentYear}-${String(currentMonth === 11 ? 1 : currentMonth + 2).padStart(2, "0")}-01`);
  };

  const logsForSelectedDate = selectedDate
    ? entries.filter((entry) => entry.date === selectedDate)
    : [];

  const monthName = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long" });

  return (
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
          <button onClick={handlePrevMonth} style={{ fontSize: "20px", background: "none", border: "none", cursor: "pointer", color: "#b574d2" }}>&lt;</button>
          <span style={{ fontWeight: "bold", fontSize: "20px", margin: "0 15px", color: "#b574d2" }}>
            {monthName} {currentYear}
          </span>
          <button onClick={handleNextMonth} style={{ fontSize: "20px", background: "none", border: "none", cursor: "pointer", color: "#b574d2" }}>&gt;</button>
        </div>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th key={day} style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => {
              let rows = [];
              let day = 1;
              for (let i = 0; day <= lastDate; i++) {
                let cells = [];
                for (let j = 0; j < 7; j++) {
                  if ((i === 0 && j < firstDay) || day > lastDate) {
                    cells.push(<td key={j} style={{ border: "1px solid #eee" }}></td>);
                  } else {
                    const d = day;
                    const currentDateString = getFormattedDate(d);
                    const isToday =
                      d === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();
                    const isSelected = currentDateString === selectedDate;
                    const hasLogs = entries.some(entry => entry.date === currentDateString);

                    cells.push(
                      <td
                        key={j}
                        onClick={() => handleClick(d)}
                        style={{
                          padding: "10px 5px",
                          textAlign: "center",
                          cursor: "pointer",
                          border: "1px solid #ccc",
                          height: '40px',
                          backgroundColor: isSelected ? "#b574d2" : (isToday ? "#f0e8f8" : "#fff"),
                          color: isSelected ? "#fff" : "#333",
                          fontWeight: isSelected ? "bold" : "normal",
                          borderBottom: hasLogs ? '3px solid #b574d2' : '1px solid #ccc',
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = "#e6e0ff";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = isToday ? "#f0e8f8" : "#fff";
                            e.currentTarget.style.transform = "scale(1)";
                          }
                        }}
                      >
                        {day++}
                        {hasLogs && <div style={{ fontSize: '12px', lineHeight: '10px', color: isSelected ? '#fff' : '#b574d2' }}>•</div>}
                      </td>
                    );
                  }
                }
                rows.push(<tr key={i}>{cells}</tr>);
              }
              return rows;
            })()}
          </tbody>
        </table>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: "250px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          minHeight: "250px",
        }}
      >
        <h3 style={{ color: "#b574d2", marginTop: 0 }}>
          Logs for {new Date(selectedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })}
        </h3>
        {logsForSelectedDate.length === 0 ? (
          <p>No logs for this date.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {logsForSelectedDate.map((entry, idx) => (
              <li 
                key={idx} 
                style={{ 
                  backgroundColor: '#f9f9f9', 
                  padding: '10px', 
                  marginBottom: '8px', 
                  borderRadius: '5px',
                  borderLeft: '4px solid #b574d2',
                  wordWrap: 'break-word' 
                }}
              >
                <div><strong>Time:</strong> {entry.time}</div>
                <div><strong>Urine Volume:</strong> {entry.volume} mL</div>
                <div><strong>Fluid Type:</strong> {entry.fluidtype}</div>
                <div><strong>Fluid Volume:</strong> {entry.fluidvolume} mL</div>
                <div><strong>Menstrual Cycle Date:</strong> {entry.menstrual}</div>
                <div><strong>Urine Leak:</strong> {entry.urineleak ? "Yes" : "No"}</div>
                <div><strong>Urgency:</strong> {entry.urineurge ? "Yes" : "No"}</div>
                <div><strong>Soiled Clothes:</strong> {entry.soiled ? "Yes" : "No"}</div>
                {entry.notes && <div><strong>Notes:</strong> {entry.notes}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Calendar;