import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePageLoggedIn from "../pages/HomePageLoggedIn";
import HomePageNotLoggedIn from "../pages/HomePageNotLoggedIn";
import DestinationDetail from "../pages/DestinationDetail";
import YourDestinations from "../pages/YourDestinations";
import DestinationAdmin from "../pages/DestinationAdmin";

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
    setBookedDestinations(
      bookedDestinations.filter((d) => d.id !== destination.id)
    );
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          {user ? (
            <>
              {user.is_admin && (
                <Route
                  path="/admin/destinations"
                  element={<DestinationAdmin />}
                />
              )}
              <Route
                path="/destinations/your-destinations"
                element={
                  <YourDestinations
                    booked={bookedDestinations}
                    onRemove={onRemoveFromBookedDestinations}
                  />
                }
              />
              <Route
                path="/destinations/:id"
                element={
                  <DestinationDetail
                    onAddToBookedDestinations={onAddToBookedDestinations}
                  />
                }
              />
              <Route path="*" element={<HomePageLoggedIn user={user} />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="*" element={<HomePageNotLoggedIn />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
