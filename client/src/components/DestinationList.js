import React, { useState, useEffect } from "react";
import Destination from "./Destination";
import Search from "../components/Search";

function DestinationList({ destinations }) {
  // Initialize state
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beach");
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Display beach destinations by default when component mounts or destinations update
  useEffect(() => {
    const beach_dests = destinations.filter(
      (destination) => destination.category === "Beach"
    );
    setFilteredDestinations(beach_dests);
    setSelectedCategory("Beach");
  }, [destinations]);

  // Filter destinations based on category and search term
  useEffect(() => {
    const filtered = destinations.filter(
      (destination) =>
        destination.category === selectedCategory &&
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [destinations, searchTerm, selectedCategory]);

  // Function to filter by category
  const filterByCategory = (category) => {
    const filtered = destinations.filter(
      (destination) =>
        destination.category === category &&
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
    setSelectedCategory(category);
  };

  return (
    <div className="mt-40">
      <div className="mr-16 ml-16 ">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="flex justify-around gap-4 mr-16 ml-16 mt-10">
        <div
          className={`cursor-pointer text-2xl font-semibold bg-beach-img bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Beach"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center bg-custom-image-1 justify-center w-full h-50 md:w-80`}
          onClick={() => filterByCategory("Beach")}
        >
          <div className="mt-40">Beach</div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Adventure"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center bg-custom-image-2 justify-center w-full h-50 md:w-80`}
          onClick={() => filterByCategory("Adventure")}
        >
          <div className="mt-40">Adventure</div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Romantic"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center bg-custom-image-3 justify-center w-full h-50 md:w-80`}
          onClick={() => filterByCategory("Romantic")}
        >
          <div className="mt-40">Romantic</div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Park"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center bg-custom-image-4 justify-center w-full h-50 md:w-80`}
          onClick={() => filterByCategory("Park")}
        >
          <div className="mt-40">Parks</div>
        </div>

        <div
          className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
            selectedCategory === "Local"
              ? "border-green-600 border-4"
              : "border-gray-300 dark:border-gray-700"
          } flex items-center justify-center w-full h-50 md:w-80`}
          onClick={() => filterByCategory("Local")}
          style={{
            backgroundImage:
              "url(https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/ba/70/a8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-40">Local</div>
        </div>
      </div>

      <h1 className="text-3xl text-gray-800 font-bold truncate block capitalize mb-4 mt-16 ml-16 text-center">
        {selectedCategory} Destinations
      </h1>

      {filteredDestinations.map((destination) => (
        <Destination
          key={destination.id}
          destination={destination}
          booked={bookedDestinations}
          setBooked={setBookedDestinations}
        />
      ))}
    </div>
  );
}

export default DestinationList;
