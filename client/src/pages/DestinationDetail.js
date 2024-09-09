import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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

function DestinationDetail({ onAddToBookedDestinations }) {
  const [selectedDestination, setSelectedDestination] = useState([]);
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [isBooked, setIsBooked] = useState(false); // Flag to track if the user has booked this destination
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle the dropdown

  useEffect(() => {
    fetch(`/destinations/${id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch destination");
      })
      .then((data) => setSelectedDestination(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!selectedDestination) {
    return <div>Loading...</div>; // Optional: Loading state while fetching data
  }

  const handleClick = () => {
    setIsBooked(true);
    onAddToBookedDestinations(selectedDestination);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown menu
  };

  console.log(selectedDestination);

  return (
    <>
      <div>
  <div className="flex flex-col max-w-4xl rounded-lg shadow-lg bg-white mx-auto my-8 border border-gray-200 p-6 mt-64">
  <h2 className="text-4xl font-semibold text-gray-800 truncate capitalize mb-4 text-center">
          {selectedDestination.name}
        </h2>
    <img
      className="w-full h-full object-cover rounded-lg mb-6"
      src={selectedDestination.image}
      alt={selectedDestination.name}
    />
    <div className="flex flex-col justify-between">
      <div>

        <div className="flex flex-wrap items-center space-x-2">
          <FontAwesomeIcon icon={faLocationDot} size="xl" />
          <p className="text-lg text-gray-600 mt-2 mb-4">
            {selectedDestination.location}
          </p>
        </div>

        <p className="text-gray-700 text-base mb-4">
          {selectedDestination.description}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Category: {selectedDestination.category}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Price: {selectedDestination.price} $ per day
        </p>
      </div>

      {/* Review Section */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        <span className="text-gray-500 text-sm mr-2">
          Rating:{" "}
          {selectedDestination && selectedDestination.rating && (
            <StarRating rating={selectedDestination.rating} />
          )}
        </span>
        <p className="flex gap-1 text-gray-700 font-semibold mb-2">
          {selectedDestination && selectedDestination.reviews ? (
            <>
              {selectedDestination.reviews.length}{" "}
              {selectedDestination.reviews.length === 1 ? (
                <span>Review</span>
              ) : (
                <span>Reviews</span>
              )}
            </>
          ) : (
            <span>No Reviews</span>
          )}
        </p>
      </div>

      {/* Dropdown menu to show all reviews */}
      {isDropdownOpen &&
        selectedDestination &&
        selectedDestination.reviews &&
        selectedDestination.reviews.length > 0 && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-lg">
            {selectedDestination.reviews.map((review, index) => (
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

      <div className="text-gray-600 text-sm mb-4"></div>
      <hr className="border-gray-300 my-4" />
      <Link to="/destinations/your-destinations">
        <div>
          {isBooked ? (
            <button
              type="button"
              className="w-full md:w-32 bg-gray-600 text-white py-2 rounded-lg transition-colors shadow-sm"
              onClick={() => handleClick(selectedDestination)}
            >
              Booked!
            </button>
          ) : (
            <button
              type="button"
              className="w-full md:w-32 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              onClick={() => handleClick(selectedDestination)}
            >
              Book now
            </button>
          )}
        </div>
      </Link>
    </div>
  </div>
</div>

    </>
  );
}

export default DestinationDetail;
