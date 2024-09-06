import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DestinationDetail({ onAddToBookedDestinations }) {
  const [selectedDestination, setSelectedDestination] = useState([]);
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [isBooked, setIsBooked] = useState(false); // Flag to track if the user has booked this destination

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

  return (
    <>
      <div className="max-w-4xl rounded-lg shadow-lg bg-white text-left mx-auto p-6 my-32 border border-gray-200 flex flex-col items-center justify-center max-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 truncate block capitalize mb-4">
          {selectedDestination.name}
        </h1>
        <img
          className="w-full h-96 object-cover rounded-lg mb-4"
          src={selectedDestination.image}
          alt={selectedDestination.name}
        />
        <p>{selectedDestination.description}</p>
        <p>{selectedDestination.category}</p>

        <br />

        <p>{selectedDestination.rating}</p>
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
    </>
  );
}

export default DestinationDetail;
