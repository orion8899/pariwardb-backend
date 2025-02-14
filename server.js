require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema & Model
const RegistrationSchema = new mongoose.Schema({
  name: String,
  freedomFighterName: String,
  relation: String,
  mobile: String,
  state: String,
  sambhag: String,
  jila: String,
  address: String,
  organization: String
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// API Route
app.post('/submit', async (req, res) => {
  try {
    const newEntry = new Registration(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
