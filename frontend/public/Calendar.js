import React, { useState } from "react";

function Calendar({ entries }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const handleClick = (day) => {
        setSelectedDate(
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
                2,
                "0"
            )}`
        );
    };

    const logsForSelectedDate = selectedDate
        ? entries.filter((entry) => entry.date === selectedDate)
        : [];

    return (
        <div
            style={{
                display: "flex",
                gap: "40px",
                flexWrap: "wrap",
                padding: "20px",
                backgroundColor: "#fafafa",
                borderRadius: "10px"
            }}
        >
            <table
                style={{
                    borderCollapse: "collapse",
                    width: "300px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}

            >
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
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
                                    cells.push(<td key={j}></td>);
                                } else {
                                    const d = day;
                                    cells.push(
                                        <td
                                            key={j}
                                            onClick={() => handleClick(d)}
                                            style={{
                                                padding: "10px",
                                                textAlign: "center",
                                                backgroundColor:
                                                    d === today.getDate() ? "#f0e8f8" : "#fff",
                                                cursor: "pointer",
                                                border: "1px solid #ccc",
                                                transition: "background-color 0.3s ease, transform 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#e6e0ff";
                                                e.target.style.transform = "scale(1.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor =
                                                    d === today.getDate() ? "#f0e8f8" : "#fff";
                                                e.target.style.transform = "scale(1)";
                                            }}
                                        >
                                            {day++}
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

            {/* Logs Panel */}
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
                <h3 style={{ color: "#b574d2", marginTop: 0 }}>Logs</h3>
                {logsForSelectedDate.length === 0 ? (
                    <p>No logs for this date.</p>
                ) : (
                    <ul>
                        {logsForSelectedDate.map((entry, idx) => (
                            <li key={idx}>{entry.content}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Calendar;