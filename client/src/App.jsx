import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Upload from "./pages/Upload";
import Live from "./pages/Live";
import Profile from "./pages/Profile";
import VideoWatch from "./pages/VideoWatch";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/live" element={<Live />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/video/:id" element={<VideoWatch />} />
    </Routes>
  );
}

export default App;