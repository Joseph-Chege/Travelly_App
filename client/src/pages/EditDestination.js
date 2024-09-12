import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDestination = ({ onUpdateDestination }) => {
  const [destination, setDestination] = useState({
    name: '',
    image: '',
    description: '',
    location: '',
    category: '',
    rating: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch the destination data to populate the form
    fetch(`/destinations/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data from backend:', data);
        setDestination(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load destination');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert rating and price to numbers
    const updatedDestination = {
      ...destination,
      rating: parseFloat(destination.rating),
      price: parseFloat(destination.price),
    };
  
    try {
      const response = await fetch(`/admin/destinations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDestination),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update destination');
      }
  
      const result = await response.json();
      onUpdateDestination(result);
      alert('Destination updated successfully!');
      console.log(result);
      navigate('/admin/destinations');
    } catch (error) {
      setError('Failed to update destination');
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-green-700">Edit Destination</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Destination Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={destination.name}
              onChange={(e) => setDestination({ ...destination, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter destination name"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={destination.image}
              onChange={(e) => setDestination({ ...destination, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={destination.description}
              onChange={(e) => setDestination({ ...destination, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter destination description"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={destination.location}
              onChange={(e) => setDestination({ ...destination, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={destination.category}
              onChange={(e) => setDestination({ ...destination, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter category (e.g., Beach, Mountain)"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-2">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={destination.rating}
              onChange={(e) => setDestination({ ...destination, rating: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={destination.price}
              onChange={(e) => setDestination({ ...destination, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter price in USD"
              min="1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Update Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDestination;
