import React, { useState, useEffect } from "react";
import Destination from "./Destination";

function DestinationList({ destinations }) {
  // Initialize state
  const [showBeach, setShowBeach] = useState([]);
  const [showAdventure, setShowAdventure] = useState([]);
  const [showRomantic, setShowRomantic] = useState([]);
  const [showParks, setShowParks] = useState([]);
  const [showLocal, setShowLocal] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beach"); // Track selected category
  const [bookedDestinations, setBookedDestinations] = useState([])

  // Display beach destinations by default
  useEffect(() => {
    const beach_dests = destinations.filter(
      (destination) => destination.category === "Beach"
    );
    setShowBeach(beach_dests);
  }, [destinations]);

  const toggleBeachList = () => {
    const beach_dests = destinations.filter(
      (destination) => destination.category === "Beach"
    );
    setShowBeach(beach_dests);
    setShowAdventure([]);
    setShowRomantic([]);
    setShowParks([]);
    setShowLocal([]);
    setSelectedCategory("Beach");
  };

  const toggleAdventureList = () => {
    const adventure_dests = destinations.filter(
      (destination) => destination.category === "Adventure"
    );
    setShowAdventure(adventure_dests);
    setShowBeach([]);
    setShowRomantic([]);
    setShowParks([]);
    setShowLocal([]);
    setSelectedCategory("Adventure");
  };

  const toggleRomanticList = () => {
    const romantic_dests = destinations.filter(
      (destination) => destination.category === "Romantic"
    );
    setShowRomantic(romantic_dests);
    setShowBeach([]);
    setShowAdventure([]);
    setShowParks([]);
    setShowLocal([]);
    setSelectedCategory("Romantic");
  };

  const toggleParksList = () => {
    const parks_dests = destinations.filter(
      (destination) => destination.category === "Park"
    );
    setShowParks(parks_dests);
    setShowBeach([]);
    setShowAdventure([]);
    setShowRomantic([]);
    setShowLocal([]);
    setSelectedCategory("Park");
  };

  const toggleLocalList = () => {
    const local_dests = destinations.filter(
      (destination) => destination.category === "Local"
    );
    setShowLocal(local_dests);
    setShowBeach([]);
    setShowAdventure([]);
    setShowRomantic([]);
    setShowParks([]);
    setSelectedCategory("Local");
  };

  return (
    <div>
      <h1 className="text-3xl text-gray-800 font-bold truncate block capitalize mb-8 mt-32 ml-8 text-center">
        Bucket List Destinations
      </h1>
      <div className="flex justify-around gap-4 mr-16 ml-16">
        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Beach"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={toggleBeachList}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1696095327723-b43eaef159be?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHx2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">
            Beach
          </div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Adventure"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={toggleAdventureList}
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1675484743424-288808877324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFkdmVudHVyZXxlbnwwfHwwfHx8MA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">
            Adventure
          </div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Romantic"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={toggleRomanticList}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1605152912570-e95809793d2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fHJvbWFudGljJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">
            Romantic
          </div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Park"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={toggleParksList}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1621874743633-61f462bb69ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmtzfGVufDB8fDB8fHww)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">
            Parks
          </div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Local"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={toggleLocalList}
          style={{
            backgroundImage:
              "url(https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/ba/70/a8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">
            Local
          </div>
        </div>
      </div>

      <h1 className="text-3xl text-gray-800 font-bold truncate block capitalize mb-4 mt-16 ml-16 text-center">
        {selectedCategory} Destinations
      </h1>

      {showBeach.map((destination) => (
        <Destination key={destination.id} destination={destination} booked={bookedDestinations} setBooked={setBookedDestinations}  />
      ))}

      {showAdventure.map((destination) => (
        <Destination key={destination.id} destination={destination} booked={bookedDestinations} setBooked={setBookedDestinations}  />
      ))}

      {showRomantic.map((destination) => (
        <Destination key={destination.id} destination={destination} booked={bookedDestinations} setBooked={setBookedDestinations} />
      ))}

      {showParks.map((destination) => (
        <Destination key={destination.id} destination={destination} booked={bookedDestinations} setBooked={setBookedDestinations} />
      ))}

      {showLocal.map((destination) => (
        <Destination key={destination.id} destination={destination} booked={bookedDestinations} setBooked={setBookedDestinations} />
      ))}
    </div>
  );
}

export default DestinationList;
