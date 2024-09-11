import React, { useEffect, useState } from "react";
import DestinationList from "../components/DestinationList";
import DestinationAdmin from "./DestinationAdmin";


function HomePageLoggedIn({ user }) {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("/destinations").then((r) => {
      if (r.ok) {
        r.json().then((data) => setDestinations(data));
      }
    });
  }, []);


  return (
    <div>
      {user.is_admin ? (
        <DestinationAdmin user={user} />
      ) : (
        <div>
          <ul className="h-48 flex justify-around flex-wrap gap-4 pt-8 pb-8">
            <DestinationList destinations={destinations} />
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePageLoggedIn;
