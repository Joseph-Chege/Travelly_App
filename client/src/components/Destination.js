import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <span key={star} className="text-yellow-500 text-xl md:text-2xl">
          <FontAwesomeIcon icon={star <= rating ? fasStar : farStar} />
        </span>
      ))}
    </div>
  );
}

function Destination({ destination }) {
  const { id, name, description, image, category, location, reviews, price, rating } = destination;

  return (
    <Link to={`/destinations/${id}`}>
      <div className="flex flex-col md:flex-row max-w-4xl rounded-lg shadow-lg bg-white mx-auto my-4 md:my-8 border border-gray-200 p-4 md:p-6 mb-16">
        <img
          className="w-full h-48 md:w-[400px] md:h-[500px] object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 truncate capitalize mb-2 md:mb-4">
              {name}
            </h2>

            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faLocationDot} size='lg' />
              <p className="text-base md:text-lg text-gray-600">{location}</p>
            </div>

            <p className="text-gray-700 text-base mb-2 md:mb-4">{description}</p>
            <p className="text-gray-500 text-sm mb-2 md:mb-4">Category: {category}</p>
            <p className="text-gray-500 text-sm mb-2 md:mb-4">Price: {price} $ per day</p>
          </div>
          <div>
            <div className="mb-2">
              <span className="text-gray-500 text-sm md:text-base">
                Rating: <StarRating rating={rating} />
              </span>
              <p className="flex gap-1 text-gray-700 font-semibold mb-2 text-sm md:text-base">
                {reviews.length} {reviews.length <= 1 ? "Review" : "Reviews"}
              </p>
            </div>
            <div className="text-gray-600 text-sm mb-4">
              {reviews && reviews.length > 0 ? reviews[0].comment : "No reviews available"}
            </div>
            <hr className="border-gray-300 my-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Destination;
