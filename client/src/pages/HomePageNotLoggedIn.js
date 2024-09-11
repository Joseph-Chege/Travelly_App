import React from "react";
import { Link } from "react-router-dom";


function HomePageNotLoggedIn({ setUser  }) {
  return (
    <div
      className="flex items-center justify-center h-screen bg-custom-image-0 mt-50 bg-cover bg-center mx-32"

    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Welcome to Travelly!
        </h1>
        <p className="text-gray-700 mb-6">
          Please log in or sign up to explore our amazing travel options.
        </p>
        <Link to="/signup">
          <button
            type="signup"
            className="w-32 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePageNotLoggedIn;
