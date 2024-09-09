import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function NavBar({ user, setUser, }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header className=" bg-green-600 p-4 flex items-center justify-between shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="text-white text-4xl font-semibold hover:text-green-300"
        >
          Travelly
        </Link>
      </div>
      

      <div className="flex-1"></div>
      <Link to="/destinations/your-destinations">
        <div className="mr-6">
          {user ? (
            <span className="text-2xl">
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mr-2">
        {user ? (
          <span className="text-2xl">
            <FontAwesomeIcon icon={faUser} />
          </span>
        ) : null}
      </div>

      <div className="font-semibold text-xl">{user ? user.username : null}</div>
      <div>
        {user ? (
          <button
            onClick={handleLogoutClick}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm ml-4"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm mr-2">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
