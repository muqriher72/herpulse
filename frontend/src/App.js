import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import "./styles.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  function addEntry(entry) {
    setEntries([entry, ...entries]);
  }

  return (
    <div
      className="app"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Header />
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <a href="/calendar.html" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#6a5acd",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Calendar
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;
