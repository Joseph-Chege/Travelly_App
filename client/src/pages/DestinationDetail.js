import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { id } = useParams(); // Extract the 'id' from the URL
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state

  useEffect(() => {
    fetch(`/destinations/${id}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to fetch destination");
      })
      .then((data) => setSelectedDestination(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!selectedDestination) return <div>Loading...</div>; // Loading state

  const handleClick = () => {
    onAddToBookedDestinations(selectedDestination);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown
  };

  return (
    <div className="flex flex-col max-w-4xl rounded-lg shadow-lg bg-white mx-auto my-8 border border-gray-200 p-4 sm:p-6 md:p-8 mt-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 truncate capitalize mb-4 text-center">
    {selectedDestination.name}
  </h2>
  <img
    className="w-full h-auto md:w-150 md:h-48 object-cover rounded-lg mb-4 md:mb-0"
    src={selectedDestination.image}
    alt={selectedDestination.name}
  />
  <div className="flex flex-col justify-between">
    <div>
      <div className="flex flex-wrap items-center space-x-2">
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <p className="text-sm sm:text-lg text-gray-600 mt-2 mb-4">
          {selectedDestination.location}
        </p>
      </div>
      <p className="text-sm sm:text-base text-gray-700 mb-4">
        {selectedDestination.description}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Category: {selectedDestination.category}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Price: {selectedDestination.price} $ per day
      </p>
    </div>
    <div onClick={toggleDropdown} className="cursor-pointer">
      <span className="text-gray-500 text-sm mr-2">
        Rating:{" "}
        {selectedDestination.rating && (
          <StarRating rating={selectedDestination.rating} />
        )}
      </span>
      <p className="flex gap-1 text-sm sm:text-base text-gray-700 font-semibold mb-2">
        {selectedDestination.reviews ? (
          <>
            {selectedDestination.reviews.length}{" "}
            {selectedDestination.reviews.length === 1
              ? "Review"
              : "Reviews"}
          </>
        ) : (
          <span>No Reviews</span>
        )}
      </p>
    </div>
    {isDropdownOpen && selectedDestination.reviews && (
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
    <hr className="border-gray-300 my-4" />
    <Link to="/destinations/your-destinations">
      <button
        type="button"
        className="w-full text-lg bg-green-600 text-white py-5 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
        onClick={handleClick}
      >
        Book now
      </button>
    </Link>
    <Link to={`/destinations/${id}/reviews`} className="mt-4">
      <div className="flex items-center justify-center bg-white border border-gray-300 shadow-lg p-4 rounded-lg text-center text-lg font-semibold text-green-700 hover:text-green-800 transition duration-300 ease-in-out">
        Visited? Leave a review
      </div>
    </Link>
  </div>
</div>

  );
}

export default DestinationDetail;
