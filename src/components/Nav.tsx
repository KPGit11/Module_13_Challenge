import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Search Candidates</Link>
        </li>
        <li>
          <Link to="/saved">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;