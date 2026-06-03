import express from "express";
import cors from "cors";
import scrapeRoutes from "./routes/scrape.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/scrape", scrapeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to main endpoint" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
