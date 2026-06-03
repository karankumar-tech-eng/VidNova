import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import defaultVideos from "../data/videos";

function VideoWatch() {
  const { id } = useParams();

  const [videos, setVideos] = useState(defaultVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((uploadedVideos) => {
        setVideos([...uploadedVideos, ...defaultVideos]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Backend not connected", err);
        setLoading(false);
      });
  }, []);

  const video = videos.find((item) => String(item.id) === String(id));
  const relatedVideos = videos.filter((item) => String(item.id) !== String(id));

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="not-found">
          <h1>Loading video...</h1>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="app">
        <Navbar />
        <div className="not-found">
          <h1>Video not found</h1>
          <Link to="/">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />

      <main className="watch-container">
        <section className="watch-left">
          <div className="video-player">
            <video src={video.videoUrl} controls poster={video.thumbnail}></video>
          </div>

          <h1 className="watch-title">{video.title}</h1>

          <div className="watch-meta">
            <p>
              {video.views} • {video.uploaded} • {video.category}
            </p>

            <div className="action-buttons">
              <button>👍 Like</button>
              <button>💬 Comment</button>
              <button>🔗 Share</button>
            </div>
          </div>

          <div className="creator-box">
            <div className="creator-avatar">{video.creator.charAt(0)}</div>

            <div>
              <h3>{video.creator}</h3>
              <p>1.5M subscribers</p>
            </div>

            <button className="subscribe-btn">Subscribe</button>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p>{video.description}</p>
          </div>

          <div className="comments-box">
            <h3>Comments</h3>

            <div className="comment-input">
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </div>

            <div className="comment">
              <strong>Rahul Kumar</strong>
              <p>Amazing video quality. VidNova is looking professional now.</p>
            </div>

            <div className="comment">
              <strong>Priya Sharma</strong>
              <p>This watch page looks like a real streaming platform.</p>
            </div>
          </div>
        </section>

        <aside className="watch-right">
          <h2>Related Videos</h2>

          {relatedVideos.map((item) => (
            <Link to={`/video/${item.id}`} className="related-card" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div>
                <h4>{item.title}</h4>
                <p>{item.creator}</p>
                <span>{item.views}</span>
              </div>
            </Link>
          ))}
        </aside>
      </main>
    </div>
  );
}

export default VideoWatch;