import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl"> Virtual Contest Maker </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-vertical lg:menu-horizontal px-1">
          <li><Link to="/create-contest"> Create Contest </Link></li>
          <li><Link to="/login"> Sign In </Link></li>
        </ul>
      </div>
    </div>
  )
}
