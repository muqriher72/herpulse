import React, { useState } from "react";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import "./styles.css";

function App() {
  const [entries, setEntries] = useState([]);

  function addEntry(entry) {
    setEntries([entry, ...entries]);
  }

  return (
    <div className="app">
      <Header />
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;
