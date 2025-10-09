import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import Calendar from "./components/Calendar";
import "./styles.css";

const API_URL = "http://localhost:5000/api/entries"; 

function App() {
  const [entries, setEntries] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data.reverse());
    } catch (error) {
      console.error("Error fetching data. Is the backend server running? Check port 5000.", error);
    }
  };

  useEffect(() => {
    setVisible(true);
    fetchEntries();
  }, []); 

  async function addEntry(entry) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries([newEntry, ...entries]);
      } else {
        console.error("Failed to add entry on the server. Status:", response.status);
      }
    } catch (error) {
      console.error("Network error during POST. Is the backend server running?", error);
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex justify-center items-start"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="bg-white shadow-xl rounded-lg p-8 mt-6 w-full max-w-4xl">
        <Header />
        <EntryForm onAdd={addEntry} />
        <EntryList entries={entries} />

        <div className="mt-10 p-6" style={{ padding: "20px", borderTop: "1px solid #eee" }}>
          <h2 style={{ color: "#b574d2", marginBottom: "20px" }}>Calendar</h2>
          <Calendar entries={entries} />
        </div>
      </div>
    </div>
  );
}

export default App;