import { Link } from "react-router-dom";
import "../css/style.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/favourites">Favourites</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}
