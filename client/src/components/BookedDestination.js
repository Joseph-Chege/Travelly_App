import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function BookedDestination({ booked_dest, onRemove }) {
  const { name, image, location, price, } = booked_dest;

  return (
    <div className="p-6 border-b border-gray-200 mt-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg items-end">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          className="w-full h-60 md:w-72 md:h-96 rounded-lg object-cover border-4 border-green-500"
          src={image}
          alt={name}
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 truncate">
            {name}
          </h2>
          <div className="flex items-center space-x-2 mt-2">
            <FontAwesomeIcon icon={faLocationDot} size="lg" />
            <p className="text-lg md:text-xl text-gray-600">
              {location}
            </p>
          </div>
          <div className="flex flex-col mt-4 md:mt-6 space-x-4">
            <span className="text-lg md:text-xl font-medium text-gray-700 mb-8">
              Price: ${price} per day
            </span>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 item-start"
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
