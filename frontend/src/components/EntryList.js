import React from "react";
import EntryCard from "./EntryCard";

export default function EntryList({ entries }) {
  return (
    <div className="entry-list">
      {entries.length === 0 ? (
        <p style={{ textAlign: "center" }}>No entries yet.</p>
      ) : (
        entries.map((entry, index) => <EntryCard key={index} entry={entry} />)
      )}
    </div>
  );
}
