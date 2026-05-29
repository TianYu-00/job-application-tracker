const express = require("express");

const app = express();

app.use(express.json());

// routes
const applicationRoutes = require("./routes/applications");
app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to main endpoint" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
