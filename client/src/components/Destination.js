import React  from "react";
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
        <span key={star} className="text-yellow-500 text-2xl">
          <FontAwesomeIcon icon={star <= rating ? fasStar : farStar} />
        </span>
      ))}
    </div>
  );
}

function Destination({ destination }) {
  const { id, name, description, image, category, location, reviews, price } =
    destination;

  return (
    <Link to={`/destinations/${id}`}>
      <div className="flex flex-col md:flex-row max-w-4xl rounded-lg shadow-lg bg-white mx-auto my-8 border border-gray-200 p-6">
        <img
          className="w-64 h-64 md:w-64 md:h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 truncate capitalize mb-4">
              {name}
            </h2>

            <div className="flex flex-wrap items-center space-x-2">
            <FontAwesomeIcon icon={faLocationDot} size='xl' />
            <p className="text-lg text-gray-600 mt-2  mb-4">{location}</p>
            </div>

            
            <p className="text-gray-700 text-base mb-4">{description}</p>
            <p className="text-gray-500 text-sm mb-4">Category: {category}</p>
            <p className="text-gray-500 text-sm mb-4">Price: {price} $ per day</p>
          </div>
          <div>
            <div>
              <span className="text-gray-500 text-sm mr-2">
                Rating: <StarRating rating={destination.rating} />
              </span>
              <p className="flex gap-1 text-gray-700 font-semibold mb-2">
                {reviews.length}{" "}
                {reviews.length <= 1 ? <p>Review</p> : <p>Reviews</p>}
              </p>
            </div>
            <div className="text-gray-600 text-sm mb-4">
              {reviews[0].comment}
            </div>
            <div className="text-gray-600 text-sm mb-4">
            </div>
            <hr className="border-gray-300 my-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Destination;
