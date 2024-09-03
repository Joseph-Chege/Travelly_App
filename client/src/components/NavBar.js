import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header className=" bg-green-600 p-4 flex items-center justify-between shadow-md fixed top-0 w-full">
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="text-white text-4xl font-semibold hover:text-green-300"
        >
          Travelly
        </Link>
      </div>
      <div className="flex-1"></div>
      <div>
        {user ? (
          <button
            onClick={handleLogoutClick}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 shadow-sm"
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
