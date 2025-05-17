const express = require("express");
const cors = require("cors");
require("dotenv").config();

const problemsRouter = require("./routes/problems");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the problems API at /api/problems
app.use("/api/problems", problemsRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});