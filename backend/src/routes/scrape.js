import express from "express";
import { scrapeJob } from "../controllers/scrapeController.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const url = req.body.url;

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

export default router;
