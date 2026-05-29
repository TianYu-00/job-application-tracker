const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const scrapeRoutes = require("./routes/scrape");
app.use("/scrape", scrapeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to main endpoint" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
