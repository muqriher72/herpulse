import React, { useState } from "react";

export default function EntryForm({ onAdd }) {
  const [time, setTime] = useState("");
  const [volume, setVolume] = useState("");
  const [fluidtype, setFluidType] = useState("");
  const [fluidvolume, setFluidVolume] = useState("");
  const [urineleak, setUrineLeak] = useState(false);
  const [urineurge, setUrineUrge] = useState(false);
  const [soiled, setSoiled] = useState(false);
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!time || !volume || !fluidtype || !fluidvolume || !urineleak || !urineurge || !soiled) return;
    onAdd({ time, volume, fluidtype, fluidvolume, urineleak, urineurge, soiled, notes });
    setTime("");
    setVolume("");
    setFluidType("");
    setFluidVolume("");
    setUrineLeak(false);
    setUrineUrge(false);
    setSoiled(false);
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Time of void:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

      <label>Volume of Urine (mL):</label>
      <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} required />

      <label>Type of Fluid Consumed:</label>
      <input type="text" value={fluidtype} onChange={(e) => setFluidType(e.target.value)} required />

      <label>Volume of Fluid Consumed (mL):</label>
      <input type="number" value={fluidvolume} onChange={(e) => setFluidVolume(e.target.value)} required />

      <label>Did your urine leak?:</label>
      <input type="checkbox" value={urineleak} onChange={(e) => setUrineLeak(e.target.value)} required />

      <label>Did you feel an urge to go?:</label>
      <input type="checkbox" value={urineurge} onChange={(e) => setUrineUrge(e.target.value)} required />

      <label>Did you soil your clothes with stool?:</label>
      <input type="checkbox" value={volume} onChange={(e) => setSoiled(e.target.value)} required />

      <label>Notes (optional):</label>
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="submit">Add Entry</button>
    </form>
  );
}
