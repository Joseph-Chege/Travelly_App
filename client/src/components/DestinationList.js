import React, { useState } from "react";
import Destination from "./Destination";

function DestinationList({ destinations }) {
  const [showBeach, setShowBeach] = useState(false);
  const [showAdventure, setShowAdventure] = useState(false);

  const toggleBeachList = () => {
    setShowBeach(!showBeach);
  };

  const toggleAdventureList = () => {
    setShowAdventure(!showAdventure);
  };

  return (
    <div>
      <h1 className="text-3xl text-gray-800 font-bold truncate block capitalize mb-4 mt-16">
        Bucket List Destinations
      </h1>
      <div className="flex flex-wrap justify-between gap-2">
        <div
          className="cursor-pointer text-xl font-semibold bg-white dark:bg-gray-800 p-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border border-gray-300 dark:border-gray-700 flex items-center justify-center w-64 h-64"
          onClick={toggleBeachList}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1696095327723-b43eaef159be?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHx2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D)",
          }}
        >
          Beach
        </div>

        <div
          className="cursor-pointer text-xl font-semibold bg-white dark:bg-gray-800 p-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border border-gray-300 dark:border-gray-700 flex items-center justify-center w-64 h-64"
          onClick={toggleAdventureList}
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1675484743424-288808877324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFkdmVudHVyZXxlbnwwfHwwfHx8MA%3D%3D)",
          }}
        >
          Adventure
        </div>
      </div>

      {showBeach
        ? destinations.map((destination) => {
            if (destination.category === "Beach") {
              return (
                <Destination key={destination.id} destination={destination} />
              );
            }
          })
        : null}
      {showAdventure
        ? destinations.map((destination) => {
            if (destination.category === "Adventure") {
              return (
                <Destination key={destination.id} destination={destination} />
              );
            }
          })
        : null}
    </div>
  );
}

export default DestinationList;
