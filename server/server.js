const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VidNova Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "VidNova Backend Connected Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`VidNova server running on port ${PORT}`);
});