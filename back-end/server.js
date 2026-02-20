const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnection");

const app = express();

// ======================
// CONNECT DATABASE
// ======================
connectDB();

// ======================
// CORS CONFIGURATION
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://book-my-show-movie-booking-app.vercel.app/", // replace with your real Vercel URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ======================
// ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Movie Booking Backend is running 🚀");
});

// ======================
// API ROUTES
// ======================
app.use("/api", require("./routes"));

// ======================
// PORT (IMPORTANT FOR RENDER)
// ======================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});