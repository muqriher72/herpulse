import React from "react";

export default function EntryCard({ entry }) {
  return (
    <div className="entry-card">
      <p><strong>🕒 Time:</strong> {entry.time}</p>
      <p><strong>💧 Urine Volume:</strong> {entry.volume} mL</p>
      <p><strong>🥤 Fluid Type:</strong> {entry.fluidtype}</p>
      <p><strong>🥛 Fluid Volume:</strong> {entry.fluidvolume} mL</p>

      <p>
        <strong>🚱 Urine Leak:</strong> {entry.urineleak ? "Yes" : "No"}
      </p>
      <p>
        <strong>😖 Urgency:</strong> {entry.urineurge ? "Yes" : "No"}
      </p>
      <p>
        <strong>🧼 Soiled Clothes:</strong> {entry.soiled ? "Yes" : "No"}
      </p>

      {entry.notes && (
        <p><strong>📝 Notes:</strong> {entry.notes}</p>
      )}
    </div>
  );
}
