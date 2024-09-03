import React, { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePageLoggedIn from "../pages/HomePageLoggedIn";
import HomePageNotLoggedIn from "../pages/HomePageNotLoggedIn";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
    <NavBar user={user} setUser={setUser}/>
    <main >
        {user ? (
          <HomePageLoggedIn user={user} setUser={setUser} />
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={<Signup setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} />}
            />
            <Route path="/" element={<HomePageNotLoggedIn />} />
          </Routes>
        )}
      </main>
    </>
    
  );
}

export default App;
