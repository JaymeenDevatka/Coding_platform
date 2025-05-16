const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Replace with your MySQL root password
  database: "coding_platform", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Sign In API
app.post("/api/signin", (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  const query = "SELECT * FROM real_users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Successful authentication
    res.status(200).json({
      message: "Login successful",
      token: "dummy-token", // Replace with a real JWT token in production
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
});

// Sign Up API
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const checkQuery =
      "SELECT * FROM real_users WHERE username = ? OR email = ?";
    const [existingUsers] = await db
      .promise()
      .query(checkQuery, [username, email]);

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO real_users (username, email, password_hash) VALUES (?, ?, ?)";
    await db.promise().query(insertQuery, [username, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
