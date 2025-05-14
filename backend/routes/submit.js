const express = require("express");
const router = express.Router();
const { submitCode } = require("../controllers/submit");

// Define route for submitting code
router.post("/", submitCode);

module.exports = router;