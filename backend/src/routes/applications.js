const express = require("express");
const router = express.Router();

const { scrapeJob } = require("../controllers/scrapeController");

router.get("/", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "Missing url",
      });
    }

    const data = await scrapeJob(url);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
