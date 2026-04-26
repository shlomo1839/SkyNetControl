import { NavLink } from "react-router-dom";
import iafLogo from '../images/iaf.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-section left">
        <div className="nav-logo">SkyControl</div>
      </div>

      <div className="nav-section center">
        <img src={iafLogo} alt="IAF Logo" className="central-iaf-logo" />
      </div>

      <div className="nav-section right">
        <div className="nav-links">
          <NavLink to="/" end>לוח טיסות</NavLink>
          <NavLink to="/map">מפות</NavLink>
          <NavLink to="/fleet">ניהול צי</NavLink>
          <NavLink to="/types">סוגי מטוסים</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
