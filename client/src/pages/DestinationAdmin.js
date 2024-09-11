import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search";
import { Link } from "react-router-dom";

function DestinationAdmin({ updatedDestinations }) {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/destinations")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            // Convert rating to number if it's a string
            const processedData = data.map(dest => ({
              ...dest,
              rating: Number(dest.rating), // Ensure rating is a number
              price: Number(dest.price)    // Ensure price is a number
            }));
            setDestinations(processedData);
          });
        }
      });
  }, []);

  useEffect(() => {
    if (updatedDestinations && updatedDestinations.length) {
      setDestinations(updatedDestinations);
    }
  }, [updatedDestinations]);

  function StarRating({ rating }) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
      <div className="flex items-center space-x-1">
        {stars.map((star) => (
          <span key={star} className="text-yellow-500 text-2xl">
            <FontAwesomeIcon icon={star <= rating ? fasStar : farStar} />
          </span>
        ))}
      </div>
    );
  }

  const handleDelete = (id) => {
    fetch(`/destinations/${id}`, {
      method: "DELETE",
    }).then(() => {
      setDestinations(destinations.filter((dest) => dest.id !== id));
    });
  };

  const displayedDestinations = destinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mr-32 ml-32">
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-24 mb-20 mr-16 ml-16">
        <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
      </div>
      <div>
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="mb-4 flex justify-center items-center h-20">
        <Link to={"/admin/destinations/new"}>
          <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Add New Destination
          </button>
        </Link>
      </div>
      <div className="mr-16 ml-16">
        {displayedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex flex-col md:flex-row max-w-4xl rounded-lg shadow-lg bg-white mx-auto my-8 border border-gray-200 p-6">
              <img
                className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                src={dest.image}
                alt={dest.name}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 truncate capitalize mb-4">
                    {dest.name}
                  </h2>

                  <div className="flex flex-wrap items-center space-x-2">
                    <FontAwesomeIcon icon={faLocationDot} size="xl" />
                    <p className="text-lg text-gray-600 mt-2  mb-4">
                      {dest.location}
                    </p>
                  </div>

                  <p className="text-gray-700 text-base mb-4">
                    {dest.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Category: {dest.category}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Price: {dest.price} $ per day
                  </p>
                </div>
                <div>
                  <div>
                    <span className="text-gray-500 text-sm mr-2">
                      Rating: <StarRating rating={dest.rating} />
                    </span>
                    <p className="flex gap-1 text-gray-700 font-semibold mb-2">
                      {dest.reviews.length}{" "}
                      {dest.reviews.length <= 1 ? (
                        <p>Review</p>
                      ) : (
                        <p>Reviews</p>
                      )}
                    </p>
                  </div>
                  <div className="text-gray-600 text-sm mb-4">
                    {dest.reviews && dest.reviews.length > 0 ? (
                      dest.reviews[0].comment
                    ) : (
                      <p>No reviews available</p>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm mb-4"></div>
                  {/* <hr className="border-gray-300 my-4" /> */}
                  <div className="justify-between">
                    <Link to={`/admin/destinations/${dest.id}`}>
                      <button
                        // onClick={() => handleDelete(dest.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 mr-16"
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(dest.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationAdmin;
