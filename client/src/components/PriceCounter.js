import React from 'react'

function PriceCounter({ booked }) {
    const totalPrice = booked.reduce((sum, destination) => sum + destination.price, 0)
    return (
      <div>
        <h2 className="text-xl text-gray-800 font-bold truncate block capitalize mb-8 mt-8 text-center">
          Total Cost: ${totalPrice.toFixed(2)}
        </h2>
      </div>
  
    )
}

export default PriceCounter