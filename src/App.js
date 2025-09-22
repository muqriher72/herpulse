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
    <div className="app"
    style={{
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out', // cutesy
    }}>
      <Header />
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;
