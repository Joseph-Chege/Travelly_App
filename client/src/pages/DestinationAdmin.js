import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Search from "../components/Search";

function DestinationAdmin({ updatedDestinations }) {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({}); // Track dropdown state for each destination

  useEffect(() => {
    fetch("/destinations").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          const processedData = data.map((dest) => ({
            ...dest,
            rating: Number(dest.rating),
            price: Number(dest.price),
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
          <span key={star} className="text-yellow-500 text-xl sm:text-2xl">
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

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle dropdown for the specific destination
    }));
  };

  return (
    <div className="items-center px-4 sm:px-8 lg:px-16 py-12 border border-gray-200">
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mb-12">
        <h1 className="text-4xl text-center font-bold mb-4">Welcome Admin</h1>
      </div>
      <div className="-mt-10">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="mb-4 flex justify-center items-center h-20">
        <Link to={"/admin/destinations/new"}>
          <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Add New Destination
          </button>
        </Link>
      </div>
      <div>
        {displayedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="flex justify-center mb-8 border p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row max-w-4xl w-full rounded-lg shadow-lg bg-white">
              <img
                className="w-full mt-2 md:w-1/2 h-64 md:h-auto object-cover rounded-lg md:mb-2 md:mr-6"
                src={dest.image}
                alt={dest.name}
              />
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate capitalize mb-4">
                    {dest.name}
                  </h2>

                  <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={faLocationDot} size="lg" />
                    <p className="text-lg text-gray-600">{dest.location}</p>
                  </div>

                  <p className="text-gray-700 mb-4">{dest.description}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    Category: {dest.category}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Price: {dest.price} $ per day
                  </p>
                </div>

                <div
                  onClick={() => toggleDropdown(dest.id)}
                  className="cursor-pointer"
                >
                  <StarRating rating={dest.rating} />
                  <p className="flex gap-1 text-gray-700 font-semibold mb-2">
                    {dest.reviews.length}{" "}
                    {dest.reviews.length <= 1 ? "Review" : "Reviews"}
                  </p>
                  <div className="text-gray-600 text-sm mb-4">
                    {dest.reviews && dest.reviews.length > 0
                      ? dest.reviews[0].comment
                      : "No reviews available"}
                  </div>
                </div>

                {openDropdowns[dest.id] && dest.reviews && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-lg">
                    {dest.reviews.map((review, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-center">
                          <div className="text-gray-600 text-sm">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            {review.user.username}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{review.comment}</p>
                        <hr className="my-2" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-6">
                  <Link to={`/admin/destinations/${dest.id}`}>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(dest.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
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
