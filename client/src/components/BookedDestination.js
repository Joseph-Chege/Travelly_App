import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function BookedDestination({ booked_dest, onRemove }) {
  const { name, image, location, price } =
    booked_dest;

  

  return (
    <div>
    <>
      {
        <div className="p-6 border-b border-gray-200 mt-8 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="flex items-center gap-6">
            <img
              className="w-56 h-80 rounded-lg object-cover border-4 border-green-500"
              src={image}
              alt={name}
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <div className="flex flex-wrap items-center space-x-2">
          <FontAwesomeIcon icon={faLocationDot} size="xl" />
          <p className="text-lg text-gray-600 mt-2 mb-4">
            {location}
          </p>
        </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-lg font-medium text-gray-700">
              Price: ${price} per day
            </span>
            <button
              className="text-lg font-semibold text-green-600 hover:text-green-800"
              onClick={() => onRemove(booked_dest)}
            >
              Remove
            </button>
          </div>
        </div>
      }
    </>
  </div>  
  );
}

export default BookedDestination;
