const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ MongoDB Atlas connection (replace with your password)
mongoose.connect("mongodb+srv://swathigurijala:Swathi1403@productcluster.kylhwha.mongodb.net/contactdb?retryWrites=true&w=majority&appName=ProductCluster")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Welcome! Backend is running 🚀 Use /api/contact to submit form.");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
