import React from "react";

function Destination({ destination }) {
  const { id, name, description, image, category, location, reviews, price } =
    destination;
  return (
    <div>
      <div className="max-w-4xl rounded-lg shadow-lg bg-white text-left mx-auto p-6 my-8 border border-gray-200">
        <li>
          <h2 className="text-3xl font-semibold text-gray-800 truncate block capitalize mb-4">
            {name}
          </h2>
          <img
            className="w-full h-80 object-cover rounded-lg mb-4"
            src={image}
            alt={name}
          />
          <p>{location}</p>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          <p>{category}</p>
          <p>Price: {price}</p>
          <br />
          <p>Reviews:</p>
          <div>{reviews[0].comment}</div>
          <hr className="border-gray-300 my-4" />
          <button
            type="book-now"
            className="w-32 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            Book now
          </button>
        </li>
      </div>
    </div>
  );
}

export default Destination;
