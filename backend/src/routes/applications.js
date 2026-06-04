import express from "express";
import { getAllApplications, insertApplication } from "../../db/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";

    const result = await getAllApplications({ page, limit, search });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, title, company, location, description, applied_at, work_type } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: "Missing url" });
    }

    const saved = await insertApplication({ url, title, company, location, description, applied_at, work_type });
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
