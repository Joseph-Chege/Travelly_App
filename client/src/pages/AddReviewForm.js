import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For extracting destination_id from URL

function AddReviewForm({ user }) {
  const [comment, setComment] = useState('');
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    fetch(`/destinations/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => setDestination(data));
      }
    });
  }, [id]);


  // console.log(destination)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment) {
      setError('Comment is required!');
      return;
    }

    try {
      const response = await fetch(`/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          user_id: user.id,
          destination_id: destination.id, // Now coming from useParams()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setComment(''); // Clear form after submission
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred while submitting your review.');
    }
  };

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-green-500 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Leave a Review
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-left text-gray-700 text-sm font-bold mb-2"
          >
            Your Review:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your review here"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;
