import React, { useState } from "react";

export default function EntryForm({ onAdd }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [volume, setVolume] = useState("");
  const [fluidtype, setFluidType] = useState("");
  const [fluidvolume, setFluidVolume] = useState("");
  const [menstrual, setMenstrual] = useState("");
  const [urineleak, setUrineLeak] = useState(false);
  const [urineurge, setUrineUrge] = useState(false);
  const [soiled, setSoiled] = useState(false);
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!time || !date || !volume || !fluidtype || !fluidvolume || !menstrual || !urineleak || !urineurge || !soiled) return;
    onAdd({ time, date, volume, fluidtype, fluidvolume, menstrual, urineleak, urineurge, soiled, notes });
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
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

      <label>Date of void:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Volume of Urine (mL):</label>
      <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} required />

      <label>Type of Fluid Consumed:</label>
      <input type="text" value={fluidtype} onChange={(e) => setFluidType(e.target.value)} required />

      <label>Volume of Fluid Consumed (mL):</label>
      <input type="number" value={fluidvolume} onChange={(e) => setFluidVolume(e.target.value)} required />

      <label>When was the first date of your last menstrual cycle?</label>
      <input type="date" value={menstrual} onChange={(e) => setMenstrual(e.target.value)} required />

      <label>
        <input
          type="checkbox"
          checked={urineleak}
          onChange={(e) => setUrineLeak(e.target.checked)}
        />
        Did your urine leak?
      </label>

      <label>
        <input
          type="checkbox"
          checked={urineurge}
          onChange={(e) => setUrineUrge(e.target.checked)}
        />
        Did you feel an urge to go?
      </label>

      <label>
        <input
          type="checkbox"
          checked={soiled}
          onChange={(e) => setSoiled(e.target.checked)}
        />
        Did you soil your clothes with stool?
      </label>

      <label>Notes (optional):</label>
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="submit">Add Entry</button>
    </form>
  );
}
