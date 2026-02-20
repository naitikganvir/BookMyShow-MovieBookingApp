const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnection");

const app = express();

// Connect Database
connectDB();

// ✅ CORS FIX
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root
app.get("/", (req, res) => {
  res.send("Movie Booking Backend is running 🚀");
});

// Routes
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});