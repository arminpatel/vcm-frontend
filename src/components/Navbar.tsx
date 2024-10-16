import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, LogIn } from "lucide-react";

export function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex items-center p-4 justify-between bg-background">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <h1 className="text-xl font-bold"> Virtual Contest Maker </h1>
        </Link>
      </div>

      <nav className="flex items-center space-x-4">
        <Button variant="outline" asChild>
          <Link to="/create-contest"> Create Contest </Link>
        </Button>
        {user?.loggedIn ? (
          <>
            <Button variant="ghost">
              <User className="mr-2 h-4 w-4" />
              <Link to={`/profile/${user?.user?.username}`}>
                {" "}
                {user?.user?.username}{" "}
              </Link>
            </Button>

            <Button variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              <Link to="/logout"> Log out </Link>
            </Button>
          </>
        ) : (
          <Button variant="ghost">
            <LogIn className="mr-2 h-4 w-4" />
            <Link to="/login"> Log in </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
