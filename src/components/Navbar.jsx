import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
function NavBar() {
    return (
        
  <nav className="navbar bordered">
    <div className="navbar-brand">
      <span className="icon-check">✔</span>
      <Link to="/" className="brand-text">TaskWare</Link>
    </div>
    <div className="navbar-content center">
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
    </div>
    <div className="navbar-content end">
      <Link to="/login" className="btn-primary">Get Started</Link>
    </div>
  </nav>
)};
export default NavBar;