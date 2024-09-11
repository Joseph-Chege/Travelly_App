import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDestinationForm = ({ onAddDestination }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    location: '',
    category: '',
    rating: '',
    price: ''
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    // Convert rating and price to numbers
    const updatedFormData = {
      ...formData,
      rating: parseFloat(formData.rating),
      price: parseFloat(formData.price),
    };
  
    fetch("/admin/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((r) => r.json())
      .then((newDestination) => {
        alert('Destination added successfully!');
        navigate('/admin/destinations');
        console.log(newDestination); // Move the log here
        onAddDestination(newDestination);
      });
  }
  
  
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-32">
      <h2 className="text-3xl font-semibold text-center mb-6 text-green-700">Add a New Destination</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Destination Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter destination name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter destination description"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter category (e.g., Beach, Mountain)"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter rating (1-5)"
            min="1"
            max="5"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter price in USD"
            min="1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Add Destination
        </button>
      </form>
    </div>
  );
};

export default NewDestinationForm;
