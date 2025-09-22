import React, { useState } from "react";

export default function EntryForm({ onAdd }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [volume, setVolume] = useState("");
  const [fluidtype, setFluidType] = useState("");
  const [fluidvolume, setFluidVolume] = useState(0);
  const [menstrual, setMenstrual] = useState("");
  const [urineleak, setUrineLeak] = useState(false);
  const [urineurge, setUrineUrge] = useState(false);
  const [soiled, setSoiled] = useState(false);
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!time || !date || !volume || !fluidtype || !fluidvolume || !menstrual) return;
    onAdd({
      time,
      date,
      volume: Number(volume),
      fluidtype,
      fluidvolume: Number(fluidvolume),
      menstrual,
      urineleak,
      urineurge,
      soiled,
      notes
    });

    setTime("");
    setDate("");
    setVolume("");
    setFluidType("");
    setFluidVolume("");
    setMenstrual("");
    setUrineLeak(false);
    setUrineUrge(false);
    setSoiled(false);
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Time of void:</label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            const formatted = now.toTimeString().slice(0, 5);
            setTime(formatted);
          }}
        >
          Now
        </button>
      </div>


      <label>Date of void:</label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
        />

        <button
          type="button"
          onClick={() => {
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0];
            setDate(formattedDate);
          }}
        >
          Today
        </button>
      </div>

      <label>Volume of Urine (mL):</label>
      <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} required />

      <label>Type of Fluid Consumed:</label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input type="text" value={fluidtype} onChange={(e) => setFluidType(e.target.value)} required />

        {["Water", "Coffee", "Tea", "Milk", "Other, please specify in notes!"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFluidType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <label>Volume of Fluid Consumed (mL):</label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setFluidVolume((i + 1) * 250)}
          >
            {i < Math.round(fluidvolume / 250) ? "🥛" : "⬜️"}
          </span>
        ))}
        <button
          type="button"
          onClick={() => setFluidVolume(Math.max(0, fluidvolume - 250))}
        >
          ➖
        </button>
        <button
          type="button"
          onClick={() => setFluidVolume(Math.min(2500, fluidvolume + 250))}
        >
          ➕
        </button>
      </div>
      <p>Fluid volume: ~ {fluidvolume} mL</p>

      <label>When was the first date of your last menstrual cycle?</label>
      <input 
      type="date" 
      value={menstrual} 
      onChange={(e) => setMenstrual(e.target.value)} 
      max={new Date().toISOString().split("T")[0]} // note: will prevent patients from selecting a date in the future
      required />

      <label>Did your urine leak?</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setUrineLeak(true)}
          style={{ backgroundColor: urineleak ? "#4CAF50" : "#f0f0f0" }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setUrineLeak(false)}
          style={{ backgroundColor: urineleak === false ? "#f44336" : "#f0f0f0" }}
        >
          No
        </button>
      </div>

      <label>Did you feel an urge to go?</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setUrineUrge(true)}
          style={{ backgroundColor: urineurge ? "#4CAF50" : "#f0f0f0" }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setUrineUrge(false)}
          style={{ backgroundColor: urineurge === false ? "#f44336" : "#f0f0f0" }}
        >
          No
        </button>
      </div>

      <label>Did you soil your clothes with stool?</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setSoiled(true)}
          style={{ backgroundColor: soiled ? "#4CAF50" : "#f0f0f0" }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setSoiled(false)}
          style={{ backgroundColor: soiled === false ? "#f44336" : "#f0f0f0" }}
        >
          No
        </button>
      </div>

      <label>Notes (optional):</label>
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="submit">Add Entry</button>
    </form>
  );
}
