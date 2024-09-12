import React from "react";
import { Link } from "react-router-dom";
import BookedDestination from "../components/BookedDestination";
import PriceCounter from "../components/PriceCounter";

function YourDestinations({ booked, onRemove }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {booked.length === 0 ? (
        <Link to="/">
          <div className="flex items-center justify-center h-full p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-green-500 w-full max-w-md">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Your booked destinations will appear here
              </h1>
              <p className="text-gray-600">Start planning your next adventure!</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold mb-8 mt-8 text-center">
            Your Booked Destinations
          </h1>
          <div className="mb-8">
            <PriceCounter booked={booked} />
          </div>
          <div className="bg-amber-100 p-4 rounded-lg">
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
