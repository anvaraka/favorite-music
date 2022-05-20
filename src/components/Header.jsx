import { Link } from "react-router-dom";

function Header() {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        justifyContent: "space-evenly",
        listStyle: "none",
      }}
    >
      <li>
        <Link style={{ textDecoration: "none", }} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: "none" }} to="/MyAlbums">
          My Albums
        </Link>
      </li>
    </ul>
  );
}

export default Header;
