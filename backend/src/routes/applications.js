import express from "express";
import { getAllApplications } from "../../db/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.json({ success: true, data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
