import { useState } from "react";
import Navbar from "../components/Navbar";

function Upload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      setMessage("Please fill all fields");
      return;
    }

    if (!videoFile || !thumbnailFile) {
      setMessage("Please select video and thumbnail");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("video", videoFile);
    data.append("thumbnail", thumbnailFile);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.message || "Upload failed");
        return;
      }

      setMessage("Video uploaded successfully ✅");

      setFormData({
        title: "",
        description: "",
        category: "",
      });

      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      console.log(error);
      setMessage("Backend not connected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="upload-container">
        <div className="upload-card">
          <h1>Upload Video</h1>
          <p>Share your content with VidNova viewers.</p>

          <form onSubmit={handleUpload}>
            <label>Video Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter video title"
              value={formData.title}
              onChange={handleChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter video description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Music">Music</option>
              <option value="Gaming">Gaming</option>
              <option value="Movies">Movies</option>
              <option value="Live">Live</option>
            </select>

            <label>Upload Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />

            <label>Upload Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </form>

          {message && <h3 className="upload-message">{message}</h3>}
        </div>
      </div>
    </div>
  );
}

export default Upload;