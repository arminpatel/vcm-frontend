import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          {" "}
          Virtual Contest Maker{" "}
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-vertical lg:menu-horizontal px-1">
          <li>
            <Link to="/create-contest"> Create Contest </Link>
          </li>
            {
              user?.loggedIn ? (
              <>
                <li>
                  <Link to={`/profile/${user?.user?.username}`}> {user?.user?.username} </Link>
                </li>
                <li>
                  <Link to="/logout"> Log out </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login"> Log in </Link>
              </li>
            )
            }
        </ul>
      </div>
    </div>
  );
}
