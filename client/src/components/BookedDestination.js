import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function BookedDestination({ booked_dest, onRemove }) {
  const { name, image, location, price } = booked_dest;

  return (
    <div className="p-4 md:p-6 border-b border-gray-200 mt-4 md:mt-8 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <img
          className="w-full h-48 md:w-56 md:h-80 rounded-lg object-cover border-4 border-green-500"
          src={image}
          alt={name}
        />
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 truncate">
            {name}
          </h2>
          <div className="flex items-center space-x-2 mt-2">
            <FontAwesomeIcon icon={faLocationDot} size="lg" />
            <p className="text-base md:text-lg text-gray-600">
              {location}
            </p>
          </div>
          <div className="flex justify-between items-center mt-4 md:mt-6">
            <span className="text-base md:text-lg font-medium text-gray-700">
              Price: ${price} per day
            </span>
            <button
              className="text-base md:text-lg font-semibold text-green-600 hover:text-green-800"
              onClick={() => onRemove(booked_dest)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedDestination;
