import React, { useState, useEffect } from "react";
import Destination from "./Destination";
import Search from "../components/Search";

function DestinationList({ destinations, user }) {
  // State declarations
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beach");
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Display beach destinations by default
  useEffect(() => {
    const beachDestinations = destinations.filter(
      (destination) => destination.category === "Beach"
    );
    setFilteredDestinations(beachDestinations);
    setSelectedCategory("Beach");
  }, [destinations]);

  // Update filtered destinations when category or search term changes
  useEffect(() => {
    const filtered = destinations.filter(
      (destination) =>
        destination.category === selectedCategory &&
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [destinations, searchTerm, selectedCategory]);

  // Handle category filter
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
    <div className="flex flex-col min-h-screen mt-8 justify-center">
      <div className="w-full">
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl text-center font-bold mb-4">
            Welcome {user.username}
          </h1>
        </div>
        <div className="sm:px-10 md:px-24 mr-5 ml-5">
          <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 sm:px-8 md:px-16 mt-10">
          {["Beach", "Adventure", "Romantic", "Park", "Local"].map(
            (category, index) => {
              const customBackgrounds = [
                "bg-custom-image-1",
                "bg-custom-image-2",
                "bg-custom-image-3",
                "bg-custom-image-4",
              ];
              const bgImage =
                category === "Local"
                  ? {
                      backgroundImage:
                        "url(https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/ba/70/a8.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {};
              return (
                <div
                  key={category}
                  className={`cursor-pointer text-2xl font-semibold bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 text-white border ${
                    selectedCategory === category
                      ? "border-green-600 border-4"
                      : "border-gray-300 dark:border-gray-700"
                  } flex items-center ${
                    customBackgrounds[index] || ""
                  } justify-center w-full h-50 md:w-80`}
                  style={category === "Local" ? bgImage : {}}
                  onClick={() => filterByCategory(category)}
                >
                  <div className="mt-40">{category}</div>
                </div>
              );
            }
          )}
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
    </div>
  );
}

export default DestinationList;
