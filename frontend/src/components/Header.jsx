import { Link } from "react-router";

function Header() {
  return (
    <header className="px-6 py-4 border-b">
      <nav className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/applications">Applications</Link>
      </nav>
    </header>
  );
}

export default Header;
