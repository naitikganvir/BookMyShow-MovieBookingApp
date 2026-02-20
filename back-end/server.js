const express = require("express");
const app = express();
const connectDB = require("./dbConnection");
const cors = require("cors");

// CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect Database
connectDB();

// Root Route (so no "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Movie Booking Backend is running 🚀");
});

// API Routes
app.use("/api", require("./routes"));

// PORT Fix for Render
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});