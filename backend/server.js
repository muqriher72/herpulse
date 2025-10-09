const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let entries = []; 
const mockEntry = { 
    id: Date.now() + 1, 
    date: new Date().toISOString().split('T')[0], // this is today's date in YYYY-MM-DD format
    content: "First mock entry from the API!",
    title: "Mock Title" 
};
entries.push(mockEntry);
// --- IMPORTANT: This array stores data temporarily. Data is LOST on server restart! ---
app.use(cors());
app.use(express.json());

app.get('/api/entries', (req, res) => {
    console.log(`[API] GET request received. Sending ${entries.length} entries.`);
    res.json(entries); 
});

app.post('/api/entries', (req, res) => {
    const entryData = req.body;
    const newEntry = {
        id: Date.now(),
        ...entryData
    };
    entries.push(newEntry);
    console.log(`[API] POST request received. New entry added with ID: ${newEntry.id}`);
    
    res.status(201).json(newEntry); 
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
});