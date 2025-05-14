const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Judge0 API Base URL and API Key
const JUDGE0_BASE_URL = "https://api.judge0.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Submit Code to Judge0 API
router.post("/submit", async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    try {
        // Submit code to Judge0
        const submissionResponse = await axios.post(
            `${JUDGE0_BASE_URL}/submissions?base64_encoded=false`,
            {
                source_code,
                language_id,
                stdin,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": JUDGE0_API_KEY,
                },
            }
        );

        const { token } = submissionResponse.data;

        // Poll for the result
        let result;
        do {
            const resultResponse = await axios.get(`${JUDGE0_BASE_URL}/submissions/${token}`, {
                headers: {
                    "X-Auth-Token": JUDGE0_API_KEY,
                },
            });
            result = resultResponse.data;
        } while (result.status.id <= 2); // Status `1` = In Queue, `2` = Processing

        res.json(result);
    } catch (error) {
        console.error("Error submitting code:", error);
        res.status(500).json({ error: "Failed to execute code" });
    }
});

module.exports = router;