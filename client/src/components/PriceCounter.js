import React from 'react'

function PriceCounter({ booked }) {
    const totalPrice = booked.reduce((sum, destination) => sum + destination.price, 0);

    return (
        <div className="p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold capitalize mb-6 mt-6 text-center">
                Total Cost: ${totalPrice.toFixed(2)}
            </h2>
        </div>
    )
}

export default PriceCounter
