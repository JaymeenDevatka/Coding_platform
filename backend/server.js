const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/problems", require("./routes/problems"));
app.use("/api/testcases", require("./routes/testcases"));
app.use("/api/submit", require("./routes/submit"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Coding Problem Manager Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});