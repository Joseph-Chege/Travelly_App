import React, { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error messages

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setUser(user);
            setError(""); // Clear error message on successful login
          });
        } else {
          response.json().then((errorData) => {
            setError("Entered the wrong password"); // Set error message if login fails
          });
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again."); // Handle network errors
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl sm:text-2xl font-bold text-center text-green-600 mb-6">
            Login
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p> // Display error message
          )}

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
