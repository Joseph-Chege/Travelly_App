import React, { useState } from "react";

function BookedDestination({ booked_dest, onRemove }) {
  const { id, name, description, image, category, location, reviews, price } =
    booked_dest;

  const [isBookedDestination, setIsBookedDestination] = useState(false);

  return (
    <div>
      <>
        {
          <div className="p-4 border-b border-gray-200 mt-8">
            <div className="flex items-center gap-4">
              <img
                className="w-40 h-64 rounded-full object-cover border-4 border-green-500"
                src={image}
                alt={name}
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">{location}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-gray-700">
                Price: ${price}
              </span>
              <button
                className="text-sm font-semibold text-green-600 hover:text-green-800"
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
