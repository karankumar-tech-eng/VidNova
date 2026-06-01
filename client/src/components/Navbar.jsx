import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        VidNova
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/live">Live</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <button className="signin-btn">Sign In</button>
    </nav>
  );
}