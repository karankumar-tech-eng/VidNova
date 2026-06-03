const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let videos = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("VidNova Backend Running");
});

app.get("/api/videos", (req, res) => {
  res.json(videos);
});

app.post(
  "/api/videos/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  (req, res) => {
    const { title, description, category } = req.body;

    if (!req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "Video and thumbnail required" });
    }

    const newVideo = {
      id: Date.now(),
      title,
      description,
      category,
      creator: "Karan Kumar",
      views: "0 views",
      uploaded: "Just now",
      duration: "New",
      videoUrl: `http://localhost:5000/uploads/${req.files.video[0].filename}`,
      thumbnail: `http://localhost:5000/uploads/${req.files.thumbnail[0].filename}`,
    };

    videos.unshift(newVideo);

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  }
);

app.listen(PORT, () => {
  console.log(`VidNova server running on http://localhost:${PORT}`);
});