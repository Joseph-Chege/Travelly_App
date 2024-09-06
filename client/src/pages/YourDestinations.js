import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookedDestination from "../components/BookedDestination";
import PriceCounter from "../components/PriceCounter";

function YourDestinations({ booked, onRemove }) {
  
  return (
    <div>
      {booked.length === 0 ? (
        <Link to="/">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-green-500">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Your booked destinations will appear here
            </h1>
            <p className="text-gray-600">Start planning your next adventure!</p>
          </div>
        </div>
        </Link>
      ) : (
        <div>
          <h1 className="text-3xl text-gray-800 font-bold truncate block capitalize mb-8 mt-32 ml-8 text-center">
            Your Booked Destinations
          </h1>
          <div>
            <PriceCounter booked={booked} />
          </div>
          <div className="bg-amber-100 p-4 rounded-b-md">
            <ul className="flex flex-wrap justify-center gap-4">
              {booked.map((destination) => (
                <BookedDestination
                  key={destination.id}
                  booked_dest={destination}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


export default YourDestinations;
