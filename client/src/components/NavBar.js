import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header className="bg-green-600 p-4 flex items-center justify-between shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="text-white text-3xl font-semibold hover:text-green-300 sm:text-4xl"
        >
          Travelly
        </Link>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link to="/destinations/your-destinations">
          {user && (
            <div className="text-white text-xl sm:text-2xl">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
          )}
        </Link>

        {user && (
          <div className="text-white text-xl sm:text-2xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}

        <div className="hidden md:block font-semibold text-lg sm:text-xl text-white">
          {user ? user.username : null}
        </div>

        <div>
          {user ? (
            <button
              onClick={handleLogoutClick}
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm ml-4 text-sm sm:text-base"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm mr-2 text-sm sm:text-base">
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm text-sm sm:text-base">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
