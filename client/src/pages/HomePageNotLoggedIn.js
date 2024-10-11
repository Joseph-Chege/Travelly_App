import React from "react";
import { Link } from "react-router-dom";

function HomePageNotLoggedIn() {
  return (
    <div className="flex items-center justify-center h-screen bg-custom-image-0 bg-cover bg-center ">
      <div className="bg-white bg-opacity-75 p-6 sm:p-8 rounded-lg shadow-lg text-center max-w-xs sm:max-w-sm md:max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">
          Welcome to Travelly!
        </h1>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Please log in or sign up to explore our amazing travel options.
        </p>
        <Link to="/signup">
          <button
            type="signup"
            className="w-full sm:w-32 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePageNotLoggedIn;
