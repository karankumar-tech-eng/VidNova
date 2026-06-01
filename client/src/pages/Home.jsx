import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import videos from "../data/videos";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <p className="tagline">Stream • Upload • Go Live</p>

          <h1>Unlimited Videos, Live Streams & Creators</h1>

          <p className="hero-desc">
            VidNova is a modern full stack video streaming platform where users
            can watch videos, explore trending content, upload videos and enjoy
            live streaming.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search videos, creators or live streams..."
            />
            <button>Search</button>
          </div>

          <div className="hero-buttons">
            <button className="primary-btn">Start Watching</button>
            <button className="secondary-btn">Upload Video</button>
          </div>
        </div>

        <div className="featured-card">
          <span>Featured</span>
          <h2>VidNova Originals</h2>
          <p>Premium videos, creators and live content in one place.</p>
          <Link to="/video/1">
            <button>Watch Now</button>
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>Trending Videos</h2>

        <div className="video-grid">
          {videos.map((video) => (
            <Link to={`/video/${video.id}`} className="video-card" key={video.id}>
              <div className="thumbnail-img">
                <img src={video.thumbnail} alt={video.title} />
                <span className="play-icon">▶</span>
                <span className="duration">{video.duration}</span>
              </div>

              <h3>{video.title}</h3>
              <p>
                {video.creator} • {video.views}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Categories</h2>

        <div className="category-grid">
          <div>Movies</div>
          <div>Technology</div>
          <div>Gaming</div>
          <div>Education</div>
          <div>Music</div>
          <div>Live</div>
        </div>
      </section>
    </div>
  );
}

export default Home;