import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePageLoggedIn from "../pages/HomePageLoggedIn";
import HomePageNotLoggedIn from "../pages/HomePageNotLoggedIn";
import DestinationDetail from "../pages/DestinationDetail";
import YourDestinations from "../pages/YourDestinations";

function App() {
  const [user, setUser] = useState(null);
  const [bookedDestinations, setBookedDestinations] = useState([]);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const onAddToBookedDestinations = (destination) => {
    setBookedDestinations([...bookedDestinations, destination]);
  };

  const onRemoveFromBookedDestinations = (destination) => {
    setBookedDestinations(bookedDestinations.filter((d) => d.id!== destination.id));
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Routes>
            <Route path="*" element={<HomePageLoggedIn />} />
            <Route path="/destinations/your-destinations" element={<YourDestinations booked={bookedDestinations} onRemove={onRemoveFromBookedDestinations} />} />
            <Route path="/destinations/:id" element={<DestinationDetail onAddToBookedDestinations={onAddToBookedDestinations}/>} />
            <Route path="/logout" element={() => setUser(null)} />
          </Routes>

        ) : (
          <Routes>
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<HomePageNotLoggedIn />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
