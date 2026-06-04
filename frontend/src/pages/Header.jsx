import { Link } from "react-router";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/applications">Applications</Link>
      </nav>
    </header>
  );
}

export default Header;
